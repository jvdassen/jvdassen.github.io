webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_OSWindow_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Screensaver_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_DesktopIcon_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_AboutPage_vue__ = __webpack_require__(38);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  data: function () {
    return {
      showAbout: false,
      showSettings: false,
      showScreensaver: false,
      hasLoaded: false,
      showFullScreen: false,
      time: this.formatTime()
    };
  },
  mounted: function () {
    var app = this;
    var perc = -500;
    var deg = -50;

    incrAndUpdate();
    detectInactivity();
    updateClock();

    function updateClock() {
      setInterval(function () {
        app.time = app.formatTime();
      }, 500);
    }

    function incrAndUpdate() {
      perc += 8;
      if (deg < 20) {
        deg += 2;
      } else {
        deg = 20;
      }
      document.querySelector('body').style.backgroundImage = `linear-gradient(${deg}deg, #D9AFD9 ${perc}%, #97D9E1 100%)`;
      if (perc < 10) {
        requestAnimationFrame(incrAndUpdate);
      } else {
        setTimeout(function () {
          app.hasLoaded = true;
        }, 100);
      }
    }

    function detectInactivity() {
      var mouseMoveId;

      mouseMoveId = setTimeout(function () {
        app.showScreensaver = true;
      }, 15000);
      document.onmousemove = function () {
        app.showScreensaver = false;
        clearTimeout(mouseMoveId);
        mouseMoveId = setTimeout(function () {
          app.showScreensaver = true;
        }, 15000);
      };
    }
  },
  components: {
    'os-window': __WEBPACK_IMPORTED_MODULE_0__components_OSWindow_vue__["a" /* default */],
    'screensaver': __WEBPACK_IMPORTED_MODULE_1__components_Screensaver_vue__["a" /* default */],
    'desktop-icon': __WEBPACK_IMPORTED_MODULE_2__components_DesktopIcon_vue__["a" /* default */],
    'about-page': __WEBPACK_IMPORTED_MODULE_3__components_AboutPage_vue__["a" /* default */]
  },
  methods: {
    shutdown: function () {},
    formatTime() {
      var date = new Date();
      var options = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      };

      return date.toLocaleTimeString('en-US', options);
    },
    reloadDocument: function () {
      location.reload();
    },
    requestFullScreen: function () {
      var elem = document.querySelector('html');
      try {
        elem.webkitRequestFullScreen();
      } catch (e) {
        elem.requestFullscreen();
      }
      this.showFullScreen = true;
    },
    exitFullscreen: function () {
      document.exitFullscreen();
      this.showFullScreen = false;
    }
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_draggable_resizable__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_draggable_resizable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_draggable_resizable__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'oswindow',
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    };
  },
  props: ['title', 'content'],
  components: {
    'draggable': __WEBPACK_IMPORTED_MODULE_0_vue_draggable_resizable___default.a
  },
  mounted: function () {},
  computed: {
    'initialPosition': function () {
      return {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100
      };
    }
  }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'screensaver',
  data() {
    return {};
  },
  components: {},
  mounted: function () {
    var canvas = document.querySelector('.screensaver-canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(217, 175, 217)';
    var r = new Rect(10);

    requestAnimationFrame(moveAndDraw);

    window.onresize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      r.x = window.innerWidth / 2 - 50;
      r.y = window.innerHeight / 2 - 50;
    };

    function moveAndDraw() {
      if (document.hidden) {
        document.addEventListener('visibilitychange', function () {
          r.move();
          r.render();
          requestAnimationFrame(moveAndDraw);
        });
      } else {
        r.move();
        r.render();
        requestAnimationFrame(moveAndDraw);
      }
    }

    function Rect(x) {
      this.x = window.innerWidth / 2 - 50;
      this.y = window.innerHeight / 2 - 50;
      this.width = 100;
      this.height = 100;
      this.directionX = -(Math.random() * 3);
      this.directionY = -3;

      this.move = function () {
        if (this.x <= 0 || this.x >= canvas.width - 78) {
          this.directionX = -this.directionX;
        } else if (this.y >= canvas.height - 103 || this.y <= 0) {
          this.directionY = -this.directionY;
        }
        this.x = this.x + this.directionX;
        this.y = this.y + this.directionY * 0.5;
      };

      this.render = function () {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          var img = document.getElementById('screensaver-icon');
          ctx.drawImage(img, this.x, this.y);
        } catch (e) {}
      };
    }
  },
  computed: {}
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'desktopicon',
  data() {
    return {};
  },
  props: ['icon', 'title'],
  computed: {}
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_components_AboutPage__ = __webpack_require__(40);
//
//
//
//


customElements.define('about-page', __WEBPACK_IMPORTED_MODULE_0__web_components_AboutPage__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'desktopicon',
  data() {
    return {};
  },
  computed: {},
  mounted: () => {}
});

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(25);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5f6a5232_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(46);
function injectStyle (ssrContext) {
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5f6a5232_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */,
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OSWindow_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60af7d95_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OSWindow_vue__ = __webpack_require__(31);
function injectStyle (ssrContext) {
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60af7d95"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OSWindow_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60af7d95_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OSWindow_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('draggable',{staticClass:"oswindow",attrs:{"resizable":false,"parent":true,"drag-handle":".window-drag-handle","x":_vm.initialPosition.x,"y":_vm.initialPosition.y}},[_c('div',{staticClass:"window"},[_c('header',{staticClass:"window-drag-handle"},[_c('span',[_vm._v(" "+_vm._s(_vm.title)+" ")]),_vm._v(" "),_c('span',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_vm._v("X")])]),_vm._v(" "),_c('div',{staticClass:"window-content"},[_vm._v("\n      "+_vm._s(_vm.content)+"\n      "),_vm._t("default")],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Screensaver_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2c8c81e_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Screensaver_vue__ = __webpack_require__(34);
function injectStyle (ssrContext) {
  __webpack_require__(33)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c2c8c81e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Screensaver_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2c8c81e_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Screensaver_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{staticClass:"screensaver-canvas"},[_c('img',{attrs:{"id":"screensaver-icon","src":"static/img/sad_mac.png"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DesktopIcon_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_707781ee_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DesktopIcon_vue__ = __webpack_require__(37);
function injectStyle (ssrContext) {
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-707781ee"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DesktopIcon_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_707781ee_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DesktopIcon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon-wrapper",on:{"click":function($event){return _vm.$emit('click', $event)}}},[_c('img',{staticClass:"icon",attrs:{"src":_vm.icon,"alt":_vm.title}}),_vm._v(" "),_c('span',{staticClass:"icon-title"},[_vm._v(_vm._s(_vm.title))])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AboutPage_vue__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a7371870_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AboutPage_vue__ = __webpack_require__(45);
function injectStyle (ssrContext) {
  __webpack_require__(39)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a7371870"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AboutPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a7371870_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AboutPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lit_element__ = __webpack_require__(41);


class About extends __WEBPACK_IMPORTED_MODULE_0_lit_element__["a" /* LitElement */] {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_lit_element__["c" /* html */]`
      <header class="wrapped">
        Jan von der Assen
      </header>
      <section class="wrapped">
        <p>- (Web) Developer</p>
        <p>- Zurich, Switzerland</p>
        <p>- Software Systems MSc Student <a href="https://www.ifi.uzh.ch/en.html">@UZH</a></p>
      </section>
      <footer class="wrapped">
        <p class="title">Skills and Interests</p>
        <p>- Web Development - EcmaScript, Web-Components, PWA, lit-html 🔥, React.js, Vue.js </p>
        <p>- Backend Development - Python, golang, Java 12</p>
        <p>- Computer Networks, Docker, Linux, <a href="https://github.com/bazo-blockchain">Blockchain</a></p>
      </footer>
    `;
  }
  static get styles() {
    return __WEBPACK_IMPORTED_MODULE_0_lit_element__["b" /* css */]`
      .wrapped {
        padding: 0 20px 0 20px;
      }
      header {
        background-color: #ccccff;
        color: #6d6d82;
        height: 40px;
        font-size: 1.2em;
        font-style: italic;
        display: flex;
        align-items: center;
      }
      a {
        font-style: italic;
      }
      main {
        margin: 10px 0 10px 0;
      }
      .title {
        font-style: italic bold;
      }
      footer {
        padding-top: 10px;
        background-color: #e3f0f4;
      }
    `;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = About;


/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('about-page')}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[(_vm.hasLoaded)?_c('header',[_c('span',{staticClass:"main-header-title main-header-image",on:{"click":_vm.requestFullScreen}},[_c('img',{attrs:{"src":"/static/img/computer.ico"}})]),_vm._v(" "),_c('div',{staticClass:"main-header-title"},[_vm._v("File\n      "),_c('div',{staticClass:"main-header-content"},[_c('div',{on:{"click":function($event){_vm.showSettings = !_vm.showSettings}}},[_vm._v("Settings")]),_vm._v(" "),_c('div',{on:{"click":_vm.reloadDocument}},[_vm._v("Restart")])])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('span',{staticClass:"main-header-title",on:{"click":function($event){_vm.showAbout = !_vm.showAbout}}},[_vm._v("About")]),_vm._v(" "),_c('span',{staticClass:"main-header-title right"},[_vm._v(_vm._s(_vm.time))])]):_vm._e(),_vm._v(" "),(_vm.hasLoaded)?_c('main',[_c('desktop-icon',{staticClass:"desktopicon",attrs:{"icon":"static/img/folder_system.png","title":"Settings"},on:{"click":function($event){_vm.showSettings = !_vm.showSettings}}}),_vm._v(" "),_c('desktop-icon',{staticClass:"desktopicon",attrs:{"icon":"static/img/folder_floppy.png","title":"About"},on:{"click":function($event){_vm.showAbout = !_vm.showAbout}}}),_vm._v(" "),_c('desktop-icon',{staticClass:"desktopicon",attrs:{"icon":"static/img/sad_mac.png","title":"Trash"}}),_vm._v(" "),(_vm.showAbout)?_c('os-window',{staticStyle:{"width":"400px"},attrs:{"title":'About'},on:{"close":function($event){_vm.showAbout = false}}},[_c('about-page')],1):_vm._e(),_vm._v(" "),(_vm.showSettings)?_c('os-window',{attrs:{"title":'Settings'},on:{"close":function($event){_vm.showSettings = false}}},[_c('div',{staticClass:"content-wrapper"},[_c('div',[_c('span',[_vm._v("Use Fullscreen")])]),_vm._v(" "),_c('div',[_c('span',[_vm._v("Enable Screensaver")])])])]):_vm._e()],1):_vm._e(),_vm._v(" "),(_vm.showScreensaver)?_c('screensaver'):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-header-title"},[_vm._v("Go\n      "),_c('div',{staticClass:"main-header-content"},[_c('div',{},[_c('a',{attrs:{"href":"https://github.com/jvdassen"}},[_vm._v("GitHub")])]),_vm._v(" "),_c('div',{},[_c('a',{attrs:{"href":"https://linkedin.com/in/jan-von-der-assen-975083105"}},[_vm._v("LinkedIn")])])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
],[20]);
//# sourceMappingURL=app.d29228a0d2e879b47419.js.map