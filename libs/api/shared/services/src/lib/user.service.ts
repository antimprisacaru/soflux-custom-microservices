import { Injectable } from '@nestjs/common';
import { User } from '@soflux/api/shared/domain';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<User> {
    return this.prisma.user.create({ data }).then((res) => res as User);
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany().then((res) => res as User[]);
  }

  async findOne(id: number): Promise<User> {
    const res = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    return res as User;
  }

  async findByEmail(email: string): Promise<User> {
    const res = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    return res as User;
  }

  async update(id: number, data: any): Promise<User> {
    const res = await this.prisma.user.update({ data, where: { id } });
    return res as User;
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user
      .delete({ where: { id } })
      .then((res) => res as User);
  }
}
