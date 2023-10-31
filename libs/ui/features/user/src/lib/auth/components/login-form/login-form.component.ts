import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';

@Component({
  standalone: true,
  selector: 'soflux-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    ButtonModule,
    InputTextModule,
    DividerModule,
    RouterLink,
    CheckboxModule,
    RippleModule,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() loading!: boolean | null;
  @Output() login = new EventEmitter<void>();

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
