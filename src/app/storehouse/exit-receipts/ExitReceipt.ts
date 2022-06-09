import { ExitRegistration } from "./ExitRegistration";

export interface ExitReceipt {
  id?: number;
  dateOfExit: Date;
  reasonForExit: string;
  sender: string;
  exitRegistrationDTOList: ExitRegistration[];
}
