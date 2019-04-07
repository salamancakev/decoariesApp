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
    this.storage.get('token').then(res=>{
      this.token=res
      let id= this.activatedRoute.snapshot.paramMap.get('id')
    this.dbService.products.forEach(element => {
      if(element.idProduct == id){
        this.product=element
      }
    });
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

      this.dbService.productsInBag.forEach(element=>{
        if(element == this.product){
          this.presentToast('Product is already in your shopping bag', 3000)
          return false
        }
      })

      this.dbService.addQuote(this.product, this.token).subscribe(data=>{
        if(data['success']){
          let pushProduct = {
            idProduct : this.product.idProduct,
            Name : this.product.Name,
            Description : this.product.Description,
            Type : this.product.Type,
            Size : this.product.Size,
            Quantity : 1
          }
          this.dbService.productsInBag.push(pushProduct)
          this.dbService.idBag = data['id']
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
