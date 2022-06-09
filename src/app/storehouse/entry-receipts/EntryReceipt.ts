import { EntryRegistration } from "./EntryRegistration";

export interface EntryReceipt {
  id?: number;
  dateOfEntry: Date;
  description: string;
  recipient: string;
  entryRegistrationDTOList: EntryRegistration[];
}
