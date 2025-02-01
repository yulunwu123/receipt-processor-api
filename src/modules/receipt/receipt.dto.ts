import { IsString, IsArray, IsNumber } from 'class-validator';

// Item DTO to handle each item in the purchase
class ItemDto {
  @IsString()
  shortDescription: string;

  @IsString()
  price: string;
}

export class ReceiptDto {
  @IsString()
  retailer: string;

  @IsString()
  purchaseDate: string;

  @IsString()
  purchaseTime: string;

  @IsArray()
  items: ItemDto[];

  // @IsString()
  @IsNumber()
  total: string;
}
