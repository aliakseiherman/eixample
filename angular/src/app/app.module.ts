import { NgModule } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionService } from '@shared/session/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { ExcerptFilter } from '@shared/pipes/excerpt.filter';
import { SharedService } from '@shared/services/shared-service/shared.service';
import { OrderByPipe } from '@shared/pipes/orderby.pipe';
import { ErrorHandlerInterceptor } from '@shared/interceptors/error-handler-interceptor';
import { UserDataResolver } from './shared/resolvers/user-data-resolver';
import { UserData } from '@shared/services/user/user-data.service';

@NgModule({
  declarations: [
    ExcerptFilter,
    OrderByPipe,
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    SessionService,
    SharedService,
    UserData,
    UserDataResolver
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
