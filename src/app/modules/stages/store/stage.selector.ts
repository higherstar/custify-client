import { createSelector } from '@ngrx/store';
import { IStageState } from './stage.state';
import { IAppState } from '../../../store';

function createStagesSelector<T>(selector: (state: IStageState) => T): any {
  return createSelector((state: IAppState): IStageState => state.stage, selector);
}

export const selectStages = createStagesSelector(x => x.stages);

export const selectStagesLoading = createStagesSelector(x => x.isFetching);
