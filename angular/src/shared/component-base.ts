import { Injector, ElementRef } from '@angular/core';
import { SessionService } from '@shared/session/session.service';

export abstract class ComponentBase {

    appSession: SessionService;

    constructor(injector: Injector) {
        this.appSession = injector.get(SessionService);
    }
}