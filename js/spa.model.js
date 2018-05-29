/*
 * module_template.js
 * Template for browser feature modules
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, spa */
spa.model = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {},
        review,
        initModule;

    // The cart object API
    // -------------------
    // The cart object is available at spa.model.cart.
    // The cart object provides methods and events to manage
    review = (function () {
        var get_review;

        get_review = function (title, review, author, score) {
            return {
                title: title,
                review: review,
                author: author,
                score: score
            };
        };

        return {
            get_review: get_review
        };
    }());
//----------------- END MODULE SCOPE VARIABLES ---------------

//------------------- BEGIN PUBLIC METHODS -------------------

    initModule = function ($container) {
        stateMap.$container = $container;

        return true;
    };


    return {
        initModule: initModule,
        review: review
    };
//------------------- END PUBLIC METHODS ---------------------
}());

