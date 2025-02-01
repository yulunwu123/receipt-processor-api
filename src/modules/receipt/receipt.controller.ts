import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReceiptService } from './receipt.service';
import { ReceiptDto } from './receipt.dto';
import { ProcessReceiptResponse } from './receipt-response.dto';
import { ReceiptPointsResponse } from './points-response.dto';

@Controller('receipts')
@ApiTags('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  /**
   * Processes a receipt, calculates points, and returns a unique receipt ID.
   * @param receiptDto The receipt.
   * @returns An object containing the generated receipt ID.
   */
  @Post('process')
  processReceipt(@Body() receiptDto: ReceiptDto): ProcessReceiptResponse {
    const id = this.receiptService.processReceipt(receiptDto);
    return { id };
  }

  /**
   * Retrieves the points associated with a given receipt ID.
   * @param id The unique receipt ID.
   * @returns An object containing the points for the receipt.
   */
  @Get(':id/points')
  getPointsById(@Param('id') id: string): ReceiptPointsResponse {
    const points = this.receiptService.getPointsById(id);
    return { points };
  }
}
