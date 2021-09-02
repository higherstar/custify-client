import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { IStageResponse } from '../../../../shared/models/stage';
import { StageDialogComponent } from '../stage-dialog/stage-dialog.component';
import { CompanyDialogComponent } from "../company-dialog/company-dialog.component";
import { ICompanyResponse } from '../../../../shared/models/company'
import {
  createCompanyAction,
  deleteStageAction,
  updateStageAction,
  updateCompanyAction,
  deleteCompanyAction, moveCompanyAction, setStagesAction
} from '../../store/stage.action'

@Component({
  selector: 'app-stage-card',
  templateUrl: './stage-card.component.html',
  styleUrls: ['./stage-card.component.scss'],
})
export class StageCardComponent implements OnInit, OnChanges {
  @Input() stage: IStageResponse;
  companies: ICompanyResponse[];

  constructor(
    private dialog: MatDialog,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stage) {
      this.companies = [...this.stage.companies];
    }
  }

  drop(event: CdkDragDrop<ICompanyResponse[]>) {
    const position = event.currentIndex
    const company = event.previousContainer.data[event.previousIndex]
    const toStageId = event.container.id

    if (company && toStageId) {
      this.store.dispatch(moveCompanyAction({
        id: company.id,
        position,
        toStageId
      }))
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  stageDialogRef: MatDialogRef<StageDialogComponent>;
  openStageDialog(): void {
    if (this.stageDialogRef != null) {
      return;
    }
    const dialogRef = this.dialog.open(StageDialogComponent, {
      data: {
        title: 'Edit Stage',
        stage: this.stage
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(updateStageAction({ id: this.stage.id, stage: result}))
      }
      this.stageDialogRef = null;
    });

    this.stageDialogRef = dialogRef;
  }

  companyDialogRef: MatDialogRef<CompanyDialogComponent>;
  openCompanyDialog(company = null): void {
    if (this.companyDialogRef != null) {
      return;
    }
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      data: {
        title: company ? 'Edit Company' : 'Add Company',
        company
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (company) {
          this.store.dispatch(updateCompanyAction({id: company.id, company: result}))
        } else {
          this.store.dispatch(createCompanyAction({company: {stageId: this.stage.id, ...result}}))
        }
      }
      this.companyDialogRef = null;
    });

    this.companyDialogRef = dialogRef;
  }

  onDeleteStage(stageId): void {
    this.store.dispatch(deleteStageAction({id: stageId}))
  }

  onDeleteCompany(companyId): void {
    this.store.dispatch(deleteCompanyAction({id: companyId}))
  }
}
