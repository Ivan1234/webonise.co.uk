import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import WorkProcess from '../components/WorkProcess.jsx';
import FunFacts from '../components/FunFacts.jsx';
import TweetItem from '../../tweets/components/TweetItem.jsx';
import GitItem from '../../github/components/GitItem.jsx';
import FlickrItem from '../../flickr/components/FlickrItem.jsx';
import InstagramItem from '../../instagram/components/InstagramItem.jsx';

class MainPage extends Component {
    //handleSubmit(event) {
    //    event.preventDefault();
    //
    //    // Find the text field via the React ref
    //    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    //
    //    Meteor.call('links.insert', text);
    //
    //    // Clear form
    //    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    //}
    //
    //renderLinks() {
    //    return this.props.links.map((link) => (
    //        <Link key={link._id} link={link} />
    //    ));
    //}

    componentDidMount() {
        $('.fade-in').velocity("fadeIn", { duration: 500 });

        function isScrolledIntoView(elem)
        {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        setTimeout(function() {
            $(window).scroll(function(){
                var bounceIn = $('.bounceEffect');
                if (bounceIn.length != 0) {
                    if (isScrolledIntoView(bounceIn)) {
                        setTimeout(function(){
                            bounceIn.addClass('animated bounceIn');
                        }, 400);
                    }
                }
            });

            //heart effect
            var heart = $('.heartEffect');
            if (heart.length != 0) {
                setInterval(function(){
                    heart.removeClass('animated pulse');
                    setTimeout(function(){
                        heart.addClass('animated pulse');
                    }, 400);
                }, 1400);
            }
        }, 400);

        $('.materialboxed').materialbox();
    }

    render() {
        console.log(this.props.diet);
        return (
            <span>
                <div className="section fade-in" id="index-banner">
                    <div className="container">
                        <div className="row center">
                            <div className="col s12 m8">
                                <h2 className="header indigo-text lighten-1 section-title">
                                    <span><i className="mdi-hardware-keyboard-alt"/>About Me</span>
                                </h2>
                                <p className="flow-text">
                                    Hello! I'm <strong className="indigo-text darken-4">Parminder Singh Klair</strong> and I am a <strong>Website
                                    and Application Developer</strong> based in
                                    Birmingham, UK. I enjoy working on <strong className="indigo-text lighten-1">usable, clean and
                                    practical</strong> web sites.
                                </p>
                            </div>
                            <div className="col s12 m4">
                                <h2 className="header indigo-text lighten-1 section-title">
                                    <span>
                                        <a href="#">
                                            <i className="fa fa-twitter"/>Latest Tweets
                                        </a>
                                    </span>
                                </h2>
                                <TweetItem tweet={this.props.tweet} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container fade-in">
                    <div className="section featured-media">
                        <div className="row">
                            {this.props.github.map((git) => {
                                return (
                                    <div key={git._id} className="col s12 m4">
                                        <GitItem git={git} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row center">
                            <a href="#" id="download-button" className="btn-large waves-effect waves-light pink accent-2">
                                <i className="fa fa-github"/> <span>All Repositories</span>
                            </a>
                        </div>
                    </div>
                </div>

                <WorkProcess />
                
                <FunFacts diet={this.props.diet} />
                
                <div className="container fade-in">
                    <div className="section fun-facts">
                        <h2 className="header indigo-text lighten-1 section-title">
                            <span>
                                 <a href="#">
                                     <i className="fa fa-flickr"/> Latest Flickr
                                 </a>
                            </span>
                        </h2>
                        <div className="row">
                            {this.props.flickr.map((image) => {
                                return (
                                    <div key={image._id} className="col s4 m2">
                                        <FlickrItem image={image} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="container fade-in">
                    <div className="section fun-facts">
                        <h2 className="header indigo-text lighten-1 section-title">
                            <span>
                                 <a href="{{pathFor 'instagram'}}">
                                     <i className="fa fa-instagram"/> Latest Instagram
                                 </a>
                            </span>
                        </h2>
                        <div className="row">
                            {this.props.instagram.map((image) => {
                                return (
                                    <div key={image._id} className="col s4 m2">
                                        <InstagramItem image={image} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </span>
        )
    }

    //renderOld() {
    //    return (
    //        <div className="ui container">
    //            <header>
    //                <h1>Links List</h1>
    //                <AccountsUIWrapper />
    //                <form className="new-link" onSubmit={this.handleSubmit.bind(this)} >
    //                    <input
    //                        type="text"
    //                        ref="textInput"
    //                        placeholder="Type link URL"
    //                    />
    //                </form>
    //            </header>
    //
    //            <ul>
    //                {this.renderLinks()}
    //            </ul>
    //        </div>
    //    );
    //}
}

MainPage.propTypes = {
    tweet: PropTypes.object.isRequired,
    github: PropTypes.array.isRequired,
    instagram: PropTypes.array.isRequired,
    diet: PropTypes.object.isRequired,
    flickr: PropTypes.array.isRequired
};

export default MainPage;
