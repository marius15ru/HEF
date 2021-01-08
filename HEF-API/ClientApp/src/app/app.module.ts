import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule, MatDialogModule, MatGridListModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { UserViewComponent } from './views/user-view/user-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminTasksComponent } from './views/admin-view/admin-tasks/admin-tasks.component';
import { AdminPlantsComponent } from './views/admin-view/admin-plants/admin-plants.component';
import { AdminEquipmentComponent } from './views/admin-view/admin-equipment/admin-equipment.component';
import { AdminLocationComponent } from './views/admin-view/admin-location/admin-location.component';
import { AdminStaffComponent } from './views/admin-view/admin-staff/admin-staff.component';
import { UserTasksComponent } from './views/user-view/user-tasks/user-tasks.component';
import { CreateEmergencyTaskComponent } from './views/user-view/create-emergency-task/create-emergency-task.component';
import { ObtainTaskComponent } from './views/user-view/obtain-task/obtain-task.component';
import { GridModule, Sort, SortService, ResizeService, PdfExportService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { AdminTasksDialogComponent } from './views/admin-view/admin-tasks/admin-tasks-dialog/admin-tasks-dialog.component';
import { AdminStaffDialogComponent } from './views/admin-view/admin-staff/admin-staff-dialog/admin-staff-dialog.component';
import { AdminPlantsDialogComponent } from './views/admin-view/admin-plants/admin-plants-dialog/admin-plants-dialog.component';
import { AdminLocationDialogComponent } from './views/admin-view/admin-location/admin-location-dialog/admin-location-dialog.component';
import { AdminEquipmentDialogComponent } from './views/admin-view/admin-equipment/admin-equipment-dialog/admin-equipment-dialog.component';
import { AdminAreasComponent } from './views/admin-view/admin-areas/admin-areas.component';
import { AdminAreasDialogComponent } from './views/admin-view/admin-areas/admin-areas-dialog/admin-areas-dialog.component';
import { EnumToArrayPipe } from './shared/models';
import { MessagesComponent } from './messages/messages.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserTaskDialogComponent } from './views/user-view/user-tasks/user-task-dialog/user-task-dialog.component';
import { ObtainTaskDialogComponent } from './views/user-view/obtain-task/obtain-task-dialog/obtain-task-dialog.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuardService } from './auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LogInComponent,
    UserViewComponent,
    AdminViewComponent,
    AdminTasksComponent,
    AdminPlantsComponent,
    AdminEquipmentComponent,
    AdminLocationComponent,
    AdminStaffComponent,
    UserTasksComponent,
    CreateEmergencyTaskComponent,
    ObtainTaskComponent,
    AdminTasksDialogComponent,
    AdminStaffDialogComponent,
    AdminPlantsDialogComponent,
    AdminLocationDialogComponent,
    AdminEquipmentDialogComponent,
    AdminAreasComponent,
    AdminAreasDialogComponent,
    EnumToArrayPipe,
    MessagesComponent,
    UserTaskDialogComponent,
    ObtainTaskDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'verkadili', component: UserViewComponent, canActivate: [AuthGuardService] },
      { path: 'stjornandi', component: AdminViewComponent, canActivate: [AuthGuardService] },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDialogModule,
    GridModule,
    ChartModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers:
  [EnumToArrayPipe,
    SortService,
    ResizeService,
    PdfExportService,
    ToolbarService,
    PageService,
    AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [
    AdminTasksDialogComponent,
    AdminStaffDialogComponent,
    AdminPlantsDialogComponent,
    AdminLocationDialogComponent,
    AdminEquipmentDialogComponent,
    AdminAreasDialogComponent,
    UserTaskDialogComponent,
    ObtainTaskDialogComponent
  ],
})
export class AppModule { }
