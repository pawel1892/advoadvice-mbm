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
/**
 * elasticlunr - http://weixsong.github.io
 * Lightweight full-text search engine in Javascript for browser search and offline search. - 0.9.5
 *
 * Copyright (C) 2016 Oliver Nightingale
 * Copyright (C) 2016 Wei Song
 * MIT Licensed
 * @license
 */

!function(){function e(e){if(null===e||"object"!=typeof e)return e;var t=e.constructor();for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}var t=function(e){var n=new t.Index;return n.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),e&&e.call(n,n),n};t.version="0.9.5",lunr=t,t.utils={},t.utils.warn=function(e){return function(t){e.console&&console.warn&&console.warn(t)}}(this),t.utils.toString=function(e){return void 0===e||null===e?"":e.toString()},t.EventEmitter=function(){this.events={}},t.EventEmitter.prototype.addListener=function(){var e=Array.prototype.slice.call(arguments),t=e.pop(),n=e;if("function"!=typeof t)throw new TypeError("last argument must be a function");n.forEach(function(e){this.hasHandler(e)||(this.events[e]=[]),this.events[e].push(t)},this)},t.EventEmitter.prototype.removeListener=function(e,t){if(this.hasHandler(e)){var n=this.events[e].indexOf(t);-1!==n&&(this.events[e].splice(n,1),0==this.events[e].length&&delete this.events[e])}},t.EventEmitter.prototype.emit=function(e){if(this.hasHandler(e)){var t=Array.prototype.slice.call(arguments,1);this.events[e].forEach(function(e){e.apply(void 0,t)},this)}},t.EventEmitter.prototype.hasHandler=function(e){return e in this.events},t.tokenizer=function(e){if(!arguments.length||null===e||void 0===e)return[];if(Array.isArray(e)){var n=e.filter(function(e){return null===e||void 0===e?!1:!0});n=n.map(function(e){return t.utils.toString(e).toLowerCase()});var i=[];return n.forEach(function(e){var n=e.split(t.tokenizer.seperator);i=i.concat(n)},this),i}return e.toString().trim().toLowerCase().split(t.tokenizer.seperator)},t.tokenizer.defaultSeperator=/[\s\-]+/,t.tokenizer.seperator=t.tokenizer.defaultSeperator,t.tokenizer.setSeperator=function(e){null!==e&&void 0!==e&&"object"==typeof e&&(t.tokenizer.seperator=e)},t.tokenizer.resetSeperator=function(){t.tokenizer.seperator=t.tokenizer.defaultSeperator},t.tokenizer.getSeperator=function(){return t.tokenizer.seperator},t.Pipeline=function(){this._queue=[]},t.Pipeline.registeredFunctions={},t.Pipeline.registerFunction=function(e,n){n in t.Pipeline.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+n),e.label=n,t.Pipeline.registeredFunctions[n]=e},t.Pipeline.getRegisteredFunction=function(e){return e in t.Pipeline.registeredFunctions!=!0?null:t.Pipeline.registeredFunctions[e]},t.Pipeline.warnIfFunctionNotRegistered=function(e){var n=e.label&&e.label in this.registeredFunctions;n||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var n=new t.Pipeline;return e.forEach(function(e){var i=t.Pipeline.getRegisteredFunction(e);if(!i)throw new Error("Cannot load un-registered function: "+e);n.add(i)}),n},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){t.Pipeline.warnIfFunctionNotRegistered(e),this._queue.push(e)},this)},t.Pipeline.prototype.after=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._queue.indexOf(e);if(-1===i)throw new Error("Cannot find existingFn");this._queue.splice(i+1,0,n)},t.Pipeline.prototype.before=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._queue.indexOf(e);if(-1===i)throw new Error("Cannot find existingFn");this._queue.splice(i,0,n)},t.Pipeline.prototype.remove=function(e){var t=this._queue.indexOf(e);-1!==t&&this._queue.splice(t,1)},t.Pipeline.prototype.run=function(e){for(var t=[],n=e.length,i=this._queue.length,o=0;n>o;o++){for(var r=e[o],s=0;i>s&&(r=this._queue[s](r,o,e),void 0!==r&&null!==r);s++);void 0!==r&&null!==r&&t.push(r)}return t},t.Pipeline.prototype.reset=function(){this._queue=[]},t.Pipeline.prototype.get=function(){return this._queue},t.Pipeline.prototype.toJSON=function(){return this._queue.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},t.Index=function(){this._fields=[],this._ref="id",this.pipeline=new t.Pipeline,this.documentStore=new t.DocumentStore,this.index={},this.eventEmitter=new t.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},t.Index.prototype.on=function(){var e=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,e)},t.Index.prototype.off=function(e,t){return this.eventEmitter.removeListener(e,t)},t.Index.load=function(e){e.version!==t.version&&t.utils.warn("version mismatch: current "+t.version+" importing "+e.version);var n=new this;n._fields=e.fields,n._ref=e.ref,n.documentStore=t.DocumentStore.load(e.documentStore),n.pipeline=t.Pipeline.load(e.pipeline),n.index={};for(var i in e.index)n.index[i]=t.InvertedIndex.load(e.index[i]);return n},t.Index.prototype.addField=function(e){return this._fields.push(e),this.index[e]=new t.InvertedIndex,this},t.Index.prototype.setRef=function(e){return this._ref=e,this},t.Index.prototype.saveDocument=function(e){return this.documentStore=new t.DocumentStore(e),this},t.Index.prototype.addDoc=function(e,n){if(e){var n=void 0===n?!0:n,i=e[this._ref];this.documentStore.addDoc(i,e),this._fields.forEach(function(n){var o=this.pipeline.run(t.tokenizer(e[n]));this.documentStore.addFieldLength(i,n,o.length);var r={};o.forEach(function(e){e in r?r[e]+=1:r[e]=1},this);for(var s in r){var u=r[s];u=Math.sqrt(u),this.index[n].addToken(s,{ref:i,tf:u})}},this),n&&this.eventEmitter.emit("add",e,this)}},t.Index.prototype.removeDocByRef=function(e){if(e&&this.documentStore.isDocStored()!==!1&&this.documentStore.hasDoc(e)){var t=this.documentStore.getDoc(e);this.removeDoc(t,!1)}},t.Index.prototype.removeDoc=function(e,n){if(e){var n=void 0===n?!0:n,i=e[this._ref];this.documentStore.hasDoc(i)&&(this.documentStore.removeDoc(i),this._fields.forEach(function(n){var o=this.pipeline.run(t.tokenizer(e[n]));o.forEach(function(e){this.index[n].removeToken(e,i)},this)},this),n&&this.eventEmitter.emit("remove",e,this))}},t.Index.prototype.updateDoc=function(e,t){var t=void 0===t?!0:t;this.removeDocByRef(e[this._ref],!1),this.addDoc(e,!1),t&&this.eventEmitter.emit("update",e,this)},t.Index.prototype.idf=function(e,t){var n="@"+t+"/"+e;if(Object.prototype.hasOwnProperty.call(this._idfCache,n))return this._idfCache[n];var i=this.index[t].getDocFreq(e),o=1+Math.log(this.documentStore.length/(i+1));return this._idfCache[n]=o,o},t.Index.prototype.getFields=function(){return this._fields.slice()},t.Index.prototype.search=function(e,n){if(!e)return[];var i=null;null!=n&&(i=JSON.stringify(n));var o=new t.Configuration(i,this.getFields()).get(),r=this.pipeline.run(t.tokenizer(e)),s={};for(var u in o){var a=this.fieldSearch(r,u,o),l=o[u].boost;for(var d in a)a[d]=a[d]*l;for(var d in a)d in s?s[d]+=a[d]:s[d]=a[d]}var c=[];for(var d in s)c.push({ref:d,score:s[d]});return c.sort(function(e,t){return t.score-e.score}),c},t.Index.prototype.fieldSearch=function(e,t,n){var i=n[t].bool,o=n[t].expand,r=n[t].boost,s=null,u={};return 0!==r?(e.forEach(function(e){var n=[e];1==o&&(n=this.index[t].expandToken(e));var r={};n.forEach(function(n){var o=this.index[t].getDocs(n),a=this.idf(n,t);if(s&&"AND"==i){var l={};for(var d in s)d in o&&(l[d]=o[d]);o=l}n==e&&this.fieldSearchStats(u,n,o);for(var d in o){var c=this.index[t].getTermFrequency(n,d),f=this.documentStore.getFieldLength(d,t),h=1;0!=f&&(h=1/Math.sqrt(f));var p=1;n!=e&&(p=.15*(1-(n.length-e.length)/n.length));var v=c*a*h*p;d in r?r[d]+=v:r[d]=v}},this),s=this.mergeScores(s,r,i)},this),s=this.coordNorm(s,u,e.length)):void 0},t.Index.prototype.mergeScores=function(e,t,n){if(!e)return t;if("AND"==n){var i={};for(var o in t)o in e&&(i[o]=e[o]+t[o]);return i}for(var o in t)o in e?e[o]+=t[o]:e[o]=t[o];return e},t.Index.prototype.fieldSearchStats=function(e,t,n){for(var i in n)i in e?e[i].push(t):e[i]=[t]},t.Index.prototype.coordNorm=function(e,t,n){for(var i in e)if(i in t){var o=t[i].length;e[i]=e[i]*o/n}return e},t.Index.prototype.toJSON=function(){var e={};return this._fields.forEach(function(t){e[t]=this.index[t].toJSON()},this),{version:t.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),index:e,pipeline:this.pipeline.toJSON()}},t.Index.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},t.DocumentStore=function(e){this._save=null===e||void 0===e?!0:e,this.docs={},this.docInfo={},this.length=0},t.DocumentStore.load=function(e){var t=new this;return t.length=e.length,t.docs=e.docs,t.docInfo=e.docInfo,t._save=e.save,t},t.DocumentStore.prototype.isDocStored=function(){return this._save},t.DocumentStore.prototype.addDoc=function(t,n){this.hasDoc(t)||this.length++,this.docs[t]=this._save===!0?e(n):null},t.DocumentStore.prototype.getDoc=function(e){return this.hasDoc(e)===!1?null:this.docs[e]},t.DocumentStore.prototype.hasDoc=function(e){return e in this.docs},t.DocumentStore.prototype.removeDoc=function(e){this.hasDoc(e)&&(delete this.docs[e],delete this.docInfo[e],this.length--)},t.DocumentStore.prototype.addFieldLength=function(e,t,n){null!==e&&void 0!==e&&0!=this.hasDoc(e)&&(this.docInfo[e]||(this.docInfo[e]={}),this.docInfo[e][t]=n)},t.DocumentStore.prototype.updateFieldLength=function(e,t,n){null!==e&&void 0!==e&&0!=this.hasDoc(e)&&this.addFieldLength(e,t,n)},t.DocumentStore.prototype.getFieldLength=function(e,t){return null===e||void 0===e?0:e in this.docs&&t in this.docInfo[e]?this.docInfo[e][t]:0},t.DocumentStore.prototype.toJSON=function(){return{docs:this.docs,docInfo:this.docInfo,length:this.length,save:this._save}},t.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},t={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",o=n+"[^aeiouy]*",r=i+"[aeiou]*",s="^("+o+")?"+r+o,u="^("+o+")?"+r+o+"("+r+")?$",a="^("+o+")?"+r+o+r+o,l="^("+o+")?"+i,d=new RegExp(s),c=new RegExp(a),f=new RegExp(u),h=new RegExp(l),p=/^(.+?)(ss|i)es$/,v=/^(.+?)([^s])s$/,g=/^(.+?)eed$/,m=/^(.+?)(ed|ing)$/,y=/.$/,S=/(at|bl|iz)$/,x=new RegExp("([^aeiouylsz])\\1$"),w=new RegExp("^"+o+i+"[^aeiouwxy]$"),I=/^(.+?[^aeiou])y$/,b=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,E=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,D=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,F=/^(.+?)(s|t)(ion)$/,_=/^(.+?)e$/,P=/ll$/,k=new RegExp("^"+o+i+"[^aeiouwxy]$"),z=function(n){var i,o,r,s,u,a,l;if(n.length<3)return n;if(r=n.substr(0,1),"y"==r&&(n=r.toUpperCase()+n.substr(1)),s=p,u=v,s.test(n)?n=n.replace(s,"$1$2"):u.test(n)&&(n=n.replace(u,"$1$2")),s=g,u=m,s.test(n)){var z=s.exec(n);s=d,s.test(z[1])&&(s=y,n=n.replace(s,""))}else if(u.test(n)){var z=u.exec(n);i=z[1],u=h,u.test(i)&&(n=i,u=S,a=x,l=w,u.test(n)?n+="e":a.test(n)?(s=y,n=n.replace(s,"")):l.test(n)&&(n+="e"))}if(s=I,s.test(n)){var z=s.exec(n);i=z[1],n=i+"i"}if(s=b,s.test(n)){var z=s.exec(n);i=z[1],o=z[2],s=d,s.test(i)&&(n=i+e[o])}if(s=E,s.test(n)){var z=s.exec(n);i=z[1],o=z[2],s=d,s.test(i)&&(n=i+t[o])}if(s=D,u=F,s.test(n)){var z=s.exec(n);i=z[1],s=c,s.test(i)&&(n=i)}else if(u.test(n)){var z=u.exec(n);i=z[1]+z[2],u=c,u.test(i)&&(n=i)}if(s=_,s.test(n)){var z=s.exec(n);i=z[1],s=c,u=f,a=k,(s.test(i)||u.test(i)&&!a.test(i))&&(n=i)}return s=P,u=c,s.test(n)&&u.test(n)&&(s=y,n=n.replace(s,"")),"y"==r&&(n=r.toLowerCase()+n.substr(1)),n};return z}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),t.stopWordFilter=function(e){return e&&t.stopWordFilter.stopWords[e]!==!0?e:void 0},t.clearStopWords=function(){t.stopWordFilter.stopWords={}},t.addStopWords=function(e){null!=e&&Array.isArray(e)!==!1&&e.forEach(function(e){t.stopWordFilter.stopWords[e]=!0},this)},t.resetStopWords=function(){t.stopWordFilter.stopWords=t.defaultStopWords},t.defaultStopWords={"":!0,a:!0,able:!0,about:!0,across:!0,after:!0,all:!0,almost:!0,also:!0,am:!0,among:!0,an:!0,and:!0,any:!0,are:!0,as:!0,at:!0,be:!0,because:!0,been:!0,but:!0,by:!0,can:!0,cannot:!0,could:!0,dear:!0,did:!0,"do":!0,does:!0,either:!0,"else":!0,ever:!0,every:!0,"for":!0,from:!0,get:!0,got:!0,had:!0,has:!0,have:!0,he:!0,her:!0,hers:!0,him:!0,his:!0,how:!0,however:!0,i:!0,"if":!0,"in":!0,into:!0,is:!0,it:!0,its:!0,just:!0,least:!0,let:!0,like:!0,likely:!0,may:!0,me:!0,might:!0,most:!0,must:!0,my:!0,neither:!0,no:!0,nor:!0,not:!0,of:!0,off:!0,often:!0,on:!0,only:!0,or:!0,other:!0,our:!0,own:!0,rather:!0,said:!0,say:!0,says:!0,she:!0,should:!0,since:!0,so:!0,some:!0,than:!0,that:!0,the:!0,their:!0,them:!0,then:!0,there:!0,these:!0,they:!0,"this":!0,tis:!0,to:!0,too:!0,twas:!0,us:!0,wants:!0,was:!0,we:!0,were:!0,what:!0,when:!0,where:!0,which:!0,"while":!0,who:!0,whom:!0,why:!0,will:!0,"with":!0,would:!0,yet:!0,you:!0,your:!0},t.stopWordFilter.stopWords=t.defaultStopWords,t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),t.trimmer=function(e){if(null===e||void 0===e)throw new Error("token should not be undefined");return e.replace(/^\W+/,"").replace(/\W+$/,"")},t.Pipeline.registerFunction(t.trimmer,"trimmer"),t.InvertedIndex=function(){this.root={docs:{},df:0}},t.InvertedIndex.load=function(e){var t=new this;return t.root=e.root,t},t.InvertedIndex.prototype.addToken=function(e,t,n){for(var n=n||this.root,i=0;i<=e.length-1;){var o=e[i];o in n||(n[o]={docs:{},df:0}),i+=1,n=n[o]}var r=t.ref;n.docs[r]?n.docs[r]={tf:t.tf}:(n.docs[r]={tf:t.tf},n.df+=1)},t.InvertedIndex.prototype.hasToken=function(e){if(!e)return!1;for(var t=this.root,n=0;n<e.length;n++){if(!t[e[n]])return!1;t=t[e[n]]}return!0},t.InvertedIndex.prototype.getNode=function(e){if(!e)return null;for(var t=this.root,n=0;n<e.length;n++){if(!t[e[n]])return null;t=t[e[n]]}return t},t.InvertedIndex.prototype.getDocs=function(e){var t=this.getNode(e);return null==t?{}:t.docs},t.InvertedIndex.prototype.getTermFrequency=function(e,t){var n=this.getNode(e);return null==n?0:t in n.docs?n.docs[t].tf:0},t.InvertedIndex.prototype.getDocFreq=function(e){var t=this.getNode(e);return null==t?0:t.df},t.InvertedIndex.prototype.removeToken=function(e,t){if(e){var n=this.getNode(e);null!=n&&t in n.docs&&(delete n.docs[t],n.df-=1)}},t.InvertedIndex.prototype.expandToken=function(e,t,n){if(null==e||""==e)return[];var t=t||[];if(void 0==n&&(n=this.getNode(e),null==n))return t;n.df>0&&t.push(e);for(var i in n)"docs"!==i&&"df"!==i&&this.expandToken(e+i,t,n[i]);return t},t.InvertedIndex.prototype.toJSON=function(){return{root:this.root}},t.Configuration=function(e,n){var e=e||"";if(void 0==n||null==n)throw new Error("fields should not be null");this.config={};var i;try{i=JSON.parse(e),this.buildUserConfig(i,n)}catch(o){t.utils.warn("user configuration parse failed, will use default configuration"),this.buildDefaultConfig(n)}},t.Configuration.prototype.buildDefaultConfig=function(e){this.reset(),e.forEach(function(e){this.config[e]={boost:1,bool:"OR",expand:!1}},this)},t.Configuration.prototype.buildUserConfig=function(e,n){var i="OR",o=!1;if(this.reset(),"bool"in e&&(i=e.bool||i),"expand"in e&&(o=e.expand||o),"fields"in e)for(var r in e.fields)if(n.indexOf(r)>-1){var s=e.fields[r],u=o;void 0!=s.expand&&(u=s.expand),this.config[r]={boost:s.boost||0===s.boost?s.boost:1,bool:s.bool||i,expand:u}}else t.utils.warn("field name in user configuration not found in index instance fields");else this.addAllFields2UserConfig(i,o,n)},t.Configuration.prototype.addAllFields2UserConfig=function(e,t,n){n.forEach(function(n){this.config[n]={boost:1,bool:e,expand:t}},this)},t.Configuration.prototype.get=function(){return this.config},t.Configuration.prototype.reset=function(){this.config={}},lunr.SortedSet=function(){this.length=0,this.elements=[]},lunr.SortedSet.load=function(e){var t=new this;return t.elements=e,t.length=e.length,t},lunr.SortedSet.prototype.add=function(){var e,t;for(e=0;e<arguments.length;e++)t=arguments[e],~this.indexOf(t)||this.elements.splice(this.locationFor(t),0,t);this.length=this.elements.length},lunr.SortedSet.prototype.toArray=function(){return this.elements.slice()},lunr.SortedSet.prototype.map=function(e,t){return this.elements.map(e,t)},lunr.SortedSet.prototype.forEach=function(e,t){return this.elements.forEach(e,t)},lunr.SortedSet.prototype.indexOf=function(e){for(var t=0,n=this.elements.length,i=n-t,o=t+Math.floor(i/2),r=this.elements[o];i>1;){if(r===e)return o;e>r&&(t=o),r>e&&(n=o),i=n-t,o=t+Math.floor(i/2),r=this.elements[o]}return r===e?o:-1},lunr.SortedSet.prototype.locationFor=function(e){for(var t=0,n=this.elements.length,i=n-t,o=t+Math.floor(i/2),r=this.elements[o];i>1;)e>r&&(t=o),r>e&&(n=o),i=n-t,o=t+Math.floor(i/2),r=this.elements[o];return r>e?o:e>r?o+1:void 0},lunr.SortedSet.prototype.intersect=function(e){for(var t=new lunr.SortedSet,n=0,i=0,o=this.length,r=e.length,s=this.elements,u=e.elements;;){if(n>o-1||i>r-1)break;s[n]!==u[i]?s[n]<u[i]?n++:s[n]>u[i]&&i++:(t.add(s[n]),n++,i++)}return t},lunr.SortedSet.prototype.clone=function(){var e=new lunr.SortedSet;return e.elements=this.toArray(),e.length=e.elements.length,e},lunr.SortedSet.prototype.union=function(e){var t,n,i;this.length>=e.length?(t=this,n=e):(t=e,n=this),i=t.clone();for(var o=0,r=n.toArray();o<r.length;o++)i.add(r[o]);return i},lunr.SortedSet.prototype.toJSON=function(){return this.toArray()},function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.elasticlunr=t()}(this,function(){return t})}();
/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */


!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var e=function(){};e.version="2.0.5",window.addEventListener("mousewheel",function(){});var t="data-scrollmagic-pin-spacer";e.Controller=function(r){var o,s,a="ScrollMagic.Controller",l="FORWARD",c="REVERSE",u="PAUSED",f=n.defaults,d=this,h=i.extend({},f,r),g=[],p=!1,v=0,m=u,w=!0,y=0,S=!0,b=function(){for(var e in h)f.hasOwnProperty(e)||delete h[e];if(h.container=i.get.elements(h.container)[0],!h.container)throw a+" init failed.";w=h.container===window||h.container===document.body||!document.body.contains(h.container),w&&(h.container=window),y=z(),h.container.addEventListener("resize",T),h.container.addEventListener("scroll",T),h.refreshInterval=parseInt(h.refreshInterval)||f.refreshInterval,E()},E=function(){h.refreshInterval>0&&(s=window.setTimeout(A,h.refreshInterval))},x=function(){return h.vertical?i.get.scrollTop(h.container):i.get.scrollLeft(h.container)},z=function(){return h.vertical?i.get.height(h.container):i.get.width(h.container)},C=this._setScrollPos=function(e){h.vertical?w?window.scrollTo(i.get.scrollLeft(),e):h.container.scrollTop=e:w?window.scrollTo(e,i.get.scrollTop()):h.container.scrollLeft=e},F=function(){if(S&&p){var e=i.type.Array(p)?p:g.slice(0);p=!1;var t=v;v=d.scrollPos();var n=v-t;0!==n&&(m=n>0?l:c),m===c&&e.reverse(),e.forEach(function(e){e.update(!0)})}},L=function(){o=i.rAF(F)},T=function(e){"resize"==e.type&&(y=z(),m=u),p!==!0&&(p=!0,L())},A=function(){if(!w&&y!=z()){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){e=document.createEvent("Event"),e.initEvent("resize",!1,!1)}h.container.dispatchEvent(e)}g.forEach(function(e){e.refresh()}),E()};this._options=h;var O=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(t){if(i.type.Array(t))t.forEach(function(e){d.addScene(e)});else if(t instanceof e.Scene)if(t.controller()!==d)t.addTo(d);else if(g.indexOf(t)<0){g.push(t),g=O(g),t.on("shift.controller_sort",function(){g=O(g)});for(var n in h.globalSceneOptions)t[n]&&t[n].call(t,h.globalSceneOptions[n])}return d},this.removeScene=function(e){if(i.type.Array(e))e.forEach(function(e){d.removeScene(e)});else{var t=g.indexOf(e);t>-1&&(e.off("shift.controller_sort"),g.splice(t,1),e.remove())}return d},this.updateScene=function(t,n){return i.type.Array(t)?t.forEach(function(e){d.updateScene(e,n)}):n?t.update(!0):p!==!0&&t instanceof e.Scene&&(p=p||[],-1==p.indexOf(t)&&p.push(t),p=O(p),L()),d},this.update=function(e){return T({type:"resize"}),e&&F(),d},this.scrollTo=function(n,r){if(i.type.Number(n))C.call(h.container,n,r);else if(n instanceof e.Scene)n.controller()===d&&d.scrollTo(n.scrollOffset(),r);else if(i.type.Function(n))C=n;else{var o=i.get.elements(n)[0];if(o){for(;o.parentNode.hasAttribute(t);)o=o.parentNode;var s=h.vertical?"top":"left",a=i.get.offset(h.container),l=i.get.offset(o);w||(a[s]-=d.scrollPos()),d.scrollTo(l[s]-a[s],r)}}return d},this.scrollPos=function(e){return arguments.length?(i.type.Function(e)&&(x=e),d):x.call(d)},this.info=function(e){var t={size:y,vertical:h.vertical,scrollPos:v,scrollDirection:m,container:h.container,isDocument:w};return arguments.length?void 0!==t[e]?t[e]:void 0:t},this.loglevel=function(){return d},this.enabled=function(e){return arguments.length?(S!=e&&(S=!!e,d.updateScene(g,!0)),d):S},this.destroy=function(e){window.clearTimeout(s);for(var t=g.length;t--;)g[t].destroy(e);return h.container.removeEventListener("resize",T),h.container.removeEventListener("scroll",T),i.cAF(o),null},b(),d};var n={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,t){n.defaults[e]=t},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=i.extend({},this),t.apply(this,arguments)||this},i.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(n){var o,s,a="BEFORE",l="DURING",c="AFTER",u=r.defaults,f=this,d=i.extend({},u,n),h=a,g=0,p={start:0,end:0},v=0,m=!0,w=function(){for(var e in d)u.hasOwnProperty(e)||delete d[e];for(var t in u)L(t);C()},y={};this.on=function(e,t){return i.type.Function(t)&&(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1];"*"!=r&&(y[r]||(y[r]=[]),y[r].push({namespace:i||"",callback:t}))})),f},this.off=function(e,t){return e?(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1]||"",o="*"===r?Object.keys(y):[r];o.forEach(function(e){for(var n=y[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete y[e]})}),f):f},this.trigger=function(t,n){if(t){var r=t.trim().split("."),i=r[0],o=r[1],s=y[i];s&&s.forEach(function(t){o&&o!==t.namespace||t.callback.call(f,new e.Event(i,t.namespace,f,n))})}return f},f.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?E():"reverse"===e.what&&f.update())}).on("shift.internal",function(){S(),f.update()}),this.addTo=function(t){return t instanceof e.Controller&&s!=t&&(s&&s.removeScene(f),s=t,C(),b(!0),E(!0),S(),s.info("container").addEventListener("resize",x),t.addScene(f),f.trigger("add",{controller:s}),f.update()),f},this.enabled=function(e){return arguments.length?(m!=e&&(m=!!e,f.update(!0)),f):m},this.remove=function(){if(s){s.info("container").removeEventListener("resize",x);var e=s;s=void 0,e.removeScene(f),f.trigger("remove")}return f},this.destroy=function(e){return f.trigger("destroy",{reset:e}),f.remove(),f.off("*.*"),null},this.update=function(e){if(s)if(e)if(s.enabled()&&m){var t,n=s.info("scrollPos");t=d.duration>0?(n-p.start)/(p.end-p.start):n>=p.start?1:0,f.trigger("update",{startPos:p.start,endPos:p.end,scrollPos:n}),f.progress(t)}else T&&h===l&&O(!0);else s.updateScene(f,!1);return f},this.refresh=function(){return b(),E(),f},this.progress=function(e){if(arguments.length){var t=!1,n=h,r=s?s.info("scrollDirection"):"PAUSED",i=d.reverse||e>=g;if(0===d.duration?(t=g!=e,g=1>e&&i?0:1,h=0===g?a:l):0>e&&h!==a&&i?(g=0,h=a,t=!0):e>=0&&1>e&&i?(g=e,h=l,t=!0):e>=1&&h!==c?(g=1,h=c,t=!0):h!==l||i||O(),t){var o={progress:g,state:h,scrollDirection:r},u=h!=n,p=function(e){f.trigger(e,o)};u&&n!==l&&(p("enter"),p(n===a?"start":"end")),p("progress"),u&&h!==l&&(p(h===a?"start":"end"),p("leave"))}return f}return g};var S=function(){p={start:v+d.offset},s&&d.triggerElement&&(p.start-=s.info("size")*d.triggerHook),p.end=p.start+d.duration},b=function(e){if(o){var t="duration";F(t,o.call(f))&&!e&&(f.trigger("change",{what:t,newval:d[t]}),f.trigger("shift",{reason:t}))}},E=function(e){var n=0,r=d.triggerElement;if(s&&r){for(var o=s.info(),a=i.get.offset(o.container),l=o.vertical?"top":"left";r.parentNode.hasAttribute(t);)r=r.parentNode;var c=i.get.offset(r);o.isDocument||(a[l]-=s.scrollPos()),n=c[l]-a[l]}var u=n!=v;v=n,u&&!e&&f.trigger("shift",{reason:"triggerElementPosition"})},x=function(){d.triggerHook>0&&f.trigger("shift",{reason:"containerResize"})},z=i.extend(r.validate,{duration:function(e){if(i.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return s?s.info("size")*t:0}}if(i.type.Function(e)){o=e;try{e=parseFloat(o())}catch(t){e=-1}}if(e=parseFloat(e),!i.type.Number(e)||0>e)throw o?(o=void 0,0):0;return e}}),C=function(e){e=arguments.length?[e]:Object.keys(z),e.forEach(function(e){var t;if(z[e])try{t=z[e](d[e])}catch(n){t=u[e]}finally{d[e]=t}})},F=function(e,t){var n=!1,r=d[e];return d[e]!=t&&(d[e]=t,C(e),n=r!=d[e]),n},L=function(e){f[e]||(f[e]=function(t){return arguments.length?("duration"===e&&(o=void 0),F(e,t)&&(f.trigger("change",{what:e,newval:d[e]}),r.shifts.indexOf(e)>-1&&f.trigger("shift",{reason:e})),f):d[e]})};this.controller=function(){return s},this.state=function(){return h},this.scrollOffset=function(){return p.start},this.triggerPosition=function(){var e=d.offset;return s&&(e+=d.triggerElement?v:s.info("size")*f.triggerHook()),e};var T,A;f.on("shift.internal",function(e){var t="duration"===e.reason;(h===c&&t||h===l&&0===d.duration)&&O(),t&&_()}).on("progress.internal",function(){O()}).on("add.internal",function(){_()}).on("destroy.internal",function(e){f.removePin(e.reset)});var O=function(e){if(T&&s){var t=s.info(),n=A.spacer.firstChild;if(e||h!==l){var r={position:A.inFlow?"relative":"absolute",top:0,left:0},o=i.css(n,"position")!=r.position;A.pushFollowers?d.duration>0&&(h===c&&0===parseFloat(i.css(A.spacer,"padding-top"))?o=!0:h===a&&0===parseFloat(i.css(A.spacer,"padding-bottom"))&&(o=!0)):r[t.vertical?"top":"left"]=d.duration*g,i.css(n,r),o&&_()}else{"fixed"!=i.css(n,"position")&&(i.css(n,{position:"fixed"}),_());var u=i.get.offset(A.spacer,!0),f=d.reverse||0===d.duration?t.scrollPos-p.start:Math.round(g*d.duration*10)/10;u[t.vertical?"top":"left"]+=f,i.css(A.spacer.firstChild,{top:u.top,left:u.left})}}},_=function(){if(T&&s&&A.inFlow){var e=h===l,t=s.info("vertical"),n=A.spacer.firstChild,r=i.isMarginCollapseType(i.css(A.spacer,"display")),o={};A.relSize.width||A.relSize.autoFullWidth?e?i.css(T,{width:i.get.width(A.spacer)}):i.css(T,{width:"100%"}):(o["min-width"]=i.get.width(t?T:n,!0,!0),o.width=e?o["min-width"]:"auto"),A.relSize.height?e?i.css(T,{height:i.get.height(A.spacer)-(A.pushFollowers?d.duration:0)}):i.css(T,{height:"100%"}):(o["min-height"]=i.get.height(t?n:T,!0,!r),o.height=e?o["min-height"]:"auto"),A.pushFollowers&&(o["padding"+(t?"Top":"Left")]=d.duration*g,o["padding"+(t?"Bottom":"Right")]=d.duration*(1-g)),i.css(A.spacer,o)}},N=function(){s&&T&&h===l&&!s.info("isDocument")&&O()},P=function(){s&&T&&h===l&&((A.relSize.width||A.relSize.autoFullWidth)&&i.get.width(window)!=i.get.width(A.spacer.parentNode)||A.relSize.height&&i.get.height(window)!=i.get.height(A.spacer.parentNode))&&_()},D=function(e){s&&T&&h===l&&!s.info("isDocument")&&(e.preventDefault(),s._setScrollPos(s.info("scrollPos")-((e.wheelDelta||e[s.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,n){var r={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(n=i.extend({},r,n),e=i.get.elements(e)[0],!e)return f;if("fixed"===i.css(e,"position"))return f;if(T){if(T===e)return f;f.removePin()}T=e;var o=T.parentNode.style.display,s=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];T.parentNode.style.display="none";var a="absolute"!=i.css(T,"position"),l=i.css(T,s.concat(["display"])),c=i.css(T,["width","height"]);T.parentNode.style.display=o,!a&&n.pushFollowers&&(n.pushFollowers=!1);var u=T.parentNode.insertBefore(document.createElement("div"),T),d=i.extend(l,{position:a?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(a||i.extend(d,i.css(T,["width","height"])),i.css(u,d),u.setAttribute(t,""),i.addClass(u,n.spacerClass),A={spacer:u,relSize:{width:"%"===c.width.slice(-1),height:"%"===c.height.slice(-1),autoFullWidth:"auto"===c.width&&a&&i.isMarginCollapseType(l.display)},pushFollowers:n.pushFollowers,inFlow:a},!T.___origStyle){T.___origStyle={};var h=T.style,g=s.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]);g.forEach(function(e){T.___origStyle[e]=h[e]||""})}return A.relSize.width&&i.css(u,{width:c.width}),A.relSize.height&&i.css(u,{height:c.height}),u.appendChild(T),i.css(T,{position:a?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(A.relSize.width||A.relSize.autoFullWidth)&&i.css(T,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",N),window.addEventListener("resize",N),window.addEventListener("resize",P),T.addEventListener("mousewheel",D),T.addEventListener("DOMMouseScroll",D),O(),f},this.removePin=function(e){if(T){if(h===l&&O(!0),e||!s){var n=A.spacer.firstChild;if(n.hasAttribute(t)){var r=A.spacer.style,o=["margin","marginLeft","marginRight","marginTop","marginBottom"];margins={},o.forEach(function(e){margins[e]=r[e]||""}),i.css(n,margins)}A.spacer.parentNode.insertBefore(n,A.spacer),A.spacer.parentNode.removeChild(A.spacer),T.parentNode.hasAttribute(t)||(i.css(T,T.___origStyle),delete T.___origStyle)}window.removeEventListener("scroll",N),window.removeEventListener("resize",N),window.removeEventListener("resize",P),T.removeEventListener("mousewheel",D),T.removeEventListener("DOMMouseScroll",D),T=void 0}return f};var R,k=[];return f.on("destroy.internal",function(e){f.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=i.get.elements(e);return 0!==n.length&&i.type.String(t)?(k.length>0&&f.removeClassToggle(),R=t,k=n,f.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?i.addClass:i.removeClass;k.forEach(function(e){t(e,R)})}),f):f},this.removeClassToggle=function(e){return e&&k.forEach(function(e){i.removeClass(e,R)}),f.off("start.internal_class end.internal_class"),R=void 0,k=[],f},w(),f};var r={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!i.type.Number(e))throw 0;return e},triggerElement:function(e){if(e=e||void 0){var t=i.get.elements(e)[0];if(!t)throw 0;e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(i.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw 0;e=t[e]}return e},reverse:function(e){return!!e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(e,t,n,i){e in r.defaults||(r.defaults[e]=t,r.validate[e]=n,i&&r.shifts.push(e))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=i.extend({},this),t.apply(this,arguments)||this},i.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){r=r||{};for(var i in r)this[i]=r[i];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var i=e._util=function(e){var t,n={},r=function(e){return parseFloat(e)||0},i=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},o=function(t,n,o,s){if(n=n===document?e:n,n===e)s=!1;else if(!f.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var a=(o?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(o&&s){var l=i(n);a+="Height"===t?r(l.marginTop)+r(l.marginBottom):r(l.marginLeft)+r(l.marginRight)}return a},s=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};n.extend=function(e){for(e=e||{},t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},n.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var a=0,l=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(t=0;!c&&t<l.length;++t)c=e[l[t]+"RequestAnimationFrame"],u=e[l[t]+"CancelAnimationFrame"]||e[l[t]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-a)),i=e.setTimeout(function(){t(n+r)},r);return a=n+r,i}),u||(u=function(t){e.clearTimeout(t)}),n.rAF=c.bind(e),n.cAF=u.bind(e);var f=n.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};f.String=function(e){return"string"===f(e)},f.Function=function(e){return"function"===f(e)},f.Array=function(e){return Array.isArray(e)},f.Number=function(e){return!f.Array(e)&&e-parseFloat(e)+1>=0},f.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var d=n.get={};return d.elements=function(t){var n=[];if(f.String(t))try{t=document.querySelectorAll(t)}catch(e){return n}if("nodelist"===f(t)||f.Array(t))for(var r=0,i=n.length=t.length;i>r;r++){var o=t[r];n[r]=f.DomElement(o)?o:d.elements(o)}else(f.DomElement(t)||t===document||t===e)&&(n=[t]);return n},d.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},d.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},d.width=function(e,t,n){return o("width",e,t,n)},d.height=function(e,t,n){return o("height",e,t,n)},d.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=d.scrollTop(),n.left+=d.scrollLeft())}return n},n.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},n.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},n.css=function(e,t){if(f.String(t))return i(e)[s(t)];if(f.Array(t)){var n={},r=i(e);return t.forEach(function(e){n[e]=r[s(e)]}),n}for(var o in t){var a=t[o];a==parseFloat(a)&&(a+="px"),e.style[s(o)]=a}},n}(window||{});return e});
/*
- Array.find
- Array.filter
- Object.values
*/


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

if (!Array.prototype.filter)
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined)
      while (++i !== len)
        // checks to see if the key was set
        if (i in this)
          if (func(t[i], i, t))
            res[c++] = t[i];
    else
      while (++i !== len)
        // checks to see if the key was set
        if (i in this)
          if (func.call(thisArg, t[i], i, t))
            res[c++] = t[i];

    res.length = c; // shrink down array to proper size
    return res;
  };

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
    thisState.formContact = []
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
  var questionAnswerString = (frage) => {
    let questionObject = thisState.quiz[thisState.category].find(obj => obj.frage == frage)
    return (typeof questionObject == 'undefined') ? false : questionObject.antwort
  }
  var questionAnswer = (frage, antwort) => questionAnswerString(frage) == antwort

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
      if(typeof thisState.quiz[thisState.category] == 'undefined'){
        thisState.quiz[thisState.category] = serializedObjectFromForm()
      }else{
        addOrReplace(thisState.quiz[thisState.category], serializedObjectFromForm())
      }
    }
  }

  var addOrReplace = function(originalArray, newArray){
    newArray.map(newObj => {
      var indexOfQuestion = originalArray.map(obj => obj.frage).indexOf(newObj.frage)
      return (indexOfQuestion < 0) ? originalArray.push(newObj) : originalArray.splice(indexOfQuestion, 1, newObj)
    })
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
    var stringOfContactState = thisState.formContact
      .filter(obj => obj.antwort.length > 0)
      .map(obj => `${obj.frage}: ${obj.antwort} |\n`)
      .join('')
    var stringOfQuizState = Object.values(thisState.quiz)
      .map(quiz => {
        return quiz.filter(obj => obj.antwort.length > 0)
          .map(obj => `${obj.frage}: ${obj.antwort} |\n`)
          .join('')
      }).join('')
    var messageString = `${thisState.formContact[0].antwort} hat den Vorabcheck durchgeführt und folgende Dinge ausgefüllt: \n\n\n ${stringOfContactState} ||\n\n ${stringOfQuizState}`

    $.post('https://mailthis.to/info@advoadvice.de', {
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
      '1': {
        beforeExit: () => {
          if(thisState.quiz[thisState.category][0].antwort == 'Nein' &&
            thisState.$slides[2].hasClass('schufaTool__category--score--1a')){
            // Remove the follow up questions slide
            thisState.$removedSlides = thisState.$slides.splice(2, 1)
          }else if(thisState.quiz[thisState.category][0].antwort == 'Ja' &&
            !thisState.$slides[2].hasClass('schufaTool__category--score--1a')){
            // Add missing slide
            thisState.$slides.splice(2, 0, ...thisState.$removedSlides)
            thisState.$removedSlides = []
          }
        }
      },
      '2': {
        afterRender: () => {
          try {
            thisState.$app.find('.schufaTool__auskunft').hide()

            switch(questionAnswerString("Welchen Basis-Scorewert hat die Schufa Holding AG zu Ihrer Person errechnet?")){
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
          if(thisState.$app.find('.schufaTool__category--score--2') &&
            thisState.quiz[thisState.category][2].antwort == '>95%' &&
            thisState.quiz[thisState.category][0].antwort == 'Nein'){
            // Remove final slides
            thisState.$slides.splice(3, 2)
            // Add placeholder slide at end
            thisState.$slides.push($('.schufaTool__templates .schufaTool__slide--2').clone())
          }
        }
      },
      '3': {
        afterRender: () => {
          // If this is auswertungsslide
          try {
            thisState.$app.find('.schufaTool__auskunft').hide()

            switch(questionAnswerString("Welchen Basis-Scorewert hat die Schufa Holding AG zu Ihrer Person errechnet?")){
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
          // If this is contact slide
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0){
            $('.schufaTool__progress--next').text('Abschicken')
          }
        },
        beforeExit: () => {
          // In case this is not yet contact but just auswertungsslide
          if(thisState.$app.find('.schufaTool__category--score--2') &&
            thisState.quiz[thisState.category][2].antwort == '>95%' &&
            thisState.quiz[thisState.category][0].antwort == 'Nein'){
            // Remove final slides
            thisState.$slides.splice(3, 2)
            // Add placeholder slide at end
            thisState.$slides.push($('.schufaTool__templates .schufaTool__slide--2').clone())
          }
          // Contact submit
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0) submit()
          $('.schufaTool__progress--next').text('Weiter')
        }
      },
      '4': {
        afterRender: () => {
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0){
            $('.schufaTool__progress--next').text('Abschicken')
          }
        },
        beforeExit: () => {
          if(thisState.$app.find('.schufaTool__form--kontakt').length > 0) submit()
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
          if(questionAnswer('FraudPool: Ist Ihnen der dazugehörige Sachverhalt bekannt?', 'Ja')){
            thisState.$app.find('.schufaTool__fraud__auskunft--c').show()
          }
          if(questionAnswer('FraudPool: Ist Ihnen der dazugehörige Sachverhalt bekannt?', 'Nein')){
            thisState.$app.find('.schufaTool__fraud__auskunft--d').show()
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
      '.schufaTool__slide--3'
    ],
    score: [
      '.schufaTool__slide--0',
      '.schufaTool__category--score--1',
      '.schufaTool__category--score--1a',
      '.schufaTool__category--score--2',
      '.schufaTool__slide--1',
      '.schufaTool__slide--3'
    ],
    fraud: [
      '.schufaTool__slide--0',
      '.schufaTool__category--fraud--1',
      '.schufaTool__category--fraud--2',
      '.schufaTool__category--fraud--3',
      '.schufaTool__slide--1',
      '.schufaTool__slide--3'
    ],
    veraltet: [
      '.schufaTool__slide--0',
      '.schufaTool__category--veraltet--1',
      '.schufaTool__category--veraltet--2',
      '.schufaTool__slide--1',
      '.schufaTool__slide--3'
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
      '.schufaTool__slide--3'
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
