import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private dbService : DatabaseService,private storage : Storage){

  }
  ngOnInit(){
      this.storage.get('token').then( jwt =>{
        let token = jwt
        this.dbService.getProductsInBag(token).subscribe(data=>{
          if(data['success']){
            this.dbService.productsInBag=data['products'].length
          }
        })
      })    

  }

  onClick(){
    console.log("Clicking works")
  }
}
