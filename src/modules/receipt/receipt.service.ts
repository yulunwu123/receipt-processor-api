import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ReceiptDto } from './receipt.dto';

@Injectable()
export class ReceiptService {
  private receiptPoints: Map<string, number> = new Map();

  /**
   * Processes a receipt by calculating points and generating a unique ID.
   * Stores the ID and associated points in memory.
   * @param receiptDto The receipt data to process.
   * @returns A unique ID assigned to the receipt.
   * @throws BadRequestException If the receipt data is invalid.
   */
  processReceipt(receiptDto: ReceiptDto): string {
    try {
      const points = this.calculatePoints(receiptDto);
      const uniqueId = uuidv4();
      this.receiptPoints.set(uniqueId, points);
      return uniqueId;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`The receipt is invalid. ${error}`);
    }
  }

  /**
   * Retrieves the points associated with a given receipt ID.
   * @param id The unique receipt ID.
   * @returns The points for the receipt stored.
   * @throws NotFoundException If the receipt ID is not found.
   */
  getPointsById(id: string): number {
    const points = this.receiptPoints.get(id);
    if (!points) {
      throw new NotFoundException(`No receipt found for that ID.`);
    }
    return points;
  }

  /**
   * Helper function that calculates points for a receipt.
   * @param receiptDto The receipt data.
   * @returns The total points calculated from the receipt.
   * @throws BadRequestException If any receipt field is invalid.
   */
  private calculatePoints(receiptDto: ReceiptDto): number {
    let points = 0;

    if (receiptDto.retailer && typeof receiptDto.retailer === 'string') {
      points += receiptDto.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    } else {
      throw new BadRequestException(
        'Retailer name is required and should be a string.',
      );
    }

    const total = parseFloat(receiptDto.total);
    if (isNaN(total)) {
      throw new BadRequestException(
        'Total is invalid, cannot convert to a number.',
      );
    }
    if (total % 1 === 0) {
      points += 50;
    }
    if (total % 0.25 === 0) {
      points += 25;
    }

    if (Array.isArray(receiptDto.items)) {
      points += Math.floor(receiptDto.items.length / 2) * 5;
    } else {
      throw new BadRequestException('Items should be an array.');
    }

    receiptDto.items.forEach((item) => {
      const descriptionLength = item?.shortDescription?.trim().length;
      if (descriptionLength % 3 === 0) {
        const price = parseFloat(item.price);
        if (!isNaN(price)) {
          points += Math.ceil(price * 0.2);
        }
      }
    });

    const purchaseDateParts = receiptDto.purchaseDate?.split('-');
    if (!purchaseDateParts || purchaseDateParts.length !== 3) {
      throw new BadRequestException('Invalid purchase date.');
    }
    const day = +purchaseDateParts[2];
    if (isNaN(day) || day < 1 || day > 31) {
      throw new BadRequestException('Invalid day in purchase date.');
    }
    if (day % 2 !== 0) {
      points += 6;
    }

    const purchaseTimeParts = receiptDto.purchaseTime?.trim()?.split(':');
    if (!purchaseTimeParts || purchaseTimeParts.length !== 2) {
      throw new BadRequestException('Invalid purchase time.');
    }
    const hours = +purchaseTimeParts[0];
    if (isNaN(hours)) {
      throw new BadRequestException('Invalid purchase time.');
    }
    if (hours >= 14 && hours < 16) {
      points += 10;
    }

    console.log(`Points: ${points}`);
    return points;
  }
}
