import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  token : any;
  date : any;
  time : any;
  constructor(private storage : Storage,
              private router : Router,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private dbService : DatabaseService) { }

  ngOnInit() {
    this.storage.get('token').then(token=>{
      this.token=token
    })
  }

  isValid(){
    if(this.date == null || this.time == null){
      return false
    }
    else{
      return true
    }
  }

  async presentLoading(){
    let loading = await this.loadingController.create({
      message : 'Sending request...',
      spinner : 'crescent'
    })

    return await loading.present()
  }

  async presentAlert(type){
    let alert
    if(type == 'success'){
      alert = await this.alertController.create({
      header : 'Appointment Requested',
      message : 'You have requested an appointment. Our team will review it and will assign you a date that best suits your requierements. Please keep an eye on your email inbox for your appointment confirmation.',
      buttons : [
        {
          text : 'Ok',
          role : 'confirm'
        }
      ]
    })
    }
    else{
      alert = await this.alertController.create({
        header : 'Error',
        message : 'Something went wrong. Please try again later.',
        buttons : [
          {
            text : 'Ok',
            role : 'confirm'
          }
        ]
      })
    }
    

    return await alert.present()
  }

  onSubmit(){
    this.presentLoading()
    let body = {
      date : this.date,
      time : this.time
    }

    this.dbService.requestAppointment(body, this.token).subscribe(data=>{
      if(data['success']){
        this.loadingController.dismiss()
        this.presentAlert('success')
        this.date=null
        this.time=null
        this.router.navigate(['home'])
      }
      else{
        this.presentAlert('error')
        return false
      }
    })

  }

}
