////////////////////////////////////////////////////////////////////////////////
//      Sticky microsite nav
////////////////////////////////////////////////////////////////////////////////

// elements and classes
var stickyNavClass     = '.js-sticky-nav';
var stickyNavContainer = '.banner';
var stickyNavModifier  = 'is-stuck';

function stickyNav(){

  var scrollTop = $(document).scrollTop();
  var nav       = $(stickyNavClass);
  var navHeight = nav.outerHeight();
  var distance  = $(stickyNavContainer).outerHeight() - navHeight;

  if( scrollTop > distance ){
    nav.addClass(stickyNavModifier);
  }else{
    nav.removeClass(stickyNavModifier);
  }
}

// runs on page load and scroll
stickyNav();
$(document).scroll(function(){ stickyNav(); });


