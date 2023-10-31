import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'soflux-not-found',
  template: ` <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img
        alt="logo"
        class="mb-5 w-6rem flex-shrink-0"
        src="assets/images/logo.png"
      />
      <div
        style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);"
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
          style="border-radius:53px"
        >
          <span class="text-blue-500 font-bold text-3xl">404</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">
            Not Found
          </h1>
          <div class="text-600 mb-5">Requested resource is not available.</div>
          <a
            class="w-full flex align-items-center py-5 border-300 border-bottom-1"
            routerLink="/"
          >
            <span
              class="flex justify-content-center align-items-center bg-cyan-400 border-round"
              style="height:3.5rem; width:3.5rem;"
            >
              <i class="text-50 pi pi-fw pi-table text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-column">
              <span class="text-900 lg:text-xl font-medium mb-0 block"
                >Dashboard</span
              >
              <span class="text-600 lg:text-xl">Return to the home page.</span>
            </span>
          </a>
          <a
            [routerLink]="['/']"
            class="w-full flex align-items-center py-5 border-300 border-bottom-1"
          >
            <span
              class="flex justify-content-center align-items-center bg-orange-400 border-round"
              style="height:3.5rem; width:3.5rem;"
            >
              <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-column">
              <span class="text-900 lg:text-xl font-medium mb-0"
                >Solution Center</span
              >
              <span class="text-600 lg:text-xl"
                >Navigate to help page.</span
              >
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>`,
  imports: [RouterLink],
})
export class NotFoundComponent {}
