import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { JobStatus, MeasurementType, Recurring, SubJobTask } from 'src/app/shared/enums';
import { Equipment, Job, SubJobs } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-sub-task-dialog',
  templateUrl: './admin-sub-task-dialog.component.html',
  styleUrls: ['./admin-sub-task-dialog.component.css']
})
export class AdminSubTaskDialogComponent implements OnInit {
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
  description: number[] = [];

  constructor( public dialogRef: MatDialogRef<AdminSubTaskDialogComponent>,
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

    this.myForm = this.fb.group({
      jobId: this.selectedRow.id,
      subJobs: this.fb.array([]),
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

  onValueChange(args: any, index: number, field: string) {
    console.log(args.target.value);
    if (field === 'measuredValue') {
      this.measuredValue[index] = parseInt(args.target.value);
    } else if (field === 'description') {
      this.description[index] = args.target.value;
    }
  }

  on

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


  deleteSubJobRow(subJob: SubJobs, index: number) {
    console.log(subJob);

    this.dataService.deleteSubJob(subJob, subJob.id.toString()).subscribe(() => {
      this.dataService.getSubJobs(subJob.jobId);
      this.openSnackBar('Undirverki hefur verið eytt', 'Loka');
      this.deleteCurrentSubJob(index);
    });

  }

  addSubJob() {
    const subJobs = this.fb.group({
      equipmentId: [],
      status: [],
      description: [],
      value: [],
      unit: [],
      subJobTask: []
    });

    this.subJobs.push(subJobs);
  }

  addCurrentSubJob(subjob) {
    this.currentSubJobs.push(subjob);
  }

  deleteSubJob(i) {
    this.subJobs.removeAt(i);
  }

  deleteCurrentSubJob(i) {
    this.currentSubJobs.removeAt(i);
  }

  get subJobs() {
    return this.myForm.get('subJobs') as FormArray;
  }

  get currentSubJobs() {
    return this.currentJobSubJobs.get('subJobs') as FormArray;
  }

  onSubmit(myForm: FormGroup) {
    const anotherArray = myForm.value;
    const subJobArray: SubJobs[] = anotherArray.subJobs;

    subJobArray.forEach((subJob: SubJobs) => {
      const requestModel = new SubJobs;
      requestModel.equipmentId = subJob.equipmentId;
      requestModel.jobId = this.selectedRow.id;
      requestModel.subJobTask = subJob.subJobTask;
      requestModel.unit = subJob.unit;
      requestModel.description = subJob.description;
      // requestModel.value = 0.0;
      if (this.selectedRow.status > 1) {
        requestModel.status = 2;
      } else {
        requestModel.status = 1;
      }
      console.log(requestModel);
      if (requestModel) {
        this.dataService.addSubJob(requestModel).subscribe(() => {
          // Hér kemur virkni fyrir breytingu á stöðu yfirverks
          this.dataService.getSubJobs(requestModel.jobId);
          this.openSnackBar('Nýju undirverki hefur verið bætt við', 'Loka');
        });
      }
    });

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close('Closed');
  }

}
