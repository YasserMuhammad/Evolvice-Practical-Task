import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Routing Module
import { RouterModule, Routes } from '@angular/router';

// Angular HTTP Module
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Application Components
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';

// Application Service
import { ChatService } from './services/chat.service';

// Angular Google Maps Module
import { AgmCoreModule } from '@agm/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

// This part defind every route for components in the application
export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'map', component: MapComponent},
    { path: 'chat', component: ChatComponent},
    // Other routes
    { path: '**', redirectTo: 'home'},

  ]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfThklVPal2IBRQLuP8v-UmgYQVXzZyEk'
    })
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
