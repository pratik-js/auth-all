import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './product/product.component';
import { SampleComponent } from './sample/sample.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductAeComponent } from './product/product-ae.component';
import { ProductService } from './product/product.service';
import { MaterialInUseModule } from '../material-in-use/material-in-use.module';

const PAGES = [ProductComponent, SampleComponent, PageNotFoundComponent];
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialInUseModule],
  declarations: [PAGES, ProductAeComponent],
  entryComponents: [ProductAeComponent],
  providers: [ProductService],
  exports: [PAGES]
})
export class PagesModule {}
