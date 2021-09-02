import { Action, createReducer, on } from '@ngrx/store';
import * as StageActions from './stage.action';
import { IStageState, initialStageState } from './stage.state';

export const creatingStageReducer = createReducer(
  initialStageState,
  on(
    StageActions.getStagesAction,
    (state) => ({
      ...state,
      isFetching: true,
    })
  ),
  on(
    StageActions.setStagesAction,
    (state, { stages }) => ({
      ...state,
      stages,
      isFetching: false,
    })
  ),
  on(
    StageActions.getStagesFailAction,
    (state) => ({
      ...state,
      products: [],
      isFetching: false,
    })
  ),
);

export function stageReducer(state: IStageState, action: Action): IStageState {
  return creatingStageReducer(state, action);
}
