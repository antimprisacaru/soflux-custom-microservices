import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Role } from '@soflux/ui/shared/domain';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'soflux-smart-role-selection',
  template: `
    <div class="flex flex-column align-items-center justify-content-center">
      <h1>Welcome to the Platform</h1>
      <p>Please select your role:</p>
      <p-dropdown [options]="roles" optionLabel="label"></p-dropdown>
    </div>
    <div class="flex flex-row justify-content-end mt-8">
      <p-button routerLink="/app/setup/details">Next</p-button>
    </div>
  `,
  imports: [DropdownModule, ButtonModule, RouterLink],
})
export class RoleSelectionComponent {
  protected readonly roles: Array<{ label: string; value: Role }> = [
    { label: 'Influencer', value: Role.Influencer },
    { label: 'Company Representative', value: Role.Company },
  ];
  protected readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      role: fb.nonNullable.control(Role.Unassigned),
    });
  }
}
