import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Title in the Header
   */
  title: string;

  /**
   * Array of tabs
   */
  tabs: Array<any> = [
    {name: 'Home', iconName:'fa-home', path:'/home'},
    {name: 'Map', iconName:'fa-map', path:'/map'},
    {name: 'Chat', iconName:'fa-newspaper', path:'/chat'}
  ]

  constructor(private router: Router){
    
    // Subscribe to any changes in router
    this.router.events.subscribe(path =>{

      // check if the subscribed value is part of the last Navigation
      if (path instanceof NavigationEnd) {
        this.setPageTitlefromPath(path.url)
      }
    })
  }
  
  /**
   * Switch title based on the current Path
   * 
   * @param path - Current Url path
   */
  setPageTitlefromPath(path: string){
    switch (path) {
      case '/chat':
        this.title = 'Chat';
        break;
      case '/map':
        this.title = 'Map';
        break;
      default:
        this.title = 'Home';
        break;
    }
  }
  
}
