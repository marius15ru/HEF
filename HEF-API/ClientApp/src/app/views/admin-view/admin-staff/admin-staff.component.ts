import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Role, UserStatus } from 'src/app/shared/enums';
import { Job, User } from 'src/app/shared/models';
import { AdminStaffDialogComponent } from './admin-staff-dialog/admin-staff-dialog.component';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./../admin-view.component.css', './admin-staff.component.css']
})
export class AdminStaffComponent implements OnInit {

  users$: Observable<User[]> = this.dataService.users$;

  updatePwToggle = false;
  formInitialized = false;
  selectedUser: User = null;


  public users: User[] = [];
  jobsAssigned: Job[] = [];
  userJobs: Job[] = [];
  jobsOnHold: Job[] = [];
  jobsInProgress: Job[] = [];
  jobsFinished: Job[] = [];

  userStatus = UserStatus;
  role = Role;

  usersForm = new FormArray([]);

  userForm = new FormGroup({
    password: new FormControl('')
  });



  public customAttributes: Object;

  // allUsers: Observable<User[]>;

  constructor(public dialogItem: MatDialog, private formBuilder: FormBuilder, private http: HttpClient,
    private dataService: DataService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
    this.userForm = new FormGroup({
      password: new FormControl({ value: '', disabled: false},
      )
    });


  }

  getData() {
    this.users = this.dataService.users;
  }

  toggleKeyView() {
    if (this.updatePwToggle) {
      this.updatePwToggle = false;
    } else {
      this.updatePwToggle = true;
    }
  }

  updateUser(user: User) {
    const id = user.id.toString();
    this.dataService.updateUser(user, id).subscribe(result => {
      console.log(result);
      this.openSnackBar(user.name + ' uppfærð/ur', 'Loka');
    }, error => console.error(error));
  }

  updateUserKey(user: User) {
    user.password = this.userForm.value.password;
    const id = user.id.toString();
    this.dataService.updateUser(user, id).subscribe(result => {
      console.log(result);
      this.selectedUser = null;
      this.userForm.reset();
      this.toggleKeyView();
      this.userForm = new FormGroup({
        password: new FormControl({ value: '', disabled: false},
        )
      });
      this.openSnackBar(user.name + ' uppfærð/ur', 'Loka');
    }, error => console.error(error));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  setMode() {
    this.userForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false},
      ),
    });
  }

  openDialog() {
    const refUser = this.dialogItem.open(AdminStaffDialogComponent, {
      data: {
        action: 'insert',
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }

}
