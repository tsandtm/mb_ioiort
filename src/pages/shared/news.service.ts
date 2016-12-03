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

    /**api load tat ca cac tin moi tru nhung tin minh da xoa */
    getWebs(start:number): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/news?limit='+this.limit+'&skip='+start)
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);

        });
    });
    }


    /**key api cua tin quan tam lay tu server */
    tinquantam(): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/tinquantam')
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);

        });
    });
    }
    //xoa tin quan tam minh` moi them vao
    public xoatinquantam(id:number):Promise<number>{
        return this._http.post('http://localhost:8080/api/xoa',{id:id}).toPromise()
        .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
        }
    //load api tin noi bat 
    tinnoibat(start:number): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/tinnoibat?limit='+this.limit+'&skip='+start)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);

        });
    });
    }
    //bo xoa nhung tin minh moi xoa luu trong lich su xoa
    public boxoa(id:number,arrayQuanTam:number,arrayDaXem:number):Promise<number>{
        return this._http.post('http://localhost:8080/api/boxoa',{id:id, ArrayQuanTam: arrayQuanTam, ArrayDaXem: arrayDaXem}).toPromise()
        .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
        }
    //api liet ke nhung tin minh moi xoa xong
    lktindaxoa(start:number): Promise<INews[]> {
          return new Promise(resolve => {
        this._http.get('http://localhost:8080/api/tindaxoa?limit='+this.limit+'&skip='+start)
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

   
    private limit1: number = 2;

    getNew(start:number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get('http://localhost:8080/api/getNews?limit=' + this.limit1 + '&skip=' + start)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    gettinnoibat(start:number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get('http://localhost:8080/api/gettinnoibat?limit=' + this.limit1 + '&skip=' + start)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

   

    
}