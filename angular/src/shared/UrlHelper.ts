import { AppConsts } from "@shared/AppConsts";

export class UrlHelper {
    /**
     * The URL requested, before initial routing.
     */
    static readonly initialUrl = location.href;

    static getQueryParameters(): any {
        return document.location.search.replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
    }

    static extractTenantNameFromUrl(baseUrl: string): string {
        baseUrl = this.processBaseUrl(baseUrl);

        if (this.isSubdomainPresent(baseUrl)) {
            return baseUrl.split('.')[0];
        } else {
            return null;
        }
    }

    static extractAppUrl(href: string): string {
        return new URL(href).origin;
    }
    
    static isAppRunningLocally(baseUrl: string): boolean {
        baseUrl = this.processBaseUrl(baseUrl);

        return baseUrl.endsWith('eixample');
    }

    static isSubdomainPresent(baseUrl: string): boolean {
        if (this.isAppRunningLocally(baseUrl)) {
            return baseUrl.split('.').length > 1;
        } else {
            return baseUrl.split('.').length > 2;
        }
    }

    static processBaseUrl(baseUrl: string): string {
        if (baseUrl.indexOf(':') > -1) {
            baseUrl = this.removePortFromUrl(baseUrl);
        }

        return baseUrl;
    }

    static removePortFromUrl(baseUrl: string): string {
        return baseUrl = baseUrl.split(':')[0];
    }

    static getInitialUrl(): string {
        
        var initialUrl = UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
            initialUrl = AppConsts.appBaseUrl;
        }

        return initialUrl;
    }
}
