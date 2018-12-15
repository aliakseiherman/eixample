import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { ComponentBase } from '@shared/component-base';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase implements OnInit, AfterViewInit {

  constructor(
    injector: Injector,
    sanitizer: DomSanitizer
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
}
