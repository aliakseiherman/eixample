import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform = orderBy;
}
