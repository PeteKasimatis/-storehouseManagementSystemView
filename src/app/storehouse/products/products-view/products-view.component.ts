import { TranslateService } from '@ngx-translate/core';
import { PKMessageService } from '../../../_pk_shared/messages/pk-message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { PKTableColumn } from '../../_shared/PKTable/PKTableColumn';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Product';
import { PKBlockUIService } from 'src/app/_pk_shared/pk-block-UI/pk-block-ui.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  id: any;
  isFetching = false;
  error = false;
  errorMessage = null;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pkMessageService: PKMessageService,
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private pkBlockUIService: PKBlockUIService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getProduct();
    }
  }

  productForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    description: ['', [Validators.required, Validators.maxLength(45)]],
    barcode: ['', [Validators.required, Validators.maxLength(45)]],
    units: ['', [Validators.required, Validators.maxLength(45)]],
  });

  onSaveProduct() {
    this.pkBlockUIService.block();
    if (this.id) {
      this.productForm.controls.id.enable();
      this.product.id = this.productForm.value.id;
      this.product.description = this.productForm.value.description;
      this.product.barcode = this.productForm.value.barcode;
      this.product.units = this.productForm.value.units;

      this.productService
        .putProduct(this.product)
        .subscribe(
          (product) => {
            this.pkMessageService.showSuccessSaveMessage();
            // this.updateDisabled = true;
          },
          (error) => {
            if (error.status == 0) {
              this.error = true;
              this.errorMessage = error.message;
            } else {
              this.errorMessage = error.error.message;
              this.pkMessageService.showErrorMessage(this.errorMessage);
            }
            this.isFetching = false;
          }
        )
        .add(() => {
          this.pkBlockUIService.unblock();
        });
      this.productForm.controls.id.disable();
    } else {
      this.isFetching = true;
      this.productService
        .postProduct(this.productForm.value)
        .subscribe(
          (storehouse) => {
            this.pkMessageService.showSuccessSaveMessage();
            this.productForm.reset();
            this.isFetching = false;
          },
          (error) => {
            if (error.status == 0) {
              this.error = true;
              this.errorMessage = error.message;
            } else {
              this.errorMessage = error.error.message;
              this.pkMessageService.showErrorMessage(this.errorMessage);
            }
            this.isFetching = false;
          }
        )
        .add(() => {
          this.pkBlockUIService.unblock();
        });
    }
  }

  getProduct() {
    this.isFetching = true;
    this.productService.getProduct(this.id).subscribe(
      (product) => {
        this.product = product;
        this.populateFields();
        this.isFetching = false;
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.isFetching = false;
      }
    );
  }

  populateFields() {
    this.productForm.setValue({
      id: this.product.id,
      description: this.product.description,
      barcode: this.product.barcode,
      units: this.product.units,
    });
  }

  onCLear() {
    this.productForm.reset();
  }

  onDeleteProduct() {
    this.productService
      .deleteProduct(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        () => {
          this.pkMessageService.showSuccessDeleteMessage();
          this.productForm.reset();
          this.router.navigate(['/products/list']);
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
        this.onDeleteProduct();
      },
    });
  }
}
