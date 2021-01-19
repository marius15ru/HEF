import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { JobStatus, MeasurementType, Recurring, SubJobTask } from 'src/app/shared/enums';
import { Equipment, Job, SubJobs } from 'src/app/shared/models';

@Component({
  selector: 'app-obtain-sub-task-dialog',
  templateUrl: './obtain-sub-task-dialog.component.html',
  styleUrls: ['./obtain-sub-task-dialog.component.css']
})
export class ObtainSubTaskDialogComponent implements OnInit {

  equipments$: Observable<Equipment[]> = this.dataService.equipments$;
  subJobsForJob$: Observable<SubJobs[]> = this.dataService.subJobsForJob$;
  equipmentsByJobStation$: Observable<Equipment[]> = this.dataService.equipmentsByJobStation$;

  myForm: FormGroup;
  currentJobSubJobs: FormGroup;
  selectedRow: Job;

  measurement = MeasurementType;
  subJobTask = SubJobTask;
  newSubJobs: SubJobs[] = [];

  jobStatus = JobStatus;
  equipments: Equipment[] = [];

  measuredValue: number[] = [];



  constructor( public dialogRef: MatDialogRef<ObtainSubTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dataService: DataService ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    this.dataService.getSubJobsForJob(this.selectedRow.id);

    this.currentJobSubJobs = this.fb.group({
      jobId: this.selectedRow.id,
      subJobs: this.fb.array(this.dataService.subJobsForJob.map(r => this.fb.group(r)))
    });

    this.dataService.filterEquipmentsByJobStation(this.selectedRow.stationId, this.dataService.equipments);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  recurFormatter(index: number) {
    return Recurring[index];
  }

  subJobTaskFormatter(index: number) {
    return SubJobTask[index];
  }

  unitFormatter(index: number) {
    return MeasurementType[index];
  }

  onValueChange(args: any, index: number) {
    console.log(args.target.value);
    this.measuredValue[index] = parseInt(args.target.value);
  }

  updateSubJobRow(subJob: SubJobs, index: number) {
    subJob.value = this.measuredValue[index];
    this.dataService.updateSubJob(subJob, subJob.id.toString()).subscribe(() => {
      this.dataService.getSubJobs(subJob.jobId);
      if (subJob.status == 5) {
        this.selectedRow.lastCheck = new Date();
        this.dataService.updateJob(this.selectedRow, this.selectedRow.id.toString()).subscribe(() => {
          this.dataService.getJobs();
        });
      }
      this.openSnackBar('Undirverk hefur verið uppfært', 'Loka');
    });
  }

  closeDialog() {
    this.dialogRef.close('Closed');
  }

}
