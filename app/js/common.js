$(function() {

	function setHeaderoffset()
	{
		$('.header').css('height', $('.header-sticky').outerHeight() );
	}

	function toggleMobNav(){
		$('.header').toggleClass('show-mob-nav');
	}
	function initMobileNavToggle() {
		$('.header__toggle-mob-nav, .header-menu__close, .header-menu__overlay').on('click', toggleMobNav);
	}

	function initLangSwitcher() {
		$('.lang-switcher__toggle-list').on('click', function(){
			$(this).closest('.lang-switcher').toggleClass('show');
		});
	}

	function initMobileSubmenusToggle()
	{
		if ( $(window).width() < 768 ) {
			var headerSubmenu = $('.header-menu__nav .submenu');
			var headerSubmuneToggleLinks = $('.has-submenu');
			headerSubmuneToggleLinks.on('click', function(e){
				e.preventDefault();
				headerSubmuneToggleLinks.not( $(this) ).removeClass('open');
				headerSubmenu.not( $(this).siblings('.submenu') ).slideUp();
				$(this).toggleClass('open').siblings('.submenu').slideToggle();
			});
		}
	}

	function initCategorisedListToggle()
	{
		var categorisedLists = $('.categorised-list__list');
		var categorisedListsToggleLinks = $('.categorised-list__title');
		categorisedListsToggleLinks.on('click', function(e){
			e.preventDefault();
			categorisedListsToggleLinks.not( $(this) ).removeClass('open');
			categorisedLists.not( $(this).siblings('.categorised-list__list') ).slideUp();
			$(this).toggleClass('open').siblings('.categorised-list__list').slideToggle();
		});
	}

	function initPromotionListSlider() {
		
		var sliderSettings = {
			loop: true,
			margin: 0,
			dots: false,
			nav: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			items:1,
			nav:false
		};
		
		if ( $(window).width() < 768 ) {
			if ( !$('.promotions-list').hasClass('owl-loaded') ) $('.promotions-list').owlCarousel(sliderSettings);
		}
		else {
			$('.promotions-list').trigger('destroy.owl.carousel').removeClass('owl-loaded owl-drag');
			$('.promotions-list').find('.owl-stage-outer').children().unwrap();
		}

	}

	// ---------------------------------------------------- //
	// PREVENT MULTIPLE CALLS
	// ---------------------------------------------------- //
	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	$(window).resize(function () {
		waitForFinalEvent(function(){
			initPromotionListSlider();
			setHeaderoffset();
		}, 350, "resize events");
	});


	/**
	 * init functions
	 */
	function _init() {
		setHeaderoffset();
		initMobileNavToggle();
		initLangSwitcher();
		initMobileSubmenusToggle();
		initCategorisedListToggle();
		initPromotionListSlider();
	}


	_init();
});
