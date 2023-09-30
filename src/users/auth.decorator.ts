import { SetMetadata } from '@nestjs/common';

export const UserId = (id: string | number) => SetMetadata('users', id);
