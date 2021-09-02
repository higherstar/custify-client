import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ICompany } from '../../models/company'

@Injectable()
export class CompanyApiService {

  private baseUrl = `${environment.apiUrl}/companies`;

  constructor(private httpClient: HttpClient) {
  }

  public createCompany = (company: ICompany): Observable<any> => {
    return this.httpClient.post<any>(this.baseUrl, { ...company }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public updateCompany = ({id, company}): Observable<any> => {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}`, { ...company }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public deleteCompany = (id: string): Observable<any> => {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  public moveCompany = ({id, position, toStageId}): Observable<any> => {
    return this.httpClient.post<any>(`${this.baseUrl}/move/${id}`, {position, toStageId}).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }
}
