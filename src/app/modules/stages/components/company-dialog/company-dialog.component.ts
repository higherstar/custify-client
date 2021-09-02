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
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss'],
})
export class CompanyDialogComponent implements OnInit {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title,
      company
    },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.companyForm = this.resetForm();
  }

  resetForm(): FormGroup {
    if (this.data.company) {
      return this.fb.group({
        name: new FormControl(this.data.company.name, Validators.required)
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
