import { SetMetadata } from '@nestjs/common';
import { Role as UserRole } from '@soflux/api/shared/domain';

export const ROLES_KEY = 'roles';
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role);
