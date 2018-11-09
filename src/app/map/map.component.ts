import { Component, OnInit } from '@angular/core';

import { Markers } from './markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  /**
   * List of markers on map
   */
  mapMarkers: Array<Markers> = [];

  /**
   * Intial latitude for the map
   */
  initialLatitude: number = 48.824694;

  /**
   * Intial longitude for the map
   */
  initialLongitude: number = 9.103378;
  /**
   * Map zoom
   */
  zoom: number = 16;
  constructor() { }

  ngOnInit() {
    this.mapMarkers = [
      {locationName: 'The Greek Campus', latitude: 30.044122, longitude: 31.238755, draggable:true },
      {locationName: 'Evolvice', latitude: 48.824694, longitude: 9.103378, draggable:false }
    ]
  }

}
