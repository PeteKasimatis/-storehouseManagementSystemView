export interface ExitRegistration {
  id?: number;
  quantity: number;
  productBarcode: string;
  shelfIdentifier: string;
  exitReceiptId?: number;
}
