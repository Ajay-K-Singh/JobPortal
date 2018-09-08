import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-job-seeker-header',
  templateUrl: './job-seeker-header.component.html',
  styleUrls: ['./job-seeker-header.component.scss']
})
export class JobSeekerHeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authenticationSub: Subscription;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticationService.getAuth();
    this.authenticationSub = this.authenticationService.getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogOut() {
    this.authenticationService.logOut();
  }

  ngOnDestroy() {
    if (this.authenticationSub) {
      this.authenticationSub.unsubscribe();
    }
  }

}
