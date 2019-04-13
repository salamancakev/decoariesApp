import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService { 
  productsInBag : any;
  products : any
  idBag : any;
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

  editUser(user, token){
    return this.http.post('http://localhost:8080/edit-user', user, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  sendMessage(message, token){
    return this.http.post('http://localhost:8080/send-message', message, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  requestAppointment(body, token){
    return this.http.post('http://localhost:8080/request-appointment', body, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

}

  