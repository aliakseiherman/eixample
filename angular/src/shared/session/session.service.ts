import { Injectable } from "@angular/core";
import { UserDto, TenantDto, SessionServiceProxy, GetCurrentLoginDetailsOutput } from "@shared/service-proxies/service-proxies";

@Injectable()
export class SessionService {

    private _user: UserDto;
    private _tenant: TenantDto;

    constructor(
        private _sessionService: SessionServiceProxy,
    ) {
    }

    get user(): UserDto {
        return this._user;
    }

    get tenant(): TenantDto {
        return this._tenant;
    }

    get userId(): string {
        return this.user ? this.user.id : null;
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    init(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            this._sessionService.getCurrentLoginDetails().toPromise().then((result: GetCurrentLoginDetailsOutput) => {
                this._user = result.user;
                this._tenant = result.tenant;

                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
}