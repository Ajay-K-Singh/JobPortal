import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.scss']
})

export class RecruiterProfile implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {}
  
}
