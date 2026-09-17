import { Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma/pg';
import { ScopeController } from './scope.controller.js';
import { ScopeModelName } from './scope.js';
import { ScopeService } from './scope.service.js';

@Module({
  imports: [PrismaModule.forFeature([ScopeModelName])],
  controllers: [ScopeController],
  providers: [ScopeService],
  exports: [ScopeService],
})
export class ScopeModule {}
