import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product-ae',
  templateUrl: './product-ae.component.html',
  styleUrls: ['./product-ae.component.scss']
})
export class ProductAeComponent implements OnInit {
  productForm;
  title;
  buttonTitle;
  constructor(
    private ps: ProductService,
    public dialogRef: MatDialogRef<ProductAeComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if (data.editData) {
      this.buttonTitle = 'Update';
      this.title = 'Edit';
      const { name, price, quantity } = data.editData;
      this.initForm(name, price, quantity);
    } else {
      this.initForm();
      this.buttonTitle = 'Add';
      this.title = 'Add New';
    }
  }

  ngOnInit() {}

  initForm(name = '', price = null, quantity = null) {
    this.productForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      price: new FormControl(price),
      quantity: new FormControl(quantity)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.data.editData) {
      const data = await this.ps.update(
        this.data.editData._id,
        this.productForm.value
      );
      data && this.dialogRef.close(true);
    } else {
      const data = await this.ps.insert(this.productForm.value);
      this.dialogRef.close(true);
    }
  }
}
