import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Places } from './places.model';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsService {
  private predictions: Places[] =  [];
  private suggestedLocationsResponse = new Subject<Places[]>();
  constructor(private http: HttpClient){}
  suggestPlaces(location: string) {
    this.http.get<{ predictions: any }>('http://localhost:3000/api/google-places', 
    {params: {location: location}})
      .pipe(map((response) => {
        return response.predictions.map((res) => {
          return {
            description: res.description
          }
        })
      }))
      .subscribe((suggestions) => {
        this.predictions = suggestions;
        this.suggestedLocationsResponse.next([...this.predictions])
      });
  }

  getPredictionsUpdateListener() {
    return this.suggestedLocationsResponse.asObservable();
  }
}