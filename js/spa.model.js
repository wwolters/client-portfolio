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
        cart,
        initModule;

    // The cart object API
    // -------------------
    // The cart object is available at spa.model.cart.
    // The cart object provides methods and events to manage
    cart = (function () {
        var get_cart;

        get_cart = function () {
            return {}; //TODO implementatie
        };

        return {
            get_cart: get_cart
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
        cart: cart
    };
//------------------- END PUBLIC METHODS ---------------------
}());

