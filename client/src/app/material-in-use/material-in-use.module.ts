import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

const MaterialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTabsModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule
];
@NgModule({
  declarations: [],
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialInUseModule {}
