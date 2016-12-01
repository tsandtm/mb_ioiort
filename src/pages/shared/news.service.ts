import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    
    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }

    
}