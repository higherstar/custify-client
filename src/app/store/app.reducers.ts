import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from '.';
import { environment } from '../../environments/environment';
import { stageReducer } from '../modules/stages/store/stage.reducer';

export const reducers: ActionReducerMap<IAppState> = {
  stage: stageReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
