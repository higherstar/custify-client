import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-stage-dialog',
  templateUrl: './stage-dialog.component.html',
  styleUrls: ['./stage-dialog.component.scss'],
})
export class StageDialogComponent implements OnInit {
  stageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title,
      stage
    },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.stageForm = this.resetForm();
  }

  resetForm(): FormGroup {
    if (this.data.stage) {
      return this.fb.group({
        name: new FormControl(this.data.stage.name, Validators.required)
      })
    } else {
      return this.fb.group({
        name: new FormControl('', Validators.required)
      })
    }
  }

  submit(stageForm) {
    if (stageForm.valid) {
      this.dialogRef.close(stageForm.value);
    }
  }
}
