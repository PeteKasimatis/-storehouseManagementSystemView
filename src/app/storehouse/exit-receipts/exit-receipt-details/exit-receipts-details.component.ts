import { PKMessageService } from './../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ExitReceiptsService } from '../exit-receipts.service';
import { ExitReceipt } from '../ExitReceipt';
import { ExitRegistration } from '../ExitRegistration';

@Component({
  selector: 'app-exit-receipts-details',
  templateUrl: './exit-receipts-details.component.html',
  styleUrls: ['./exit-receipts-details.component.css']
})
export class ExitReceiptsDetailsComponent implements OnInit {
  isFetching = false;
  error = false;
  errorMessage = null;

  exitReceipt: ExitReceipt;
  exitRegistrationList: ExitRegistration[] = [];

  exitReceiptDetailsForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    dateOfExit: [{ value: '', disabled: true }],
    reasonForExit: [null, [Validators.required, Validators.maxLength(45)]],
    sender: [null, [Validators.required, Validators.maxLength(45)]]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private exitReceiptsService: ExitReceiptsService,
    private pkMessageService: PKMessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getExitReceipt();
  }

  populateFields() {
    this.exitReceiptDetailsForm.patchValue({
      id: this.exitReceipt.id,
      dateOfExit: this.exitReceipt.dateOfExit,
      reasonForExit: this.exitReceipt.reasonForExit,
      sender: this.exitReceipt.sender
    });
    this.populateExitRegistrations();
  }

  populateExitRegistrations() {
    this.exitReceipt.exitRegistrationDTOList.forEach((exitRegistration) => {
      this.exitRegistrationList.push(exitRegistration);
      console.log(exitRegistration);
    });
  }

  getExitReceipt() {
    this.isFetching = true;
    this.exitReceiptsService
      .getExitReceipt(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (exitReceipt) => {
          this.exitReceipt = exitReceipt;
          console.log(exitReceipt);
          console.log(this.exitReceipt);

          this.isFetching = false;
          this.populateFields();
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

  onUpdateExitReceipt() {
    this.exitReceiptsService
      .putExitReceipt(this.exitReceiptDetailsForm.getRawValue())
      .subscribe(
        (exitReceipt) => {
          this.pkMessageService.showSuccessSaveMessage();
        },
        (error) => {
          if (error.status == 0){
            this.errorMessage = error.message;
          }
          else{
            this.errorMessage = error.error.message;
            this.pkMessageService.showErrorMessage(this.errorMessage)
          }
        }
      );
  }

  onDeleteExitReceipt() {
    this.exitReceiptsService
      .deleteExitReceipt(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.exitReceiptDetailsForm.reset();
          setTimeout(() => {
            this.router.navigate(['/exit-receipt/list']);
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
      message: 'Θέλετε σίγουρα να διαγράψετε αυτό το δελτίο εξαγωγής;',
      header: 'Επιβεβαίωση',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteExitReceipt();
      },
    });
  }
}
