import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'soflux-page',
  template: `<div class="grid">
    <div class="col-12">
      <div class="card">
        <ng-content></ng-content>
      </div>
    </div>
  </div> `,
})
export class PageComponent {}
