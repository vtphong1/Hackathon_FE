import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(@Inject(String) public url: string, public httpClient: HttpClient) {}
  getDetail(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${id}`, { observe: 'response' });
  }

  searchData(objSearch?: any): Observable<any> {
    return this.httpClient.get<any>(`${this.url}`, { observe: 'response', params: objSearch });
  }

  addItem(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}`, obj, { observe: 'response' });
  }

  updateItem(obj: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}`, obj, { observe: 'response' });
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`, { observe: 'response' });
  }
}
