import * as ko from 'knockout';
var CounterExampleViewModel = /** @class */ (function () {
    function CounterExampleViewModel() {
        this.currentCount = ko.observable(0);
    }
    CounterExampleViewModel.prototype.incrementCounter = function () {
        var prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    };
    return CounterExampleViewModel;
}());
export default { viewModel: CounterExampleViewModel, template: require('./counter-example.html') };
//# sourceMappingURL=counter-example.js.map