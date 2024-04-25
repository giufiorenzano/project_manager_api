import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfigModule } from './modules/config/typeormconfig/typeormconfig.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';

@Module({
  imports: [
    ProjectModule,
    TaskModule,
    TypeOrmConfigModule,
    PaginationModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuardService,
  }],
})
export class AppModule {}
