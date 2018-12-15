import { Component, Injector } from "@angular/core";
import { ComponentBase } from "@shared/component-base";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { SessionService } from "@shared/session/session.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ],
})

export class LoginComponent extends ComponentBase {

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: SessionService
    ) {
        super(injector);
    }

    login(): void {
        this.loginService.login(() => {
            
        });
    }
}