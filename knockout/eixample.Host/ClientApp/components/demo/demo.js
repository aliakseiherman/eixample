import * as ko from 'knockout';
import 'isomorphic-fetch';
var DemoViewModel = /** @class */ (function () {
    function DemoViewModel() {
        var _this = this;
        this.person = ko.observable({ id: 0 });
        this.people = ko.observableArray();
        var self = this;
        this.isNew = ko.computed({
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
export default { viewModel: DemoViewModel, template: require('./demo.html') };
//# sourceMappingURL=demo.js.map