import { PipeTransform, Pipe } from '@angular/core';
import { IWeb } from '../shared/models/website.model';
import { WebsService } from '../shared/services/website.service';

@Pipe({
    name: 'TinDaChon'
})
export class HomeFilterNews implements PipeTransform {
    constructor(private _webService: WebsService){}
    
    transform(value: IWeb[], agrs: boolean, st:number): IWeb[] {
        let fillter: boolean = agrs ? true : null;
        
        return fillter ? value.filter(x => x.GiaTri == fillter ? true : false) : value
    }
}
