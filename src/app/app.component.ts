import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
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
    private router : Router
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
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#4165f4')
      

      this.authService.authenticationState.subscribe(state =>{
        console.log('Auth changed: ',state)
        if(state){
          this.isLogged = true
          this.router.navigate(['home'])
        }
        else{
          this.router.navigate(['login'])
          
        }
        
      })
    });
    
    
  }
}
