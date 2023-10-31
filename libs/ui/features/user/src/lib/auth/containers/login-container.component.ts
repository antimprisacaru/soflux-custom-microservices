import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UserFacade } from '@soflux/ui/shared/store';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'soflux-login-container',
  template: ` <soflux-login-form
    [form]="form"
    [loading]="userFacade.loading$ | async"
    (login)="triggerLogin()"
  ></soflux-login-form>`,
  imports: [LoginFormComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', { validators: [Validators.required] }),
  });

  constructor(private fb: FormBuilder, protected userFacade: UserFacade) {}

  triggerLogin() {
    this.userFacade.login(
      this.form.value as { email: string; password: string }
    );
  }
}
