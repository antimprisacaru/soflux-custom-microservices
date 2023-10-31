import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@soflux/ui/shared/domain';
import { AvatarModule } from 'primeng/avatar';
import { NameInitialsPipe } from '@soflux/ui/shared/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  standalone: true,
  selector: 'soflux-header',
  imports: [
    RouterLink,
    AvatarModule,
    NameInitialsPipe,
    MenuModule,
    NgIf,
    BadgeModule,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input({ required: true }) user: User | null;
  @Output() logout = new EventEmitter<void>();
  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/app/profile',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/app/settings',
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      routerLink: '/app/help',
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout.emit();
      },
    },
  ];
}
