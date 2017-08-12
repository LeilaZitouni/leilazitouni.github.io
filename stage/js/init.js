function initIncludes() {
    w3.includeHTML(function(){
      checkLazyElements();
    });
}

function gotoPage(pageName) {
    window.history.replaceState({}, pageName, "?page=" + pageName);
    $('#content').attr("w3-include-html", "./page/" + pageName + '.html');
    initIncludes();
}

function navigateToPageInUrl() {
    var re = /[?&]page=([^&?]+)/;
    var pageQuery = re.exec(window.location.search);
    var pageName = pageQuery ? pageQuery[1] : 'main';
    gotoPage(pageName);
}

function init() {
    navigateToPageInUrl();
    window.onpopstate = navigateToPageInUrl;

    $('body').on("click", "[page]", function() {
        var pageName = this.getAttribute("page");
        if(window.location.search.indexOf('page=' + pageName) < 0){
            gotoPage(pageName);
        }
    });

    $('body').on("click", "[toggle]", function() {
        var $this = $(this);
        var klass = $this.attr('toggle');
        var target = $this.attr('target') || 'body';

        $(target).toggleClass(klass);
    });
}

init();