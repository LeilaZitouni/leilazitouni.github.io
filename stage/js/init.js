function initIncludes() {
    w3.includeHTML(function(){
      $('body').domi();
      checkLazyElements();
    });
}

$('body').on("click", "[page]", function() {
    $('#content').attr("w3-include-html", "./page/" + this.getAttribute("page") + '.html');
    initIncludes();
});

initIncludes();
