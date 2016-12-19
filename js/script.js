(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__link--' + currentPage).addClass('site-nav__link--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Parallax
//      [ example: <div class="parallax" data-parallax-speed="0.2"> ]
///////////////////////////////////////

function parallax_background(){
  var scrolled = $(document).scrollTop();

  $('.parallax').each(function(){
    var speed = $(this).attr('data-parallax-speed');
    var offset = $(this).offset();
    var parallax = -(scrolled - offset.top) * speed ;
    $(this).css('background-position', 'center ' + parallax + 'px');
  });
}

function bannerfade(){
	var st = $(document).scrollTop();
	var wh = $(window).height();

	$('.banner__content').css({
		"opacity": ((wh - (st*2)) / wh),
		"letter-spacing": st/100
	});
}

$(document).scroll(function() {
  parallax_background();
	bannerfade();
});


///////////////////////////////////////
//    Generic modal
///////////////////////////////////////

  var modal               = $('.js-modal'),
      modalLaunchBtn      = $('.js-open-modal'),
      modalCloseBtn       = $('.js-close-modal'),
      modalContent        = modal.find('.modal__content');

    // opens modal
    function modalOpen(event){
      event.preventDefault();
      // disable scrolling on background content (doesn't work iOS)
      $('body').addClass('disable-scroll');
      // // open modal
      modal.fadeIn('250', function(){
        $(this).removeClass('is-closed').addClass('is-open');
      });
    }

    // closes modal
    function modalClose(event){
      event.preventDefault();
      // enable scrolling
      $('body').removeClass('disable-scroll');
      // close modal with fade
      modal.fadeOut('250', function(){
        $(this).removeClass('is-open').addClass('is-closed');
        modalContent.empty();
      });
    }

    // creates video & launches modal when offer is clicked
    modalLaunchBtn.on('click', function(event) {
      var clicked   = $(this),
          videoId   = clicked.data('video-id'),
          videoCode = '<div class="video__center"><div class="video"><iframe class="video__iframe" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;showinfo=0&autoplay=1" frameborder="0"></iframe></div></div>';
      modalContent.html(videoCode);
      modalOpen(event);
    });

    // closes modal on close icon click
    modalCloseBtn.on('click', function(event) {
      var clicked  = $(this);
      modalClose(event);
    });




///////////////////////////////////////
//      Category tabs
///////////////////////////////////////

  $('.category__link').click(function(event){
    var category = $(this).attr('data-category');

    if($(this).hasClass('category__link--active')){
    }else{
      $('.category-tabs__links').find('.category__link--active').removeClass('category__link--active');
      $(this).addClass('category__link--active');
    }

    $('.category-tabs__content')
      .find('.category__content.category__content--active')
      .removeClass('category__content--active');

    $('.category-tabs__content')
      .find('[data-category="' + category + '"]')
      .addClass('category__content--active');

  });


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end