import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-jobseeker-listings',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})

export class SeekerProfile implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {}
  
}
