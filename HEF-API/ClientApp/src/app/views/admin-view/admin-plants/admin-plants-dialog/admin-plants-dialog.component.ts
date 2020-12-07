import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { PlantType } from 'src/app/shared/enums';
import { Plant } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-plants-dialog',
  templateUrl: './admin-plants-dialog.component.html',
  styleUrls: ['./admin-plants-dialog.component.css']
})
export class AdminPlantsDialogComponent implements OnInit {

  editMode: string;
  editDisabled = false;

  selectedRow: Plant;

  plantForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
  });

  plantType = PlantType;

  keys(): Array<string> {
      const keys = Object.keys(this.plantType);
      return keys.slice(keys.length / 2);
  }

  constructor(
    private dataService: DataService, public dialogRef: MatDialogRef<AdminPlantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, plant: Plant}
  ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.plant;
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Plant();
      this.selectedRow.name = '';
    }
    this.setMode();
  }

  onSubmit() {
    console.log(this.plantForm.value);
    let requestModel: Plant = this.plantForm.value;
    requestModel.id = 5;
    this.dataService.addPlant(requestModel).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
   }

  //  getJobs(): void {
  //   this.dataService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  // }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.dataService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.jobs.push(hero);
  //     });
  // }

  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.editMode = 'Uppfæra';
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        break;
      case 'view':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
