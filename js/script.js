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
  $('.' + currentPage + ' .site-nav__item--' + currentPage).addClass('site-nav__item--current');


///////////////////////////////////////
//    Sticky header
///////////////////////////////////////

$(window).scroll(function(){
  var st = $(document).scrollTop();
  var bannerH = $('.banner').outerHeight();
  var navH = $('.banner__nav').outerHeight();
  var offset = bannerH - navH;
  if (st > offset){
    $('.banner__nav').addClass('is-stuck');
  } else {
    $('.banner__nav').removeClass('is-stuck');
  }
});


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
//    POIs modal
///////////////////////////////////////

  var modal              = $('.js-modal'),
      modalLaunchBtn     = $('.js-open-modal'),
      modalCloseBtn      = $('.js-close-modal'),
      modalContent       = $('.modal__content'),
      activeModalContent = $('.modal__content.is-open');

    // opens modal with specific content
    function modalOpen(event, modalId){
      event.preventDefault();
      // hides all modal content
      modalContent.hide();
      // finds specific modal content
      var activeModalClass = '.modal__content--' + modalId;
      // builds an autoplaying youtube video
      if ($(activeModalClass).hasClass('modal__video')) {
        var videoId = $(activeModalClass).data('youtube-id'),
            videoCode = '<div class="video__wrap"><div class="video"><iframe class="video__iframe" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div></div>';
        $(activeModalClass).html(videoCode);
      }
      // show content
      $(activeModalClass).show(function() {
        // disable scrolling on background content (doesn't work iOS)
        $('body').addClass('disable-scroll');
        // open modal
        modal.fadeIn('250');
      });
    }

    // closes modal and hides all content
    function modalClose(event){
      event.preventDefault();
      // enable scrolling
      $('body').removeClass('disable-scroll');
      // reset scroll position
      // This is a bit hacky, but visually hides the scroll position resetting
      setTimeout(function() {
        $('.modal__content-wrap').scrollTop(0);
      }, 280);
      // close modal with fade
      modal.fadeOut('250', function(){
        modal.removeClass('is-open').addClass('is-closed');
        $('.modal__video').empty();
      });
    }

    // launches modal when offer is clicked
    modalLaunchBtn.on('click', function(event) {
      var contentId = $(this).data('modal-id');
      modalOpen(event, contentId);
    });

    // closes modal on close icon click
    modalCloseBtn.on('click', function(event) {
      modalClose(event);
    });

    // closes modal on background click
    modal.on('click', function(event) {
      if (event.target !== this){
        return;
      }
      modalClose(event);
    });

    // closes modal on escape key press
    $(document).keyup(function(event) {
       if (event.keyCode == 27) {
         modalClose(event);
        }
    });


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end