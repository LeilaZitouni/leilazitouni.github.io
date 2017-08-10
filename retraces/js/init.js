(function($){
  $(function(){

    // init smooth scroll
    // smoothScroll.init();
    
    $('.scrollspy').scrollSpy();;

    $('.table-of-contents').pushpin({ top: $('#fac').offset() && $('#fac').offset().top });

    $('video').hover(function() {
      $(this).prop("controls", true);
    }, function() {
      $(this).prop("controls", false);
    });

    $('.parallax').parallax();

    // var menu = '\
    // <div class="nav-left visible-xs"> \
    //   <div class="button" id="btn"> \
    //     <div class="bar top"></div> \
    //     <div class="bar middle"></div> \
    //     <div class="bar bottom"></div> \
    //   </div> \
    // </div> \
    // <!-- nav-left --> \
    //     <div class="nav-left hidden-xs"> \
    //       <div class="button" id="btn"> \
    //         <div class="bar top"></div> \
    //         <div class="bar middle"></div> \
    //         <div class="bar bottom"></div> \
    //       </div> \
    //     </div> \
    //     <!-- nav-left --> \
    // <div class="sidebar"> \
    //   <ul class="sidebar-list"> \
    //     <li class="sidebar-item"><a href="index.html" class="sidebar-anchor">Accueil</a></li> \
    //     <li class="sidebar-item"><a href="documentary.html" class="sidebar-anchor">Doc 1</a></li> \
    //     <li class="sidebar-item"><a href="#" class="sidebar-anchor">Doc 2</a></li> \
    //     <li class="sidebar-item"><a href="#" class="sidebar-anchor">Doc 3</a></li> \
    //     <li class="sidebar-item"><a href="#" class="sidebar-anchor">Portraits</a></li> \
    //   </ul> \
    // </div> \
    // ';

    // $('body').append(menu);

    // $(document).ready(function() {

    //   function toggleSidebar() {
    //     $(".button").toggleClass("active");
    //     $(".nav-left.hidden-xs, .sidebar").toggleClass("move-to-right");
    //     $(".sidebar-item").toggleClass("active");
    //   }

    //   $(".button").on("click tap", function() {
    //     toggleSidebar();
    //   });

    //   $(document).keyup(function(e) {
    //     if (e.keyCode === 27) {
    //       toggleSidebar();
    //     }
    //   });

    // });

    $('.toggleOverlay').on('click', function(el){
        $('body').toggleClass('overlay-open');
        var $this = $( this );
        setTimeout(function(){
            $('#overlay-iframe')[0].src = $this.data('src') || '';
        }, 600);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space