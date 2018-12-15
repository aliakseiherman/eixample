import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { RootComponent } from './root.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { RootRoutingModule } from 'root-routing.module';
import { SessionService } from '@shared/session/session.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { Initializer } from 'Initializer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

export function appInitFactory(injector: Injector) {
  return () => {

    return new Promise<boolean>((resolve, reject) => {
      Initializer.run(() => {
        var sessionService: SessionService = injector.get(SessionService);
        sessionService.init().then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
}

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
      '.json'
  ); */
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    SharedModule.forRoot(),
    RootRoutingModule,
    HttpClientModule,
    ServiceProxyModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    RootComponent
  ],
  bootstrap: [
    RootComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [Injector],
      multi: true
    }
  ]
})
export class RootModule {

}