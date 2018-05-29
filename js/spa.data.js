/*
 * spa.data.js
 * Data module
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global $, io, spa */


spa.data = (function () {
    'use strict';
    var
        configMap = {
            url: 'https://api.windesheim.nl.org/api/v1'

        },
        initModule, ajax;

    ajax = {
        get: function (route) {

            var _url = configMap.url + '/' + route;

            return $.getJSON(_url)
                .catch(function (err) {
                    console.log('Error while getting data: ' + err);
                    spa.feedback.open('Het is niet gelukt om de gegevens op te halen.');
                    //TODO err implementatie.... spa.feedbackWidget
                    // .showError('Het is niet gelukt om de gegevens op te halen.');
                })
        }
    };


    initModule = function () {


    };

    return {
        initModule: initModule,
        ajax: ajax
    };

}());
