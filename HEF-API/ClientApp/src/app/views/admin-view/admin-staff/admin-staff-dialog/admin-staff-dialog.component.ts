import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Role, UserStatus } from 'src/app/shared/enums';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-staff-dialog',
  templateUrl: './admin-staff-dialog.component.html',
  styleUrls: ['./admin-staff-dialog.component.css']
})
export class AdminStaffDialogComponent implements OnInit {

  editMode = '';

  staffForm = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl('')
  });
  role = Role;
  status = UserStatus;

  selectedRow: User;

  constructor(public dialogRef: MatDialogRef<AdminStaffDialogComponent>, private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
    ) { }

  ngOnInit() {
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new User();
      this.selectedRow.name = '';
      this.selectedRow.role = null;
      this.selectedRow.status = null;
      this.selectedRow.email = '';
      this.selectedRow.password = '';
    }
    this.setMode();
   }

  setMode() {
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.staffForm = new FormGroup({
        name: new FormControl({ value: '', disabled: false}),
        email: new FormControl({ value: '', disabled: false}),
        status: new FormControl({ value: null, disabled: false}),
        role: new FormControl({ value: null, disabled: false}),
        password: new FormControl({ value: '', disabled: false}),
      });
      this.editMode = 'Stofna';
      return;
    }
  }

  onSubmit() {
    const requestModel: User = this.staffForm.value;
    this.dataService.addUser(requestModel).subscribe(() => {
      this.dataService.getUsers();
    }, error => console.error(error));
  }

}
