import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material';
import { ProductAeComponent } from './product-ae.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  dialogTitle;
  dataInfo: any;
  dataList: any;

  displayedColumns: string[] = [
    'name',
    'price',
    'quantity',
    '_id',
    'edit',
    'delete'
  ];

  constructor(private ps: ProductService, public dialog: MatDialog) {}

  ngOnInit() {
    this.list();
  }

  list() {
    this.dataList = null;
    this.dataInfo = {};
    this.ps.list().subscribe(res => {
      this.dataInfo.totalRecord = 50;
      this.dataList = res;
    });
  }
  updateTablePage(updateTablePageData) {
    console.log(updateTablePageData);
  }
  openEdit(productData) {
    this.openDialog(productData);
  }
  async deleteById(id) {
    const res = await this.ps.delete(id);
    res && this.list();
  }
  openDialog(editData = null): void {
    const dialogRef = this.dialog.open(ProductAeComponent, {
      width: '250px',
      data: { editData }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true && this.list();
    });
  }
}
