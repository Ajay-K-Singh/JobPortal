import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  messageObject: any;
  message: string;
  messageType: string;
  private messageObjSubs: Subscription;
  constructor(public authenticationService: AuthenticationService) { 
  }
  
  onClose() {
    const messageElement = document.getElementById('messageDiv');
    messageElement.style.display = 'none';
  }

  ngOnInit() {
    this.messageObject = this.authenticationService.getMessageObject();
    this.messageObjSubs = this.authenticationService.getMessageObjectListener()
      .subscribe(data => {
        this.messageObject = data;
        this.message = this.messageObject.message;
        this.messageType = this.messageObject.type;
      });
  }

  ngOnDestroy() {
    this.message = '';
  }

}