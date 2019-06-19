webpackJsonp([1],{

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knockout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_knockout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);


var DemoViewModel = /** @class */ (function () {
    function DemoViewModel() {
        var _this = this;
        this.person = __WEBPACK_IMPORTED_MODULE_0_knockout__["observable"]({ id: 0 });
        this.people = __WEBPACK_IMPORTED_MODULE_0_knockout__["observableArray"]();
        var self = this;
        this.isNew = __WEBPACK_IMPORTED_MODULE_0_knockout__["computed"]({
            owner: this,
            read: function () {
                return self.person().id < 1;
            }
        });
        this.initEditPersonState = function (person) {
            _this.person(person);
        };
        this.initAddPersonState = function () {
            _this.person({ id: 0 });
        };
        this.loadPeople = function () {
            fetch('api/Person/GetAll')
                .then(function (response) { return response.json(); })
                .then(function (data) { _this.people(data); });
        };
        this.addPerson = function () {
            fetch('api/Person/Add', {
                method: 'POST',
                body: JSON.stringify(self.person()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function () { self.loadPeople(); });
        };
        this.updatePerson = function () {
            fetch('api/Person/Update', {
                method: 'POST',
                body: JSON.stringify(self.person()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function () { self.loadPeople(); });
        };
        this.deletePerson = function (person) {
            fetch('api/Person/Delete', {
                method: 'POST',
                body: JSON.stringify(person),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function () { self.loadPeople(); });
        };
        self.loadPeople();
    }
    return DemoViewModel;
}());
/* harmony default export */ __webpack_exports__["default"] = ({ viewModel: DemoViewModel, template: __webpack_require__(43) });
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(13);

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = "<h1>People</h1>\r\n\r\n<div class=\"alert alert-info\" style=\"font-size:12px\">\r\n    <p>This page demonstrates audit functionality.</p>\r\n    <p style=\"margin-bottom:0\">\r\n        Using pgAdmin you can track changes made by the app. We are\r\n        dealing with <b>Persons</b> table.\r\n    </p>\r\n    <br>\r\n    <p style=\"margin-bottom:0\">\r\n        Create record and have a look at <b>CreationTime</b>, <b>CreatorID</b> and\r\n        <b>TenantID</b>.\r\n    </p>\r\n    <p style=\"margin-bottom:0\">Modify record and have a look at <b>ModificationTime</b> and <b>ModifierID</b>.</p>\r\n    <p style=\"margin-bottom:0\">Delete record and have a look at <b>DeletionTime</b> and <b>DeleterID</b>.</p>\r\n    <br>\r\n    <p style=\"margin-bottom:0\">\r\n        Try switching between tenants ('subdomain1' and 'subdomain2') and see that\r\n        the\r\n        app only pulls records which belong to current tenant.\r\n    </p>\r\n    <br>\r\n    <p style=\"margin-bottom:0\">\r\n        Note that we've applied Dynamic Filter to avoid pulling soft-deleted\r\n        records.\r\n    </p>\r\n</div>\r\n\r\n<p data-bind='ifnot: people'><em>Loading...</em></p>\r\n\r\n<table class='table' data-bind='if: people'>\r\n    <thead>\r\n        <tr>\r\n            <th>Id</th>\r\n            <th>Name</th>\r\n            <th>Description</th>\r\n            <th></th>\r\n            <th>\r\n                <button type=\"button\"\r\n                        class=\"btn btn-primary pull-right\"\r\n                        data-toggle=\"modal\"\r\n                        data-target=\"#editPersonModal\"\r\n                        data-bind='click: initAddPersonState'>\r\n                    Add\r\n                </button>\r\n            </th>\r\n        </tr>\r\n    </thead>\r\n    <tbody data-bind='foreach: people'>\r\n        <tr>\r\n            <td data-bind='text: id'></td>\r\n            <td data-bind='text: name'></td>\r\n            <td>\r\n                <span data-bind='text: description, visible: $data.description.length > 0'></span>\r\n                <span data-bind='visible: $data.description.length === 0'>N/A</span>\r\n            </td>\r\n            <td>\r\n                <button class=\"btn\" data-toggle=\"modal\"\r\n                        data-target=\"#editPersonModal\"\r\n                        data-bind='click: $parent.initEditPersonState.bind($data)'>\r\n                    Edit\r\n                </button>\r\n            </td>\r\n            <td>\r\n                <button class=\"btn pull-right\"\r\n                        data-bind='click: $parent.deletePerson.bind($data)'>\r\n                    Delete\r\n                </button>\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n\r\n<div class=\"modal fade\" id=\"editPersonModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editPersonModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 data-bind=\"visible: isNew()\"\r\n                    class=\"modal-title\"\r\n                    id=\"editPersonModalLabel\">\r\n                    Add Person\r\n                </h5>\r\n                <h5 data-bind=\"visible: !isNew()\"\r\n                    class=\"modal-title\"\r\n                    id=\"editPersonModalLabel\">\r\n                    Update Person\r\n                </h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <fieldset class=\"form-group\">\r\n                    <input class=\"form-control\" data-bind=\"value: person() && person().name\" placeholder=\"Name...\" required>\r\n                </fieldset>\r\n\r\n                <fieldset class=\"form-group\">\r\n                    <textarea class=\"form-control\" data-bind=\"value: person() && person().description\" rows=\"3\" placeholder=\"Description...\" required></textarea>\r\n                </fieldset>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\"\r\n                        data-bind=\"visible: isNew(), click: addPerson\"\r\n                        class=\"btn btn-primary\"\r\n                        data-dismiss=\"modal\">\r\n                    Add\r\n                </button>\r\n                <button type=\"button\"\r\n                        data-bind=\"visible: !isNew(), click: updatePerson\"\r\n                        class=\"btn btn-primary\"\r\n                        data-dismiss=\"modal\">\r\n                    Update\r\n                </button>\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ })

});
//# sourceMappingURL=1.js.map