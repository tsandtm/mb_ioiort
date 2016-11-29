import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { INews } from './news.model';

@Injectable()
export class NewsService {
    // private _newsUrl = 'api/json/news.json';

    constructor(private _http: Http) { }

    getNews(): Promise<INews[]> {
         return this._http.get('http://localhost:8080/api/news')
            .toPromise()
            .then(response => response.json() as INews[])
            .catch(this.handleError);
    }

     getNew(id: number): Promise<INews> {
        return this.getNews()
            .then(inew => inew.find(p => p.IDTinTuc === id))
            .catch(this.handleError);
    }

    //Xoa tin tuc
    deleteNews(id:number): Promise<INews>{
        return this._http.delete('http://localhost:8080/api/news?id='+id)
        .toPromise()
        .then(response => response.json() as INews)
        .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }

    
}
