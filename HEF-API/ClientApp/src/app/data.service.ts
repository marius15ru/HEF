import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Area, Equipment, Job, JobAssignments, Comment, Plant, User, Station } from './shared/models';
import { MessageService } from './message.service';
import { JobStatus } from './shared/enums';
import { Item } from '@syncfusion/ej2-angular-navigations';

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
  private unSeenComments: Comment[] = [];
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

  private _filteredEquipmentsSource: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>(null);
  private _filteredEquipments$: Observable<Equipment[]> = this._filteredEquipmentsSource.asObservable();
  get filteredEquipments$(): Observable<Equipment[]> { return this._filteredEquipments$ }
  get filteredEquipments(): Equipment[] { return this._filteredEquipmentsSource.getValue()}
  set filteredEquipments(newValue: Equipment[]){
    this._filteredEquipmentsSource.next(newValue);    
  }

  private _filteredStationsSource: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>(null);
  private _filteredStations$: Observable<Station[]> = this._filteredStationsSource.asObservable();
  get filteredStations$(): Observable<Station[]> { return this._filteredStations$ }
  get filteredStations(): Station[] { return this._filteredStationsSource.getValue()}
  set filteredStations(newValue: Station[]){
    this._filteredStationsSource.next(newValue);    
  }

  private _userSource: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _user$: Observable<User> = this._userSource.asObservable();
  get user$(): Observable<User> { return this._user$ }
  get user(): User { return this._userSource.getValue()}
  set user(newValue: User){
    this._userSource.next(newValue);    
  }

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,  private messageService: MessageService,
    @Inject('BASE_URL') baseUrl: string
    ) { }

  //Get current User

  getCurrentUser(userId: string){
    this.http.get<User>('api/users/' + userId + "/").subscribe(result => {
      this.user = result;
    })
  }

  //Jobs
  getJobs(){
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
      this.filteredJobs = result;
      this.availableJobs = this.jobs.filter(item => item.status === 1);
    }, error => console.error(error));
  }

  addJob(job: Job) {
    console.log('DataService - AddJob', job);
    console.log(this.jobsUrl);
    job.modifiedOn = new Date();
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
    console.log(job, jobId);
      const url = this.jobsUrl + jobId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteJob'))
        );
  }

  //Filters

  //Job Filtering
  
  filterJobs(jobStatuses: number[], stationIds: number[], plantIds: number[] , areaIds: number[], hasComments: boolean, emergencyJobs: boolean, lastCheckFrom: Date, lastCheckTo: Date, completeByFrom: Date, completeByTo: Date, jobs: Job[]){
    let tempJobs = [];

    tempJobs = this.filterByJobStatus(jobStatuses, jobs);
    tempJobs = this.filterByStation(stationIds, tempJobs);
    tempJobs = this.filterByPlant(plantIds, tempJobs);
    tempJobs = this.filterByArea(areaIds, tempJobs);
    tempJobs = this.filterByHasComments(hasComments, tempJobs);
    tempJobs = this.filterByEmergencyJob(emergencyJobs, tempJobs);
    tempJobs = this.filterByLastCheckFrom(lastCheckFrom, tempJobs);
    tempJobs = this.filterByLastCheckTo(lastCheckTo, tempJobs);
    tempJobs = this.filterByCompleteByFrom(completeByFrom, tempJobs);
    tempJobs = this.filterByCompleteByTo(completeByTo, tempJobs);

    this.filteredJobs = tempJobs;
  }

  filterByJobStatus(jobStatuses: number[], jobs: Job[]): Job[]{
    if(!jobStatuses || jobStatuses.length == 0 ){
      return jobs;
    }
    return jobs.filter((job: Job) => {
      return jobStatuses.find(status => status == job.status.valueOf());
    });
  }
  
  filterByStation(stationIds: number[], jobs: Job[]): Job[]{
    if(!stationIds || stationIds.length == 0){
      return jobs;
    }
    return jobs.filter((job: Job) => {
      return stationIds.find(stationId => stationId == job.stationId);
    });
  }

  filterByPlant(plantIds: number[], jobs: Job[]): Job[]{
    if(!plantIds || plantIds.length == 0){
      return jobs;
    }
    return jobs.filter((job: Job) => {
      return plantIds.find(plantId => plantId == job.station.plantId);
    });
  }

  filterByArea(areaIds: number[], jobs: Job[]): Job[]{
    if(!areaIds || areaIds.length == 0){
      return jobs;
    }
    return jobs.filter((job: Job) => {
      return areaIds.find(areaId => areaId == job.station.areaId);
    });
  }


  filterByHasComments(hasComments: boolean, jobs: Job[]): Job[]{
    if(hasComments === null){
      return jobs;
    }
    return jobs.filter((job: Job) => job.hasComments === hasComments)
  }

  filterByEmergencyJob(emergencyJob: boolean, jobs: Job[]): Job[]{
    if(emergencyJob === null){
      return jobs;
    }
    return jobs.filter((job: Job) => job.emergencyJob === emergencyJob)
  }

  filterByLastCheckFrom(lastCheckFrom: Date, jobs: Job[]): Job[]{
    if(lastCheckFrom === null){
      return jobs;
    }
    return jobs.filter((job: Job) => new Date(job.lastCheck) > lastCheckFrom)
  }

  filterByLastCheckTo(lastCheckTo: Date, jobs: Job[]): Job[]{
    if(lastCheckTo === null){
      return jobs;
    }
    return jobs.filter((job: Job) => new Date(job.lastCheck) < lastCheckTo)
  }

  filterByCompleteByFrom(completeByFrom: Date, jobs: Job[]): Job[]{
    if(completeByFrom === null){
      return jobs;
    }
    return jobs.filter((job: Job) => new Date(job.completeBy) > completeByFrom)
  }

  filterByCompleteByTo(completeByTo: Date, jobs: Job[]): Job[]{
    if(completeByTo === null){
      return jobs;
    }
    return jobs.filter((job: Job) => new Date(job.completeBy) < completeByTo)
  
  }

  // Comment filtering
  
  filterComments(users: number[], jobs: number[], seen: boolean, comments: Comment[]){
    let tempComments = [];

    tempComments = this.filterByCommentUser(users, comments);
    tempComments = this.filterByCommentJob(jobs, tempComments);
    tempComments = this.filterBySeenComments(seen, tempComments);

    this.filteredComments = tempComments;
  }

  filterByCommentUser(users: number[], comments: Comment[]): Comment[]{
    if(!users || users.length == 0 ){
      return comments;
    }
    return comments.filter((comment: Comment) => {
      return users.find(jobId => jobId == comment.userId);
    });
  }

  filterByCommentJob(jobs: number[], comments: Comment[]): Comment[]{
    if(!jobs || jobs.length == 0){
      return comments;
    }
    return comments.filter((comments: Comment) => {
      return jobs.find(jobIds => jobIds == comments.jobId);
    });
  }

  filterBySeenComments(seen: boolean, comments: Comment[]): Comment[]{
    if(seen === null){
      return comments;
    }
    return comments.filter((comment: Comment) => comment.seen === seen)
  }

  // Equipment filtering

  filterEquipments(stations: number[], lastCheckFrom: Date, lastCheckTo: Date, equipments: Equipment[]){
    let tempEquipments = [];

    tempEquipments = this.filterEquipmentByStation(stations, equipments);
    tempEquipments = this.filterEquipmentByLastCheckFrom(lastCheckFrom, tempEquipments);
    tempEquipments = this.filterEquipmentByLastCheckTo(lastCheckTo, tempEquipments);

    this.filteredEquipments = tempEquipments;
  }

  filterEquipmentByStation(stations: number[], equipments: Equipment[]): Equipment[]{
    if(!stations || stations.length == 0){
      return equipments;
    }
    return equipments.filter((equipment: Equipment) => {
      return stations.find(stationId => stationId == equipment.stationId);
    });
  }

  filterEquipmentByLastCheckFrom(lastCheckFrom: Date, equipments: Equipment[]): Equipment[]{
    if(lastCheckFrom === null){
      return equipments;
    }
    return equipments.filter((equipment: Equipment) => new Date(equipment.lastCheck) >= lastCheckFrom)
  }

  filterEquipmentByLastCheckTo(lastCheckTo: Date, equipments: Equipment[]): Equipment[]{
    if(lastCheckTo === null){
      return equipments;
    }
    return equipments.filter((equipment: Equipment) => new Date(equipment.lastCheck) <= lastCheckTo)
  }


  // Station filtering

  filterStations(plants: number[], areas: number[], stations: Station[]){
    let tempStations = [];

    tempStations = this.filterStationsByPlant(plants, stations);
    tempStations = this.filterStationsByArea(areas, tempStations);

    this.filteredStations = tempStations;
  } 

  filterStationsByPlant(plants: number[], stations: Station[]): Station[]{
    if(!plants || plants.length == 0){
      return stations;
    }
    return stations.filter((station: Station) => {
      return plants.find(plantId => plantId == station.plantId);
    });
  }

  filterStationsByArea(areas: number[], stations: Station[]): Station[]{
    if(!areas || areas.length == 0){
      return stations;
    }
    return stations.filter((station: Station) => {
      return areas.find(areaId => areaId == station.areaId);
    });
  }


  //Stations

  getStations(){
    this.http.get<Station[]>('api/stations/').subscribe(result => {
      console.log(result);
      this.stations = result;
      this.filteredStations = result;
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
      this.filteredEquipments = result;
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
      console.log("Job Assignments",result);
      this.jobAssignments = result;
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
  getComments(jobId = null, userId = null){
    return this.http.get<Comment[]>('api/comments').subscribe(result => {
      this.comments = result;
      this.filteredComments = result;
      if(jobId){
        this.jobComments = this.comments.filter(item => item.jobId == jobId);
        if(this.jobComments.length > 0){
          this.unSeenComments = this.jobComments.filter(comment => comment.seen === false);
          this.unSeenComments.forEach(comment => {
            if((this.user.id != comment.userId) && !comment.seen ){
              comment.seen = true;
              this.updateJobComment(comment).subscribe(result => {
                this.getComments();
              });
            }
          });
        }
      }
    }, error => console.error(error));
  }

  addJobComment(comment: Comment){
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
  }

  updateJobComment(comment: Comment){
    const url = this.commentsUrl + comment.id + '/';
    return this.http.put<Job>(url, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateJob', comment))
      );
  }

  deleteJobComment(comment: Comment): Observable<{}>{
    const url = this.commentsUrl + comment.id.toString();
    console.log(url);
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('deleteJobComment'))
    );
  }

  getUserJobs(userId: number){
    this.http.get<Job[]>('api/users/' + userId + '/jobs').subscribe(result => {
      console.log(result);
      this.userJobs = result;
      this.jobsAssigned = this.userJobs.filter(item => item.status === 2);
      this.jobsInProgress = this.userJobs.filter(item => item.status === 3);
      this.jobsOnHold = this.userJobs.filter(item => item.status === 4);
      this.jobsFinished = this.userJobs.filter(item => item.status === 5);
    }, error => console.error(error));
  }

  

  //Comments







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
