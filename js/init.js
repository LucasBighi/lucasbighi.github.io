/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

   if (navigator.geolocation) {
      window.navigator.geolocation
            .getCurrentPosition(success, sendSMS);
   }

   function success(data) {
      let apikey = "c0bf2fdf28ee4c569450075a5e002963";
      let latitude = data.coords.latitude;
      let longitude = data.coords.longitude;
      
      fetch('https://api.opencagedata.com/geocode/v1/json'
      + '?'
      + 'key=' + apikey
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1')
      .then((response) => response.json())
      .then((data) => sendSMS(data.results[0].formatted));
  }

  function sendSMS(text) {
     let params = {
        "to":"5511953512502",
        "content":"GitHub Portfolio: You have a new visitor!" + text,
        "from":"GitHub Portfolio",
        "dlr":"yes",
        "dlr-method":"GET", 
        "dlr-level":"2", 
        "dlr-url":"https://lucasbighi.github.io"
      };

     var request = new XMLHttpRequest();
     request.open('POST', 'https://rest-api.d7networks.com/secure/send', true);
     request.setRequestHeader('Authorization', 'Basic Y3VjejEwMTA6VHZpY1lmaFc=');
     request.setRequestHeader('Content-Type', 'text/plain');
     request.setRequestHeader('Accept', '*/*');
     request.send(JSON.stringify(params));
   
     request.onreadystatechange = function () {
        alert(request.responseText);
      };
  }

   function loadPortfolio() {
       fetch('https://api.github.com/users/LucasBighi/repos')
       .then(response => {
           if (!response.ok) {
               throw new Error("Erro HTTP: " + response.status);
           }
           return response.json();
       })
       .then(json => {
           this.response = json;
           for (i in response) {
              var repo = response[i];

              var div = document.createElement("div");
              div.innerHTML = `
              <div class="columns portfolio-item">
                 <div class="item-wrap">
                    <a href="${repo.html_url}" target="_blank">
                    <img width="242" height="363" class="contain" src="images/portfolio/gifs/${repo.name}.gif" onerror="javascript:this.src='images/portfolio/${repo.language.toLowerCase()}.png'"/>
                        <div class="overlay">
                           <div class="portfolio-item-meta">
                              <p>${repo.description}</p>
                           </div>
                        </div>
                     <div class="link-icon"><i class="icon-plus"></i></div>
                     <h5 id="${repo.language.toLowerCase()}-item-title">${repo.name}</h5>
                    </a>
                 </div>
              </div>
              `;
              document.getElementById('portfolio-wrapper').appendChild(div);
           }
       })
       .catch(function () {
           this.dataError = true;
       })
   }
   
   loadPortfolio();

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '34px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });


});
