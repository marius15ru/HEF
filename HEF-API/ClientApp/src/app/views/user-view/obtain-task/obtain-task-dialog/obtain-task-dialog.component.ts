import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { Job, JobAssignments, User } from 'src/app/shared/models';

@Component({
  selector: 'app-obtain-task-dialog',
  templateUrl: './obtain-task-dialog.component.html',
  styleUrls: ['./obtain-task-dialog.component.css']
})
export class ObtainTaskDialogComponent implements OnInit {

  selectedRow: Job;

  public customAttributes: Object;


  jobAssignment: JobAssignments[];
  assignedIds: number[] = [];
  users: User[] = [];
  assignedUsers: User[] = [];
  unassignedUsers: User[] = [];

  assignmentForm = new FormGroup({
    jobId: new FormControl(null),
    userId: new FormControl(null)
  });

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ObtainTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private _snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    this.customAttributes = {class: 'customcss'};
    this.getData();
    this.getJobAssignments();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  getData() {
    this.http.get<User[]>('api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }


  getJobAssignments() {
    console.log(this.selectedRow.id.toString());
    this.http.get<JobAssignments[]>('api/jobs/' + this.selectedRow.id.toString() + '/users').subscribe(result => {
      console.log(result);
      // this.jobAssignment = result;
      for (let i = 0; i < result.length; i++) {
        this.assignedIds[i] = result[i].id;
      }
      this.assignedUsers = this.users.filter((item) => this.assignedIds.includes(item.id));
      this.unassignedUsers = this.users.filter((item) => !this.assignedIds.includes(item.id));
      console.log(this.assignedUsers);
    });
  }

  onSubmitAssignment(assignOption: string, index: User) {
    console.log('assign');
    switch (assignOption) {
      case 'insert':
        console.log('assignedInsert');
        const requestModelAssign: JobAssignments = this.assignmentForm.value;
        requestModelAssign.jobId = this.selectedRow.id;
        const userId: string = requestModelAssign.userId.toString() + '/';
        this.assignedUsers.push(index);

          this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
            console.log(result, this.selectedRow.id.toString(), 'assigned insert');
          this.openSnackBar(requestModelAssign.userId.toString() + ' úthlutað verki ' + requestModelAssign.jobId.toString(), 'Loka');
          }, error => console.error(error));
          break;
      case 'delete':
        console.log('assignedDelete');
        const requestModelAssignDelete = new JobAssignments;
        requestModelAssignDelete.jobId = this.selectedRow.id;
        requestModelAssignDelete.userId = index.id;

         // console.log("Fyrir: ", this.assignedUsers);
         this.assignedUsers = this.assignedUsers.filter(item => item.id !== index.id);

         this.dataService.deleteJobAssignment(requestModelAssignDelete).subscribe(result => {
           console.log(result, 'assigned delete');
           this.openSnackBar('Úthlutun ' + requestModelAssignDelete.userId.toString() + ' á verki ' +
                                requestModelAssignDelete.jobId.toString() + ' fjarlægð', 'Loka');
         }, error => console.error(error));
         break;
    }
    this.checkAssignment();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close('Closed');
  }

  checkAssignment() {
    if (this.assignedUsers.length === 0 && this.selectedRow.status !== 1) {
      console.log('Óúthlutað - Tómur array');
      this.selectedRow.status = 1;
      const requestModelUpdate: Job = this.selectedRow;
      this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
        console.log(result, this.selectedRow.id.toString());
      }, error => console.error(error));
    } else if (this.assignedUsers.length > 0 && this.selectedRow.status === 1) {
      console.log(this.assignedUsers.length);
      this.selectedRow.status = 2;
      const requestModelUpdate: Job = this.selectedRow;
      this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
        console.log(result, this.selectedRow.id.toString());
      }, error => console.error(error));
    }
  }

}
