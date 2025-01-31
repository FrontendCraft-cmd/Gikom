$(document).ready(function () {
  const body = $("body");

  const modal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });

  // Lang
  const lang = $(".header-lang");
  const langBtn = $(".header-lang__title");
  langBtn.click(() => {
    lang.toggleClass("open");
  });
  lang.click(function (e) {
    e.stopPropagation();
  });

  $("body").click(function (e) {
    if (e.target != lang) {
      lang.removeClass("open");
    }
  });

  // Search
  const headerBottom = $(".header-bottom");
  const searchRow = $(".header-search__row");
  const searchOpen = $(".header-search__open");
  const searchClose = $(".header-search__close");
  const searchClear = $(".header-search__clear");
  const searchInput = $(".header-search__input");
  const headerMenu = $(".header-bottom__menu");
  const headerLeft = $(".header-bottom__left");
  const headerBg = $(".header-bg");
  searchOpen.click((e) => {
    searchRow.fadeIn();
    searchClose.fadeIn();
    searchOpen.hide();
    headerMenu.hide();
    headerBottom.addClass("search-open");
    headerBg.addClass("active");
    e.stopPropagation();
    if ($(window).width() <= 1023.98) {
      if (!$(body).hasClass("lock")) {
        $(body).addClass("lock");
      }
    }
  });
  searchClose.click(() => {
    searchRow.hide();
    searchClose.hide();
    searchOpen.fadeIn();
    headerMenu.fadeIn();
    headerBottom.removeClass("search-open");
    headerBg.removeClass("active");
    searchInput.val("");
    if ($(window).width() <= 1023.98) {
      if (!$(body).hasClass("no-delete")) {
        $(body).removeClass("lock");
      }
    }
  });
  headerBg.click(function () {
    searchRow.hide();
    searchClose.hide();
    searchOpen.fadeIn();
    headerMenu.fadeIn();
    headerBottom.removeClass("search-open");
    headerBg.removeClass("active");
    searchInput.val("");
    if ($(window).width() <= 1023.98) {
      $(body).removeClass("lock");
    }
  });
  headerLeft.click((e) => {
    e.stopPropagation();
  });

  searchInput.on({
    focus() {
      searchRow.addClass("focus");
    },
    blur() {
      searchRow.removeClass("focus");
    },
  });

  if (searchInput.val() == "") {
    searchClear.removeClass("active");
  } else {
    searchClear.addClass("active");
  }
  searchInput.on("input", function () {
    if (searchInput.val() == "") {
      searchClear.removeClass("active");
    } else {
      searchClear.addClass("active");
    }
  });
  searchClear.click(() => {
    searchInput.val("");
    searchClear.removeClass("active");
  });

  $("body").click(function (e) {
    if (e.target != headerLeft || e.target != searchOpen) {
      searchRow.hide();
      searchClose.hide();
      searchOpen.fadeIn();
      headerMenu.fadeIn();
      headerBottom.removeClass("search-open");
      searchInput.val("");
      searchClear.removeClass("active");
    }
  });

  // Form
  const formGroup = $(".form-group");
  if (formGroup.length > 0) {
    formGroup.each(function () {
      const thisItem = $(this);
      const input = thisItem.find(".form-control");
      const label = thisItem.find(".control-label");

      if (input.val() != "") {
        label.fadeOut();
      } else {
        label.fadeIn();
      }
      input.on("input", function () {
        if (input.val() != "") {
          label.fadeOut();
        } else {
          label.fadeIn();
        }
      });
      label.click(() => {
        input.focus();
      });
    });
  }

  // Video
  const video = $(".main-block__video video");
  const videoBg = $(".main-block__video img");

  if (video.length > 0 && videoBg.length > 0) {
    video.on("canplay", function () {
      videoBg.fadeOut(1000, function () {
        video.animate({ opacity: 1 }, 1000);
        video[0].play();
      });
    });
  }

  // Numbers
  const nubmers = $(".numbers__value");
  if (nubmers.length > 0) {
    const startCounterAnimation = (element) => {
      const counterElement = $(element);
      const value = +counterElement.data("number");
      const numDigits = value.toString().length;

      counterElement.html(value.toString().padStart(numDigits, "0"));

      const width = counterElement.outerWidth() + 12;
      counterElement.css("width", width + "px");

      anime({
        targets: counterElement[0],
        innerHTML: [0, value],
        round: 1,
        easing: "easeInOutQuad",
        duration: 3000,
        update: function (anim) {
          counterElement.html(
            anim.animations[0].currentValue.toString().padStart(numDigits, "0")
          );
        },
      });
      counterElement.addClass("animated");
    };

    const checkVisibility = () => {
      nubmers.each(function () {
        const element = $(this);
        const rect = element[0].getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight);
        if (isVisible && !element.hasClass("animated")) {
          startCounterAnimation(element);
        }
      });
    };

    checkVisibility();

    $(window).on("scroll", function () {
      checkVisibility();
    });
  }

  // Header fixed
  const header = $(".header");

  let headerHeight = header.outerHeight();
  let heightWindow = $(window).height();
  let topPosition = $(window).scrollTop();
  function fixedHeader(top, heightWindow, headerHeight) {
    if (top > heightWindow) {
      header.addClass("fixed");
      body.css({
        "padding-top": headerHeight,
      });
    } else {
      header.removeClass("fixed");
      body.css({
        "padding-top": 0,
      });
    }
  }
  fixedHeader(topPosition, heightWindow, headerHeight);

  $(window).scroll(function () {
    headerHeight = header.outerHeight();
    heightWindow = $(window).height();
    topPosition = $(window).scrollTop();
    fixedHeader(topPosition, heightWindow, headerHeight);
  });

  // Mobile menu
  const headerBurger = $(".header-burger");
  const headerMobileMenu = $(".header-mobile");
  headerBurger.click(function (e) {
    $(this).toggleClass("active");
    headerMobileMenu.toggleClass("open");
    $(body).toggleClass("lock");
    $(body).toggleClass("no-delete");
    e.preventDefault();
  });

  const arrowHeaderMobileMenu = headerMobileMenu.find("span");
  arrowHeaderMobileMenu.click(function (e) {
    const thisItem = $(this);
    const parent = thisItem.parent("li");
    const list = parent.find("ul");

    parent.toggleClass("active");
    list.slideToggle();
  });

  // Filter
  const filterBlock = $(".bx-filter-block");

  if (filterBlock.length > 0) {
    filterBlock.each(function () {
      const thisItem = $(this);
      const checkbox = thisItem.find(".filter-checkbox");
      const btnMoreOpen = thisItem.find(".bx-filter-more span").first();
      const btnMoreClose = thisItem.find(".bx-filter-more span").last();

      const visibleCheckboxes = checkbox.filter(":not(.show)");

      if (visibleCheckboxes.length <= 4) {
        btnMoreOpen.hide();
        btnMoreClose.hide();
      } else {
        visibleCheckboxes.slice(4).hide();

        btnMoreOpen.click(() => {
          btnMoreOpen.hide();
          btnMoreClose.css({ display: "inline-flex" });
          visibleCheckboxes.css({ display: "inline-flex" });
        });

        btnMoreClose.click(() => {
          btnMoreClose.hide();
          btnMoreOpen.css({ display: "inline-flex" });
          visibleCheckboxes.slice(4).hide();
        });
      }
    });
  }

  // Fancybox
  const options = {
    Thumbs: false,
    Toolbar: {
      display: {
        left: ["infobar"],
        right: ["close"],
      },
    },
  };
  Fancybox.bind("[data-fancybox]", options);

  // Product detail slider
  $(".product-detail-slider").slick({
    asNavFor: ".product-detail-slider-small",
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: { variableWidth: true, arrows: false },
      },
    ],
  });

  $(".product-detail-slider-small").slick({
    vertical: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".product-detail-slider",
    focusOnSelect: true,
    arrows: false,
  });

  // Scroll product detail
  $(".product-detail__all").click(function (e) {
    let offset = $(".header").outerHeight();
    $("body,html").animate(
      { scrollTop: $(".product-detail-content__info").offset().top - offset },
      500,
      function () {}
    );
  });

  // Scroll vacancy detail
  $(".vacancy-detail__buttons .black").click(function (e) {
    let offset = $(".header").outerHeight();
    $("body,html").animate(
      { scrollTop: $(".vacancy-detail-contact").offset().top - offset },
      500,
      function () {}
    );
  });

  // Interested slider
  $(".interested-slider__row").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  });

  // FAQ
  $(".faq__header").click(function () {
    if (!$(".faq").hasClass("no-one")) {
      $(".faq__header").not($(this)).removeClass("active");
      $(".faq__body").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });

  // Sticksy
  let requisites = $(".requisites__info");
  if (requisites.length) {
    let stickyEl = new Sticksy(".requisites__info", {
      topSpacing: $(".header").outerHeight() + 10,
    });
  }

  // Tabs contact
  const contactsTabs = $(".contacts__tabs a");
  const contactsItems = $(".contacts__tab");
  const contactsMap = $(".contacts__map");

  contactsTabs.click(function (e) {
    e.preventDefault();

    const thisItem = $(this);
    const id = thisItem.attr("href").replace("#", "");
    const item = contactsItems.filter(`[data-tab="${id}"]`);
    const itemMap = contactsMap.filter(`[data-tab="${id}"]`);

    contactsTabs.removeClass("active");
    contactsMap.hide();
    contactsItems.hide();
    thisItem.addClass("active");
    item.fadeIn();
    itemMap.fadeIn();
  });

  // Textarea
  const textarea = $(".form-group.textarea");

  if (textarea.length > 0) {
    textarea.each(function () {
      const thisItem = $(this).find("textarea");
      const countCurrent = $(this).find(".count__current");
      const countMax = $(this).find(".count__max");
      const max = thisItem.attr("maxlength");

      countMax.text(max);
      thisItem.bind("input", function () {
        countCurrent.html(thisItem.val().length);
      });
    });
  }

  // Set height cards
  const productItem = $(".product-item");
  if (productItem.length > 0) {
    function setHeightCards() {
      if ($(window).width() >= 1023.98) {
        productItem.each(function () {
          const thisItem = $(this);
          const height = thisItem.outerHeight();
          thisItem.css({ "max-height": height });
          thisItem.css({ height: height });
        });
      }
    }
    setHeightCards();
    $(window).resize(setHeightCards);
  }

  // Filter open
  $(".catalog-section__open").click(function () {
    $("body").addClass("lock");
    $(".catalog-section__filter").addClass("open");
  });
  $(".bx-filter-close").click(function () {
    $("body").removeClass("lock");
    $(".catalog-section__filter").removeClass("open");
  });

  // Expand content
  const btnOpenContent = $(
    ".product-detail-content__btn[data-block='content']"
  );

  btnOpenContent.click(function () {
    const content = $(".product-detail-content .content");
    const contentHeight = content[0].scrollHeight;
    const maxHeight = 155;
    const text = $(this).find("span");

    if (content.hasClass("open")) {
      content.removeClass("open").css("max-height", maxHeight);
      text.first().show();
      text.last().hide();
    } else {
      content.addClass("open").css("max-height", contentHeight);
      text.first().hide();
      text.last().show();
    }
  });

  const btnOpenList = $(".product-detail-content__btn[data-block='list']");
  btnOpenList.click(function () {
    const content = $(".product-detail-content__list");
    const contentHeight = content[0].scrollHeight;
    const maxHeight = 170;
    const text = $(this).find("span");

    if (content.hasClass("open")) {
      content.removeClass("open").css("max-height", maxHeight);
      text.first().show();
      text.last().hide();
    } else {
      content.addClass("open").css("max-height", contentHeight);
      text.first().hide();
      text.last().show();
    }
  });

  // About-history
  const aboutHistory = $(".about-history__row");
  const aboutHistoryItems = $(".about-history__item");

  if (
    aboutHistoryItems.length > 0 &&
    aboutHistoryItems.length % 3 == 0 &&
    $(window).width() > 1024
  ) {
    aboutHistory.addClass("net");
    aboutHistoryItems.each(function (index) {
      const row = Math.floor(index / 3);
      const posInRow = index % 3;

      if (row % 2 !== 0 && posInRow === 0) {
        $(this).addClass("shift");
      }
    });
  }

  // Map
  const triggerScrollMap = $(".about-map");
  const mapItem = $(".about-map__row .map path");
  const mapPoint = $(".about-map__row .point");

  let tl = gsap.timeline();

  if (mapItem.length) {
    timeLine();
  }

  function timeLine() {
    tl.fromTo(
      mapItem,
      { opacity: 0, scale: 0, transformOrigin: "center center" },
      { opacity: 1, scale: 1, duration: 1 }
    );
    tl.fromTo(
      mapPoint,
      {
        opacity: 0,
        y: -30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "bounce.out",
      },
      "+=0.1"
    );
  }

  ScrollTrigger.create({
    animation: tl,
    trigger: triggerScrollMap,
    start: "top 500",
    end: "bottom top",
  });

  mapPoint.each(function () {
    const thisItem = $(this);
    const point = thisItem.data("point");
    const hint = $(`.about-map__hint[data-hint="${point}"]`);
    const x = parseFloat(thisItem.attr("x"));
    const y = parseFloat(thisItem.attr("y"));

    thisItem.hover(
      function () {
        hint.css({
          top: `${y - 25}px`,
          left: `${x + 54}px`,
          opacity: 1,
          visibility: "visible",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        });
        thisItem.appendTo(thisItem.parent());

        const bbox = thisItem[0].getBBox();
        const width = bbox.width;
        const height = bbox.height;

        const centerX = bbox.x + width / 2;
        const centerY = bbox.y + height / 2;

        thisItem.css({
          transform: `scale(2)`,
          "transform-origin": `${centerX}px ${centerY}px`,
          transition: "transform 0.3s ease-in-out",
        });
      },
      function () {
        if (!hint.is(":hover")) {
          hint.css({
            opacity: 0,
            visibility: "hidden",
          });

          thisItem.css({
            transform: "scale(1)",
            transition: "transform 0.3s ease-in-out",
          });
        }
      }
    );

    hint.hover(
      function () {},
      function () {
        if (!thisItem.is(":hover")) {
          hint.css({
            opacity: 0,
            visibility: "hidden",
          });

          thisItem.css({
            transform: "scale(1)",
            transition: "transform 0.3s ease-in-out",
          });
        }
      }
    );
  });

  const mapTabs = $(".about-map__items a");

  mapTabs.each(function () {
    const thisItem = $(this);

    thisItem.click(function (e) {
      if (!thisItem.hasClass("active")) {
        const href = thisItem.attr("href").replace("#", "");
        const items = $(".about-map__row").find(`.${href}`);

        $(".about-map__row .point").each(function () {
          const point = $(this);
          if (!point.hasClass(href) && href != "all") {
            point.fadeOut();
          }
        });

        if (href != "all") {
          items.fadeIn();
        } else {
          $(".about-map__row .point").fadeIn();
        }
        mapTabs.removeClass("active");
        thisItem.addClass("active");
      }
      e.preventDefault();
    });
  });

  // Poject completed
  const sliderPojectCompleted = $(".project-completed__slider");

  sliderPojectCompleted.slick({
    infinite: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767.98,
        settings: { variableWidth: true, slidesToShow: 1 },
      },
      {
        breakpoint: 641,
        settings: {
          arrows: false,
          variableWidth: true,
          slidesToShow: 1,
        },
      },
    ],
  });

  let activeFiltersProjectSlider = [];

  function animateSlideIn($slide) {
    $slide.css({
      opacity: 0,
      transition: "none",
    });

    requestAnimationFrame(() => {
      $slide.css({
        transition: "opacity 0.5s ease",
        opacity: 1,
      });
    });
  }

  function applyFilters() {
    sliderPojectCompleted.slick("slickUnfilter");

    if (activeFiltersProjectSlider.length > 0) {
      sliderPojectCompleted.slick("slickFilter", function () {
        const groups = $(this).data("groups");
        const matches = activeFiltersProjectSlider.some((filter) =>
          groups.includes(filter)
        );

        if (matches) {
          animateSlideIn($(this));
        }

        $(this).toggleClass("show", matches);
        return matches;
      });
    } else {
      const slides = sliderPojectCompleted.find(".project-completed__slide");
      slides.addClass("show");
      slides.each(function () {
        animateSlideIn($(this));
      });
    }

    sliderPojectCompleted.slick("slickGoTo", 0, true);
  }

  $(".project-completed__filter li a").on("click", function (e) {
    e.preventDefault();

    const group = $(this).data("group");

    const index = activeFiltersProjectSlider.indexOf(group);
    if (index === -1) {
      activeFiltersProjectSlider.push(group);
      $(this).addClass("active");
    } else {
      activeFiltersProjectSlider.splice(index, 1);
      $(this).removeClass("active");
    }

    applyFilters();
  });

  $(".project-detail__images").slick({
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 641,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 501,
        settings: {
          variableWidth: true,
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".service-detail__slider").slick({
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 641,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 501,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  function setEqualHeightForRow() {
    $(".vacancy-open__row").each(function () {
      let currentRow = $(this);

      let wrappers = currentRow.find(".vacancy-open__wrapper");

      wrappers.each(function (index) {
        if (index % 2 === 0) {
          let currentWrapper = $(this);
          let nextWrapper = wrappers.eq(index + 1);

          if (nextWrapper.length) {
            let maxHeight = Math.max(
              currentWrapper.outerHeight(),
              nextWrapper.outerHeight()
            );
            currentWrapper.height(maxHeight);
            nextWrapper.height(maxHeight);
          }
        }
      });
    });
  }

  setEqualHeightForRow();

  $(window).resize(function () {
    if ($(window).width() >= 850) {
      setEqualHeightForRow();
    }
  });

  const vacancyOpen = $(".vacancy-open__row");

  if (vacancyOpen.length > 0) {
    const mixer = mixitup(".vacancy-open__row", {
      selectors: {
        target: ".vacancy-open__wrapper",
      },
    });

    $(".vacancy-open__filter a").on("click", function (e) {
      e.preventDefault();

      const filterValue = $(this).attr("data-filter");

      if ($(this).hasClass("active")) {
        mixer.filter("all");
        $(".vacancy-open__filter a").removeClass("active");
      } else {
        $(".vacancy-open__filter a").removeClass("active");
        $(this).addClass("active");
        mixer.filter(filterValue);
      }
    });
  }

  const newsDetailSlideShow = $(".news-detail__slide").length > 1 ? 2 : 1;

  $(".news-detail__slider").slick({
    slidesToShow: newsDetailSlideShow,
    responsive: [
      {
        breakpoint: 501,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
