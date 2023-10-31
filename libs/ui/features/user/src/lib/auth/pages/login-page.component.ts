import { Component } from '@angular/core';
import { LoginContainerComponent } from '../containers/login-container.component';

@Component({
  standalone: true,
  selector: 'soflux-login-page',
  imports: [LoginContainerComponent],
  template: ` <soflux-login-container></soflux-login-container>`,
})
export class LoginPageComponent {}
