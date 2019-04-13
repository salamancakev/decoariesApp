import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  subscription : any;
  constructor(private dbService : DatabaseService,
    private storage : Storage, 
    private platform : Platform,
    private alertController : AlertController){

  }
  ngOnInit(){
      this.storage.get('token').then( jwt =>{
        let token = jwt
        this.dbService.getProductsInBag(token).subscribe(data=>{
          if(data['success']){
            this.dbService.productsInBag=data['products']
            if(this.dbService.productsInBag.length > 0){
              this.dbService.idBag = this.dbService.productsInBag[0].idQuote
            }
            console.log(this.dbService.idBag)
          }
        })
        this.dbService.getProducts(token).subscribe(data=>{
          if(data['success']){
            this.dbService.products=data
          }
        })
      })    

  }

 ionViewDidEnter() {
   this.subscription = this.platform.backButton.subscribe(()=>{
    this.presentExitAlert();
   })
 }

 ionViewWillLeave() {
   this.subscription.unsubscribe();
 }

 async presentExitAlert(){
  let alert = await this.alertController.create({
    header : 'Exit App',
    message : 'Are you sure you want to exit the app?',
    buttons : [
      {
        text : 'Yes',
        role : 'confirm',
        handler : ()=>{
          navigator['app'].exitApp();
        }
      },
      {
        text : 'No',
        role : 'cancel'
      }
    ]
  })
  return await alert.present()
}
  onClick(){
    console.log("Clicking works")
  }
}
