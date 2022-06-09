import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PKMessageService } from 'src/app/_pk_shared/messages/pk-message.service';
import { ProductsService } from '../../products/products.service';
import { StorehousesService } from '../../storehouses/storehouses.service';
import { ExitReceiptsService } from '../exit-receipts.service';
import { ExitRegistration } from '../ExitRegistration';

@Component({
  selector: 'app-exit-receipts-create',
  templateUrl: './exit-receipts-create.component.html',
  styleUrls: ['./exit-receipts-create.component.css']
})
export class ExitReceiptsCreateComponent implements OnInit {

  exitRegistrationList: ExitRegistration[];
  currentDate: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy');;
  isFetching = false;
  error = false;
  errorMessage = null;
  shelveIdentifierList: string[] =[];
  productBarcodeList: string[] =[];


  exitReceiptCreateForm = this.formBuilder.group({
    dateOfExit: [{value:this.currentDate, disabled: true}, [Validators.required]],
    reasonForExit: [null, [Validators.required, Validators.maxLength(45)]],
    sender:[null, [Validators.required, Validators.maxLength(45)]],
    exitRegistrationDTOList: this.formBuilder.array([
    ])
  })

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private exitReceiptsService: ExitReceiptsService,
              private pkMessageService: PKMessageService,
              private productService: ProductsService,
              private storehouseService: StorehousesService){
  }

  ngOnInit() {
    this.getProducts();
    this.getShelves();
  }

  get exitRegistrationDTOList(): FormArray {
    return this.exitReceiptCreateForm.get("exitRegistrationDTOList") as FormArray;
  }

  newExitRegistration(): FormGroup {
    return this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      productBarcode: [null, [Validators.required, Validators.maxLength(45)]],
      shelfIdentifier: [null, [Validators.required, Validators.maxLength(45)]]
    })
  }

  onAddExitRegistration() {
    this.exitRegistrationDTOList.push(this.newExitRegistration());
  }

  removeExitRegistration(i:number) {
    this.exitRegistrationDTOList.removeAt(i);
}

  onCreateExitReceipt(){
    this.isFetching = true;
    console.log(this.exitReceiptCreateForm.getRawValue());
    this.exitReceiptsService.postExitReceipt(this.exitReceiptCreateForm.getRawValue()).subscribe(exitReceipt =>{
      this.pkMessageService.showSuccessSaveMessage();
      this.exitReceiptCreateForm.reset()
      this.isFetching = false;
      this.exitReceiptCreateForm.controls.dateOfExit.setValue(this.currentDate);
    },
      error =>{
        if (error.status == 0){
          this.errorMessage = error.message;
        }
        else{
          this.errorMessage = error.error.message;
          this.pkMessageService.showErrorMessage(this.errorMessage);
        }
      });
  }

  onCLear(){
    this.exitReceiptCreateForm.reset();
    this.exitRegistrationDTOList.clear();
    this.exitReceiptCreateForm.controls.dateOfExit.setValue(this.currentDate);
  }

  getProducts(){
    this.productService.getProducts().subscribe( products =>{
      for(let product of products)
        this.productBarcodeList.push(product.barcode);
    })
  }

  getShelves(){
    this.storehouseService.getAllShelves().subscribe( shelves =>{
      for(let shelf of shelves)
        this.shelveIdentifierList.push(shelf.identifier);
    })
  }
}

