function load() {
    if (typeof $ === 'undefined') {
        return;
    }
    var _watch = [];
    var _buffer;

    function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function() {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    $window = $(window);

    function testInViewport($el) {
        if (!$el.length || !$el.offset()) {
            return false;
        }
        var docViewTop = $window.scrollTop(),
            docViewBottom = docViewTop + window.innerHeight,
            elemTop = $el.offset().top,
            elemBottom = elemTop + $el.height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    function testIsAboveCurrentViewport($el) {
        if (!$el.length || !$el.offset()) {
            return false;
        }
        var docViewTop = $window.scrollTop(),
            docViewBottom = docViewTop + window.innerHeight,
            elemTop = $el.offset().top,
            elemBottom = elemTop + $el.height();

        return elemTop <= docViewBottom;
    }

    $(window).on('scroll', function(e) {
        if (!_buffer) {
            _buffer = setTimeout(function() {
                checkInView(e);
                _buffer = null;
            }, 300);
        }
    });

    function checkInView(e) {
        $.each(_watch, function() {
            if (testIsAboveCurrentViewport(this.element)) {
                if (!this.invp) {
                    this.invp = true;
                    if (this.options.scrolledin)
                        this.options.scrolledin.call(this.element, e);

                    this.element.trigger('scrolledin', e);
                }
            } else if (this.invp) {
                this.invp = false;
                if (this.options.scrolledout)
                    this.options.scrolledout.call(this.element, e);

                this.element.trigger('scrolledout', e);
            }
        });
    }

    function monitor(element, options) {
        var item = {
            element: element,
            options: options,
            invp: false
        };
        _watch.push(item);
        return item;
    }

    function unmonitor(item) {
        for (var i = 0; i < _watch.length; i++) {
            if (_watch[i] === item) {
                _watch.splice(i, 1);
                item.element = null;
                break;
            }
        }
    }
    $.fn.scrolledIntoView = function(options) {
        var options = $.extend({}, {
            scrolledin: null,
            scrolledout: null
        }, options);
        this.each(function() {
            var $el = $(this);
            var instance = $.data(this, 'scrolledIntoView');
            if (instance) {
                instance.options = options;
            } else {
                $.data(this, 'scrolledIntoView', monitor($el, options));
                $el.on('remove', $.proxy(function() {
                    $.removeData(this, pluginName);
                    unmonitor(instance);
                }, this));
            }
        });
        return this;
    }

    function switchSectionNav(navItems, item) {
        navItems.toggleClass('active', false);
        item.toggleClass('active', true);
    }
    var nav = $('nav');
    var navItems = nav.find('li');
    navItems.on('click', function() {
        var sectionIdx = navItems.toArray().indexOf(this);
        if (sectionIdx > -1) {
            window.location.hash = 'section-' + (parseInt(sectionIdx) + 1);
        }
        switchSectionNav(navItems, $(this));
    });
    var sections = $('main h2');

    function checkSectionsInView() {
        var activeSections = [];
        sections.toArray().forEach(function(section) {
            if (testIsAboveCurrentViewport($(section))) {
                activeSections.push(section);
            }
        });
        activeSections.reverse();
        if (activeSections.length > 0) {
            var activeSection = sections.toArray().indexOf(activeSections[0]);
            var section = nav.find('[data-section=' + (activeSection + 1) + ']');
            switchSectionNav(navItems, $(section));
        }
    }
    $(window).on('scroll', throttle(checkSectionsInView, 300));

    sections.each(function() {
        testIsAboveCurrentViewport($(this));
    });
    navItems.first().addClass('active');
    $(window).trigger('scroll');

    function navigateSectionsFromHash() {
        var hash = window.location.hash.match(/section\-([0-9]+)/);
        if (hash.length) {
            var scrollTop = $(sections[parseInt(hash[1]) - 1]).offset().top;
            $('html, body').animate({
                scrollTop: scrollTop
            }, 750);
        }
    }
    if (window.location.hash) {
        navigateSectionsFromHash();
    }
    window.addEventListener("hashchange", navigateSectionsFromHash, false);
    $.fn.parallax = function(options) {
        this.each(function() {
            var img = $(this).find('img');
            var src = img.attr('src');
            $(this).find('.article-inline__body').css('background-image', 'url(' + src + ')');
        });
    }
    $('.inline-parallax').parallax();
};
load();
