import { Component } from '@angular/core';
import { LandingHeaderComponent } from '../components/landing-header/landing-header.component';

@Component({
  standalone: true,
  selector: 'soflux-landing-page',
  imports: [LandingHeaderComponent],
  template: `
    <div class="surface-0 flex justify-content-center">
      <soflux-landing-header />
    </div>
  `,
})
export class LandingPageComponent {}
