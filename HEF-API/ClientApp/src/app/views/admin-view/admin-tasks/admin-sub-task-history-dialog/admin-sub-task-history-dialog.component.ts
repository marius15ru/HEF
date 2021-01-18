import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { JobStatus, MeasurementType, SubJobTask } from 'src/app/shared/enums';
import { Equipment, Job, SubJobs } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-sub-task-history-dialog',
  templateUrl: './admin-sub-task-history-dialog.component.html',
  styleUrls: ['./admin-sub-task-history-dialog.component.css']
})
export class AdminSubTaskHistoryDialogComponent implements OnInit {
  subJobsHistoryForJob$: Observable<SubJobs[]> = this.dataService.subJobsHistoryForJob$;
  filteredSubJobsHistoryForJob$: Observable<SubJobs[]> = this.dataService.filteredSubJobsHistoryForJob$;

  // subJobsPastDueDate$: Observable<SubJobs[]> = this.dataService.subJobsPastDueDate$;
  equipments$: Observable<Equipment[]> = this.dataService.equipments$;
  
  status = JobStatus;
  task = SubJobTask;
  unit = MeasurementType;

  uniqueDates: Date[] = [];

  equipments: Equipment[] = [];

  selectedRow: Job;

  completedOnFrom: Date = null;
  completedOnTo: Date = null;

  filtersVisible: boolean = false;
  filterAction: string = 'Sýna síur';

  constructor(public dialogRef: MatDialogRef<AdminSubTaskHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private dataService: DataService) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    this.dataService.getSubJobHistoryByJobId(this.selectedRow.id.toString());
    this.equipments = this.dataService.equipments;
  }

  filterSubJobsHistory(){
    this.dataService.filterSubJobsHistory(
      this.completedOnFrom, 
      this.completedOnTo, 
      this.dataService.subJobsHistoryForJob);
  }

  getCurrentDate(){
    return new Date();
  }

  clearSubJobsHistoryFilter(){
    this.completedOnFrom = null;
    this.completedOnTo = null;

    this.filterSubJobsHistory();
  }

  filtersVisibleToggle(){
    if(!this.filtersVisible){
      this.filterAction = 'Fela síur';
      return this.filtersVisible = true;
    }
    this.filterAction = 'Sýna síur';
    return this.filtersVisible = false;
  }

}
