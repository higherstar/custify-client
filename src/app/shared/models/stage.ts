import { ICompanyResponse } from './company'

export interface IStage {
  name: string;
}

export interface IStageResponse {
  id: string
  name: string
  companies: ICompanyResponse[]
}
