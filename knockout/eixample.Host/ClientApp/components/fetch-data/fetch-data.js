import * as ko from 'knockout';
import 'isomorphic-fetch';
var FetchDataViewModel = /** @class */ (function () {
    function FetchDataViewModel() {
        var _this = this;
        this.forecasts = ko.observableArray();
        fetch('api/SampleData/WeatherForecasts')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.forecasts(data);
        });
    }
    return FetchDataViewModel;
}());
export default { viewModel: FetchDataViewModel, template: require('./fetch-data.html') };
//# sourceMappingURL=fetch-data.js.map