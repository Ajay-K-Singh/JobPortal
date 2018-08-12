import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  expList = [
    {name: '0 Year', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 2},
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

  constructor() { }

  ngOnInit() {
  }
}
