export interface EntryRegistration {
  id?:number;
  quantity: number;
  productBarcode: string;
  shelfIdentifier: string;
  entryReceiptId?: number;
}
