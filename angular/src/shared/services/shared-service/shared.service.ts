import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {

    private dataSource = new BehaviorSubject<any>(0);

    dataObserved$ = this.dataSource.asObservable();
    // service command
    triggerUpdate(data) {
        this.dataSource.next(data);
    }
}
