import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@core/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService extends BaseService {
  constructor(private http: HttpClient) {
    super('test', http);
  }

  getUrl(): void {
    console.log(this.httpClient);
  }
}
