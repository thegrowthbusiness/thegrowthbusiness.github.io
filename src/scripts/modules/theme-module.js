AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////

  /**
   *
   * @param {function} func
   * @param {number} wait
   * @param {boolean} immediate
   */
  var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var _swiper = function () {
    // private stuff

    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      loop: true,
      // spaceBetween: 10,
      // centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1
        },

        778: {
          slidesPerView: 2
        },

        1150: {
          slidesPerView: 3
        },
        // when window width is >= 640px
        1330: {
          slidesPerView: 4
        }
      }
    });
  };

  var _toggleCheck = function () {
    // $(".checkbox-item").on("click", function () {
    //   var toggleCheck = $(this).find(".js-toggle-check");
    //   toggleCheck.toggleClass("show");

    //   if ($(".js-toggle-check").hasClass("show")) {
    //     $(".btn").removeClass("disabled");
    //   } else {
    //     $(".btn").addClass("disabled");
    //   }
    // });

    $(".toggle-check").on("change", function () {
      if ($('.toggle-check:checked').length > 0) {
        $('.btn').removeClass("disabled");
      } else {
        $('.btn').addClass("disabled");
      }
    });
  };

  var _toggleChoice = function () {
    // $(".choice-items").on("click", function () {
    //   var toggleCheck = $(this);
    //   toggleCheck.toggleClass("show");

    //   if ($(".choice-items").hasClass("show")) {
    //     $(".btn").removeClass("disabled");
    //   } else {
    //     $(".btn").addClass("disabled");
    //   }
    // });
    $('.toggle-choice').on('change', function () {
      if ($('.toggle-choice:checked').length > 0) {
        $('.btn').removeClass('disabled');
      } else {
        $('.btn').addClass('disabled');
      }
    });
  };

  /**
   * Makes Header **fixed** `when` the user scrolled down
   */
  var _fixedHeader = function () {
    $(window).on('scroll load', function () {
      if ($(window).scrollTop() >= 1) {
        $('.header').addClass('header-fixed');
      } else {
        $('.header').removeClass('header-fixed');
      }
    });
  };

  /**
   * Alternative for position: sticky in CSS
   */
  var _elementSticky = function () {
    var stickyTop = $('.section-navbar').offset().top;

    $(window).on('scroll load', function () {
      console.log(stickyTop);
      console.log($('.section-navbar').offset().top);

      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        $('.section-navbar').addClass('navbar-fixed');
        $('.section-question').addClass('padding-top');
      } else {
        $('.section-navbar').removeClass('navbar-fixed');
        $('.section-question').removeClass('padding-top');
      }
    });
  }

  var _accordionToggle = function () {
    $('.collapse')
      .on('show.bs.collapse', function () {
        $(this)
          .parent()
          .find('.arrow-icon')
          .addClass('rotate');
      })
      .on('hide.bs.collapse', function () {
        $(this)
          .parent()
          .find('.arrow-icon')
          .removeClass('rotate');
      });
  };

  var _countdownTimer = function () {
    var enrollmentInput = 'Feb 10, 2020 12:52:43';
    var enrollmentExpirationDate = new Date(enrollmentInput).getTime();

    var time = setInterval(function () {
      var today = new Date().getTime();
      var distance = enrollmentExpirationDate - today;

      // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("time").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(time);
        document.getElementById("time").innerHTML = "Expired";
      }
    }, 1000);
  }

  /////////////////////
  // Public Methods //
  ///////////////////
  var init = function () {
    _swiper();
    _toggleCheck();
    _toggleChoice();
    _fixedHeader();
    _elementSticky();
    _accordionToggle();
    if ($('#time')[0]) {
      _countdownTimer();
    }
  };

  return {
    init: init
  };
})();
