import { Injectable } from "@angular/core";
import { UserDto, SessionServiceProxy, GetCurrentUserDataOutput } from "@shared/service-proxies/service-proxies";

@Injectable()
export class UserData {

    public user: UserDto;

    constructor(
        private _sessionService: SessionServiceProxy
    ) {

    }

    init(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            this._sessionService.getCurrentUserData().toPromise().then((result: GetCurrentUserDataOutput) => {
                this.user = result.user;

                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
}