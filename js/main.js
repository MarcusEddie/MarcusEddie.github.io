$(document).ready(function() {
  var flag = true;
  if (flag && !$('.panel-cover').hasClass('panel-cover--collapsed')) {
    disableDefaultEvent();
  }

  $('a.blog-button').click(function() {
    console.log("to blog");
    flag = false;
    enableDefaultEvent();
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    currentWidth = $('.panel-cover').width();
    $('.panel-cover').addClass('animated panel-cover--collapsed slideInLeft');
    $('.content-wrapper').addClass('animated slideInLeft');
  });

  if (window.location.hash && window.location.hash == "#blog") {
    flag = false;
    enableDefaultEvent();
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  if (window.location.pathname != "/") {       // if hexo in subdir of site, should change this line
    flag = false;
    enableDefaultEvent();
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu').click(function() {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    // $('.navigation-wrapper').toggleClass('visible');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

  function disableDefaultEvent() {
    var supportsPassive = false;
    //Firefox只识别DOMMouseScroll
    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel";
    try {
      //判断是否是IE
      if (document.attachEvent) {
        document.attachEvent("on" + mousewheelevt, defaultEventIE);
        document.attachEvent("onkeypress", defaultEventOnKeyDown);
      } else if (document.addEventListener) {
        //FireFox(DOMMouseScroll)、Chrome、Opera、safari
        document.addEventListener(mousewheelevt, defaultEventNonIE, {
          get passive() {
            supportsPassive = true;
            return false;
          }
        });
      } else {
        element["on" + mousewheelevt] = defaultEventIE;
      }
      document.onkeydown = defaultEventOnKeyDown;
    } catch(err) {}
  }

  function enableDefaultEvent() {
    //Firefox只识别DOMMouseScroll
    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel";
    //判断是否是IE
    if (document.detachEvent) {
      document.detachEvent("on"+mousewheelevt, defaultEventIE);
    } else if (document.removeEventListener) {
      //FireFox(DOMMouseScroll)、Chrome、Opera、safari
      document.removeEventListener(mousewheelevt, defaultEventNonIE, false);
    } else {
      element["on" + mousewheelevt] = null;
    }
    document.onkeydown = null;
  }

  function defaultEventIE(e){
    e.preventDefault();
  }

  function defaultEventNonIE(e) {
    e=e || window.event;
    if(e.detail){//Firefox
      e.preventDefault();
    } else if(e.wheelDelta){
      e.preventDefault();
    }
  }

  function defaultEventOnKeyDown(event) {
    e = event ? event :(window.event ? window.event : null);
    var currKey=0;
    currKey=e.keyCode||e.which||e.charCode;
    // 38 - arrow up, 40 - arrow down, 33 -page up, 34 - page down
    if(currKey==38 || currKey==40 || currKey==33 || currKey==34){
      return false;
    }
  }
});
