/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) throw new UnauthorizedException('Authorization header missing');

    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:8041/auth/validate-token', {
          headers: { Authorization: token },
        }),
      );

      const { valido, login, role } = response.data;

      if (!valido) throw new UnauthorizedException('Invalid token');

      // Armazena dados no request para uso posterior (como criadoPor, etc)
      request.user = { login, role };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
