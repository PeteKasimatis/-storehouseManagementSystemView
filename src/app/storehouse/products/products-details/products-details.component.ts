import { PKMessageService } from './../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Product } from '../Product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: Product;

  isFetching = false;
  error = false;
  errorMessage = null;

  updateDisabled: boolean;

  productDetailsForm = this.formBuilder.group({
    id: [{value: '', disabled: true}],
    description: [null, [ Validators.required, Validators.maxLength(45)]],
    barcode: [null, [ Validators.required, Validators.maxLength(45)]],
    units: [null, [ Validators.required, Validators.maxLength(45)]]
  })

  constructor(private formBuilder: FormBuilder,
              private productService: ProductsService,
              private route: ActivatedRoute,
              private pkMessageService: PKMessageService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.updateDisabled = true;
    this.getProduct();
  }

  //GET PRODUCT
  getProduct(){
    this.isFetching = true;
    this.productService
      .getProduct(this.route.snapshot.paramMap.get('barcode'))
      .subscribe(product =>{
         this.product = product
         this.populateFields();
         this.isFetching = false;
       },
       error =>{
         this.error = true;
          this.errorMessage = error.message;
          this.isFetching = false;
      });
  }

  populateFields(){
    this.productDetailsForm.setValue({
      id: this.product.id,
      description: this.product.description,
      barcode: this.product.barcode,
      units: this.product.units
    })
  }

  onUpdateEnabled(){
    this.updateDisabled = false;
}

//UPDATE PRODUCT
  onUpdate(){
    this.productDetailsForm.controls.id.enable();
    this.product.id = this.productDetailsForm.value.id;
    this.product.description = this.productDetailsForm.value.description;
    this.product.barcode = this.productDetailsForm.value.barcode;
    this.product.units = this.productDetailsForm.value.units;

    this.productService.putProduct(this.product).subscribe(product =>{
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
    this.productDetailsForm.controls.id.disable();
  }

  onShowStock(){
    this.router.navigate(['/stock/barcode', this.route.snapshot.paramMap.get('barcode')]);
  }

  onDeleteStorehouse(){
    this.productDetailsForm.controls.id.enable();
    this.productService
      .deleteProduct((this.productDetailsForm.value.id).toString())
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.productDetailsForm.reset();
          setTimeout(() => {
            this.router.navigate(['/product/list']);
          }, 1000);
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
    this.productDetailsForm.controls.id.disable();
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Θέλετε σίγουρα να διαγράψετε αυτό το προιόν;',
      header: 'Επιβεβαίωση',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteStorehouse();
      },
    });
  }

}
