import * as ko from 'knockout';
import { Router } from '../../router';
import navMenu from '../nav-menu/nav-menu';
// Declare the client-side routing configuration
var routes = [
    { url: '', params: { page: 'home-page' } },
    { url: 'counter', params: { page: 'counter-example' } },
    { url: 'fetch-data', params: { page: 'fetch-data' } },
    { url: 'demo', params: { page: 'demo' } }
];
var AppRootViewModel = /** @class */ (function () {
    function AppRootViewModel(params) {
        // Activate the client-side router
        this.router = new Router(params.history, routes, params.basename);
        this.route = this.router.currentRoute;
        // Load and register all the KO components needed to handle the routes
        // The optional 'bundle-loader?lazy!' prefix is a Webpack feature that causes the referenced modules
        // to be split into separate files that are then loaded on demand.
        // For docs, see https://github.com/webpack/bundle-loader
        ko.components.register('nav-menu', navMenu);
        ko.components.register('home-page', require('bundle-loader?lazy!../home-page/home-page'));
        ko.components.register('counter-example', require('bundle-loader?lazy!../counter-example/counter-example'));
        ko.components.register('fetch-data', require('bundle-loader?lazy!../fetch-data/fetch-data'));
        ko.components.register('demo', require('bundle-loader?lazy!../demo/demo'));
    }
    // To support hot module replacement, this method unregisters the router and KO components.
    // In production scenarios where hot module replacement is disabled, this would not be invoked.
    AppRootViewModel.prototype.dispose = function () {
        this.router.dispose();
        // TODO: Need a better API for this
        Object.getOwnPropertyNames(ko.components._allRegisteredComponents).forEach(function (componentName) {
            ko.components.unregister(componentName);
        });
    };
    return AppRootViewModel;
}());
export default { viewModel: AppRootViewModel, template: require('./app-root.html') };
//# sourceMappingURL=app-root.js.map