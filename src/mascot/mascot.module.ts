import { Module } from '@nestjs/common';
import { MascotService } from './mascot.service';
import { MascotController } from './mascot.controller';

@Module({
  providers: [MascotService],
  controllers: [MascotController]
})
export class MascotModule {}
