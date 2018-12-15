import { Component, OnInit, Injector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@shared/component-base';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends ComponentBase implements OnInit {

    collapedSideBar: boolean;

    constructor(
        injector: Injector,
        sanitizer: DomSanitizer,
    ) {
        super(injector);
    }

    ngOnInit() { }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
