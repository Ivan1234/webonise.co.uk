import { Meteor } from 'meteor/meteor';
const CronJob = require('cron').CronJob;

import { syncSkills } from './sync-skills.js';
import { syncTimeline } from './sync-timeline.js';
import { syncFlickr } from './sync-flickr.js';
import { syncGithub } from './sync-github.js';
import { syncInstagram } from './sync-instagram.js';
import { syncTwitter} from './sync-twitter.js';
import { syncPocket } from './sync-pocket.js';
import { syncJawboneUp } from './sync-jawbone-up.js';

//To test using meteor call or to run sync manually
Meteor.methods({
    'sync'() {
        syncSkills();//works
        syncTimeline();//works
        syncFlickr();//works
        syncGithub();//works
        syncInstagram();//works
        syncTwitter();//works
        syncPocket();//works
        syncJawboneUp();//works
    }
});

let job = new CronJob({
    cronTime: '* * * * *',
    onTick: function() {
        console.log('sync is running now (every minute).');

        syncSkills();
        syncTimeline();
        syncFlickr();
        syncGithub();
        syncInstagram();
        syncTwitter();
        syncPocket();
        syncJawboneUp();
    },
    start: false
});
job.start();