import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class UserIdGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const userId = req.headers['x-user-id'];
      if (!userId) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Not authorized' });
    }
  }
}
