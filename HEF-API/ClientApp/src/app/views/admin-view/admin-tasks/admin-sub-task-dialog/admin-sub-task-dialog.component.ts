import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { MeasurementType, Recurring, SubJobTask } from 'src/app/shared/enums';
import { Equipment, Job, SubJobs } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-sub-task-dialog',
  templateUrl: './admin-sub-task-dialog.component.html',
  styleUrls: ['./admin-sub-task-dialog.component.css']
})
export class AdminSubTaskDialogComponent implements OnInit {
  equipments$: Observable<Equipment[]> = this.dataService.equipments$;

  myForm: FormGroup;
  selectedRow: Job;

  measurement = MeasurementType;
  subJobTask = SubJobTask;
  newSubJobs: SubJobs[] = [];

  constructor( public dialogRef: MatDialogRef<AdminSubTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dataService: DataService ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    this.myForm = this.fb.group({
      jobId: this.selectedRow.id,
      subJobs: this.fb.array([]),
    });

  }

  recurFormatter(index: number) {
    return Recurring[index];
  }

  addSubJob() {
    const subJobs = this.fb.group({
      equipmentId: [],
      status: [],
      description: [],
      value: [],
      unit: [],
      task: []
    });

    this.subJobs.push(subJobs);
  }

  deleteSubJob(i) {
    this.subJobs.removeAt(i);
  }

  get subJobs() {
    return this.myForm.get('subJobs') as FormArray;
  }

  onSubmit() {
    const someArray = this.subJobs.controls.values();

    for (const entry of someArray) {
      this.newSubJobs.push(entry.value);
      console.log(this.newSubJobs);
    }
  }

}
