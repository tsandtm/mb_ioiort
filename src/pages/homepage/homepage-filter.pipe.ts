import { PipeTransform, Pipe } from '@angular/core';
import { IWeb } from '../shared/models/website.model';

@Pipe({
    name: 'homeFilter'
})
export class HomeFilterPipe implements PipeTransform {

    transform(value: IWeb[], agrs: string): IWeb[] {
        let filter: string = agrs ? agrs.toLocaleLowerCase() : null;
        return filter ? value.filter((webs: IWeb) => {
            console.log('value: ' + filter);
            // console.log('index: ' + webs.TenGoi.toLocaleLowerCase().indexOf(filter))
            let a = webs.TenGoi.toLocaleLowerCase().indexOf(filter) !== -1;
            let b = webs.TenGoi_KoDau.toLocaleLowerCase().indexOf(filter) !== -1;
            return (a||b)? true : false
        }
        ) : value;
    }
}
