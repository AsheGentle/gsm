$(function() {
    // Каталог dropdown
    let $dropdown = $(".catalog-dropdown");
    let $dropdownToggle = $(".catalog-toggle");
    let $items = $(".catalog-dropdown__item");
    let $navs = $(".catalog-dropdown__nav");
    let $search = $(".search");
    let $dropdownFirstPlace = $(".catalog-dropdown");

    $(document).on("click", ".catalog-toggle", function(e) {
        e.preventDefault();
        $dropdown.toggleClass("open");
        $dropdownToggle.toggleClass("toggle");
    });

    // Переключение пунктов меню по hover/click
    function activateNavByKey(key) {
        $items.removeClass("active");
        $items.filter('[data-nav="' + key + '"]').addClass("active");
        $navs.removeClass("active");
        $navs.filter('[data-nav="' + key + '"]').addClass("active");
    }

    // На больших экранах - только hover
    $items.on("mouseenter", function() {
        if ($(window).width() > 1040) {
            let key = $(this).data("nav");
            activateNavByKey(key);
        }
    });

    // На маленьких экранах - клик
    $items.on("click", function(e) {
        if ($(window).width() <= 1040) {
            e.preventDefault();
            let key = $(this).data("nav");
            activateNavByKey(key);
            $("body").addClass("open-subcatalog");
        }
    });

    $(document).on("click", function(e) {
        if (!$(e.target).closest("header").length) {
            $dropdown.removeClass("open");
        }
    });

    $(document).on("keydown", function(e) {
        if (e.key === "Escape") {
            $dropdown.removeClass("open");
        }
    });

    // Фиксирование шапки
    let $fixedRow = $("header");
    let $paddingRow = $("main");
    let fixedHeight = $fixedRow.outerHeight();
    let lastScrollTop = 0;

    function moveDropdownToSearch() {
        if ($dropdown.length && $search.length && !$dropdownToggle.parent().is($search)) {
            $dropdownToggle.prependTo($search);
        }
    }

    function restoreDropdownPosition() {
        if ($dropdown.length && !$dropdownToggle.parent().is($dropdownFirstPlace)) {
            $dropdownToggle.prependTo($dropdownFirstPlace);
        }
    }

    function toggleFixedHeader() {
        let windowWidth = $(window).width();
        let scrollTop = $(window).scrollTop();
        let shouldFix;
        let shouldHide = false;

        if (windowWidth <= 1040) {
            // На экранах < 1040: шапка фиксирована + transform для плавного появления при прокрутке вверх
            if ($("body").hasClass("open-menu")) {
                shouldFix = false;
            } else if (scrollTop <= fixedHeight) {
                shouldFix = false;
            } else {
                shouldFix = true;
                shouldHide = scrollTop >= lastScrollTop; // прокрутка вниз — скрыть
            }
            lastScrollTop = scrollTop;
        } else {
            shouldFix = scrollTop >= fixedHeight;
            lastScrollTop = scrollTop;
        }

        $fixedRow.toggleClass("fixed", shouldFix);
        $fixedRow.toggleClass("header--hidden", shouldHide);
        let needPadding = shouldFix;
        $paddingRow.css("padding-top", needPadding ? fixedHeight : 0);

        if (shouldFix) {
            moveDropdownToSearch();
        } else {
            restoreDropdownPosition();
        }
    }

    $(window).scroll(toggleFixedHeader);
    $(window).on("resize", toggleFixedHeader);
    toggleFixedHeader();


    if ($(".showcase-slider").length > 0) {
        $(".showcase-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            variableWidth: true
        });
    }

    if ($(".products-new-slider").length > 0) {
        $(".products-new-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1041,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }

    if ($(".products-slider").length > 0) {
        $(".products-slider").slick({
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 5,
            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 1,
                        arrows: false
                    }
                }
            ]
        });
    }

    if ($(".products-another-slider").length > 0) {
        $(".products-another-slider").slick({
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 1,
                        arrows: false
                    }
                }
            ]
        });
    }

    if ($(".brands-slider").length > 0) {
        $(".brands-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            variableWidth: true
        });
    }

    if ($(".reviews-slider").length > 0) {
        $(".reviews-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 5,
            responsive: [
                {
                    breakpoint: 1441,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($(".news-item-slider").length > 0) {
        $(".news-item-slider").slick({
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 1
        });
    }

    if ($(".news-slider").length > 0) {
        $(".news-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1041,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($(".product__slider").length > 0) {
        $(".product__slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1
        });
    }

    if ($(".news-tags--scroll").length > 0) {
        $(".news-tags--scroll").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            touchThreshold: 200,
            variableWidth: true
        });
    }

    if ($(".address-item__gallery").length > 0) {
        $(".address-item__gallery").slick({
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1041,
                    settings: {
                        arrows: false,
                        variableWidth: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($(".actions-slider").length > 0) {
        $(".actions-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1041,
                    settings: {
                        arrows: false,
                        variableWidth: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($(".credit-slider").length > 0) {
        $(".credit-slider").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            variableWidth: true
        });
    }

    if ($(".about-delivery").length > 0) {
        $(".about-delivery").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            variableWidth: true
        });
    }

    if ($(".about-history").length > 0) {
        $(".about-history").slick({
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            variableWidth: true
        });
    }


    // Переключение слайдов при наведении на product__hover-item
    $(".product__hover-item").on("mouseenter", function() {
        let $hoverItem = $(this);
        let $productImage = $hoverItem.closest(".product__image");
        let $slider = $productImage.find(".product__slider");
        let slideIndex = parseInt($hoverItem.data("key"));

        if ($slider.data("resetTimer")) {
            clearTimeout($slider.data("resetTimer"));
        }

        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("slickGoTo", slideIndex);
        }
    });

    // Возврат к первому слайду при уходе курсора с области товара
    $(".product__image").on("mouseleave", function() {
        let $productImage = $(this);
        let $slider = $productImage.find(".product__slider");

        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("slickGoTo", 0);
        }
    });

    // Альтернативный способ - возврат к первому слайду с задержкой при уходе с hover-элементов
    $(".product__hover-item").on("mouseleave", function() {
        let $hoverItem = $(this);
        let $productImage = $hoverItem.closest(".product__image");
        let $slider = $productImage.find(".product__slider");

        if ($slider.hasClass("slick-initialized")) {
            let timer = setTimeout(function() {
                $slider.slick("slickGoTo", 0);
            }, 500);

            $slider.data("resetTimer", timer);
        }
    });

    // Функция для получения ширины скроллбара
    function getScrollbarWidth() {
        if (document.body.offsetHeight - window.innerHeight > 0) {
            let outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.overflow = "scroll";
            outer.style.msOverflowStyle = "scrollbar";
            document.body.appendChild(outer);

            let inner = document.createElement("div");
            outer.appendChild(inner);
            let width = outer.offsetWidth - inner.offsetWidth;
            outer.parentNode.removeChild(outer);
            return width;
        }
        return 0;
    }

    let scrollWidth = getScrollbarWidth();

    $(window).on("resize", function() {
        scrollWidth = getScrollbarWidth();
    });


    // Модалки
    $("[data-modal]").on("click", function() {
        let modalId = $(this).data("modal");
        $(".modal").removeClass("open");
        $(modalId).addClass("open");
        $("body").addClass("overflow").css("padding-right", scrollWidth);
        if ($fixedRow.hasClass("fixed")) {
            $fixedRow.css("padding-right", scrollWidth);
        }
    });

    $(".modal__close, .modal").on("click", function(e) {
        if (e.target === this || $(e.target).hasClass("modal__close")) {
            $(this).closest(".modal").removeClass("open");
            $("body").removeClass("overflow").css("padding-right", 0);
            $fixedRow.css("padding-right", 0);
        }
    });


    $(".footer-column__title").on("click", function() {
        $(this).parents(".footer-column").toggleClass("open");
    });


    $(".header-phone").on("click", function(e) {
        e.stopPropagation();
        let $toggler = $(this);
        let $contacts = $(".header-contacts");
        if (!$contacts.length) return;
        if ($(window).width() > 1040) return;

        if (!$toggler.hasClass("open")) {
            e.preventDefault();
            $toggler.addClass("open");
            $contacts.addClass("open");
        } else if ($(e.target).is("a")) {
            $toggler.removeClass("open");
            $contacts.removeClass("open");
        }
    });

    $(document).on("click", function(e) {
        let $toggler = $(".header-phone");
        let $contacts = $(".header-contacts");
        if (!$toggler.length || !$contacts.length) return;
        if ($(window).width() > 1040) return;
        if (!$toggler.hasClass("open")) return;
        if ($(e.target).closest(".header-phone, .header-contacts").length) return;

        $toggler.removeClass("open");
        $contacts.removeClass("open");
    });


    $(".nav-toggle").on("click", function() {
        $("body").toggleClass("open-menu");
    });


    $(".header-city__selected").on("click", function() {
        $("body").addClass("open-city");
    });


    $(".header-city__back").on("click", function() {
        $("body").removeClass("open-city");
    });


    $(".catalog-btn-mobile").on("click", function() {
        $("body").addClass("open-catalog");
    });


    $(".catalog-dropdown__back").on("click", function() {
        $("body").removeClass("open-catalog");
    });


    $(".catalog-dropdown__title").on("click", function() {
        $("body").removeClass("open-subcatalog");
    });


    $(".panel__item--catalog").on("click", function() {
        $("body").addClass("open-menu open-catalog");
    });


    $(".filter__subtitle").on("click", function() {
        $(this).parent(".filter__subblock").toggleClass("active");
    });


    $(".filter-toggle").on("click", function() {
        $("body").addClass("open-filter");
    });


    $(".filter-close").on("click", function() {
        $("body").removeClass("open-filter");
    });


    $(".filter__more").on("click", function() {
        let $block = $(this).parent(".filter__block");
        let $dropdown = $(this).parent(".filter__dropdown");
        let $selections = $(this).parent(".catalog__selections");

        if ($block.length > 0) {
            $block.toggleClass("collapsed");

            if ($block.hasClass("collapsed")) {
                $(this).find("span").text("Показать ещё");
            } else {
                $(this).find("span").text("Свернуть");
            }
        }

        if ($dropdown.length > 0) {
            $dropdown.toggleClass("collapsed");

            if ($dropdown.hasClass("collapsed")) {
                $(this).find("span").text("Показать ещё");
            } else {
                $(this).find("span").text("Свернуть");
            }
        }

        if ($selections.length > 0) {
            $selections.toggleClass("collapsed");

            if ($selections.hasClass("collapsed")) {
                $(this).find("span").text("Показать ещё");
            } else {
                $(this).find("span").text("Свернуть");
            }
        }
    });

    $(".cart-help__title").on("click", function() {
        $(".cart-help").toggleClass("open");
    });


    // Открытие/закрытие сортировки каталога
    $(".sorting__title").on("click", function(e) {
        $(this).parent(".sorting").toggleClass("open");
        e.stopPropagation();
    });

    // Закрытие сортировки при клике вне .catalog-sort
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".sorting__title").length) {
            $(".sorting").removeClass("open");
        }
    });

    // Переключение вида каталога по кнопкам
    $(".views__item").on("click", function() {
        let viewClass = $(this).data("view");
        let $catalogList = $(".products");
        $catalogList.removeClass("rows cards");
        $catalogList.addClass(viewClass);
        $(".views__item").removeClass("active");
        $(this).addClass("active");

        // После смены layout пересчитать размеры product__slider
        let $productSliders = $catalogList.find(".product__slider.slick-initialized");
        function refreshSliders() {
            $productSliders.each(function() {
                $(this).slick("setPosition");
            });
        }
        if ($productSliders.length > 0) {
            requestAnimationFrame(function() {
                requestAnimationFrame(refreshSliders);
            });
            setTimeout(refreshSliders, 100);
        }
    });


    // Закрытие модалки modal-cart при свайпе вниз на мобилке
    let touchStartY = 0;
    let touchEndY = 0;
    let $modalCart = $(".modal-cart");

    if ($modalCart.length > 0) {
        $modalCart.on("touchstart", function(e) {
            if ($(window).width() <= 840) {
                touchStartY = e.originalEvent.touches[0].clientY;
            }
        });

        $modalCart.on("touchmove", function(e) {
            if ($(window).width() <= 840) {
                touchEndY = e.originalEvent.touches[0].clientY;
            }
        });

        $modalCart.on("touchend", function(e) {
            if ($(window).width() <= 840) {
                let swipeDistance = touchEndY - touchStartY;
                if (swipeDistance > 50) {
                    $modalCart.removeClass("open");
                    $("body").removeClass("overflow").css("padding-right", 0);
                }
                touchStartY = 0;
                touchEndY = 0;
            }
        });
    }


    // Предотвращение перехода по ссылке при клике на кнопки в карточке товара
    $(".product__buttons .btn, .product__icon").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });


    // Переключение табов описания товара
    $(".description__tab").on("click", function() {
        let tabId = $(this).data("tab");

        $(".description__tab").removeClass("active");
        $(".description__content").removeClass("active");
        $(this).addClass("active");
        $(".description__content[data-tab=\"" + tabId + "\"]").addClass("active");
    });


    // Переключение табов характеристик товара
    $(".description__title-tab").on("click", function() {
        let tabId = $(this).data("tab");

        $(".description__title-tab").removeClass("active");
        $(".description__list").removeClass("active");
        $(this).addClass("active");
        $(".description__list[data-tab=\"" + tabId + "\"]").addClass("active");
    });


    // Переключение FAQ вопросов
    $(".faq__question").on("click", function() {
        $(this).parent(".faq__item").toggleClass("open");
    });


    // Переключение табов в .products-section (tabs__item + products-tab__content)
    $(".products-section .tabs__item").on("click", function() {
        let tabId = $(this).data("tab");
        let $section = $(this).closest(".products-section");

        $section.find(".tabs__item").removeClass("active");
        $section.find(".products-tab__content").removeClass("active");
        $(this).addClass("active");
        let $activeContent = $section.find(".products-tab__content[data-tab=\"" + tabId + "\"]");
        $activeContent.addClass("active");

        let $slider = $activeContent.find(".products-slider");
        if ($slider.length > 0) {
            if ($slider.hasClass("slick-initialized")) {
                $slider.slick("unslick");
            }
            $slider.slick({
                arrows: true,
                dots: false,
                infinite: false,
                slidesToShow: 5,
                responsive: [
                    {
                        breakpoint: 1240,
                        settings: {
                            variableWidth: true,
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            });
        }

        let $productSliders = $activeContent.find(".product__slider");
        $productSliders.each(function() {
            let $productSlider = $(this);
            if ($productSlider.hasClass("slick-initialized")) {
                $productSlider.slick("unslick");
            }
            $productSlider.slick({
                arrows: false,
                dots: true,
                infinite: false,
                slidesToShow: 1
            });
        });
    });


    // Слайдер карточки товара с миниатюрами
    if ($(".card__photo").length > 0 && $(".card__thumbnails").length > 0) {
        $(".card__photo").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite: false,
            asNavFor: ".card__thumbnails"
        });

        $(".card__thumbnails").slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: ".card__photo",
            arrows: true,
            dots: false,
            infinite: false,
            focusOnSelect: true,
            centerPadding: '20px',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });

        $(".card__thumbnails .slick-slide").first().addClass("active");

        $(".card__photo").on("afterChange", function(event, slick, currentSlide) {
            $(".card__thumbnails .slick-slide").removeClass("active");
            $(".card__thumbnails .slick-slide").eq(currentSlide).addClass("active");
        });
    }


    // Перемещение блока card__availiable на мобильных устройствах
    let moveAvailableBlock = function() {
        let $available = $(".card__availiable");
        let $buttons = $(".card__buttons");
        let $originalParent = $(".card__title");

        if (!$available.length || !$buttons.length || !$originalParent.length) {
            return;
        }

        function moveBlock() {
            if ($(window).width() < 840) {
                if (!$available.parent().is($buttons.parent())) {
                    $available.insertBefore($buttons);
                }
            } else {
                if (!$available.parent().is($originalParent)) {
                    $(".card__id").after($available);
                }
            }
        }

        moveBlock();
        $(window).on("resize", moveBlock);
    };
    moveAvailableBlock();


    // Фиксированная панель cart-bottom на мобильных
    let fixedCartBottom = function() {
        let $cartBottom = $(".cart-bottom");
        let $cartAside = $(".cart-aside");

        if (!$cartBottom.length || !$cartAside.length) {
            return;
        }

        function checkPosition() {
            if ($(window).width() <= 1040) {
                let asideTop = $cartAside.offset().top;
                let scrollBottom = $(window).scrollTop() + $(window).height();

                if (scrollBottom >= asideTop) {
                    $cartBottom.removeClass("fixed");
                } else {
                    $cartBottom.addClass("fixed");
                }
            } else {
                $cartBottom.removeClass("fixed");
            }
        }

        checkPosition();
        $(window).on("scroll resize", checkPosition);
    };
    fixedCartBottom();


    // Маска для телефона
    if ($.fn.mask) {
        $(".inputbox-phone").each(function() {
            let mask = $(this).prev('.callback__code').length ? "(999) 999-99-99" : "+7 (999) 999-99-99";
            $(this).mask(mask);
        });
    }


    // Переключение блоков авторизации
    $(".auth__toggle-button").on("click", function() {
        let tabId = $(this).data("tab");
        let $authContainer = $(this).closest(".login, .registration");

        $authContainer.find(".auth__block").removeClass("active");
        $authContainer.find(".auth__block[data-tab=\"" + tabId + "\"]").addClass("active");
    });


    // Переключение personal-order
    $(".personal-order__toggle").on("click", function() {
        let $toggle = $(this);
        let $personalOrder = $toggle.closest(".personal-order");
        let $full = $personalOrder.find(".personal-order__full");
        let $textSpan = $toggle.find("span");

        if ($toggle.hasClass("toggled")) {
            $toggle.removeClass("toggled");
            $textSpan.text($toggle.data("original-text") || "развернуть");
            $full.removeClass("show");
        } else {
            if (!$toggle.data("original-text")) {
                $toggle.data("original-text", $textSpan.text());
            }
            $toggle.addClass("toggled");
            $textSpan.text("свернуть");
            $full.addClass("show");
        }
    });


    $(".personal-section--main").on("click", ".personal-aside__item.nav-profile", function(e) {
        if ($(window).width() <= 1040) {
            e.preventDefault();
            $(".personal-section--main").addClass("open");
        }
    });


    // Переключение табов address-item
    $(".address-item__tab").on("click", function() {
        let $tab = $(this);
        let route = $tab.data("route");
        let $container = $tab.closest(".address-item__wrap");

        $container.find(".address-item__tab").removeClass("active");
        $tab.addClass("active");
        $container.find("[data-route]").removeClass("active");
        $container.find("[data-route='" + route + "']").addClass("active");
    });


    // Перемещение address-list__item в зависимости от ширины экрана
    function rearrangeAddressItems() {
        let $container = $(".address-section");
        let $addressList = $container.find(".address-list");
        let windowWidth = $(window).width();

        if (windowWidth <= 1040) {
            // На маленьких экранах: перемещаем каждый элемент перед соответствующим address-block
            $addressList.find(".address-list__item").each(function() {
                let $item = $(this);
                let address = $item.data("address");
                let $addressBlock = $container.find(".address-block[data-address='" + address + "']");

                if ($addressBlock.length > 0) {
                    // Если элемент еще не перемещен, перемещаем его
                    if ($item.parent().is($addressList)) {
                        $item.detach().insertBefore($addressBlock);
                    }
                }
            });
        } else {
            // На больших экранах: возвращаем все элементы в address-list
            let $allItems = $container.find(".address-list__item");
            if ($allItems.length > 0 && !$allItems.first().parent().is($addressList)) {
                // Сортируем по исходному индексу, если он сохранен
                let sortedItems = $allItems.toArray().sort(function(a, b) {
                    let indexA = $(a).data("original-index");
                    let indexB = $(b).data("original-index");
                    if (indexA !== undefined && indexB !== undefined) {
                        return indexA - indexB;
                    }
                    return 0;
                });

                $addressList.empty();
                $.each(sortedItems, function() {
                    $addressList.append(this);
                });
            }
        }
    }

    // Сохраняем исходный порядок элементов при первой загрузке
    $(".address-list__item").each(function(index) {
        $(this).data("original-index", index);
    });

    // Выполняем перемещение при загрузке и изменении размера окна
    rearrangeAddressItems();
    $(window).on("resize", rearrangeAddressItems);

    // Переключение address-list__item
    $(".address-list__item").on("click", function() {
        let $item = $(this);
        let address = $item.data("address");
        let $container = $item.closest(".address-section");

        $container.find(".address-list__item").removeClass("active");
        $item.addClass("active");

        $container.find("[data-address]").removeClass("active");
        $container.find("[data-address='" + address + "']").addClass("active");

        // Переинициализация слайдера address-item__gallery при активации address-item
        let $activeAddressItem = $container.find(".address-item[data-address='" + address + "']");
        if ($activeAddressItem.length > 0) {
            let $gallery = $activeAddressItem.find(".address-item__gallery");
            if ($gallery.length > 0) {
                // Уничтожаем слайдер, если он был инициализирован
                if ($gallery.hasClass("slick-initialized")) {
                    $gallery.slick("unslick");
                }
                // Инициализируем заново
                $gallery.slick({
                    arrows: true,
                    dots: false,
                    infinite: false,
                    slidesToShow: 4,
                    responsive: [
                        {
                            breakpoint: 1041,
                            settings: {
                                arrows: false,
                                variableWidth: true,
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        }
    });


});
