var pageCache = {};

var currentPage = null;
var pages = [
    'main',
    'structure',
    'montage',
    'communication',
    'tournage'
]

function initIncludes(pageName) {
    w3.includeHTML(function(){
        // load lazy loaded elements
        checkLazyElements();

        // load parallax elements
        initParallaxElements();

        // update the headline element
        updateNavigationHeader(pageName);

        // save the loaded page to cache
        pageCache[pageName] = $('#content').html();

        $('body').attr('page', pageName);
    });
}

function loadPage(pageName) {
    if(pageCache[pageName]) {
        $('#content').html(pageCache[pageName]);
    } else {
        $('#content').attr("w3-include-html", "./page/" + pageName + '.html');
    }
    initIncludes(pageName);
    currentPage = pages.indexOf(pageName);
}

function navigateToPageInUrl(e) {
    var re = /[?&]page=([^&?]+)/;
    var pageQuery = re.exec(window.location.search);
    var pageName = pageQuery ? pageQuery[1] : pages[0];

    window.history.replaceState({}, pageName, "?page=" + pageName);
    loadPage(pageName);
}

function gotoPrevPage() {
    gotoPage(currentPage - 1);
}

function gotoNextPage() {
    gotoPage(currentPage + 1);
}

function gotoPageName(pageName) {
    gotoPage(pages.indexOf(pageName));
}

function gotoPage(futurePage) {
    if(futurePage == pages.length) { futurePage = 0; }
    if(futurePage < 0) { futurePage = pages.length -1; }

    var pageName = pages[futurePage];

    window.history.pushState({}, pageName, "?page=" + pageName);
    window.scrollTo(0,0);
    loadPage(pageName);
}

function updateNavigationHeader(pageName) {
    $('input[page="' + pageName + '"]').prop('checked', true);
}

function initParallaxElements() {
    if(!isMobile()){
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
        if(window.location.search.indexOf('page=' + pageName) < 0){
            gotoPageName(pageName);
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


    // handle swipe in mobile
    if(isMobile()){
        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;                                                        
        var yDown = null;                                                        

        function handleTouchStart(evt) {          
            xDown = evt.touches[0].clientX;                                      
            yDown = evt.touches[0].clientY;                                      
        };                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */ 
                    gotoNextPage();
                } else {
                    /* right swipe */
                    gotoPrevPage();
                }                       
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                    console.log('up swipe');
                } else { 
                    /* down swipe */
                    console.log('down swipe');
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        };
    }
}

init();