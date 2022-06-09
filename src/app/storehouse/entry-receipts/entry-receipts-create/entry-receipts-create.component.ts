import { PKMessageService } from './../../../_pk_shared/messages/pk-message.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProductsService } from '../../products/products.service';
import { StorehousesService } from '../../storehouses/storehouses.service';
import { EntryReceiptsService } from '../entry-receipts.service';
import { EntryRegistration } from '../EntryRegistration';

@Component({
  selector: 'app-entry-receipts-create',
  templateUrl: './entry-receipts-create.component.html',
  styleUrls: ['./entry-receipts-create.component.css']
})
export class EntryReceiptsCreateComponent implements OnInit {

  entryRegistrationList: EntryRegistration[];
  currentDate: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy');;
  isFetching = false;
  error = false;
  errorMessage = null;
  shelveIdentifierList: string[] =[];
  productBarcodeList: string[] =[];


  entryReceiptCreateForm = this.formBuilder.group({
    dateOfEntry: [{value:this.currentDate, disabled: true}, [Validators.required]],
    description: [null, [Validators.required, Validators.maxLength(45)]],
    recipient:[null, [Validators.required, Validators.maxLength(45)]],
    entryRegistrationDTOList: this.formBuilder.array([
    ])
  })

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private entryReceiptService: EntryReceiptsService,
              private pkMessageService: PKMessageService,
              private productService: ProductsService,
              private storehouseService: StorehousesService){
  }

  ngOnInit() {
    this.getProducts();
    this.getShelves();
  }

  get entryRegistrationDTOList(): FormArray {
    return this.entryReceiptCreateForm.get("entryRegistrationDTOList") as FormArray;
  }

  newEntryRegistration(): FormGroup {
    return this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      productBarcode: [null, [Validators.required, Validators.maxLength(45)]],
      shelfIdentifier: [null, [Validators.required, Validators.maxLength(45)]]
    })
  }

  onAddEntryRegistration() {
    this.entryRegistrationDTOList.push(this.newEntryRegistration());
  }

  removeEntryRegistration(i:number) {
    this.entryRegistrationDTOList.removeAt(i);
}

  onCreateEntryReceipt(){
    this.isFetching = true;
    console.log(this.entryReceiptCreateForm.getRawValue());
    this.entryReceiptService.postEntryReceipt(this.entryReceiptCreateForm.getRawValue()).subscribe(entryReceipt =>{
      this.pkMessageService.showSuccessSaveMessage();
      this.entryReceiptCreateForm.reset()
      this.isFetching = false;
      this.entryReceiptCreateForm.controls.dateOfEntry.setValue(this.currentDate);
    },
      error =>{
        this.error = true;
        this.errorMessage = error.message;
        this.isFetching = false;
        setTimeout(()=>{
          this.error = false;
        }, 3000);
      });
  }

  onCLear(){
    this.entryReceiptCreateForm.reset();
    this.entryRegistrationDTOList.clear();
    this.entryReceiptCreateForm.controls.dateOfEntry.setValue(this.currentDate);
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
