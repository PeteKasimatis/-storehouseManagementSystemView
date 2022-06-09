import { TranslateService } from '@ngx-translate/core';
import { PKBlockUIService } from './../../../_pk_shared/pk-block-UI/pk-block-ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PKMessageService } from '../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit,} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shelf } from '../shelfs/Shelf';
import { StorehousesService } from '../storehouses.service';
import { Storehouse } from '../Storehouse';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-storehouses-view',
  templateUrl: './storehouses-view.component.html',
  styleUrls: ['./storehouses-view.component.css']
})
export class StorehousesViewComponent implements OnInit {

  id: any ;
  storehouse: Storehouse;
  shelvesList: Shelf[];
  isFetching = false;
  error = false;
  errorMessage = null;

  storehouseForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    description: [null, [Validators.required, Validators.maxLength(45)]],
    shelves: this.formBuilder.array([]),
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private storehousesService: StorehousesService,
              private pkMessageService: PKMessageService,
              private confirmationService: ConfirmationService,
              private pkBlockUIService: PKBlockUIService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id > 0){
      this.getStorehouse();
    }
  }

  get shelves(): FormArray {
    return this.storehouseForm.get("shelves") as FormArray;
  }

  newShelf(): FormGroup {
    return this.formBuilder.group({
      identifier: [null, [Validators.required, Validators.maxLength(45)]]
    })
  }

  onAddShelf() {
    this.shelves.push(this.newShelf());
  }

  removeShelf(i:number) {
    this.shelves.removeAt(i);
}

  onSaveStorehouse(){
    this.pkBlockUIService.block();
    if(this.id){
      this.storehousesService
      .putStorehouse(this.storehouseForm.getRawValue())
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
      ).add(()=>{
        this.pkBlockUIService.unblock();
      });
    }
    else{
      this.isFetching = true;
      this.storehousesService.postStorehouse(this.storehouseForm.getRawValue()).subscribe(storehouse =>{
        this.pkMessageService.showSuccessSaveMessage();
        this.storehouseForm.reset()
        this.isFetching = false;
        this.router.navigate(['/storehouses/view', storehouse['id']]);
      },
      error =>{
        if (error.status == 0){
          this.error = true;
          this.errorMessage = error.message;
        }
        else{
          this.errorMessage = error.error.message;
          this.pkMessageService.showErrorMessage(this.errorMessage);
        }
        this.isFetching = false;
      }).add(()=>{
        this.pkBlockUIService.unblock();
      });
    }
  }

  onCLear(){
    this.storehouseForm.reset();
    this.shelves.clear();
  }

  getStorehouse() {
    this.isFetching = true;
    this.storehousesService
      .getStorehouse(this.id)
      .subscribe(
        (storehouse) => {
          this.storehouse = storehouse;
          this.shelvesList = storehouse.shelves;
          this.isFetching = false;
          this.populateFields(storehouse);
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.error.message;
          this.isFetching = false;
        }
      );
  }

  populateFields(storehouse) {
    this.storehouseForm.patchValue({
      id: storehouse.id,
      description: storehouse.description,
    });
    storehouse.shelves.forEach((shelf) => {
      this.shelves.push(
        this.formBuilder.group({
          id: [{ value: shelf.id, disabled: true }],
          identifier: [shelf.identifier,[Validators.required, Validators.maxLength(45)]],
        })
      );
    });
  }

  onShelfDetails(shelf){
    this.router.navigate(['./shelf', shelf.get('identifier').value]);
  }

  onDeleteStorehouse() {
    this.storehousesService
      .deleteStorehouse(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.storehouseForm.reset();
          this.router.navigate(['/storehouses/list']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.pkMessageService.showErrorMessage(this.errorMessage);
        }
      );
  }

  confirmDelete() {
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
