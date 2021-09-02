import { IStageResponse } from '../../../shared/models/stage';

export interface IStageState {
  stages: IStageResponse[];
  isFetching: boolean;
}

export const initialStageState: IStageState = {
  stages: [],
  isFetching: false,
};
