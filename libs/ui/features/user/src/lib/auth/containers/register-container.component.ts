import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from '../components/register-form/register-form.component';

@Component({
  standalone: true,
  selector: 'soflux-register-container',
  template: `
    <soflux-register-form></soflux-register-form>`,
  imports: [RegisterFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {}
