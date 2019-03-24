import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService { 
  productsInBag : any;
  constructor(private http : HttpClient, private storage : Storage) {
   }
  getProducts(token){
            return this.http.get('http://localhost:8080/products', {headers : { 'Authorization' : 'Bearer '+token}})

  }

  getProductType(product, token){
    return this.http.post('http://localhost:8080/products', product, {headers : 
    {'Content-Type' : 'application/json', 
    'Authorization' : 'Bearer '+ token}
    }); 
    
  }

  getDetails(id, token){
    return this.http.post('http://localhost:8080/product-details', id, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+token
    }
  });
  }

  addQuote(body, token){
    return this.http.post('http://localhost:8080/add-quote', body, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+token
    }
  });
  }

  getProductsInBag(token){
  return this.http.get('http://localhost:8080/get-bag', {headers : {
      'Content-Type' : 'application-json',
      'Authorization' : 'Bearer '+token
    }})
  }

  getQuote(token){
    return this.http.get('http://localhost:8080/get-quote', {headers : {
      'Content-Type' : 'application-json',
      'Authorization' : 'Bearer '+token
    }})
  }

  deleteProductQuote(product, token){
    return this.http.post('http://localhost:8080/delete-product-quote', product, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  requestQuote(products, token){
    return this.http.post('http://localhost:8080/submit-quote', products, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }
}
