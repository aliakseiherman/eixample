import { Injectable } from "@angular/core";
import { AuthServiceProxy, AuthenticateInput, AuthenticateOutput } from "@shared/service-proxies/service-proxies";
import { AppConsts } from "@shared/AppConsts";

@Injectable()
export class LoginService {

    loginModel: AuthenticateInput;
    loginResult: AuthenticateOutput;

    constructor(
        private _authService: AuthServiceProxy
    ) {
        this.clear();
    }

    login(finallyCallback?: () => void): void {
        finallyCallback = finallyCallback || (() => { });

        this._authService.authenticate(this.loginModel)
            .finally(finallyCallback)
            .subscribe((result: AuthenticateOutput) => {

                localStorage.setItem(AppConsts.auth.token, result.token);
                location.href = '/';
            });
    }

    private clear(): void {
        this.loginModel = new AuthenticateInput();
        this.loginModel.rememberMe = true;
        this.loginResult = null;
    }
}