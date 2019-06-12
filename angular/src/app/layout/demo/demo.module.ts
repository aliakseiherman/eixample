import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { PageHeaderModule } from './../../shared';
import { PersonServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    PageHeaderModule,
    FormsModule
  ],
  declarations: [DemoComponent],
  providers: [
    PersonServiceProxy
  ]
})
export class DemoModule { }
