var feedbackWidget = (function ($) {

    var config = {
        color: 'red',
        textColor: 'darkRed'
    };
    var elements = {};

    function init($container) {
        elements.$container = $container;
        elements.$openElement = null;
    }

    function configure(configuration) {
        config = configuration;
    }

    /**
     * Open the feedback widget with a text and action.
     * @param text The text to show
     * @param callToAction optionally: the call-to-action button. Should be an object {text: "", link: ""}
     */
    function open(text, callToAction) {
        if (isOpen()) {
            close();
        }
        storeInLocalStorage(text);

        var newElement = $('<div class="feedback"></div>');
        newElement.append('<span class="feedback-text">' +  text + '</span>');
        // TODO handle callToAction
        var closeButton = $('<a href="#" class="feedback-close">x</a>');
        closeButton.click(close);
        newElement.append(closeButton);
        elements.$container.append(newElement);

        elements.$openElement = newElement;
    }

    function storeInLocalStorage(text) {

    }

    function close() {
        if (!isOpen()) {
            console.warn('Close called, but was not open!');
            return;
        }

        elements.$openElement.remove();
        elements.$openElement = null;
    }

    function isOpen() {
        return elements.$openElement !== null;
    }

    return {
        init: init,
        configure: configure,
        open: open,
        close: close
    }
})($);
