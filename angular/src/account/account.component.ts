import { Component, ViewContainerRef, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { ComponentBase } from '../shared/component-base';

@Component({
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends ComponentBase {

    public constructor(
        injector: Injector
    ) {
        super(injector);
    }
}