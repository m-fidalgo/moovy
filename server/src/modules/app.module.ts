import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigModule } from './db.config.module';
import MovieModule from './movie.module';

@Module({
  imports: [ConfigModule.forRoot(), DbConfigModule, MovieModule],
})
export class AppModule {}
