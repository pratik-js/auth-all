import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-ae',
  templateUrl: './product-ae.component.html',
  styleUrls: ['./product-ae.component.scss']
})
export class ProductAeComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(null),
    quantity: new FormControl(null)
  });
  constructor(private ps: ProductService) {}

  ngOnInit() {}

  onSubmit() {
    console.warn(this.productForm.value);
    this.ps.insert(this.productForm.value);
  }
}
