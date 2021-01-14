import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Area, Job, JobAssignments, Plant, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-create-emergency-task',
  templateUrl: './create-emergency-task.component.html',
  styleUrls: ['./create-emergency-task.component.css']
})
export class CreateEmergencyTaskComponent implements OnInit {
  users$: Observable<User[]> = this.dataService.users$;
  stations$: Observable<Station[]> = this.dataService.stations$;

  
  job = new Job;

  user: User;
  userId: string = localStorage.getItem("user").toString();
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
      // jobUser: new FormControl({  value: null, disabled: false},
      // )
    });
  }

  selectionChange(){
    console.log(this.selectedUsers);
  }

  onSubmit(){
    console.log(this.emergencyJobForm.value);
    let jobId = null; 
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

    this.selectedUsers.push(parseInt(this.userId));
    
    this.dataService.addJob(this.job).subscribe(result => {
      jobId = result.id;
      console.log(jobId);
      const jobAssignment = new JobAssignments;
      jobAssignment.jobId = jobId;
      this.selectedUsers.forEach(userId => {
        this.dataService.addJobAssignment(jobAssignment, userId.toString());
      });
      // this.dataService.addJobAssignment(jobAssignment, this.userId).subscribe(result => {
        //   console.log(result);
        // if(this.selectedUsers.length > 0){
          //   this.selectedUsers.forEach(user => {
            //     jobAssignment.userId = user;
            //     this.dataService.addJobAssignment(jobAssignment, user.toString());
            //   });
            // }
      this.dataService.getUserJobs(parseInt(this.userId));
      this.emergencyJobForm.reset();
      // });
    });
  }

}
