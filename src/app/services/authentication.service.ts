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

  constructor(public storage : Storage, private plt : Platform, private http : HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken()
    })
  }

  signUp(user){
    return this.http.post('https://www.decoariesapp.herokuapp.com/signup', user,{headers : {'Content-Type' : 'application/json'}})
  }


  login(user){
    return this.http.post('https://www.decoariesapp.herokuapp.com/login', user,{headers : {'Content-Type' : 'application/json'}})
  }

  logout(){
    this.storage.clear()
    this.authenticationState.next(false)
  }

  isAuthenticated(){
    return this.authenticationState.value
  }


  checkToken(){
    return this.storage.get('token').then(res => {
      if(res){
        this.http.get('https://www.decoariesapp.herokuapp.com/checkauth', {headers : {'Authorization' : 'Bearer '+res}}).subscribe(data=>{
          console.log(data)
          if(data['success']){
            this.authenticationState.next(true)
          }
        })
      }
    })
  }


}
