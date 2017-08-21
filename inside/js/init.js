function loadPage(pageName) {
    $('#content').attr("w3-include-html", "./page/" + pageName + '.html');
    w3.includeHTML(function() {
        // load lazy loaded elements
        checkLazyElements();

        // load parallax elements
        initParallaxElements();

        $('body').attr('current-page', pageName);

        initYTPlayer();
    });
}

function navigateToPageInUrl(e) {
    var re = /[?&]page=([^&?]+)/;
    var pageQuery = re.exec(window.location.search);
    var pageName = pageQuery ? pageQuery[1] : 'main';

    window.history.replaceState({}, pageName, "?page=" + pageName);
    loadPage(pageName);
}

function gotoPage(pageName) {
    window.history.pushState({}, pageName, "?page=" + pageName);
    window.scrollTo(0, 0);
    loadPage(pageName);
}

function initParallaxElements() {
    if (!isMobile()) {
        $('.parallax').parallax();
    }
}

function isMobile() {
    return screen.width < 600;
}

function init() {
    window.onpopstate = navigateToPageInUrl;
    navigateToPageInUrl();

    $('body').on("click", "[page]", function() {
        var pageName = this.getAttribute("page");
        if (window.location.search.indexOf('page=' + pageName) < 0) {
            gotoPage(pageName);
        }
    });

    $('body').on("click", "[toggle]", function() {
        var klass = this.getAttribute('toggle');
        var target = this.getAttribute('target') || 'body';

        $(target).toggleClass(klass);
    });

    $('body').on("click", "[lazy-iframe]", function() {
        var iframe = $('<iframe  width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        iframe.attr('src', this.getAttribute('lazy-iframe'));
        this.removeAttribute('lazy-iframe');
        $(this).html(iframe);
    });
}

init();