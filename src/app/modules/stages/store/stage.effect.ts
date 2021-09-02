import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getStagesAction,
  setStagesAction,
  getStagesFailAction,
  createStageAction,
  deleteStageAction,
  updateStageAction,
  createCompanyAction,
  updateCompanyAction,
  deleteCompanyAction, moveCompanyAction
} from './stage.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StageApiService } from '../../../shared/services/api/stage-api.service';
import { CompanyApiService } from '../../../shared/services/api/company-api.service';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
  constructor(
    private stageApiService: StageApiService,
    private companyApiService: CompanyApiService,
    private actions: Actions
  ) {
  }

  getStages = createEffect(() => this.actions.pipe(
    ofType(getStagesAction),
    switchMap((action) => this.stageApiService.getStages()
      .pipe(
      map(res => setStagesAction({ stages: res })),
      catchError(_ => [getStagesFailAction()])
    ))
  ));

  createStage = createEffect(() => this.actions.pipe(
    ofType(createStageAction),
    switchMap((action) => this.stageApiService.createStage(action.stage)
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  updateStage = createEffect(() => this.actions.pipe(
    ofType(updateStageAction),
    switchMap((action) => this.stageApiService.updateStage({id: action.id, stage: action.stage})
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  deleteStage = createEffect(() => this.actions.pipe(
    ofType(deleteStageAction),
    switchMap((action) => this.stageApiService.deleteStage(action.id)
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  createCompany = createEffect(() => this.actions.pipe(
    ofType(createCompanyAction),
    switchMap((action) => this.companyApiService.createCompany(action.company)
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  updateCompany = createEffect(() => this.actions.pipe(
    ofType(updateCompanyAction),
    switchMap((action) => this.companyApiService.updateCompany({id: action.id, company: action.company})
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  deleteCompany = createEffect(() => this.actions.pipe(
    ofType(deleteCompanyAction),
    switchMap((action) => this.companyApiService.deleteCompany(action.id)
      .pipe(
        map(res => getStagesAction())
      ))
  ));

  moveCompany = createEffect(() => this.actions.pipe(
    ofType(moveCompanyAction),
    switchMap((action) => this.companyApiService.moveCompany({id: action.id, position: action.position, toStageId: action.toStageId})
      .pipe(
        map(res => getStagesAction())
      ))
  ));
}
