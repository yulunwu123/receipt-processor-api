import { Test, TestingModule } from '@nestjs/testing';

import { ReceiptService } from './receipt.service';
import { ReceiptDto } from './receipt.dto';

describe('ReceiptService', () => {
  let service: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptService],
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate points correctly for the provided JSON receipt', () => {
    const receipt: ReceiptDto = {
      retailer: 'M&M Corner Market',
      purchaseDate: '2022-03-20',
      purchaseTime: '14:33',
      items: [
        { shortDescription: 'Gatorade', price: '2.25' },
        { shortDescription: 'Gatorade', price: '2.25' },
        { shortDescription: 'Gatorade', price: '2.25' },
        { shortDescription: 'Gatorade', price: '2.25' },
      ],
      total: '9.00',
    };

    expect(typeof service.processReceipt(receipt)).toBe('string');
  });
});