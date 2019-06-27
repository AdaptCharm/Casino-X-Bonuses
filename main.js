$(document).ready(() => {
	'use strict';

	// Countdown 2 seconds delay
	setTimeout(() => {
		$( ".notification-wrap" ).css("display", "flex")
	}, 2000)

	// Countdown close
	$(".exit").on("click", function(e) {
		$( ".notification-wrap" ).hide()
	});

	// Countdown timer
	function ProgressCountdown(timeleft, bar) {
	  return new Promise((resolve, reject) => {
	    var countdownTimer = setInterval(() => {
	      timeleft--;
	      document.getElementById(bar).value = timeleft;
	      if (timeleft <= 0) {
					$( ".notification-wrap" ).hide()
	        clearInterval(countdownTimer);
	        resolve(true);
	      }
	    }, 1000);
	  });
	}
	ProgressCountdown(10, 'pageBeginCountdown');

	// The function actually applying the offset
	function offsetAnchor() {
	  if (location.hash.length !== 0) {
	    window.scrollTo(window.scrollX, window.scrollY - 25)
	  }
	}

	// Captures click events of all <a> elements with href starting with #
	$(document.body).on('click', 'a[href^="#"]', (event) => {
	  // Click events are captured before hashchanges. Timeout
	  // causes offsetAnchor to be called after the page jump.
	  window.setTimeout( () => {
	    offsetAnchor();
	  }, 0);
	});

	// Set the offset when entering page with hash present in the url
	window.setTimeout(offsetAnchor, 0);

	// Make casino item clickable
	const element = document.querySelectorAll('.item[data-clickable=true]')
	if (element) {
		element.forEach(function(el){
			el.addEventListener('click', (e) => {
					let href = $(e.currentTarget).data('href');
					window.location = href;
     	});
  	});
	}

	// Open mobile menu
	$(".navigation").on("show.bs.collapse", function(e) {
		console.log("open")
		$( ".light" ).addClass( "active" );
		$( ".expand" ).addClass( "active" );
	});

	// Close mobile menu
	$(".navigation").on("hide.bs.collapse", function(e) {
		console.log("close")
		$( ".light" ).removeClass( "active" );
		$( ".expand" ).removeClass( "active" );
	});
	
	feather.replace()

	$(window).on({
		"load resize": () => {
			// Line element beneath active menu item
			const menu = $(".navigation .menu"),
				  line = "<div id='line'></div>";
			menu.append(line);

			let target = $("#line");
			target
				.width($(".active").width())
				.css("left", $(".active a").position().left)
				.data("origLeft", target.position().left)
				.data("origWidth", target.width());

			$(".navigation .menu li a").hover(function() {
				let that = $(this),
				p = that.position().left,
				w = that.parent().width();
				target.stop().animate({
					left: p,
					width: w
				});

			}, function() {
				target.stop().animate({
					left: target.data("origLeft"),
					width: target.data("origWidth")
				});
			});

			$('.navigation .menu li:not(".active")').hover(function(){
				$('#line').addClass('hover');
			}, function(){
				$('#line').removeClass('hover');
			});

			// Output instagram feed
			$.instagramFeed({
				'username': 'casinoxbonuses',
				'container': "#instagram-feed",
				'display_profile': false,
				'display_biography': false,
				'display_gallery': true,
				'get_raw_json': false,
				'callback': null,
				'styling': true,
				'items': 12,
				'items_per_row': 4,
				'margin': 1
			});
		},
		scroll: () => {
			let that = $(this);

			if (that.scrollTop() > 1) {
				$('header').addClass("sticky-top");
				$('nav').addClass("blue blue-top-bottom slide-down");
			} else if (that.scrollTop() < 1) {
				$('header').removeClass("sticky-top");
				$('nav').removeClass("blue blue-top-bottom slide-down");
			}
		}
	});
});
