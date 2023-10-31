import { Component } from '@angular/core';
import { InfluencersListHeaderComponent } from '../components/influencer-browse-header/influencers-list-header.component';

@Component({
  standalone: true,
  selector: 'soflux-list-influencers-page',
  imports: [InfluencersListHeaderComponent],
  template: ` <soflux-influencers-list-header></soflux-influencers-list-header>`,
})
export class ListInfluencersPageComponent {}
