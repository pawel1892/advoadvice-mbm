var cookieBanner = (function(){
  var init = function(){
    showCookieBanner();
  };

  function readCookie(n) {
    let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
    return a ? a[1] : '';
  }

  function showCookieBanner(){
    if(!readCookie('cookieBannerDismissed')){
      var banner_wrapper = document.createElement('div');
      banner_wrapper.setAttribute("id", "cookieBanner");
      banner_wrapper.style.cssText = `
        font-size: 0.7rem;
        background-color: #ddd;
        color: #444;
        max-width: 200px;
        padding: 16px;
        position: fixed;
        bottom: 0;
        left: 0;`;

      var banner_text = document.createElement('p');
      banner_text.innerHTML = `
        Diese Webseite benutzt Cookies, um die Nutzererfahrung zu verbessern.&nbsp;
        <br />
        <a href="/impressum">Mehr erfahren</a>`;
      banner_wrapper.appendChild(banner_text);

      var banner_link = document.createElement('a');
      banner_link.innerHTML = `Verstanden`;
      banner_link.style.cssText = `
        margin-top: 8px;
        padding: 4px;
        border: 1px solid #444;
        display: inline-block;
        cursor: pointer;`;
      banner_link.addEventListener('click', function(){
        document.cookie = "cookieBannerDismissed=true";
        banner_wrapper.style.display = "none";
      })
      banner_wrapper.appendChild(banner_link);

      document.body.appendChild(banner_wrapper);
    }
  }


  return {
    init: init
  }
})();
var landing = (function(){
  var init = function(){
    parallaxHeader();
    parallaxSonstwo();
  };

  var parallaxHeader = function(){
    var $header = $('.landing__header');
    if($header.length == 0 || (typeof $header.css('background-position-y') == 'undefined')) return; // IE fix
    var yPos = $header.css('background-position-y').replace('%','');
    $(document).on('scroll', function(){
      var newPosition = parseInt(yPos) + ($(document).scrollTop() * 0.05);

      $header.css('background-position-y', `${newPosition}%`);
    });
  };

  var parallaxSonstwo = function(){
    $('.landing__bgbox').each(function(){
      // For each course break element:
      var $element = $(this);
      if(typeof $element.css('background-position-y') == 'undefined') return;// IE Fix!
      var originalPosition = $element.css('background-position-y').replace('%','');

      $(document).on('scroll', function(){
        var scrollBottom = $(window).scrollTop() + $(window).height();
        var elementOffset = $element.offset().top;

        if(elementOffset > scrollBottom){
          // Element not visible yet:
          $element.css('background-position-y', `${originalPosition}%`);
        }else{
          // Element inside visible space:
          var newPosition = parseInt(originalPosition) + (Math.max(0, scrollBottom - elementOffset) * 0.05);
          $element.css('background-position-y', `${newPosition}%`);
        }
      });
    });
  }


  return {
    init: init
  }
})();
var layout = (function(){
  var init = function(){
    initializeScrollMagic();
    initializeTooltips();
    initializeSmootScrolling();
  };

  var initializeScrollMagic = function(){
    // ScrollMagic  + $("#navigation").height()
    var controller = new ScrollMagic.Controller();
    var headerHeight = $("header>.container").height() - 140;

    // Navigation Scene
    var navScene = new ScrollMagic.Scene({
      duration: 0,
      offset: headerHeight
    })
    .setClassToggle("#navigation", "navbar-fixed-top");

    var kennenScene = new ScrollMagic.Scene({
      duration: 10
    })

    // add scenes to controller
    controller.addScene([
      navScene,
      kennenScene
    ]);
  };

  var initializeTooltips = function(){
    // $('[data-toggle="tooltip"]').tooltip();
  };

  var initializeSmootScrolling = function(){
    var $root = $('html, body');

    $('a.a-scroll').click(function() {
        var href    = $.attr(this, 'href');
        var href_id = /[^/]*$/.exec(href)[0];

        $root.animate({
            scrollTop: $(href_id).offset().top
        }, 500, function () {
            window.location.hash = href_id;
        });
        return false;
    });
  };

  return {
    init: init
  }
})();
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

// Object.values
Object.values = Object.values ? Object.values : function(obj) {
	var allowedTypes = ["[object String]", "[object Object]", "[object Array]", "[object Function]"];
	var objType = Object.prototype.toString.call(obj);

	if(obj === null || typeof obj === "undefined") {
		throw new TypeError("Cannot convert undefined or null to object");
	} else if(!~allowedTypes.indexOf(objType)) {
		return [];
	} else {
		// if ES6 is supported
		if (Object.keys) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		}

		var result = [];
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				result.push(obj[prop]);
			}
		}

		return result;
	}
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Object.values;
}
;
var schufaTool = (function(){
  var thisState = {}

  var init = function(){
    initializeState()
    renderAndBind()
    initialBindFunctions()
  }

  var initializeState = function(){
    thisState.progress = 0
    thisState.category = ''
    thisState.quiz = {}
    thisState.auswertung = {}
    thisState.formContact = {}
    thisState.$app = $('.schufaTool')
    thisState.$slides = [$('.schufaTool__slide--0')]
    thisState.$removedSlides = []
  }

  var initialBindFunctions = function(){
    $('.schufaTool__progressBtn').click(onProgressClick)
  }

  var onProgressClick = function(){
    if($(this).hasClass('disabled')) return
    // Copy state of current slide into the slides array (including form values)
    copyCurrentSlideToState()
    // Slide Specific logic:
    runSlideLogic(thisState.progress, thisState.category, 'beforeExit')
    // Set new progress state
    let summand = $(this).hasClass('schufaTool__progress--next') ? 1 : -1
    thisState.progress += summand
    // Slide Specific logic:
    runSlideLogic(thisState.progress, thisState.category, 'beforeInit')
    // Rerender view
    checkRerender()
  }

  // ***** Events *****

  var bindFunctions = function(){
    thisState.$app.children().off()
    thisState.$app.find('.schufaTool__categoryBtn').click(onCategoryClick)
    thisState.$app.find('input').on('keyup change click', onFormKeyUp)
  }

  var onCategoryClick = function(){
    thisState.category = $(this).data('category')
    thisState.$removedSlides = [] // reset
    thisState.$slides = slideTemplates[thisState.category].map(selectorString => {
      // Select and clone templates from DOM
      return $('.schufaTool__templates').find(selectorString).clone()
    })
    // Toggle views:
    thisState.$app.find('.schufaTool__categoryBtn').removeClass('active')
    $(this).addClass('active')
    // Move forward to next slide immediately:
    copyCurrentSlideToState()
    thisState.progress += 1
    checkRerender()
  }

  var onFormKeyUp = function(){
    if(!formPresent()) return
    // Update state with data from the form:
    updateStateFromForm(
      $(this).closest('form').hasClass('schufaTool__form--kontakt')
    )
    checkRerender()
  }

  // ***** Private *****

  var formPresent = () => thisState.$app.find('form').length > 0
  var finalSlide = () => thisState.progress >= (thisState.$slides.length - 1)
  var questionAnswer = (frage, antwort) => {
    let questionObject = thisState.quiz[thisState.category].find(obj => obj.frage == frage)
    if(typeof questionObject == 'undefined') return false
    return questionObject.antwort == antwort
  }

  var copyCurrentSlideToState = function(){
    thisState.$slides.splice(thisState.progress, 1, thisState.$app.children().clone())
  }

  var renderAndBind = function(){
    var slideToRender = thisState.$slides[thisState.progress]
    thisState.$app.html('')
    thisState.$app.append(slideToRender)
    // thisState.$app.html(slideToRender.children())
    thisState.$app.data('progress', thisState.progress) // update progress
    thisState.$app = $(thisState.$app.selector) // reload state variable
    // Slide Specific logic:
    runSlideLogic(thisState.progress, thisState.category, 'afterRender')
    scrollToTop()
    bindFunctions()
  }

  var scrollToTop = function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  }

  var checkRerender = function(){
    reloadSlide()
    finalSlide() ? hideProgressButtonsOnFinalSlide() : reloadProgressButtons()

    function reloadSlide(){
      let progressDifferent = thisState.$app.data('progress') != thisState.progress
      if(progressDifferent) renderAndBind()
    }
    function reloadProgressButtons(){
      let categorySelected = thisState.category.length > 0
      let allRequiredFieldsFilled = () => {
        if(!formPresent()) return true
        let formFieldArray = thisState.$app.find('.form-group').map(function(){
          // For each form group check if it contains a required input field
          if($(this).find('[type="radio"][required]').length > 0){
            return $(this).find('[type="radio"][required]').is(':checked')
          }else if($(this).find('input[required]').length > 0){
            return $(this).find('input[required]').val().trim().length > 0
          }else{
            // in case there is no required field in the form group
            return true
          }
        })
        // Return true if no element in the array is 'false'
        return Array.from(formFieldArray).indexOf(false) < 0
      }
      $('.schufaTool__progress--next').toggleClass('disabled', !(categorySelected && allRequiredFieldsFilled()))
      $('.schufaTool__progress--prev').toggleClass('disabled', !(thisState.progress > 0))
    }
    function hideProgressButtonsOnFinalSlide(){
      $('.schufaTool__progressBtn').hide()
    }
  }

  var updateStateFromForm = isContactForm => {
    if(isContactForm){
      thisState.formContact = serializedObjectFromForm()
    }else{
      thisState.quiz[thisState.category] = serializedObjectFromForm()
    }
  }

  var serializedObjectFromForm = () => {
    return thisState.$app.find('form').serializeArray().map(obj => {
      return {
        frage: $(`.schufaTool [for="${obj.name}"]`).text().trim(),
        antwort: obj.value
      }
    })
  }

  // ***** Submit *****
  const submit = () => {
    var stringOfContactState = thisState.formContact.map(obj => `${obj.frage}: ${obj.antwort} |\n`).join('')
    var stringOfQuizState = Object.values(thisState.quiz).map(quiz => quiz.map(obj => `${obj.frage}: ${obj.antwort} |\n`).join('') ).join('')
    var messageString = `${thisState.formContact[0].antwort} hat den Vorabcheck durchgeführt und folgende Dinge ausgefüllt: \n\n\n ${stringOfContactState} ||\n\n ${stringOfQuizState}`

    $.post('https://mailthis.to/advoadvice', {
      _subject: 'Schufa Vorab-Check Formular ausgefüllt',
      _after: 'http://advoadvice.de/danke/vorab-check',
      email: thisState.formContact[4].antwort,
      message: messageString
    }, function(response){
      console.log(response)
      location.href = 'https://mailthis.to/confirm'
    })

    // CloudCannon:
    // var stringOfContactState = thisState.formContact.map(obj => `${encodeURIComponent(obj.frage)}=${encodeURIComponent(obj.antwort)}` ).join('&')
    // var stringOfQuizState = Object.values(thisState.quiz).map(quiz => quiz.map(obj => `${encodeURIComponent(obj.frage)}=${encodeURIComponent(obj.antwort)}`).join('&') ).join('&')
    // var sendingParams = `${encodeURIComponent('_to')}=${encodeURIComponent('masugob@gmail.com')}`
    // var entireParams = sendingParams + '&' + stringOfContactState + '&' + stringOfQuizState
    // // For Debugging: http://ptsv2.com/t/zhs50-1524062871/post
    //
    //
    // // if (grecaptcha) {
    // //   var recaptchaResponse = grecaptcha.getResponse();
    // //   if (!recaptchaResponse) { // reCAPTCHA not clicked yet
    // //     return false;
    // //   }
    // // }
    // var formEl = document.getElementById("schufaToolKontakt");
    // var request = new XMLHttpRequest();
    // request.addEventListener("load", function () {
    //   if (request.status === 302) { // CloudCannon redirects on success
    //     // It worked
    //   }
    // });
    // request.open(formEl.method, formEl.action);
    // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // request.send(entireParams);
  }

  // ***** Slide Specific Logic *****
  const slideLogic = {
    negativeintrag: {
      '1': {
        beforeExit: () => {
          // Set Auswertung
          thisState.auswertung = getAuswertungBasedOnQuizAnswers()
          // Remove Auswertungsslide if there is no Auswertung
          if (thisState.auswertung.length < 1 &&
            thisState.$slides[2].hasClass('schufaTool__category--negativeintrag--2')){
            // Auswertung should disappear
            thisState.$removedSlides = thisState.$slides.splice(2, 1)
          }else if(thisState.auswertung.length > 0 &&
            !thisState.$slides[2].hasClass('schufaTool__category--negativeintrag--2')){
            // Auswertung should appear
            thisState.$slides.splice(2, 0, ...thisState.$removedSlides)
            thisState.$removedSlides = []
          }

          // Private Functions
          function getAuswertungBasedOnQuizAnswers(){
            try {
              let answeredYes = i => thisState.quiz[thisState.category][i].antwort == "Ja"
              let answeredNo = i => thisState.quiz[thisState.category][i].antwort == "Nein"
              let answerArray = []

              if(answeredYes(2)) answerArray.push(".schufaTool__negativeintrag__auskunft--a")
              if(answeredNo(2) && answeredNo(8) && answeredNo(10)) answerArray.push(".schufaTool__negativeintrag__auskunft--b")
              if(answeredYes(8) && answeredYes(10)) answerArray.push(".schufaTool__negativeintrag__auskunft--c")

              return answerArray
            }catch(e){
              return []
            }
          } // /getAuswertungBasedOnQuizAnswers
        } // /beforeExit
      },
      '2': {
        afterRender: () => {
          if(thisState.$app.find('.schufaTool__category--negativeintrag--2').length > 0){
            // Show correct auswertung
            thisState.$app.find('.schufaTool__auskunft').hide()
            thisState.auswertung.map(answerClass => thisState.$app.find(answerClass).show())
          }else{
            // Looking at the kontakt form:
            $('.schufaTool__progress--next').text('Abschicken')
          }
        },
        beforeExit: () => {
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0) submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      },
      '3': {
        afterRender: () => {
          $('.schufaTool__progress--next').text('Abschicken')
        },
        beforeExit: () => {
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0) submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      }
    },
    score: {
      '2': {
        afterRender: () => {
          try {
            thisState.$app.find('.schufaTool__auskunft').hide()

            switch(thisState.quiz[thisState.category][2].antwort){
              case '>95%':
                thisState.$app.find('.schufaTool__score__auskunft--a').show()
                break;
              case '90%-95%':
                thisState.$app.find('.schufaTool__score__auskunft--b').show()
                break;
              case '80%-90%':
                thisState.$app.find('.schufaTool__score__auskunft--c').show()
                break;
              case '<80%':
                thisState.$app.find('.schufaTool__score__auskunft--d').show()
                break;
            }
          }catch(e){
            // console.log(e)
          }
        },
        beforeExit: () => {
          // Remove rest of the game for the first answer
          if(thisState.quiz[thisState.category][2].antwort == '>95%'){
            // Remove final slides
            thisState.$slides.splice(3, 2)
            // Add placeholder slide at end
            thisState.$slides.push($('.schufaTool__templates .schufaTool__slide--2').clone())
          }
        }
      },
      '3': {
        afterRender: () => {
          $('.schufaTool__progress--next').text('Abschicken')
        },
        beforeExit: () => {
          submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      }
    },
    fraud: {
      '1': {
        beforeExit: () => {
          if(thisState.quiz[thisState.category].map(obj => obj.antwort).indexOf('Ja') < 0){
            // If both questions answered with no: insert last placeholder slide
            // Remove final slides and replace it with the final slide
            let $finalSlide = $('.schufaTool__templates').find('.schufaTool__category--fraud--5').clone()
            thisState.$slides.splice(2, 4, $finalSlide)
          }
        }
      },
      '2': {
        afterRender: () => {
          if(finalSlide()) return

          $('.schufaTool__form--fraud__placeholder').html('') // reset form
          // Insert form for the corresponding answer of the previous slide
          if(thisState.quiz[thisState.category][0].antwort == "Ja"){
            thisState.$app.find('[name="fraud__91"]').val('Ja')
            let $identitaetsForm = $('.schufaTool__templates').find('.schufaTool__form--fraud--a').clone()
            $('.schufaTool__form--fraud__placeholder').append($identitaetsForm)
          }
          if(thisState.quiz[thisState.category][1].antwort == "Ja"){
            thisState.$app.find('[name="fraud__92"]').val('Ja')
            let $fraudForm = $('.schufaTool__templates').find('.schufaTool__form--fraud--b').clone()
            $('.schufaTool__form--fraud__placeholder').append($fraudForm)
          }
        },
        beforeExit: () => {
          if(questionAnswer('Identitätsdiebstahl: Wurde in Folge des Identitätsdiebstahls ein negativer Schufa Eintrag eingemeldet?', 'Nein')){
            let $finalSlide = $('.schufaTool__templates').find('.schufaTool__category--fraud--4').clone()
            thisState.$slides.splice(3, 3, $finalSlide)
          }
        }
      },
      '3': {
        afterRender: () => {
          if(finalSlide()) return

          thisState.$app.find('.schufaTool__auskunft').hide()
          if(questionAnswer('Identitätsdiebstahl: Wurde in Folge des Identitätsdiebstahls ein negativer Schufa Eintrag eingemeldet?', 'Ja')){
            thisState.$app.find('.schufaTool__fraud__auskunft--a').show()
          }
          if(questionAnswer('Handelt es sich um ein Merkmal im sog. FraudPool?', 'Ja')){
            thisState.$app.find('.schufaTool__fraud__auskunft--b').show()
          }
        }
      },
      '4': {
        afterRender: () => {
          $('.schufaTool__progress--next').text('Abschicken')
        },
        beforeExit: () => {
          submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      }
    },
    veraltet: {
      '2': {
        afterRender: () => {
          try {
            thisState.$app.find('.schufaTool__auskunft').hide()

            switch(thisState.quiz[thisState.category][0].antwort){
              case '>95%':
                thisState.$app.find('.schufaTool__veraltet__auskunft--a').show()
                break;
              case '90%-95%':
                thisState.$app.find('.schufaTool__veraltet__auskunft--b').show()
                break;
              case '80%-90%':
                thisState.$app.find('.schufaTool__veraltet__auskunft--c').show()
                break;
              case '<80%':
                thisState.$app.find('.schufaTool__veraltet__auskunft--d').show()
                break;
            }
          }catch(e){
            // console.log(e)
          }
        },
        beforeExit: () => {
          // Remove rest of the game for the first answer
          if(thisState.quiz[thisState.category][2].antwort == '>95%'){
            // Remove final slides
            thisState.$slides.splice(3, 2)
            // Add placeholder slide at end
            thisState.$slides.push($('.schufaTool__templates .schufaTool__slide--2').clone())
          }
        }
      },
      '3': {
        afterRender: () => {
          $('.schufaTool__progress--next').text('Abschicken')
        },
        beforeExit: () => {
          submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      }
    },
    restschuld: {},
    verzeichnisse: {
      '1': {
        beforeExit: () => {
          if(thisState.quiz[thisState.category][0].antwort == 'Nein'){
            // Remove final slides
            thisState.$slides.splice(2, 3)
            // Add placeholder slide at end
            thisState.$slides.push($('.schufaTool__templates .schufaTool__category--verzeichnisse--3').clone())
          }
        }
      },
      '3': {
        afterRender: () => {
          $('.schufaTool__progress--next').text('Abschicken')
        },
        beforeExit: () => {
          submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      }
    }
  }

  const runSlideLogic = (progressIndex, category, action) => {
    try{
      // Available Actions: 'beforeInit', 'beforeExit', 'afterRender'
      slideLogic[category][progressIndex][action]()
    }catch(e){
      // Uncomment for debugging
      // console.log(e, 'Could not find action for: ', progressIndex, category, action)
    }
  }

  // ***** Constants *****

  const slideTemplates = {
    negativeintrag: [
      '.schufaTool__slide--0',
      '.schufaTool__category--negativeintrag--1',
      '.schufaTool__category--negativeintrag--2',
      '.schufaTool__slide--1',
      '.schufaTool__category--negativeintrag--3'
    ],
    score: [
      '.schufaTool__slide--0',
      '.schufaTool__category--score--1',
      '.schufaTool__category--score--2',
      '.schufaTool__slide--1',
      '.schufaTool__category--score--3'
    ],
    fraud: [
      '.schufaTool__slide--0',
      '.schufaTool__category--fraud--1',
      '.schufaTool__category--fraud--2',
      '.schufaTool__category--fraud--3',
      '.schufaTool__slide--1',
      '.schufaTool__category--score--6'
    ],
    veraltet: [
      '.schufaTool__slide--0',
      '.schufaTool__category--veraltet--1',
      '.schufaTool__category--veraltet--2',
      '.schufaTool__slide--1',
      '.schufaTool__category--veraltet--3'
    ],
    restschuld: [
      '.schufaTool__slide--0',
      '.schufaTool__category--restschuld--1'
    ],
    verzeichnisse: [
      '.schufaTool__slide--0',
      '.schufaTool__category--verzeichnisse--1',
      '.schufaTool__category--verzeichnisse--2',
      '.schufaTool__slide--1',
      '.schufaTool__category--verzeichnisse--4'
    ]
  }

  return {
    init: init
  }
})()
;
"use strict";

var search = (function () {
  var init = function init() {
    bindFunctions();
  };

  var bindFunctions = function bindFunctions() {
    $("#search_input").on("keyup", displaySearchResults);
  };

  // Variables
  var posts_all = [],
      posts = [];

  // Templates
  var post_preview = function post_preview(post) {
    return "\n      <article class=\"blog-post\">\n        <h1 class=\"padding-20\">\n          <a href=\"" + post.url + "\">" + post.title + "</a>\n        </h1>\n        <div class=\"padding-20\">\n          " + post.content_truncated + "<br><br>\n          <a href=\"" + post.url + "\" class=\"editable\"><b>Weiterlesen ...</b></a>\n        </div><!-- post.body -->\n        <small>- " + post.date + " :: " + post.author + "</small>\n      </article>";
  };
  var empty_result = function empty_result(search_word) {
    return "\n      <article class=\"blog-post\">\n        <h2 class=\"padding-20\">\n          Leider konnten keine Artikel mit dem Suchbegriff \"" + search_word + "\" gefunden werden. Bitte versuchen Sie einen anderen Begriff.\n        </h2>\n        <a href=\"/blog\" class=\"padding-20\">Alle Artikel laden</a>\n      </article>";
  };

  // Methods
  var getPosts = function getPosts(callback) {
    stored_posts = sessionStorage.posts;

    if (stored_posts && stored_posts.length > 100) {
      callback(JSON.parse(stored_posts));
    } else {
      $.getJSON("/blog/posts-api.json", function (data) {
        sessionStorage.posts = JSON.stringify(data);
        callback(data);
      });
    }
  };

  var initLunr = function initLunr(search_value, initLunr_callback) {
    var index = elasticlunr(function () {
      this.addField('title');
      this.addField('content');
      this.setRef('id');
    });

    getPosts(function (data) {
      posts_all = data;

      data.forEach(function (post, i) {
        index.addDoc({
          "id": i,
          "title": post.title,
          "content": post.content
        });
      });

      initLunr_callback(index);
    });
  };

  var startSearch = function startSearch(search_value, startSearch_callback) {
    initLunr(search_value, function (index) {
      var results = index.search(search_value, {
        fields: {
          title: { boost: 2 },
          content: { boost: 1 }
        }
      });
      startSearch_callback(results);
    });
  };

  var displayContent = function displayContent(content) {
    $("#blog").addClass("changing");
    setTimeout(function () {
      $("#blog").children().remove();
      content();
      $("#blog").removeClass("changing");
    }, 333);
  };

  var displaySearchResults = function displaySearchResults(e) {
    if (e.keyCode == 13) {
      var search_word = $("#search_input").val();
      startSearch(search_word, function (results) {
        posts = []; // reset search
        // Find posts with result id
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var result = _step.value;

            var post = posts_all[parseInt(result.ref)];
            posts.push(post);
          } // for
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        displayContent(function () {
          if (posts.length > 0) {
            // Results exist
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = posts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _post = _step2.value;

                $("#blog").append(post_preview(_post));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else {
            // No results found
            $("#blog").append(empty_result(search_word));
          }; // if
        }); // displayContent
      }); // startSearch
    } // if
  };

  return {
    init: init
  };
})();

$(document).ready(function(){
  layout.init();
  search.init();
  cookieBanner.init();

  if($('.schufaTool').length > 0) schufaTool.init();
  ($('.landing__header').length >= 1) ? landing.init() : false;
});
