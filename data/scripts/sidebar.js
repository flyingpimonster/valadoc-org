/**
 * sidebar.js
 * Kick-ass sidebar actions for all your documentation needs
 */

/* global $ */

/**
 * JS toggle logic
 */
$(function () {
    var activeClass = 'active';

    $('[js-toggle]').bind('click', function() {
        if ($(this).attr('js-toggle') == null) return

        var targets = $(this).attr('js-toggle').split(' ');

        for (var i = 0; i < targets.length; i++) {
            $(targets[i]).toggleClass(activeClass);
        }
    });
});

/**
 * Sidebar logic
 */
$(function() {
    var c = 'active'
    var t = '.sidebar-menu';
    var s = 'nav.sidebar';
    var i = 'nav.sidebar div.search input';
    var w = 'a, input, textarea, button'; // elements consider off limits if in focus

    var dX = 150; // minimum pixels of horizontal movement
    var dY = 0.6; // ration of vertical:horizontal movement limit

    $(t).bind('click', function(e) {
        e.preventDefault();

        if (!$(s).hasClass(c)) {
            $(s).addClass(c);
            $(i).focus();
        } else {
            $(s).removeClass(c);
            $(i).blur();
        }
    });

    $(document).bind('click', function(e) {
        if (!$(s).hasClass(c)) return;
        if ($(e.target).closest(t).length !== 0) return;

        if ($(e.target).closest(s).length === 0) {
            $(s).removeClass(c);
            $(i).blur();
        }
    });

    $(document).bind('keyup', function(e) {
        var code = e.keyCode || e.which;

        if (code === 27 && $(s).hasClass(c)) { // esc key
            $(s).removeClass(c);
            $(i).blur();
        }

        if (code === 13 && !$(document.activeElement).is(w) && !$(s).hasClass(c)) { // enter key
            e.preventDefault();
            $(s).addClass(c);
            $(i).focus();
        }
    });

    var x = null;
    var y = null;
    var a = null;
    var b = null;

    $(document).bind('touchstart', function(e) {
        x = e.originalEvent.touches[0].pageX;
        y = e.originalEvent.touches[0].pageY;
    });

    $(document).bind('touchmove', function(e) {
        a = e.originalEvent.touches[0].pageX;
        b = e.originalEvent.touches[0].pageY;
    });

    $(document).bind('touchend', function(e) {
        var w = $(window).width();
        var h = $(window).height();

        // swiped more than dX pixels horizontaly and ratio vertical:horizontal is less than dY
        if (x - a > 0 && Math.abs(x - a) > dX && Math.abs(b - y) / Math.abs(a - x) < dY) {
            $(s).removeClass(c);
            $(i).blur();
        } else if (x - a < 0 && Math.abs(x - a) > dX && Math.abs(b - y) / Math.abs(a - x) < dY) {
            $(s).addClass(c);
            $(i).focus();
        }

        x = null;
        y = null;
        a = null;
        b = null;
    });
});