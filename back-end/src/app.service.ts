import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// Là hàm xử lý các logic và trả về kết quả cho controller để trả về response