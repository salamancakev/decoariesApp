import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {DatabaseService} from '../../services/database.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  searchTerm = '';
  type = '';
  products : any;
  token : any;
  constructor(private router : Router, 
    private dbService : DatabaseService,
    private authService : AuthenticationService,
    private storage : Storage) { }

  ngOnInit() {
    this.storage.get('token').then(res=>{
      if(res){
        this.token = res;
        this.dbService.getProducts(this.token).subscribe(data=>{
          this.products=data;
        })
      }
    })
  }

  searchChanged(){
    let product

    if(this.type!=''){
      product = {
        name : this.searchTerm,
        type : this.type
      }
    }

    else{
      product = {
        name : this.searchTerm,
      }
    }
    console.log(product)

    this.dbService.getProductType(product, this.token).subscribe(data =>{
      if (data){
        this.products = data;
      }
    })
  }



}
