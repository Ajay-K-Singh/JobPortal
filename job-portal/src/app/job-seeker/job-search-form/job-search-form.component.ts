import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'job-search-form',
  templateUrl: './job-search-form.component.html',
  styleUrls: ['./job-search-form.component.scss']
})
export class JobSearchFormComponent implements OnInit {
  constructor() {
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
      'experience': new FormControl(null),
      'salary': new FormControl(null)
    });
  }

  private addFormControl(name: string, formGroup: FormGroup) : void {
		this.jobSearchForm.addControl(name, formGroup);
	}

  onSubmit(form: FormGroup) {
    console.log(this.jobSearchForm);
  }
}
