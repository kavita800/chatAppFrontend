import { HttpModule, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CoreService {

  constructor(private http: Http) { }
  /**
   * @method: post
   * @param url 
   * @param payload
   * @description : Method using for post service.
   */
  post(url, payload) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post(`${environment.APIENDPOINT}${url}`, payload, {headers: header});
  }

  isUserIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null ? true : false;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * @method: get
   * @param url 
   * @param data
   * @description : Method using for get service.
   */
  get(url, data?) {
    if(data){
      return this.http.get(`${environment.APIENDPOINT}${url}/${data}`);
    } else {
      return this.http.get(`${environment.APIENDPOINT}${url}`);
    }
  }
}
