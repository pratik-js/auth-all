import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

const MaterialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTabsModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
];
@NgModule({
  declarations: [],
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialInUseModule {}
