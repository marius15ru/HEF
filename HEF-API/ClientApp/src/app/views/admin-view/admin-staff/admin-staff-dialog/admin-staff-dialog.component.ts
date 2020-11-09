import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role, UserStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-admin-staff-dialog',
  templateUrl: './admin-staff-dialog.component.html',
  styleUrls: ['./admin-staff-dialog.component.css']
})
export class AdminStaffDialogComponent implements OnInit {

  staffForm = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl(''),

  });
  role = Role;
  status = UserStatus;

  keys(): Array<string> {
      const keys = Object.keys(this.role);
      return keys.slice(keys.length / 2);
  }
  keys2(): Array<string> {
    const keys2 = Object.keys(this.status);
    return keys2.slice(keys2.length / 2);
  }

  constructor(public dialogRef: MatDialogRef<AdminStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.staffForm.value);
  }

}
