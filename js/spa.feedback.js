spa.feedback = (function ($) {

    var elements = {};

    function initModule($container) {
        elements.$container = $container;
        elements.$openElements = [];
    }

    /**
     * Open the feedback widget with a text and action.
     * @param text The text to show
     * @param callToAction optionally: the call-to-action button. Should be an object {text: "", link: ""}
     */
    function open(text, callToAction) {
        storeInLocalStorage(text);

        var newElement = $('<div class="feedback"></div>');
        newElement.append('<span class="feedback-text">' +  text + '</span>');
        var closeButton = $('<a class="feedback-close">x</a>');
        closeButton.on('click', function () {
            close(newElement);
        });
        newElement.append(closeButton);
        if (callToAction) {
            var callToActionButton = $('<a href="' + callToAction.link + '" class="feedback-call-to-action">' + callToAction.text + '</a>');
            newElement.append(callToActionButton);
        }
        elements.$container.append(newElement);

        elements.$openElements.push(newElement);
    }

    function storeInLocalStorage(text) {

    }

    function closeAll() {
        var length = elements.$openElements.length;
        for (var i = 0; i < length; i++) {
            close(elements.$openElements[0])
        }
    }

    function close(element) {
        if (!isOpen(element)) {
            console.warn('Close called, but was not open!');
            return;
        }

        element.remove();
        elements.$openElements.splice(elements.$openElements.indexOf(element), 1);
    }

    function isOpen(element) {
        return elements.$openElements.includes(element);
    }

    return {
        initModule: initModule,
        open: open,
        closeAll: closeAll
    }
})($);
