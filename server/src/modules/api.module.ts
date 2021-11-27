import { Module } from '@nestjs/common';
import ApiController from 'src/controllers/api.controller';
import ApiService from 'src/services/api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
})
export default class ApiModule {}
