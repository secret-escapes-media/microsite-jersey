// general js for the project that wouldn't be a reuseable component


//
//
// function stickContent(){
//   var st = $(window).scrollTop();
//
//   $('.js-stick').each(function(){
//     var content       = $(this).find('.js-stick__content');
//     var contentWidth  = content.width();
//     var contentOffset = content.offset();
//     var wrapperHeight = $(this).height();
//     var start         = $(this).offset().top;
//     var end           = $(this).offset().top + wrapperHeight - content.outerHeight();
//
//     // Inline width for changing position absolute to fixed
//     $(content).width( content.width() );
//
//     if( st > end ){
//       // If scrolled past window
//       $(content).css('left', '0' );
//
//       $(this).removeClass('is-fixed').addClass('is-parked');
//     }else if( st > start ){
//       // If within window
//       $(content).css('left', contentOffset.left );
//       $(this).addClass('is-fixed').removeClass('is-parked');
//     }else{
//       // If before window
//       $(content).css('left', '0' );
//
//       $(this).removeClass('is-fixed').removeClass('is-parked');
//     }
//   });
//
// }
//
// $(window).scroll(function(event){
//   stickContent();
// });