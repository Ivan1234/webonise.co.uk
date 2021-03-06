import { Meteor } from 'meteor/meteor';
import async from 'async';
import FlickrApi from 'flickrapi';
import _ from 'underscore';
import { ServiceConfiguration } from 'meteor/service-configuration';

import { Flickr } from '../api/flickr/flickr.js';

const serviceConfig = ServiceConfiguration.configurations.findOne({service: 'flickr'});

const flickrOptions = {
    api_key: serviceConfig.api_key,
    secret: serviceConfig.secret
};

const flickrUserId = serviceConfig.flickr_user_id;

exports.syncFlickr = function() {
    console.log('start flickr sync');
    let data;
    let lastItem;
    let options = {};

    async.series([
        (callback) => {
            //first get last flickr item
            lastItem = Flickr.findOne({}, {sort: {dateupload: -1}});
            callback();
        },
        Meteor.bindEnvironment((callback) => {
            if (lastItem) {
                options['min_upload_date'] = lastItem.dateupload;
            }

            //get data from flickr
            FlickrApi.tokenOnly(flickrOptions, function(error, flickrClient) {
                // we can now use "flickr" as our API object,
                // but we can only call public methods and access public data
                flickrClient.people.getPhotos(_.extend({
                    api_key: flickrOptions.api_key,
                    user_id: flickrUserId,
                    page: 1,
                    per_page: 200,
                    extras: 'url_l,date_upload,date_taken,tags'
                }, options), function(err, result) {
                    /*
                     This will give public results only, even if we used
                     Flickr.authenticate(), because the function does not
                     *require* authentication to run. It just runs with
                     fewer permissions.
                     */
                    data = result.photos.photo;

                    callback(err);
                });
            });
        }),
        Meteor.bindEnvironment((callback) => {
            //insert new data
            async.each(data, (row, callbackEach) => {
                //console.log(row.data);
                if (options.min_upload_date !== row.dateupload) {
                    Flickr.insert({
                        flickr_id: row.id,
                        datetaken: row.datetaken,
                        dateupload: row.dateupload,
                        tags: row.tags,
                        title: row.title,
                        url: row.url_l
                    });
                }
                callbackEach();
            }, (err) => {
                callback(err);
            });
        })
    ]);
};
