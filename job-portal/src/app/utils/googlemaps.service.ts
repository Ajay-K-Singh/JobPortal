import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsService {
  constructor(private http: HttpClient){}
  suggestPlaces(location: string) {
    this.http.get<{location: string }>('http://localhost:3000/api/google-places')
      .subscribe((response) => {
        console.log(response);
      })
  }
}