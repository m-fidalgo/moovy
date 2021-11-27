import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DbConfigModule } from './db.config.module';

@Module({
  imports: [ConfigModule.forRoot(), DbConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
