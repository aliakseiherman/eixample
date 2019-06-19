import * as ko from 'knockout';
import * as $ from 'jquery';
import * as crossroads from 'crossroads';
// This module configures crossroads.js, a routing library. If you prefer, you
// can use any other routing library (or none at all) as Knockout is designed to
// compose cleanly with external libraries.
//
// You *don't* have to follow the pattern established here (each route entry
// specifies a 'page', which is a Knockout component) - there's nothing built into
// Knockout that requires or even knows about this technique. It's just one of
// many possible ways of setting up client-side routes.
var Router = /** @class */ (function () {
    function Router(history, routes, basename) {
        var _this = this;
        this.history = history;
        this.currentRoute = ko.observable({});
        // Reset and configure Crossroads so it matches routes and updates this.currentRoute
        crossroads.removeAllRoutes();
        crossroads.resetState();
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        routes.forEach(function (route) {
            crossroads.addRoute(route.url, function (requestParams) {
                _this.currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });
        // Make history.js watch for navigation and notify Crossroads
        this.disposeHistory = history.listen(function (location) { return crossroads.parse(location.pathname); });
        this.clickEventListener = function (evt) {
            var target = evt.currentTarget;
            if (target && target.tagName === 'A') {
                var href = target.getAttribute('href');
                if (href && href.indexOf(basename + '/') === 0) {
                    var hrefAfterBasename = href.substring(basename.length);
                    history.push(hrefAfterBasename);
                    evt.preventDefault();
                }
            }
        };
        $(document).on('click', 'a', this.clickEventListener);
        // Initialize Crossroads with starting location
        crossroads.parse(history.location.pathname);
    }
    Router.prototype.link = function (url) {
        return this.history.createHref({ pathname: url });
    };
    Router.prototype.dispose = function () {
        this.disposeHistory();
        $(document).off('click', 'a', this.clickEventListener);
    };
    return Router;
}());
export { Router };
//# sourceMappingURL=router.js.map