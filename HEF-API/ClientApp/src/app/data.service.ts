import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Area, Equipment, Job, JobAssignments, Comment, Plant, User, Station } from './shared/models';
import { MessageService } from './message.service';
import { JobStatus } from './shared/enums';

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
  private stationsUrl = 'api/stations/';

  // Jobs

  private _jobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobs$: Observable<Job[]> = this._jobsSource.asObservable();
  get jobs$(): Observable<Job[]> { return this._jobs$ }
  get jobs(): Job[] { return this._jobsSource.getValue()}
  set jobs(newValue: Job[]){
    this._jobsSource.next(newValue);    
  }
  private _filteredJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _filteredJobs$: Observable<Job[]> = this._filteredJobsSource.asObservable();
  get filteredJobs$(): Observable<Job[]> { return this._filteredJobs$; }
  get filteredJobs(): Job[] { return this._filteredJobsSource.getValue()};
  set filteredJobs(newValue: Job[]){
    this._filteredJobsSource.next(newValue);    
  }

   // Stations
  private _stationsSource: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>(null);
  private _stations$: Observable<Station[]> = this._stationsSource.asObservable();
  get stations$(): Observable<Station[]> { return this._stations$ }
  get stations(): Station[] { return this._stationsSource.getValue()}
  set stations(newValue: Station[]){
    this._stationsSource.next(newValue);    
  }

  private _usersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _users$: Observable<User[]> = this._usersSource.asObservable();
  get users$(): Observable<User[]> { return this._users$ }
  get users(): User[] { return this._usersSource.getValue()}
  set users(newValue: User[]){
    this._usersSource.next(newValue);    
  }

  private _assignedUsersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _assignedUsers$: Observable<User[]> = this._assignedUsersSource.asObservable();
  get assignedUsers$(): Observable<User[]> { return this._assignedUsers$ }
  get assignedUsers(): User[] { return this._assignedUsersSource.getValue()}
  set assignedUsers(newValue: User[]){
    this._assignedUsersSource.next(newValue);    
  }

  private _unassignedUsersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _unassignedUsers$: Observable<User[]> = this._unassignedUsersSource.asObservable();
  get unassignedUsers$(): Observable<User[]> { return this._unassignedUsers$ }
  get unassignedUsers(): User[] { return this._unassignedUsersSource.getValue()}
  set unassignedUsers(newValue: User[]){
    this._unassignedUsersSource.next(newValue);    
  }

  private _userJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _userJobs$: Observable<Job[]> = this._userJobsSource.asObservable();
  get userJobs$(): Observable<Job[]> { return this._userJobs$ }
  get userJobs(): Job[] { return this._userJobsSource.getValue()}
  set userJobs(newValue: Job[]){
    this._userJobsSource.next(newValue);    
  }

  private _availableJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _availableJobs$: Observable<Job[]> = this._availableJobsSource.asObservable();
  get availableJobs$(): Observable<Job[]> { return this._availableJobs$ }
  get availableJobs(): Job[] { return this._availableJobsSource.getValue()}
  set availableJobs(newValue: Job[]){
    this._availableJobsSource.next(newValue);    
  }

  private _jobsAssignedSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsAssigned$: Observable<Job[]> = this._jobsAssignedSource.asObservable();
  get jobsAssigned$(): Observable<Job[]> { return this._jobsAssigned$ }
  get jobsAssigned(): Job[] { return this._jobsAssignedSource.getValue()}
  set jobsAssigned(newValue: Job[]){
    this._jobsAssignedSource.next(newValue);    
  }

  private _jobsInProgressSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsInProgress$: Observable<Job[]> = this._jobsInProgressSource.asObservable();
  get jobsInProgress$(): Observable<Job[]> { return this._jobsInProgress$ }
  get jobsInProgress(): Job[] { return this._jobsInProgressSource.getValue()}
  set jobsInProgress(newValue: Job[]){
    this._jobsInProgressSource.next(newValue);    
  }

  private _jobsOnHoldSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsOnHold$: Observable<Job[]> = this._jobsOnHoldSource.asObservable();
  get jobsOnHold$(): Observable<Job[]> { return this._jobsOnHold$ }
  get jobsOnHold(): Job[] { return this._jobsOnHoldSource.getValue()}
  set jobsOnHold(newValue: Job[]){
    this._jobsOnHoldSource.next(newValue);    
  }

  private _jobsFinishedSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsFinished$: Observable<Job[]> = this._jobsFinishedSource.asObservable();
  get jobsFinished$(): Observable<Job[]> { return this._jobsFinished$ }
  get jobsFinished(): Job[] { return this._jobsFinishedSource.getValue()}
  set jobsFinished(newValue: Job[]){
    this._jobsFinishedSource.next(newValue);    
  }

  private _plantsSource: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);
  private _plants$: Observable<Plant[]> = this._plantsSource.asObservable();
  get plants$(): Observable<Plant[]> { return this._plants$ }
  get plants(): Plant[] { return this._plantsSource.getValue()}
  set plants(newValue: Plant[]){
    this._plantsSource.next(newValue);    
  }

  private _areasSource: BehaviorSubject<Area[]> = new BehaviorSubject<Area[]>(null);
  private _areas$: Observable<Area[]> = this._areasSource.asObservable();
  get areas$(): Observable<Area[]> { return this._areas$ }
  get areas(): Area[] { return this._areasSource.getValue()}
  set areas(newValue: Area[]){
    this._areasSource.next(newValue);    
  }

  private _commentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _comments$: Observable<Comment[]> = this._commentsSource.asObservable();
  get comments$(): Observable<Comment[]> { return this._comments$ }
  get comments(): Comment[] { return this._commentsSource.getValue()}
  set comments(newValue: Comment[]){
    this._commentsSource.next(newValue);    
  }

  private _filteredCommentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _filteredComments$: Observable<Comment[]> = this._filteredCommentsSource.asObservable();
  get filteredComments$(): Observable<Comment[]> { return this._filteredComments$ }
  get filteredComments(): Comment[] { return this._filteredCommentsSource.getValue()}
  set filteredComments(newValue: Comment[]){
    this._filteredCommentsSource.next(newValue);    
  }

  // Comments for current open job

  private _jobCommentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _jobComments$: Observable<Comment[]> = this._jobCommentsSource.asObservable();
  get jobComments$(): Observable<Comment[]> { return this._jobComments$ }
  get jobComments(): Comment[] { return this._jobCommentsSource.getValue()}
  set jobComments(newValue: Comment[]){
    this._jobCommentsSource.next(newValue);    
  }

  private _jobAssignmentsSource: BehaviorSubject<JobAssignments[]> = new BehaviorSubject<JobAssignments[]>(null);
  private _jobAssignments$: Observable<JobAssignments[]> = this._jobAssignmentsSource.asObservable();
  get jobAssignments$(): Observable<JobAssignments[]> { return this._jobAssignments$ }
  get jobAssignments(): JobAssignments[] { return this._jobAssignmentsSource.getValue()}
  set jobAssignments(newValue: JobAssignments[]){
    this._jobAssignmentsSource.next(newValue);    
  }

  private _equipmentsSource: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>(null);
  private _equipments$: Observable<Equipment[]> = this._equipmentsSource.asObservable();
  get equipments$(): Observable<Equipment[]> { return this._equipments$ }
  get equipments(): Equipment[] { return this._equipmentsSource.getValue()}
  set equipments(newValue: Equipment[]){
    this._equipmentsSource.next(newValue);    
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,  private messageService: MessageService,
    @Inject('BASE_URL') baseUrl: string
    ) { }

  //Jobs
  getJobs(){
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
      this.filteredJobs = result;
    }, error => console.error(error));
  }

  addJob(job: Job) {
    console.log('DataService - AddJob', job);
    console.log(this.jobsUrl);
    return this.http.post<Job>(this.jobsUrl, job, this.httpOptions);
  }
  updateJob(job: Job, jobId: string): Observable<Job> {
    const url = this.jobsUrl + jobId + '/';
    return this.http.put<Job>(url, job, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateJob', job))
      );
  }

  deleteJob(job: Job, jobId: string): Observable<{}> {
      const url = this.jobsUrl + jobId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteJob'))
        );
  }

  //Filters
  
  filterJobs(jobStatuses: number[], stationIds: number[], jobs: Job[]){
    let tempJobs = [];

    tempJobs = this.filterByJobStatus(jobStatuses, jobs);
    tempJobs = this.filterByStation(stationIds, tempJobs);

    this.filteredJobs = tempJobs;
  }

  filterByJobStatus(jobStatuses: number[], jobs: Job[]): Job[]{
    if(!jobStatuses || jobStatuses.length == 0 ){
      return jobs;
    }
    // if(!jobs){
    //   jobs = [];
    // }
    return jobs.filter((job: Job) => {
      return jobStatuses.find(status => status == job.status.valueOf());
    });
  }

  filterByStation(stationIds: number[], jobs: Job[]): Job[]{
    if(!stationIds || stationIds.length == 0){
      return jobs;
    }
    // if(!jobs){
    //   jobs = [];
    // }
    return jobs.filter((job: Job) => {
      return stationIds.find(stationId => stationId == job.stationId);
    });
  }

  // this.dataService.filterComments(this.selectedUsers, this.selectedJobs, this.dataService.comments)
  
  filterComments(users: number[], jobs: number[], comments: Comment[]){
    let tempJobs = [];

    tempJobs = this.filterByCommentUser(users, comments);
    tempJobs = this.filterByCommentJob(jobs, tempJobs);

    this.filteredComments = tempJobs;
  }

  filterByCommentUser(users: number[], comments: Comment[]): Comment[]{
    if(!users || users.length == 0 ){
      return comments;
    }
    // if(!jobs){
    //   jobs = [];
    // }
    return comments.filter((comment: Comment) => {
      return users.find(jobId => jobId == comment.userId);
    });
  }

  filterByCommentJob(jobs: number[], comments: Comment[]): Comment[]{
    if(!jobs || jobs.length == 0){
      return comments;
    }
    // if(!jobs){
    //   jobs = [];
    // }
    return comments.filter((comments: Comment) => {
      return jobs.find(jobIds => jobIds == comments.jobId);
    });
  }



  //Stations

  getStations(){
    this.http.get<Station[]>('api/stations/').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));
  }

  addStation(station: Station){
    console.log("DataService - AddStation", station);
    console.log(this.stationsUrl);
    return this.http.post<Plant>(this.stationsUrl, station, this.httpOptions);
  }

  updateStation(station: Station, stationId: string): Observable<Plant> {
    let url = this.stationsUrl + stationId + "/";
    return this.http.put<Plant>(url, station, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateStation', station))
      );
  }

  deleteStation(station: Station, stationId:string): Observable<{}>{
      let url = this.stationsUrl + stationId + "/";   
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteStation'))
        );
  }

  //Plants

  getPlants(){
    this.http.get<Plant[]>('api/plants').subscribe(result => {
      console.log(result);
      this.plants = result;
    }, error => console.error(error));
  }

  addPlant(plant: Plant){
    console.log("DataService - AddPlant", plant);
    console.log(this.plantsUrl);
    return this.http.post<Plant>(this.plantsUrl, plant, this.httpOptions);
  }

  updatePlant(plant: Plant, plantId: string): Observable<Plant> {
    const url = this.plantsUrl + plantId + '/';
    return this.http.put<Plant>(url, plant, this.httpOptions)
      .pipe(
        catchError(this.handleError('updatePlant', plant))
      );
  }

  deletePlant(plant: Plant, plantId: string): Observable<{}> {
      const url = this.plantsUrl + plantId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deletePlant'))
        );
  }

  //Equipments

  getEquipments(){
    this.http.get<Equipment[]>('api/equipments').subscribe(result => {
      console.log(result);
      this.equipments = result;
    }, error => console.error(error));
  }

  addEquipment(equipment: Equipment){
    console.log("DataService - AddEquipment", equipment);
    console.log(this.equipmentsUrl);
    return this.http.post<Equipment>(this.equipmentsUrl, equipment, this.httpOptions);
  }

  updateEquipment(equipment: Equipment, equipmentId: string): Observable<Equipment> {
    const url = this.equipmentsUrl + equipmentId + '/';
    console.log(url);
    return this.http.put<Equipment>(url, equipment, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateEquipment', equipment))
      );
  }

  deleteEquipment(equipment: Equipment, equipmentId: string): Observable<{}> {
      const url = this.equipmentsUrl + equipmentId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteEquipment'))
        );
  }

  //Areas

  getAreas(){
    this.http.get<Area[]>('api/areas').subscribe(result => {
      console.log(result);
      this.areas = result;
    }, error => console.error(error));
  }

  addArea(area: Area){
    console.log("DataService - AddArea", area);
    console.log(this.areasUrl);
    return this.http.post<Area>(this.areasUrl, area, this.httpOptions);
  }

  updateArea(area: Area, areaId: string): Observable<Area> {
    const url = this.areasUrl + areaId + '/';
    console.log(url);
    return this.http.put<Area>(url, area, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateArea', area))
      );
  }

  deleteArea(area: Area, areaId: string): Observable<{}> {
      const url = this.areasUrl + areaId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteArea'))
        );
  }

  //Users

  getUsers(){
    this.http.get<User[]>('api/users').subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => console.error(error));

  }

  addUser(user: User){
    console.log("DataService - AddUser", user);
    console.log(this.usersUrl);
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  updateUser(user: User, userId: string): Observable<User> {
    const url = this.usersUrl + userId + '/';
    // console.log(url);
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }

  deleteUser(user: User, userId: string): Observable<{}> {
      const url = this.usersUrl + userId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteUser'))
        );
  }

  //JobAssignments

  getJobAssignments(job: Job) {
    let assignedIds: number[] = [];
    console.log(job.id.toString());
    this.http.get<JobAssignments[]>('api/jobs/' + job.id.toString() + '/users').subscribe(result => {
      console.log(result);
      // this.jobAssignment = result;
      for (let i = 0; i < result.length; i++) {
        assignedIds[i] = result[i].id;
      }
      this.assignedUsers = this.users.filter((item) => assignedIds.includes(item.id));
      this.unassignedUsers = this.users.filter((item) => !assignedIds.includes(item.id));

    });
  }

  addJobAssignment(jobAssignment: JobAssignments, userId: string){
    let url = this.jobsUrl + jobAssignment.jobId.toString() + '/users/' + userId;
    console.log(url);
    console.log(jobAssignment, 'From dataService');
    return this.http.post<JobAssignments>(url, jobAssignment, this.httpOptions);
  }

  deleteJobAssignment(jobAssignment: JobAssignments) {
    const jobId = jobAssignment.jobId.toString();
    const userId = jobAssignment.userId.toString();
    const url = this.jobsUrl + jobId + '/users/' + userId;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('deleteJobAssignment'))
    );
  }

  //Comments

  addJobComment(comment: Comment){
    console.log(comment);
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
  }

  // getUserJobs(userId: number) {
  //   const id = userId.toString();

  //   const url = this.usersUrl + id + '/jobs';
  //   return this.http.get<Job[]>(url).subscribe(result => {
  //     console.log(result);
  //   }, error => console.error(error));
  // }

  getUserJobs(userId: number){
    this.http.get<Job[]>('api/users/' + userId + '/jobs').subscribe(result => {
      console.log(result);
      this.userJobs = result;
      this.availableJobs = this.jobs.filter(item => item.status === 1);
      this.jobsAssigned = this.userJobs.filter(item => item.status === 2);
      this.jobsInProgress = this.userJobs.filter(item => item.status === 3);
      this.jobsOnHold = this.userJobs.filter(item => item.status === 4);
      this.jobsFinished = this.userJobs.filter(item => item.status === 5);
    }, error => console.error(error));
  }

  

  //Comments

  getComments(){
    return this.http.get<Comment[]>('api/comments').subscribe(result => {
      this.comments = result;
      this.filteredComments = result;
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
