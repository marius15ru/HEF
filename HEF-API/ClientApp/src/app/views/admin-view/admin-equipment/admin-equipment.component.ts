import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipment } from 'src/app/shared/models';
import { AdminEquipmentDialogComponent } from './admin-equipment-dialog/admin-equipment-dialog.component';

@Component({
  selector: 'app-admin-equipment',
  templateUrl: './admin-equipment.component.html',
  styleUrls: ['./admin-equipment.component.css']
})
export class AdminEquipmentComponent implements OnInit {

  public equipments: Equipment[];

  constructor(public dialogItem: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get<Equipment[]>('api/equipments').subscribe(result => {
      console.log(result);
      this.equipments = result;
    }, error => console.error(error));
  }

  openDialog(equipment: Equipment, action: string) {


    const refUser = this.dialogItem.open(AdminEquipmentDialogComponent, {
      data: {
        action: action,
        equipments: equipment
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
      this.getData();
    });
  }

}
