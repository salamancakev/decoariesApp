import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ToastController} from '@ionic/angular'
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm : FormGroup;
  constructor(private authService : AuthenticationService, 
    private formBuilder : FormBuilder, 
    private toastController : ToastController,
    private router : Router) { 

    this.signupForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password : ['', Validators.required],
      type : ['', Validators.required],
      website : [''],
      phone : ['']
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

  signUp(){
    let user = {
      name : this.signupForm.controls['name'].value,
      email : this.signupForm.controls['email'].value,
      password : this.signupForm.controls['password'].value,
      type : this.signupForm.controls['type'].value,
      website : this.signupForm.controls['website'].value,
      phone : this.signupForm.controls['phone'].value
    }

    if(user.website == ''){
      user.website = null;
    }

    this.authService.signUp(user).subscribe(data=>{
      if(data['success']){
        this.presentToast('Success! You may now login using your account', 5000)
        return this.router.navigate(['/login']);
      }
      else{
        this.presentToast(data['msg'], 5000)
        return false;
      }
    })
  }

}
