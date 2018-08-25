import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GoogleMapsService } from '../utils/googlemaps.service';
import { Places } from '../utils/places.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit, OnDestroy {
  predictions: Places[] = [];
  private placesPredictions: Subscription;
  predictionFilled = false;
  constructor(public googleMapsService: GoogleMapsService) {
  }
  jobSearchForm: FormGroup;
  filteredLocations = null;
  selectedLocation = null;
  expList = [
    {name: '0 Year', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7}
  ];
  salaryList = [
    {name: '<1 Lac', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10}
  ];

  ngOnInit() {
    this.jobSearchForm = new FormGroup({
      'designation': new FormControl(null),
      'keySkills': new FormControl(null),
      'location': new FormControl(null),
      'experience': new FormControl(null),
      'salary': new FormControl(null)
    });
    this.jobSearchForm.get('location').valueChanges.subscribe(
      (value) => {
        if (this.predictions.length > 0) {
          this.predictions.forEach(prediction => { 
            if (prediction.description === value) {
              this.predictionFilled = true;
            }
          });
        } else {
          this.predictionFilled = false;
        }
        if (value === "") {
          this.predictionFilled = false;
          this.predictions = [];
        }
        this.onChangeLocation(value)
      }
    );
  }

  onChangeLocation(location) {
    if ( this.predictionFilled || location == '' ) {
      return;
    }
    this.googleMapsService.suggestPlaces(location);
    this.placesPredictions = this.googleMapsService.getPredictionsUpdateListener().subscribe((predictions: Places[]) => {
      console.log(predictions);
      this.predictions = predictions;
    });
  }

  onSubmit() {
    console.log(this.jobSearchForm);
  }

  ngOnDestroy() {
    this.placesPredictions.unsubscribe();
  }
}
