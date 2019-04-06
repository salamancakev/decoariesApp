import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user : any;
  segment: any;
  edit = false;
  editForm : FormGroup;
  token : any;

  constructor(private storage : Storage, 
    private toastController: ToastController,
    private dbService : DatabaseService,
    private formBuilder : FormBuilder) { 
    }

    
  ngOnInit() {
    this.storage.get('user').then(user=>{
    this.user=user;
    this.storage.get('token').then(token=>{
      this.token=token
      this.segment='info'
      this.editForm = this.formBuilder.group({
      name : [this.user.name, Validators.required],
      email : [this.user.email, Validators.compose([
        Validators.email,
        Validators.required
      ])],
      website : [this.user.website],
      phone : [this.user.phone]
    })
    })
  })
  }
  
  onChange(event : Event){
    this.edit=false
  }
  onEdit(){
    this.edit=true;
  }

  async presentToast(message, duration){
    let toast = await this.toastController.create({
      message : message,
      duration : duration
    })

    toast.present()
  }

  onSave(){
    let user = {
      name : this.editForm.controls['name'].value,
      email : this.editForm.controls['email'].value,
      website : this.editForm.controls['website'].value,
      phone : this.editForm.controls['phone'].value,
      type : this.user.type
    }

    this.dbService.editUser(user, this.token).subscribe(data=>{
      if(data['success']){
        this.storage.set('user', user)
        this.user=user
        this.edit=false
        return this.presentToast(data['msg'], 5000);
      }
      else{
        this.presentToast(data['msg'], 5000)
        return false;
      }
    })
  }

}
