import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  isLogged = false;
  loading : any;

  pages = [
    {
      title : 'Home',
      url : '/home',
      icon : 'home'
    },
    {
      title : 'About Us',
      url : '/about',
      icon : 'information-circle'
    },
    {
      title : 'Products',
      url : '/products',
      icon : 'cart'
    },
    {
      title : 'Appointment',
      url : '/appointment',
      icon : 'calendar'
    },
    {
      title : 'Profile',
      url : '/profile',
      icon : 'person'
    }
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService : AuthenticationService,
    private router : Router,
    private loadingController: LoadingController,
    private alertController : AlertController,
    private menuController : MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.router.events.subscribe((event : RouterEvent) => {
      if(event instanceof NavigationEnd) {
        this.pages.map(p => {
          return p['active'] = (event.url === p.url)
        })
      }
    })
  }

   initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.backgroundColorByHexString('#4165f4')
      let loading = await this.loadingController.create({
        message : 'Please wait...',
        spinner : 'crescent',
      })
      loading.present().then(()=>{
        this.authService.authenticationState.subscribe(state =>{
          console.log('Auth changed: ',state)
          if(state){
            this.isLogged = true
            this.router.navigate(['home'])
            this.loadingController.dismiss()
          }
          else{
            this.loadingController.dismiss()
            this.router.navigate(['login'])
            
          }
          
        })
      });
      })
      
  }

  async logout(){
    let alert =  await this.alertController.create({
      header : 'Logout',
      message : 'Are you sure you want to logout?',
      buttons : [
        {
          text : 'Yes',
          role : 'confirm',
          handler : ()=>{
            this.authService.logout()
            this.menuController.toggle()
          }
        },
        {
          text : 'No',
          role : 'cancel'
        }
      ]

    })
    this.isLogged = false;
    return await alert.present()
  }

}
