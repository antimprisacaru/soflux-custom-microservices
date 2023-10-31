import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'soflux-influencers-list-header',
  template: `<div class="flex flex-column flex-wrap align-items-center">
    <p class="text-xl font-normal">Influencers</p>
    <p class="text-3xl font-bold">Discover Influencer Profiles</p>
    <p>Browse through a curated list of accounts</p>
  </div>`
})
export class InfluencersListHeaderComponent {}
