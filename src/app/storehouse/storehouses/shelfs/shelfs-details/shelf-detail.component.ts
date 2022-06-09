import { PKMessageService } from './../../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorehousesService } from '../../storehouses.service';
import { Shelf } from '../Shelf';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css']
})
export class ShelfDetailComponent implements OnInit {

  public shelf: Shelf;
  updateDisabled : boolean;
  isFetching = false;
  error = false;
  errorMessage = null;


  shelfDetailsForm = this.formBuilder.group({
    id: [{value: '', disabled: true}],
    identifier: [null, [Validators.required, Validators.maxLength(45)]],
    storehouseId: [{value: '', disabled: true}]
  })

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private storehouseService: StorehousesService,
              private pkMessageService: PKMessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.updateDisabled = true;
    this.getShelf();
  }

  onUpdateEnabled(){
    this.updateDisabled = false;
  }

  getShelf(){
    this.isFetching = true;
    this.storehouseService
      .getShelf(this.route.snapshot.paramMap.get('identifier'))
      .subscribe(shelf =>{
         this.shelf = shelf
         this.populateFields();
         this.isFetching = false;
       },
       error =>{
         this.error = true;
        this.errorMessage = error.error.message;
        this.isFetching = false;
      });
  }

  populateFields(){
    this.shelfDetailsForm.setValue({
      id: this.shelf.id,
      identifier: this.shelf.identifier,
      storehouseId: this.shelf.storehouseId
    })
  }

  onShowStock(){
    this.router.navigate(['/stock/identifier', this.route.snapshot.paramMap.get('identifier')]);
  }

  onUpdateShelf(){
    this.shelfDetailsForm.controls.id.enable();
    this.shelf.id = this.shelfDetailsForm.value.id;
    this.shelf.identifier = this.shelfDetailsForm.value.identifier;
    this.shelf.storehouseId = this.shelfDetailsForm.value.storehouseId;

    this.storehouseService.putShelf(this.shelf).subscribe(shelf =>{
      this.pkMessageService.showSuccessSaveMessage();
      this.updateDisabled = true;
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
      });

    this.shelfDetailsForm.controls.id.disable();
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Θέλετε σίγουρα να διαγράψετε αυτό το ράφι;',
      header: 'Επιβεβαίωση',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteShelf();
      },
    });
  }

  onDeleteShelf(){
    this.shelfDetailsForm.controls.id.enable();
    this.storehouseService
      .deleteShelf((this.shelfDetailsForm.value.id).toString())
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.shelfDetailsForm.reset();
          setTimeout(() => {
            this.router.navigate(['/storehouse/list']);
          }, 1000);
        },
        (error) => {
          if (error.status == 0){
            this.error = true;
            this.errorMessage = error.message;
          }
          else{
            this.errorMessage = error.error.message;
            this.pkMessageService.showErrorMessage(this.errorMessage);
          }
          this.isFetching = false;
        }
      );
    this.shelfDetailsForm.controls.id.disable();
  }
}
