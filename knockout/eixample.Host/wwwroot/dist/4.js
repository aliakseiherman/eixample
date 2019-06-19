webpackJsonp([4],{

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_knockout__);

var CounterExampleViewModel = /** @class */ (function () {
    function CounterExampleViewModel() {
        this.currentCount = __WEBPACK_IMPORTED_MODULE_0_knockout__["observable"](0);
    }
    CounterExampleViewModel.prototype.incrementCounter = function () {
        var prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    };
    return CounterExampleViewModel;
}());
/* harmony default export */ __webpack_exports__["default"] = ({ viewModel: CounterExampleViewModel, template: __webpack_require__(43) });
//# sourceMappingURL=counter-example.js.map

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = "<h1>Counter</h1>\r\n\r\n<p>This is a simple example of a Knockout component.</p>\r\n\r\n<p>Current count: <strong data-bind='text: currentCount'></strong></p>\r\n\r\n<button data-bind='click: incrementCounter'>Increment</button>\r\n"

/***/ })

});
//# sourceMappingURL=4.js.map