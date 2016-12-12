import { PipeTransform, Pipe } from '@angular/core';
import { IWeb } from '../shared/models/website.model';
import { WebsService } from '../shared/services/website.service';

@Pipe({
    name: 'homeFilter'
})
export class HomeFilterPipe implements PipeTransform {

    // dw: IWeb[];
    // constructor(private _webService: WebsService) {}
    // web() {
    //     this._webService.getWebs(0,'all')
    //         .then(web => this.dw = web)
    //         .catch(errorMessage => {
    //             console.error(errorMessage.message)
    //         });

    // }

    transform(value: IWeb[], agrs: string): IWeb[] {
        let filter: string = agrs ? agrs.toLocaleLowerCase() : null;
        // this.web();
        // value = this.dw;
        return filter ? value.filter((webs:IWeb) => {
            console.log('value: ' + filter);
            // debugger
            // console.log('index: ' + webs.TenGoi.toLocaleLowerCase().indexOf(filter))
            let a = webs.TenGoi.toLocaleLowerCase().indexOf(filter) !== -1;
            let b = webs.TenGoi_KoDau.toLocaleLowerCase().indexOf(filter) !== -1;
            return (a || b) ? true : false
        }
        ) : value;
    }
}
