import { Module } from '@nestjs/common';
import { ReceiptModule } from '../receipt/receipt.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
