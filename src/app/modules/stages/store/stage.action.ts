import { createAction, props } from '@ngrx/store';
import { IStageResponse, IStage } from '../../../shared/models/stage';
import {ICompany} from '../../../shared/models/company'

export const getStagesAction = createAction(
  '[Stage] Get Stages Request',
);

export const setStagesAction = createAction(
  '[Stage] Set Stages',
  props<{ stages: IStageResponse[] }>()
);

export const getStagesFailAction = createAction(
  '[Stage] Get Stages Fail'
);

export const createStageAction = createAction(
  '[Stage] Create Stage Request',
  props<{ stage: IStage }>()
);

export const updateStageAction = createAction(
  '[Stage] Update Stage Request',
  props<{ id: string, stage: IStage }>()
);

export const deleteStageAction = createAction(
  '[Stage] Delete Stage Request',
  props<{ id: string }>()
);

export const createCompanyAction = createAction(
  '[Company] Create Company Request',
  props<{ company: ICompany }>()
);

export const updateCompanyAction = createAction(
  '[Stage] Update Company Request',
  props<{ id: string, company: ICompany }>()
);

export const deleteCompanyAction = createAction(
  '[Stage] Delete Company Request',
  props<{ id: string }>()
);

export const moveCompanyAction = createAction(
  '[Stage] Move Company Request',
  props<{ id: string, position: number, toStageId?: string }>()
)
