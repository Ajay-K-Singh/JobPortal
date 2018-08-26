import { Component, OnInit, EventEmitter, Output, Input , OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Places } from '../../utils/places.model';
import { Subscription } from 'rxjs';
import { GoogleMapsService } from '../../utils/googlemaps.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  @Output()
	private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  private form: FormGroup; 
  predictions: Places[] = [];
  @Input() label: string = 'Some Label';
  private placesPredictions: Subscription;
  predictionFilled = false;
  constructor(private fb: FormBuilder, public googleMapsService: GoogleMapsService) { 
    this.form = this.fb.group({
			"location": new FormControl()
    });
    this.form.get('location').valueChanges.subscribe(
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
  ngOnInit() {
    this.formReady.emit(this.form);
    console.log(this.label);
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

  ngOnDestroy() {
    if(this.placesPredictions){
      this.placesPredictions.unsubscribe();
     }
  }
}