import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
