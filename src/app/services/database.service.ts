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
            return this.http.get('https://www.decoariesapp.herokuapp.com/products', {headers : { 'Authorization' : 'Bearer '+token}})

  }

  getProductType(product, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/products', product, {headers : 
    {'Content-Type' : 'application/json', 
    'Authorization' : 'Bearer '+ token}
    }); 
    
  }

  getDetails(id, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/product-details', id, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+token
    }
  });
  }

  addQuote(body, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/add-quote', body, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+token
    }
  });
  }

  getProductsInBag(token){
  return this.http.get('https://www.decoariesapp.herokuapp.com/get-bag', {headers : {
      'Content-Type' : 'application-json',
      'Authorization' : 'Bearer '+token
    }})
  }

  deleteProductQuote(product, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/delete-product-quote', product, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  requestQuote(products, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/submit-quote', products, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  editUser(user, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/edit-user', user, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  sendMessage(message, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/send-message', message, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

  requestAppointment(body, token){
    return this.http.post('https://www.decoariesapp.herokuapp.com/request-appointment', body, {headers : {
      'Authorization' : 'Bearer '+token
    }})
  }

}

  