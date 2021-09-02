import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IStage } from '../../models/stage'

@Injectable()
export class StageApiService {

  private baseUrl = `${environment.apiUrl}/stages`;

  constructor(private httpClient: HttpClient) {
  }

  public getStages = (): Observable<any> => {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      retry(3),
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public createStage = (stage: IStage): Observable<any> => {
    return this.httpClient.post<any>(this.baseUrl, { ...stage }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public updateStage = ({id, stage}): Observable<any> => {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}`, { ...stage }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public deleteStage = (id: string): Observable<any> => {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }
}
