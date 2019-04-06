import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup
  constructor(private formBuilder : FormBuilder, 
    private authService : AuthenticationService, 
    private toastController : ToastController,
    private storage : Storage) {
      this.loginForm = this.formBuilder.group({
        email : ['', Validators.compose([
          Validators.required,
          Validators.email
        ])],
        password : ['', Validators.required]
      })
     }

  ngOnInit() {
  }

  async presentToast(message, duration){
    let toast = await this.toastController.create({
      message : message,
      duration : duration
    })
    toast.present();
  }

  login(){
    let user = {
      email : this.loginForm.controls['email'].value,
      password : this.loginForm.controls['password'].value
    }

    this.authService.login(user).subscribe(data=>{
      if(data['success']){
        let user = {
          id : data['user'].idUser,
          email : data['user'].Email,
          name : data['user'].Name,
          type : data['user'].Type,
          website : data['user'].Website,
          phone : data['user'].Phone
        }
        this.storage.set('token', data['token'])
        this.storage.set('user', user)
        this.authService.authenticationState.next(true)
        return this.presentToast("Welcome "+user.name+"!", 3000)
      }
      else{
        return this.presentToast(data['msg'], 3000)
      }
    })
  }

}
