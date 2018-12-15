import { AppConsts } from "@shared/AppConsts";

export class Initializer {
    static run(callback: () => void): void {
        AppConsts.appBaseUrl = window.location.origin;
        callback();
    }
}