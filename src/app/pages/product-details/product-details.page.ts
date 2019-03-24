import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  token : any;
  product :any;
  constructor(private activatedRoute : ActivatedRoute, 
    private dbService : DatabaseService,
    private storage : Storage,
    private toastController: ToastController,
    private router : Router) { }

  ngOnInit() {
    let id= this.activatedRoute.snapshot.paramMap.get('id')
    let body = {
      id : id
    }
    this.storage.get('token').then(res=>{
      if(res){
        this.token = res
        this.dbService.getDetails(body,this.token).subscribe(data=>{
          if(data){
            this.product=data;
            this.dbService.getProductsInBag(this.token).subscribe(data=>{
              if(data['success']){
                this.dbService.productsInBag=data['products'].length
              }
            })
          }
        })
      }
    })
  }

  async presentToast(message, duration){
    let toast = await this.toastController.create({
      message : message,
      duration : duration
    })
    toast.present();
  }


  onAdd(){
      let body = {
        idProduct : this.product.idProduct
      }

      this.dbService.addQuote(body, this.token).subscribe(data=>{
        if(data['success']){
          this.dbService.productsInBag++
          this.presentToast('Product added to your bag', 3000)
          return this.router.navigate(['/products'])
        }
        else{
          this.presentToast(data['msg'],3000)
          return false;
        }
      })

  }


}
