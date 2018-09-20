import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user.model'; 
@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.scss']
})
export class RecruiterHeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authenticationSub: Subscription;
  user: UserModel;
  private userInfoSub: Subscription;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticationService.getAuth();
    this.authenticationSub = this.authenticationService.getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      this.user = this.authenticationService.getUserInfo();
      this.userInfoSub = this.authenticationService.getUserInfoListener()
      .subscribe(user => {
        this.user = user;
        if (this.user.image === undefined) {
          this.user.image = "../../../assets/images/defaultProfile.jpg";
        }
      });
  }

  onLogOut() {
    this.authenticationService.logOut();
  }

}
