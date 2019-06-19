webpackJsonp([0],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_knockout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);


var FetchDataViewModel = /** @class */ (function () {
    function FetchDataViewModel() {
        var _this = this;
        this.forecasts = __WEBPACK_IMPORTED_MODULE_0_knockout__["observableArray"]();
        fetch('api/SampleData/WeatherForecasts')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.forecasts(data);
        });
    }
    return FetchDataViewModel;
}());
/* harmony default export */ __webpack_exports__["default"] = ({ viewModel: FetchDataViewModel, template: __webpack_require__(44) });
//# sourceMappingURL=fetch-data.js.map

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(13);

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = "<h1>Weather forecast</h1>\r\n\r\n<p>This component demonstrates fetching data from the server.</p>\r\n\r\n<p data-bind='ifnot: forecasts'><em>Loading...</em></p>\r\n\r\n<table class='table' data-bind='if: forecasts'>\r\n    <thead>\r\n        <tr>\r\n            <th>Date</th>\r\n            <th>Temp. (C)</th>\r\n            <th>Temp. (F)</th>\r\n            <th>Summary</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody data-bind='foreach: forecasts'>\r\n        <tr>\r\n            <td data-bind='text: dateFormatted'></td>\r\n            <td data-bind='text: temperatureC'></td>\r\n            <td data-bind='text: temperatureF'></td>\r\n            <td data-bind='text: summary'></td>\r\n        </tr>\r\n    </tbody>\r\n</table>"

/***/ })

});
//# sourceMappingURL=0.js.map