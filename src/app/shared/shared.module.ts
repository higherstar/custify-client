import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PageLayoutComponent,
  ],
  exports: [
    PageLayoutComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
