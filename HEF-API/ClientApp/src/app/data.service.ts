import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Area, Equipment, Job, Plant, User } from './shared/models';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobsUrl = '/api/jobs/';
  private equipmentsUrl = '/api/equipments/';
  private plantsURl = '/api/plants/';
  private areasURL = '/api/areas/';
  private usersURL = '/api/users/';
  
  
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,  private messageService: MessageService, 
    @Inject('BASE_URL') baseUrl: string
    ) { }

  getJob(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl)
      .pipe(
        tap(_ => this.log('fetched jobs')),
        catchError(this.handleError<Job[]>('getJobs', []))
      );
  }

  addJob(job: Job){
    console.log("DataService - AddJob", job);
    console.log(this.jobsUrl);
    return this.http.post<Job>(this.jobsUrl, job, this.httpOptions);
  }

  addPlant(plant: Plant){
    console.log("DataService - AddPlant", plant);
    console.log(this.plantsURl);
    return this.http.post<Plant>(this.plantsURl, plant, this.httpOptions);
  }

  addEquipment(equipment: Equipment){
    console.log("DataService - AddEquipment", equipment);
    console.log(this.equipmentsUrl);
    return this.http.post<Equipment>(this.equipmentsUrl, equipment, this.httpOptions);
  }

  addArea(area: Area){
    console.log("DataService - AddArea", area);
    console.log(this.areasURL);
    return this.http.post<Area>(this.areasURL, area, this.httpOptions);
  }

  addUser(user: User){
    console.log("DataService - AddUser", user);
    console.log(this.usersURL);
    return this.http.post<User>(this.usersURL, user, this.httpOptions);
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`DataService: ${message}`);
  }
}
