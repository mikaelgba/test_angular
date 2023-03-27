import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  private apiServerUrl = environment.apiBaseUrl + '/users';

  addUser(data: any): Observable<any> {
    return this._http.post(`${this.apiServerUrl}`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiServerUrl}/${id}`, data);
  }

  getUserList(): Observable<any> {
    return this._http.get(`${this.apiServerUrl}`);
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete(`${this.apiServerUrl}/${id}`);
  }
}
