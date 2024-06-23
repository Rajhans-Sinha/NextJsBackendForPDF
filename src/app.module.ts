import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [UserModule, PdfModule],
})
export class AppModule {}
