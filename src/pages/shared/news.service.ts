import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { INews } from './news.model';

@Injectable()
export class NewsService {
    // private _newsUrl = 'api/json/news.json';
private limit : number= 6;

    constructor(private _http: Http,) { }


    getWebs(start:number): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/tintuc?limit='+this.limit+'&offset='+start)
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);

        });
    });
    }
    tinnoibat(start:number): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/tinnoibat?limit='+this.limit+'&offset='+start)
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);

        });
    });
    }
      public daxem(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
        return this._http.post('http://localhost:8080/api/daxem',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
        .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
        }
        public themtin(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
        // let tin:INews;
        // tin.id=id;
        // tin.ArrayQuanTam=arrayQuanTam;
        // tin.ArrayDaXem=arrayDaXem;
        return this._http.post('http://localhost:8080/api/tintuc',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
        .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
        }
    public xoatin(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
        return this._http.post('http://localhost:8080/api/xoatin',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
        .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
        }
    // getNews(): Promise<INews[]> {
    //      return this._http.get('http://localhost:8080/api/tintuc')
    //         .toPromise()
    //         .then(response => response.json() as INews[])
    //         .catch(this.handleError);
    // }

    //  getNew(id: number): Promise<INews> {
    //     return this.getNews()
    //         .then(inew => inew.find(p => p.id === id))
    //         .catch(this.handleError);
    // }

    //Xoa tin tuc
    //  xoaTinTuc(id: any): Promise<INews>{
    //     let body = new URLSearchParams()
    //     body.set(`id`,id)
    //     return this._http.delete('http://localhost:8080/api/tintuc',{body:body})
    //             .toPromise()
    //             .then(res => res.json() as INews)
    //             .catch(error => {
    //                 console.error('Error: ', error)
    //                 return null;
    //             })
    // }
    // public chuadoc(): Promise<INews[]> {
    //       return new Promise(resolve => {
    //     this._http.get('http://localhost:8080/api/tinchuadoc')
    //     .map(res => res.json())
    //     .subscribe(data => {

    //       resolve(data);

    //     });
    // });
    // }

   

    
        // public phuchoi(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
        // return this._http.post('http://localhost:8080/api/phuchoi',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
        // .then(result => id)
        //     .catch(error => {
        //         console.error('Error: ', error);
        //         return Promise.reject(error);
        //     });
        // }


    // public delete(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
    //     return this._http.post('http://localhost:8080/api/xoa',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
    //     .then(result=>id)
    //     .catch(error=>{
    //         console.error('Error:',error);
    //         return Promise.reject(error);
    //     });
    // }
    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }
    // update(id:number):Promise<INews>{
        
    // }
    
}