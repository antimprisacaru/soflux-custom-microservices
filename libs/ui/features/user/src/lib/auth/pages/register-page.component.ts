import { Component } from '@angular/core';
import { RegisterContainerComponent } from '../containers/register-container.component';

@Component({
  standalone: true,
  selector: 'soflux-register-page',
  imports: [RegisterContainerComponent],
  template: ` <soflux-register-container></soflux-register-container>`,
})
export class RegisterPageComponent {}
