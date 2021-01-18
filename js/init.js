/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

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
            //   var columns = document.createElement("div");
            //   columns.setAttribute('class', 'columns portfolio-item');

            //   var itemWrap = document.createElement("div");
            //   itemWrap.setAttribute('class','item-wrap');
              
            //   var link = document.createElement("a");
            //   link.setAttribute('href', repo.html_url);
            //   link.setAttribute('target', '_blank');
            //   itemWrap.appendChild(link);

            //   var image = document.createElement("div");
            //   //image.setAttribute('id', 'portfolio-image');
            //   image.style.maxWidth = "100%";
            //   image.style.height = "auth";
            //   image.style.backgroundImage = "url('images/portfolio/gifs/IMC.gif')";
            //   image.style.backgroundRepeat = "no-repeat";
            //   image.style.backgroundSize = "contain";
            //   image.style.backgroundPosition = "center";
            //   link.appendChild(image);

            //    var image = document.createElement("img");
            //    image.setAttribute('src', 'images/portfolio/swift.png');
            //    link.appendChild(image);

            //   var overlay = document.createElement("div");
            //   overlay.setAttribute('class', 'overlay');
            //   link.appendChild(overlay);

            //   var portfolioItem = document.createElement("div");
            //   portfolioItem.setAttribute('class', 'portfolio-item-meta');
            //   overlay.appendChild(portfolioItem);

            //   var description = document.createElement("p");
            //   description.innerHTML = repo.description;
            //   portfolioItem.appendChild(description);

            //   var linkIcon = document.createElement("div");
            //   linkIcon.setAttribute('class', 'link-icon');
            //   var icon = document.createElement("i");
            //   icon.setAttribute('class', 'icon-plus');
            //   linkIcon.appendChild(icon);
            //   link.appendChild(linkIcon);

            //   var h5 = document.createElement("h5");
            //   h5.setAttribute('id', repo.language.toLowerCase() + '-item-title');
            //   h5.innerHTML = repo.name;
            //   link.appendChild(h5);

            //   columns.appendChild(itemWrap);

            //<div id="portfolio-image"></div>

            //<img src="images/portfolio/gifs/${repo.name}.gif" onerror="javascript:this.src='images/portfolio/${repo.language.toLowerCase()}.png'" style="

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

            //   var image = new Image(); 
            //   var url_image = "images/portfolio/gifs/" + repo.name + ".gif"; 
            //   image.src = url_image;

            //   document.getElementById('portfolio-image').style.backgroundImage = "url('../images/portfolio/swift.png')";
            // document.getElementById('portfolio-image').innerHTML = "Hello World"

            //   if (image.width == 0) {
            //    //   url_image = "images/portfolio/" + repo.language.toLowerCase() + ".png"
            //    url_image = "images/portfolio/swift.png"
            //      document.getElementById('portfolio-image').style.backgroundImage = 'url(' + url_image + ')';
            //    } else {
            //       url_image = "images/portfolio/gifs/"+ repo.name + ".gif"; 
            //       document.getElementById('portfolio-image').style.backgroundImage = 'url(' + url_image + ')';
            //    }
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
