import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage : Storage, private plt : Platform, private http : HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken()
    })
  }

  signUp(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:8080/signup', user,{headers : {'Content-Type' : 'application/json'}})
  }


  login(user){
    return this.http.post('http://localhost:8080/login', user,{headers : {'Content-Type' : 'application/json'}})
  }

  logout(){

  }

  isAuthenticated(){
    return this.authenticationState.value
  }

  checkToken(){
    return this.storage.get('token').then(res => {
      if(res){
        this.http.get('http://localhost:8080/checkauth', {headers : {'Authorization' : 'Bearer '+res}}).subscribe(data=>{
          console.log(data)
          if(data['success']){
            this.authenticationState.next(true)
          }
        })
      }
    })
  }


}
