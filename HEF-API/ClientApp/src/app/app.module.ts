import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatGridListModule, MatSelectModule } from '@angular/material';
import { UserViewComponent } from './views/user-view/user-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminTasksComponent } from './views/admin-view/admin-tasks/admin-tasks.component';
import { AdminPlantsComponent } from './views/admin-view/admin-plants/admin-plants.component';
import { AdminEquipmentComponent } from './views/admin-view/admin-equipment/admin-equipment.component';
import { AdminLocationComponent } from './views/admin-view/admin-location/admin-location.component';
import { AdminStaffComponent } from './views/admin-view/admin-staff/admin-staff.component';


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
    AdminStaffComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'verkadili', component: UserViewComponent},
      { path: 'stjornandi', component: AdminViewComponent},
    ]),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
