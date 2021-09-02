import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularMaterialModule } from '../../angular-material.module';
import { StagesRoutingModule } from './stages-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { StagesComponent } from './stages.component';
import { StageCardComponent } from './components/stage-card/stage-card.component';
import { StageDialogComponent } from './components/stage-dialog/stage-dialog.component';
import { CompanyDialogComponent } from './components/company-dialog/company-dialog.component';

import { stageReducer } from './store/stage.reducer';
import { ProductEffects } from './store/stage.effect';
import { StageApiService } from '../../shared/services/api/stage-api.service';
import { CompanyApiService } from '../../shared/services/api/company-api.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    StagesComponent,
    StageCardComponent,
    StageDialogComponent,
    CompanyDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexModule,
    StagesRoutingModule,
    SharedModule,
    StoreModule.forFeature('product', stageReducer),
    EffectsModule.forFeature([
      ProductEffects,
    ]),
    DragDropModule,
    MatDialogModule,
  ],
  providers: [
    StageApiService,
    CompanyApiService
  ],
})
export class StagesModule { }
