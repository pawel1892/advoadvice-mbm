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
});
