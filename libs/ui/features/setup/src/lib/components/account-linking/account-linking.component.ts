import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  standalone: true,
  selector: 'soflux-account-linking',
  imports: [TabMenuModule, CardModule, ButtonModule, StyleClassModule, NgxFacebook],
  templateUrl: './account-linking.component.html',
})
export class AccountLinkingComponent implements OnInit {
  fbConfig = {
    userId: '',
    userAccessToken: '',
  };

  getFacebookLink = () =>
    `https://graph.facebook.com/${this.fbConfig.userId}/accounts?access_token=${this.fbConfig.userAccessToken}`;
  getInstagramLink = () => ``;

  ngOnInit() {

  }
}
