import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  token : any;
  message = ''
  constructor(private storage : Storage,
              private dbService : DatabaseService,
              private alertController : AlertController,
              private loadingController : LoadingController) { }

  ngOnInit() {
    this.storage.get('token').then(token=>{
      this.token = token
    })
  }

  async presentAlert(type){
    let alert
    if(type = 'success'){
      alert = await this.alertController.create({
      header : 'Message Sent',
      message : 'Your message has been sent. You may recieve a reply in the following days. Thank you for using the Decoaries app!',
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
        message : 'Something went wrong, please try again later.',
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


  async presentLoading(){
    let loading = await this.loadingController.create({
      message : 'Sending message...',
      spinner : 'crescent'
    })

    return await loading.present()
  }

  onSubmit(){
    this.presentLoading()
    let body = {
      message : this.message
    }
    this.dbService.sendMessage(body, this.token).subscribe(data=>{
      if(data['success']){
        this.loadingController.dismiss()
        this.message = ''
        return this.presentAlert('success')
      }
      else{
      this.loadingController.dismiss()
      return this.presentAlert('error')
      }
    })
  }
}
