import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Area, Equipment, Job, JobAssignments, Comment, Plant, User } from './shared/models';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobsUrl = '/api/jobs/';
  private equipmentsUrl = '/api/equipments/';
  private plantsUrl = '/api/plants/';
  private areasUrl = '/api/areas/';
  private usersUrl = '/api/users/';
  private commentsUrl = '/api/comments/';
  
  

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

  updateJob(job: Job, jobId: string): Observable<Job> {
    let url = this.jobsUrl + jobId + "/";
    return this.http.put<Job>(url, job, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateJob', job))
      );
  }

  deleteJob(job: Job, jobId:string): Observable<{}>{
      let url = this.jobsUrl + jobId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteJob'))
        );
  }

  addPlant(plant: Plant){
    console.log("DataService - AddPlant", plant);
    console.log(this.plantsUrl);
    return this.http.post<Plant>(this.plantsUrl, plant, this.httpOptions);
  }

  updatePlant(plant: Plant, plantId: string): Observable<Plant> {
    let url = this.plantsUrl + plantId + "/";
    return this.http.put<Plant>(url, plant, this.httpOptions)
      .pipe(
        catchError(this.handleError('updatePlant', plant))
      );
  }

  deletePlant(plant: Plant, plantId:string): Observable<{}>{
      let url = this.plantsUrl + plantId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deletePlant'))
        );
  }

  addEquipment(equipment: Equipment){
    console.log("DataService - AddEquipment", equipment);
    console.log(this.equipmentsUrl);
    return this.http.post<Equipment>(this.equipmentsUrl, equipment, this.httpOptions);
  }

  updateEquipment(equipment: Equipment, equipmentId: string): Observable<Equipment> {
    let url = this.equipmentsUrl + equipmentId + "/";
    return this.http.put<Equipment>(url, equipment, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateEquipment', equipment))
      );
  }

  deleteEquipment(equipment: Equipment, equipmentId:string): Observable<{}>{
      let url = this.equipmentsUrl + equipmentId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteEquipment'))
        );
  }

  addArea(area: Area){
    console.log("DataService - AddArea", area);
    console.log(this.areasUrl);
    return this.http.post<Area>(this.areasUrl, area, this.httpOptions);
  }

  updateArea(area: Area, areaId: string): Observable<Area> {
    let url = this.areasUrl + areaId + "/";
    return this.http.put<Area>(url, area, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateArea', area))
      );
  }

  deleteArea(area: Area, areaId:string): Observable<{}>{
      let url = this.areasUrl + areaId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteArea'))
        );
  }

  addUser(user: User){
    console.log("DataService - AddUser", user);
    console.log(this.usersUrl);
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  updateUser(user: User, userId: string): Observable<User> {
    let url = this.usersUrl + userId + "/";
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }

  deleteUser(user: User, userId:string): Observable<{}>{
      let url = this.usersUrl + userId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteUser'))
        );
  }

  addJobAssignment(jobAssignment: JobAssignments, userId: string){
    let url = this.jobsUrl + jobAssignment.jobId.toString() + '/users/' + userId;
    console.log(url);
    console.log(jobAssignment, "From dataService");
    return this.http.post<JobAssignments>(url, jobAssignment, this.httpOptions);
  }

  deleteJobAssignment(jobAssignment: JobAssignments){
    let jobId = jobAssignment.jobId.toString();
    let userId = jobAssignment.userId.toString();
    let url = this.jobsUrl + jobId + '/users/' + userId;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('deleteJobAssignment'))
    );
  }

  addJobComment(comment: Comment){
    console.log(comment);
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
  }

  getUserJobs(userId: number){
    let id = userId.toString();

    let url = this.usersUrl + id + '/jobs';
    return this.http.get<Job[]>(url).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
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
