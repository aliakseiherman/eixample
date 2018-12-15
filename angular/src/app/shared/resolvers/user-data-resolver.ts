import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UserData } from "@shared/services/user/user-data.service";

@Injectable()
export class UserDataResolver implements Resolve<any> {

    constructor(
        public userData: UserData) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userData.init();
    }
}