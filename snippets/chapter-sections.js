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
