import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {
  product : any;
  constructor(private modalController : ModalController) { }

  ngOnInit() {
    console.log(this.product)
  }

  dismiss(){
    this.modalController.dismiss()
  }

}
