import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'soflux-finalization',
  imports: [ButtonModule, DropdownModule, RouterLink],
  template: `
    <div class="flex flex-column align-items-center justify-content-center">
      <h1 class="final-title">Welcome Aboard!</h1>
      <p class="final-description">Congratulations, you're all set up and ready to explore the platform.</p>
      <p-button routerLink="/app/dashboard">Let's get started!</p-button>
    </div>`,
})
export class FinalizationComponent {}
