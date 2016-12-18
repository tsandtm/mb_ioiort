import { PipeTransform, Pipe } from '@angular/core';
import { IWeb } from '../shared/models/website.model';

@Pipe({
    name: 'TinDaChon'
})
export class HomeFilterNews implements PipeTransform {

    transform(value: IWeb[], agrs: boolean): IWeb[] {
        let fillter: boolean = agrs ? true : null;
        return fillter ? value.filter(x => x.GiaTri == fillter ? true : false) : value
    }
}
