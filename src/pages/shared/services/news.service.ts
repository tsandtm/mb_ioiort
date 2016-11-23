import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { INews } from '../models/news.model';
import { ServiceBase } from './service.base';
import { url as urlApi } from './variables';

@Injectable()
export class NewsService extends ServiceBase {

  constructor(private _http: Http) {
    super();
  }

/**
 * lay danh sach tin tuc
 */
  getNews(): Promise<INews[]> {
    return this._http.get(urlApi + '/news')
      .toPromise()
      .then(response => response.json() as INews[])
      .catch(this.handleError);
  }

/**
 * lay 1 tui tuc theo id
 */
  getNewById(id: number): Promise<INews> {
    return this._http.get(urlApi + '/news?id=' + id)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

/**
 * xoa tin tuc theo id
 */
  deleteNews(id: number): Promise<INews> {
    return this._http.delete(urlApi + '/news?id=' + id)
      .toPromise()
      .then(response => response.json() as INews)
      .catch(this.handleError);
  }


}
