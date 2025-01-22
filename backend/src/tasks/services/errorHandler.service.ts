import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  logError(message: string) {
    console.error(message);
  }
}
