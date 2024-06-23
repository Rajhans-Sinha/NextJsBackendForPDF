import { Controller, Get, Res, InternalServerErrorException } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async generatePdf(@Res() res: Response): Promise<void> {
    try {
      await this.pdfService.generatePdf();
      const pdfPath = this.pdfService.getPdfPath();

      if (!fs.existsSync(pdfPath)) {
        throw new InternalServerErrorException('PDF file not found');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
      const fileStream = fs.createReadStream(pdfPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error sending PDF:', error);
      throw new InternalServerErrorException('Could not send PDF');
    }
  }
}
