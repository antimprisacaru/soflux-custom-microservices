import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'soflux-landing-header',
  imports: [RippleModule, StyleClassModule, ButtonModule],
  templateUrl: 'landing-header.component.html',
})
export class LandingHeaderComponent {}
