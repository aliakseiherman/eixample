import { NgModule } from "@angular/core";
import { AccountComponent } from "./account.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LoginService } from "./login/login.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from "@shared/shared.module";
import { AccountRoutingModule } from "./account-routing.module";
import { AuthServiceProxy, AccountServiceProxy } from "@shared/service-proxies/service-proxies";
import { SessionService } from "@shared/session/session.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerInterceptor } from "@shared/interceptors/error-handler-interceptor";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        AccountRoutingModule,
        NgbModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
        LoginService,
        SessionService,
        AuthServiceProxy,
        AccountServiceProxy
    ]
})
export class AccountModule {

}