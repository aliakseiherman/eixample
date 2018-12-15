import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "@shared/session/session.service";

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private _sessionService: SessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
            return false;
        } else {
            // this._router.navigate([this.getRoute()]);
            return true;
        }

        // this._router.navigate([this.getRoute()]);
        // return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    getRoute(): string {
        if (!this._sessionService.user) {
            return '/account/login';
        }

        return '/app';
    }
}