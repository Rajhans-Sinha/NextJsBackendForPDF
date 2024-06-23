import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  private readonly pdfFilePath = path.join(process.cwd(), 'src', 'pdf', 'output.pdf');

  constructor(private readonly userService: UserService) {}

  async generatePdf(): Promise<void> {
    const users = this.userService.getUsers();
    const doc = new PDFDocument();
    const pdfFilePath = this.pdfFilePath;

    try {
      doc.pipe(fs.createWriteStream(pdfFilePath));

      doc.text('User List', { align: 'center', underline: true });
      doc.moveDown();

      users.forEach((user) => {
        doc.text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Phone Number: ${user.phone}`);
        doc.text(`Address: ${user.address}`);
        doc.moveDown();
      });

      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new InternalServerErrorException('Could not generate PDF');
    }
  }

  getPdfPath(): string {
    return this.pdfFilePath;
  }
}
