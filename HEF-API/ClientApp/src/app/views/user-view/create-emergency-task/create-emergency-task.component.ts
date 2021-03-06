import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Job, JobAssignments, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-create-emergency-task',
  templateUrl: './create-emergency-task.component.html',
  styleUrls: ['./../user-view.component.css', './create-emergency-task.component.css']
})
export class CreateEmergencyTaskComponent implements OnInit {
  users$: Observable<User[]> = this.dataService.users$;
  stations$: Observable<Station[]> = this.dataService.stations$;

  job = new Job;

  user: User;
  userId: string = localStorage.getItem('user').toString();
  selectedUsers: number[] = [];

  emergencyJobForm: FormGroup;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.emergencyJobForm = new FormGroup({
      stationId: new FormControl({ value: null, disabled: false},
      ),
      name: new FormControl({ value: '', disabled: false},
      ),
      description: new FormControl({ value: '', disabled: false},
      ),
    });
  }

  selectionChange() {
    console.log(this.selectedUsers);
  }

  onSubmit() {
    console.log(this.emergencyJobForm.value);
    // const user = this.emergencyJobForm.controls.jobUser.value;
    this.job.stationId = this.emergencyJobForm.controls.stationId.value;
    this.job.description = this.emergencyJobForm.controls.description.value;
    this.job.name = this.emergencyJobForm.controls.name.value;
    this.job.emergencyJob = true;
    this.job.status = 2;
    this.job.recurring = 0;
    this.job.lastCheck = new Date();
    this.job.completeBy = new Date();
    this.job.duration = '';
    this.job.hasComments = false;

    this.selectedUsers.push(parseInt(this.userId, 0));

    this.dataService.addJob(this.job).subscribe(result => {
      console.log(result.id);
      const jobAssignment = new JobAssignments;
      jobAssignment.jobId = result.id;
      jobAssignment.userId = parseInt(this.userId, 0);
      this.selectedUsers.forEach(userId => {
        this.dataService.addJobAssignment(jobAssignment, userId.toString()).subscribe(() => {
          // console.log(_);
        });
      });
      this.dataService.getUserJobs(parseInt(this.userId, 0));
      this.emergencyJobForm.reset();
      this.selectedUsers = [];
    });
  }

}
