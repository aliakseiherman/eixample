import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        ApiServiceProxies.SessionServiceProxy
    ]
})
export class ServiceProxyModule { }