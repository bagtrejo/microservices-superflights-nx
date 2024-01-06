import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(configService: ConfigService) {
    console.log("URL DE MONGO FLIGHTS: " + configService.get('URI_MONGODB'));
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
