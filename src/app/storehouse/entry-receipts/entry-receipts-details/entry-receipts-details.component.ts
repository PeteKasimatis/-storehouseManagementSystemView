import { PKMessageService } from './../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { EntryReceiptsService } from '../entry-receipts.service';
import { EntryReceipt } from '../EntryReceipt';
import { EntryRegistration } from '../EntryRegistration';

@Component({
  selector: 'app-entry-receipts-details',
  templateUrl: './entry-receipts-details.component.html',
  styleUrls: ['./entry-receipts-details.component.css']
})
export class EntryReceiptsDetailsComponent implements OnInit {
  isFetching = false;
  error = false;
  errorMessage = null;

  entryReceipt: EntryReceipt;
  entryRegistrationList: EntryRegistration[] =[];

  entryReceiptDetailsForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    dateOfEntry: [{ value: '', disabled: true }],
    description: [null, [Validators.required, Validators.maxLength(45)]],
    recipient: [null, [Validators.required, Validators.maxLength(45)]]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private entryReceiptService: EntryReceiptsService,
    private pkMessageService: PKMessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getEntryReceipt();
  }

  populateFields() {
    this.entryReceiptDetailsForm.patchValue({
      id: this.entryReceipt.id,
      dateOfEntry: this.entryReceipt.dateOfEntry,
      description: this.entryReceipt.description,
      recipient: this.entryReceipt.recipient
    });
    this.populateEntryRegistrations();
  }

  populateEntryRegistrations() {
    this.entryReceipt.entryRegistrationDTOList.forEach((entryRegistration) => {
      this.entryRegistrationList.push(entryRegistration);
    });
  }

  getEntryReceipt() {
    this.isFetching = true;
    this.entryReceiptService
      .getEntryReceipt(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (entryReceipt) => {
          this.entryReceipt = entryReceipt;
          this.isFetching = false;
          this.populateFields();
        },
        (error) => {
          this.error = true;
          if (error.status == 0){
            this.errorMessage = error.message;
          }
          else{
            this.errorMessage = error.error.message;
            this.pkMessageService.showErrorMessage(this.errorMessage);
            this.error = false;
          }
        }
      );
  }

  onUpdateEntryReceipt() {
    this.entryReceiptService
      .putEntryReceipt(this.entryReceiptDetailsForm.getRawValue())
      .subscribe(
        (entryReceipt) => {
          this.pkMessageService.showSuccessSaveMessage();
        },
        (error) => {
          if (error.status == 0){
            this.errorMessage = error.message;
          }
          else{
            this.errorMessage = error.error.message;
            this.pkMessageService.showErrorMessage(this.errorMessage);
          }
        }
      );
  }

  onDeleteEntryReceipt() {
    this.entryReceiptService
      .deleteEntryReceipt(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.entryReceiptDetailsForm.reset();
          setTimeout(() => {
            this.router.navigate(['/entry-receipt/list']);
          }, 1000);
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.pkMessageService.showErrorMessage(this.errorMessage);
        }
      );
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Θέλετε σίγουρα να διαγράψετε αυτό το δελτίο εισαγωγής;',
      header: 'Επιβεβαίωση',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteEntryReceipt();
      },
    });
  }

}
