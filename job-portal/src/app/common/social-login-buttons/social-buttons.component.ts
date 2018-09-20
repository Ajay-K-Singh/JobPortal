import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss']
})
export class SocialButtonsComponent implements OnInit {
  modeSelected: string = '';
  private modeSubs: Subscription;
  constructor(private authenticationService: AuthenticationService){}
  ngOnInit() {
    this.setModeSubscription();
  }

  setModeSubscription() {
    this.modeSelected = this.authenticationService.getMode();
    this.modeSubs = this.authenticationService.getModeListener()
      .subscribe(mode => {
        this.modeSelected = mode;
      }) 
  }
}