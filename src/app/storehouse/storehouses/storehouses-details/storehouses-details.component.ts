import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Storehouse } from '../Storehouse';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorehousesService } from '../storehouses.service';
import { Shelf } from '../shelfs/Shelf';
import { PKMessageService } from 'src/app/_pk_shared/messages/pk-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-storehouses-details',
  templateUrl: './storehouses-details.component.html',
  styleUrls: ['./storehouses-details.component.css'],
})
export class StorehousesDetailsComponent implements OnInit{
  isFetching = false;
  error = false;
  errorMessage = null;

  storehouse: Storehouse;
  shelvesList: Shelf[];

  storehouseDetailsForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    description: [null, [Validators.required, Validators.maxLength(45)]],
    shelves: this.formBuilder.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private storehousesService: StorehousesService,
    private pkMessageService: PKMessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService) {}

  ngOnInit() {
    this.getStorehouse();
    this.getShelvesByStorehouseId();
  }

  populateFields() {
    this.storehouseDetailsForm.patchValue({
      id: this.storehouse.id,
      description: this.storehouse.description,
    });
  }

  populateShelves() {
    this.shelvesList.forEach((shelf) => {
      this.shelves.push(
        this.formBuilder.group({
          id: [{ value: shelf.id, disabled: true }],
          identifier: [shelf.identifier,[Validators.required, Validators.maxLength(45)]],
        })
      );
    });
  }

  getStorehouse() {
    this.isFetching = true;
    this.storehousesService
      .getStorehouse(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (storehouse) => {
          this.storehouse = storehouse;
          this.isFetching = false;
          this.populateFields();
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.error.message;
          this.isFetching = false;
        }
      );
  }

  getShelvesByStorehouseId() {
    this.isFetching = true;
    this.storehousesService
      .getShelves(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (shelves) => {
          this.shelvesList = shelves;
          this.isFetching = false;
          this.populateShelves();
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

  get shelves(): FormArray {
    return this.storehouseDetailsForm.get('shelves') as FormArray;
  }

  newShelf(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      identifier: [null, [Validators.required, Validators.maxLength(45)]],
    });
  }

  onAddShelf() {
    this.shelves.push(this.newShelf());
  }

  removeShelf(i: number) {
    this.shelves.removeAt(i);
  }

  onShelfDetails(identifier: string) {
    this.router.navigate(['./shelf', identifier]);
  }

  onUpdateStorehouse() {
    this.storehousesService
      .putStorehouse(this.storehouseDetailsForm.getRawValue())
      .subscribe(
        (storehouse) => {
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

  onDeleteStorehouse() {
    this.storehousesService
      .deleteStorehouse(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.storehouseDetailsForm.reset();
          setTimeout(() => {
            this.router.navigate(['/storehouse/list']);
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
      message: this.translate.instant('sms.confirm.message'),
      header: this.translate.instant('sms.confirm.header'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteStorehouse();
      },
    });
  }
}
