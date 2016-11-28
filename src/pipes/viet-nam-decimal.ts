import { Pipe } from '@angular/core';

/*
  Generated class for the VietNamDecimal pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'vietNamDecimal'
})
export class VietNamDecimal {
  transform(value: number) {
    let reg = /[\.,]/g;
    return value.toString().replace(reg,(m) => {
      return m === ',' ? '.' : ',';
    });
    // var ret=(input)?input.toString().replace(".",","):null;
    //     if(ret){
    //         var decArr=ret.split(",");
    //         if(decArr.length>1){
    //             var dec=decArr[1].length;
    //             if(dec===1){ret+="0";}
    //         }//this is to show prices like 12,20 and not 12,2
    //     }
    //     return ret;
  }
}
