import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IStageResponse} from '../../shared/models/stage';
import { IAppState } from '../../store';
import { createStageAction, getStagesAction } from './store/stage.action';
import { selectStages, selectStagesLoading } from './store/stage.selector';
import { StageDialogComponent } from './components/stage-dialog/stage-dialog.component';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {
  stages$: Observable<IStageResponse[]>;
  isLoading = false;

  constructor(
    private store: Store<IAppState>,
    private dialog: MatDialog,
  ) {
    this.stages$ = this.store.pipe(select(selectStages));
    this.store.pipe(select(selectStagesLoading)).subscribe(x => {
      this.isLoading = x;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getStagesAction());
  }

  stageDialogRef: MatDialogRef<StageDialogComponent>;
  openStageDialog(): void {
    if (this.stageDialogRef != null) {
      return;
    }
    const dialogRef = this.dialog.open(StageDialogComponent, {
      data: {
        title: 'Add Stage',
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(createStageAction({
          stage: result
        }))
      }
      this.stageDialogRef = null;
    });

    this.stageDialogRef = dialogRef;
  }
}
