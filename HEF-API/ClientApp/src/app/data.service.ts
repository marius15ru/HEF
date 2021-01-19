import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Area, Equipment, Job, JobAssignments, Comment, Plant, User, Station, SubJobs, subJobHistory } from './shared/models';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobsUrl = '/api/jobs/';
  private subJobsUrl = '/api/subjobs/';
  private subJobsHistoryUrl = 'api/subjobs/history/';
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
  get jobs$(): Observable<Job[]> { return this._jobs$; }
  get jobs(): Job[] { return this._jobsSource.getValue(); }
  set jobs(newValue: Job[]) {
    this._jobsSource.next(newValue);
  }

  private _jobsPastDueDateSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsPastDueDate$: Observable<Job[]> = this._jobsPastDueDateSource.asObservable();
  get jobsPastDueDate$(): Observable<Job[]> { return this._jobsPastDueDate$; }
  get jobsPastDueDate(): Job[] { return this._jobsPastDueDateSource.getValue(); }
  set jobsPastDueDate(newValue: Job[]) {
    this._jobsPastDueDateSource.next(newValue);
  }

  private _filteredJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _filteredJobs$: Observable<Job[]> = this._filteredJobsSource.asObservable();
  get filteredJobs$(): Observable<Job[]> { return this._filteredJobs$; }
  get filteredJobs(): Job[] { return this._filteredJobsSource.getValue(); }
  set filteredJobs(newValue: Job[]) {
    this._filteredJobsSource.next(newValue);
  }

  // SubJobs

  private _subJobsSource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _subJobs$: Observable<SubJobs[]> = this._subJobsSource.asObservable();
  get subJobs$(): Observable<SubJobs[]> { return this._subJobs$; }
  get subJobs(): SubJobs[] { return this._subJobsSource.getValue(); }
  set subJobs(newValue: SubJobs[]) {
    this._subJobsSource.next(newValue);
  }

  private _subJobsPastDueDateSource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _subJobsPastDueDate$: Observable<SubJobs[]> = this._subJobsPastDueDateSource.asObservable();
  get subJobsPastDueDate$(): Observable<SubJobs[]> { return this._subJobsPastDueDate$; }
  get subJobsPastDueDate(): SubJobs[] { return this._subJobsPastDueDateSource.getValue(); }
  set subJobsPastDueDate(newValue: SubJobs[]) {
    this._subJobsPastDueDateSource.next(newValue);
  }

  private _subJobsForJobSource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _subJobsForJob$: Observable<SubJobs[]> = this._subJobsForJobSource.asObservable();
  get subJobsForJob$(): Observable<SubJobs[]> { return this._subJobsForJob$; }
  get subJobsForJob(): SubJobs[] { return this._subJobsForJobSource.getValue(); }
  set subJobsForJob(newValue: SubJobs[]) {
    this._subJobsForJobSource.next(newValue);
  }

  // Sub Job History

  private _subJobsHistorySource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _subJobsHistory$: Observable<SubJobs[]> = this._subJobsHistorySource.asObservable();
  get subJobsHistory$(): Observable<SubJobs[]> { return this._subJobsHistory$; }
  get subJobsHistory(): SubJobs[] { return this._subJobsHistorySource.getValue(); }
  set subJobsHistory(newValue: SubJobs[]) {
    this._subJobsHistorySource.next(newValue);
  }

  private _subJobsHistoryForJobSource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _subJobsHistoryForJob$: Observable<SubJobs[]> = this._subJobsHistoryForJobSource.asObservable();
  get subJobsHistoryForJob$(): Observable<SubJobs[]> { return this._subJobsHistoryForJob$; }
  get subJobsHistoryForJob(): SubJobs[] { return this._subJobsHistoryForJobSource.getValue(); }
  set subJobsHistoryForJob(newValue: SubJobs[]) {
    this._subJobsHistoryForJobSource.next(newValue);
  }

  private _filteredSubJobsHistoryForJobSource: BehaviorSubject<SubJobs[]> = new BehaviorSubject<SubJobs[]>(null);
  private _filteredSubJobsHistoryForJob$: Observable<SubJobs[]> = this._filteredSubJobsHistoryForJobSource.asObservable();
  get filteredSubJobsHistoryForJob$(): Observable<SubJobs[]> { return this._filteredSubJobsHistoryForJob$; }
  get filteredSubJobsHistoryForJob(): SubJobs[] { return this._filteredSubJobsHistoryForJobSource.getValue(); }
  set filteredSubJobsHistoryForJob(newValue: SubJobs[]) {
    this._filteredSubJobsHistoryForJobSource.next(newValue);
  }

  private _subJobsHistoryDatesSource: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(null);
  private _subJobsHistoryDates$: Observable<Date[]> = this._subJobsHistoryDatesSource.asObservable();
  get subJobsHistoryDates$(): Observable<Date[]> { return this._subJobsHistoryDates$; }
  get subJobsHistoryDates(): Date[] { return this._subJobsHistoryDatesSource.getValue(); }
  set subJobsHistoryDates(newValue: Date[]) {
    this._subJobsHistoryDatesSource.next(newValue);
  }

  private _subJobsHistoryUniqueDatesSource: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(null);
  private _subJobsHistoryUniqueDates$: Observable<Date[]> = this._subJobsHistoryUniqueDatesSource.asObservable();
  get subJobsHistoryUniqueDates$(): Observable<Date[]> { return this._subJobsHistoryUniqueDates$; }
  get subJobsHistoryUniqueDates(): Date[] { return this._subJobsHistoryUniqueDatesSource.getValue(); }
  set subJobsHistoryUniqueDates(newValue: Date[]) {
    this._subJobsHistoryUniqueDatesSource.next(newValue);
  }


   // Stations
  private _stationsSource: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>(null);
  private _stations$: Observable<Station[]> = this._stationsSource.asObservable();
  get stations$(): Observable<Station[]> { return this._stations$; }
  get stations(): Station[] { return this._stationsSource.getValue(); }
  set stations(newValue: Station[]) {
    this._stationsSource.next(newValue);
  }

  private _usersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _users$: Observable<User[]> = this._usersSource.asObservable();
  get users$(): Observable<User[]> { return this._users$; }
  get users(): User[] { return this._usersSource.getValue(); }
  set users(newValue: User[]) {
    this._usersSource.next(newValue);
  }

  private _assignedUsersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _assignedUsers$: Observable<User[]> = this._assignedUsersSource.asObservable();
  get assignedUsers$(): Observable<User[]> { return this._assignedUsers$; }
  get assignedUsers(): User[] { return this._assignedUsersSource.getValue(); }
  set assignedUsers(newValue: User[]) {
    this._assignedUsersSource.next(newValue);
  }

  private _unassignedUsersSource: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private _unassignedUsers$: Observable<User[]> = this._unassignedUsersSource.asObservable();
  get unassignedUsers$(): Observable<User[]> { return this._unassignedUsers$; }
  get unassignedUsers(): User[] { return this._unassignedUsersSource.getValue(); }
  set unassignedUsers(newValue: User[]) {
    this._unassignedUsersSource.next(newValue);
  }

  private _userJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _userJobs$: Observable<Job[]> = this._userJobsSource.asObservable();
  get userJobs$(): Observable<Job[]> { return this._userJobs$; }
  get userJobs(): Job[] { return this._userJobsSource.getValue(); }
  set userJobs(newValue: Job[]) {
    this._userJobsSource.next(newValue);
  }

  private _availableJobsSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _availableJobs$: Observable<Job[]> = this._availableJobsSource.asObservable();
  get availableJobs$(): Observable<Job[]> { return this._availableJobs$; }
  get availableJobs(): Job[] { return this._availableJobsSource.getValue(); }
  set availableJobs(newValue: Job[]) {
    this._availableJobsSource.next(newValue);
  }

  private _jobsAssignedSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsAssigned$: Observable<Job[]> = this._jobsAssignedSource.asObservable();
  get jobsAssigned$(): Observable<Job[]> { return this._jobsAssigned$; }
  get jobsAssigned(): Job[] { return this._jobsAssignedSource.getValue(); }
  set jobsAssigned(newValue: Job[]) {
    this._jobsAssignedSource.next(newValue);
  }

  private _jobsInProgressSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsInProgress$: Observable<Job[]> = this._jobsInProgressSource.asObservable();
  get jobsInProgress$(): Observable<Job[]> { return this._jobsInProgress$; }
  get jobsInProgress(): Job[] { return this._jobsInProgressSource.getValue(); }
  set jobsInProgress(newValue: Job[]) {
    this._jobsInProgressSource.next(newValue);
  }

  private _jobsOnHoldSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsOnHold$: Observable<Job[]> = this._jobsOnHoldSource.asObservable();
  get jobsOnHold$(): Observable<Job[]> { return this._jobsOnHold$; }
  get jobsOnHold(): Job[] { return this._jobsOnHoldSource.getValue(); }
  set jobsOnHold(newValue: Job[]) {
    this._jobsOnHoldSource.next(newValue);
  }

  private _jobsFinishedSource: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  private _jobsFinished$: Observable<Job[]> = this._jobsFinishedSource.asObservable();
  get jobsFinished$(): Observable<Job[]> { return this._jobsFinished$; }
  get jobsFinished(): Job[] { return this._jobsFinishedSource.getValue(); }
  set jobsFinished(newValue: Job[]) {
    this._jobsFinishedSource.next(newValue);
  }

  private _plantsSource: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);
  private _plants$: Observable<Plant[]> = this._plantsSource.asObservable();
  get plants$(): Observable<Plant[]> { return this._plants$; }
  get plants(): Plant[] { return this._plantsSource.getValue(); }
  set plants(newValue: Plant[]) {
    this._plantsSource.next(newValue);
  }

  private _areasSource: BehaviorSubject<Area[]> = new BehaviorSubject<Area[]>(null);
  private _areas$: Observable<Area[]> = this._areasSource.asObservable();
  get areas$(): Observable<Area[]> { return this._areas$; }
  get areas(): Area[] { return this._areasSource.getValue(); }
  set areas(newValue: Area[]) {
    this._areasSource.next(newValue);
  }

  private _commentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _comments$: Observable<Comment[]> = this._commentsSource.asObservable();
  get comments$(): Observable<Comment[]> { return this._comments$; }
  get comments(): Comment[] { return this._commentsSource.getValue(); }
  set comments(newValue: Comment[]) {
    this._commentsSource.next(newValue);
  }

  private _filteredCommentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _filteredComments$: Observable<Comment[]> = this._filteredCommentsSource.asObservable();
  get filteredComments$(): Observable<Comment[]> { return this._filteredComments$; }
  get filteredComments(): Comment[] { return this._filteredCommentsSource.getValue(); }
  set filteredComments(newValue: Comment[]) {
    this._filteredCommentsSource.next(newValue);
  }

  // Comments for current open job

  private _jobCommentsSource: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  private _jobComments$: Observable<Comment[]> = this._jobCommentsSource.asObservable();
  get jobComments$(): Observable<Comment[]> { return this._jobComments$; }
  get jobComments(): Comment[] { return this._jobCommentsSource.getValue(); }
  set jobComments(newValue: Comment[]) {
    this._jobCommentsSource.next(newValue);
  }

  private _jobAssignmentsSource: BehaviorSubject<JobAssignments[]> = new BehaviorSubject<JobAssignments[]>(null);
  private _jobAssignments$: Observable<JobAssignments[]> = this._jobAssignmentsSource.asObservable();
  get jobAssignments$(): Observable<JobAssignments[]> { return this._jobAssignments$; }
  get jobAssignments(): JobAssignments[] { return this._jobAssignmentsSource.getValue(); }
  set jobAssignments(newValue: JobAssignments[]) {
    this._jobAssignmentsSource.next(newValue);
  }

  private _equipmentsSource: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>(null);
  private _equipments$: Observable<Equipment[]> = this._equipmentsSource.asObservable();
  get equipments$(): Observable<Equipment[]> { return this._equipments$; }
  get equipments(): Equipment[] { return this._equipmentsSource.getValue(); }
  set equipments(newValue: Equipment[]) {
    this._equipmentsSource.next(newValue);
  }

  private _equipmentsByJobStationSource: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>(null);
  private _equipmentsByJobStation$: Observable<Equipment[]> = this._equipmentsByJobStationSource.asObservable();
  get equipmentsByJobStation$(): Observable<Equipment[]> { return this._equipmentsByJobStation$; }
  get equipmentsByJobStation(): Equipment[] { return this._equipmentsByJobStationSource.getValue(); }
  set equipmentsByJobStation(newValue: Equipment[]) {
    this._equipmentsByJobStationSource.next(newValue);
  }

  private _filteredEquipmentsSource: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>(null);
  private _filteredEquipments$: Observable<Equipment[]> = this._filteredEquipmentsSource.asObservable();
  get filteredEquipments$(): Observable<Equipment[]> { return this._filteredEquipments$; }
  get filteredEquipments(): Equipment[] { return this._filteredEquipmentsSource.getValue(); }
  set filteredEquipments(newValue: Equipment[]) {
    this._filteredEquipmentsSource.next(newValue);
  }

  private _filteredStationsSource: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>(null);
  private _filteredStations$: Observable<Station[]> = this._filteredStationsSource.asObservable();
  get filteredStations$(): Observable<Station[]> { return this._filteredStations$; }
  get filteredStations(): Station[] { return this._filteredStationsSource.getValue(); }
  set filteredStations(newValue: Station[]) {
    this._filteredStationsSource.next(newValue);
  }

  private _userSource: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _user$: Observable<User> = this._userSource.asObservable();
  get user$(): Observable<User> { return this._user$; }
  get user(): User { return this._userSource.getValue(); }
  set user(newValue: User) {
    this._userSource.next(newValue);
  }

  public jobFilters: { [key: number]: any; } = {};
  public commentFilters: { [key: number]: any; } = {};
  public equipmentFilters: { [key: number]: any; } = {};
  public stationFilters: { [key: number]: any; } = {};

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,  private messageService: MessageService,
    // @Inject('BASE_URL') baseUrl: string
    ) { }

  // Get current User

  getCurrentUser(userId: string) {
    this.http.get<User>('api/users/' + userId + '/').subscribe(result => {
      this.user = result;
    });
  }

  // Jobs
  getJobs() {
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      this.getSubJobs();
      console.log(result);
      this.jobs = result;
      this.filteredJobs = result;
      this.availableJobs = this.jobs.filter(item => item.status === 1);
      // this.getJobsPastDueDate(result, today);
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

  deleteJob(job: Job, jobId: string): Observable<any> {
    console.log(job, jobId);
      const url = this.jobsUrl + jobId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteJob'))
        );
  }

  // SubJobs

  getSubJobs(jobId =  null) {
    this.http.get<SubJobs[]>('api/subjobs').subscribe(result => {
      console.log(result);
      this.subJobs = result;
      if (jobId) {
        this.getSubJobsForJob(jobId);
      }
      this.filterSubJobsPastDueDate(this.jobs, result);
    }, error => console.error(error));
  }

  getSubJobsForJob(jobId: number) {
    this.subJobsForJob = this.subJobs.filter(subJob => subJob.jobId === jobId);
  }

  filterSubJobsPastDueDate(jobs: Job[], subJobs: SubJobs[]) {
    let tempJobs = [];

    tempJobs = this.getJobsPastDueDate(jobs, new Date());
    this.jobsPastDueDate = tempJobs;
    tempJobs = this.getSubJobsPastDueDate(tempJobs, subJobs);
    this.subJobsPastDueDate = tempJobs;

    if (tempJobs.length > 0) {
      console.log('ÉG ER MEÐ FLEIRI EN 0 Í LISTANUM');
      this.subJobsPastDueDate.forEach((subJob, index, array) => {
        const requestModel = new subJobHistory;
        requestModel.equipmentId = subJob.equipmentId;
        requestModel.description = subJob.description;
        requestModel.jobId = subJob.jobId;
        requestModel.status = subJob.status;
        requestModel.subJobTask = subJob.subJobTask;
        requestModel.unit = subJob.unit;
        requestModel.value = subJob.value;
        requestModel.completedOn = new Date();
        this.addToSubJobHistory(requestModel).subscribe(() => {
          subJob.status = 2;
          subJob.value = 0.0;
          this.updateSubJob(subJob, subJob.id.toString()).subscribe(() => {
            if (index === (array.length - 1)) {
              this.jobsPastDueDate.forEach(job => {
                let day = new Date(job.completeBy).getDate();
                let month = new Date(job.completeBy).getMonth();
                let year = new Date(job.completeBy).getFullYear();
                this.http.get<JobAssignments[]>('api/jobs/' + job.id.toString() + '/users').subscribe(result => {
                  const assigned: JobAssignments[] = result;
                  switch (job.recurring) {
                    case 1: day += 7;
                      break;
                    case 2: day += 14;
                      break;
                    case 3: month += 1;
                      break;
                    case 4: month += 2;
                      break;
                    case 5: month += 3;
                      break;
                    case 6: month += 6;
                      break;
                    case 7: year += 1;
                      break;
                    case 8: year += 2;
                      break;
                    case 9: year += 3;
                      break;
                    case 10: year += 5;
                      break;
                    case 11: year += 10;
                      break;
                  }
                  job.completeBy = new Date(year, month, day);
                  job.status = assigned.length > 0 ? 2 : 1;

                  this.updateJob(job, job.id.toString()).subscribe(() => {
                    this.getJobs();
                  });
                });
              });
            }
          });
        });
      });
    }
  }

  getJobsPastDueDate(jobs: Job[], today: Date): Job[] {
    return jobs.filter(job => (new Date(job.completeBy) < today) && (job.recurring > 0 || job.emergencyJob === false));
  }

  getSubJobsPastDueDate(jobs: Job[], subJobs: SubJobs[]): SubJobs[] {
    return subJobs.filter((subJob: SubJobs) => {
      return jobs.find(job => job.id == subJob.jobId);
    });
  }

  addSubJob(subJob: SubJobs) {
    console.log('DataService - AddSubJob', subJob);
    return this.http.post<SubJobs>(this.subJobsUrl, subJob, this.httpOptions);
  }

  updateSubJob(subJob: SubJobs, subJobId: string): Observable<SubJobs> {
    const url = this.subJobsUrl + subJobId + '/';
    return this.http.put<SubJobs>(url, subJob, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateJob', subJob))
      );
  }

  deleteSubJob(subJob: SubJobs, subJobId: string): Observable<{}> {
    console.log(subJob, subJobId);
      const url = this.subJobsUrl + subJobId + '/';
      return this.http.delete(url, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteSubJob'))
        );
  }

  // Sub Job History

  getSubJobHistory() {
    const url = this.subJobsHistoryUrl;
    this.http.get<SubJobs[]>(url).subscribe(result => {
      console.log(result);
      this.subJobsHistory = result;
    }, error => console.error(error));
  }

  getSubJobHistoryByJobId(jobId: string) {
    const url = this.subJobsHistoryUrl + jobId;
    this.http.get<SubJobs[]>(url).subscribe(result => {
      console.log(result);
      this.subJobsHistoryForJob = result;
      this.filteredSubJobsHistoryForJob = result;
    }, error => console.error(error));
  }

  addToSubJobHistory(subJob: SubJobs) {
    console.log('DataService - AddSubJob', subJob);
    return this.http.post<SubJobs>(this.subJobsHistoryUrl, subJob, this.httpOptions);
  }

  filterList<T, U>(models: T[], list: U[], getProperty: (p: T) => U): T[] {
    if (!list || list.length === 0) {
      return models;
    }
    return models.filter(m => list.includes(getProperty(m)));
  }

  filterSingle<T, U>(models: T[], filterVar: U, getProperty: (p: T, q: U) => boolean): T[] {
    if (filterVar === undefined || filterVar === null) {
      return models;
    }
    return models.filter(m => getProperty(m, filterVar));
  }

  // Job Filtering
  filterJobs(jobFilters: { [key: string]: any; }, jobs: Job[]) {
    jobs = this.filterList<Job, number>(jobs, jobFilters['plants'], (p: Job): number => p.station.plantId);
    jobs = this.filterList<Job, number>(jobs, jobFilters['status'], (p: Job): number => p.status);
    jobs = this.filterList<Job, number>(jobs, jobFilters['stations'], (p: Job): number => p.stationId);
    jobs = this.filterList<Job, number>(jobs, jobFilters['areas'], (p: Job): number => p.station.areaId);

    jobs = this.filterSingle<Job, Date>(jobs, jobFilters['lastCheckFrom'], (p: Job, d: Date): boolean => new Date(p.lastCheck) >= d);
    jobs = this.filterSingle<Job, Date>(jobs, jobFilters['lastCheckTo'], (p: Job, d: Date): boolean => new Date(p.lastCheck) <= d);

    jobs = this.filterSingle<Job, Date>(jobs, jobFilters['completeByFrom'], (p: Job, d: Date): boolean => new Date(p.completeBy) >= d);
    jobs = this.filterSingle<Job, Date>(jobs, jobFilters['completeByTo'], (p: Job, d: Date): boolean => new Date(p.completeBy) <= d);
    
    jobs = this.filterSingle<Job, boolean>(jobs, jobFilters['hasComments'], (p: Job, d: boolean): boolean => p.hasComments === d);
    jobs = this.filterSingle<Job, boolean>(jobs, jobFilters['emergencyJobs'], (p: Job, d: boolean): boolean => p.emergencyJob === d);
    this.filteredJobs = jobs;
  }

  // SubJob Filtering

  filterSubJobsHistory(subJobFilters: { [key: string]: any; }, subJobs: SubJobs[]) {
    subJobs = this.filterSingle<SubJobs, Date>(subJobs, subJobFilters['CompletedOnFrom'], (p: SubJobs, d: Date): boolean => new Date(p.completedOn) >= d);
    subJobs = this.filterSingle<SubJobs, Date>(subJobs, subJobFilters['CompletedOnTo'], (p: SubJobs, d: Date): boolean => new Date(p.completedOn) <= d);

    this.filteredSubJobsHistoryForJob = subJobs;
  }

  // Comment filtering

  filterComments(commentFilters: { [key: string]: any; }, comments: Comment[]) {
    comments = this.filterList<Comment, number>(comments, commentFilters['users'], (p: Comment): number => p.userId);
    comments = this.filterList<Comment, number>(comments, commentFilters['jobs'], (p: Comment): number => p.jobId);
    comments = this.filterSingle<Comment, boolean>(comments, commentFilters['seen'], (p: Comment, d: boolean): boolean => p.seen === d);

    this.filteredComments = comments;
  }

  // Equipment filtering

  filterEquipments(equipmentFilters: { [key: string]: any; }, equipments: Equipment[]) {
    equipments = this.filterList<Equipment, number>(equipments, equipmentFilters['stations'], (p: Equipment): number => p.stationId);
    equipments = this.filterSingle<Equipment, Date>(equipments, equipmentFilters['lastCheckFrom'], (p: Equipment, d: Date): boolean => new Date(p.lastCheck) >= d);
    equipments = this.filterSingle<Equipment, Date>(equipments, equipmentFilters['lastCheckTo'], (p: Equipment, d: Date): boolean => new Date(p.lastCheck) <= d);

    this.filteredEquipments = equipments;
  }

  // Station filtering

  filterStations(stationFilters: { [key: string]: any; }, stations: Station[]) {
    stations = this.filterList<Station, number>(stations, stationFilters['plants'], (p: Station): number => p.plantId);
    stations = this.filterList<Station, number>(stations, stationFilters['areas'], (p: Station): number => p.areaId);

    this.filteredStations = stations;
  }

  // Stations

  getStations() {
    this.http.get<Station[]>('api/stations/').subscribe(result => {
      console.log(result);
      this.stations = result;
      this.filteredStations = result;
    }, error => console.error(error));
  }

  addStation(station: Station) {
    console.log('DataService - AddStation', station);
    console.log(this.stationsUrl);
    return this.http.post<Plant>(this.stationsUrl, station, this.httpOptions);
  }

  updateStation(station: Station, stationId: string): Observable<Plant> {
    const url = this.stationsUrl + stationId + '/';
    return this.http.put<Plant>(url, station, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateStation', station))
      );
  }

  deleteStation(station: Station, stationId: string): Observable<{}> {
    const url = this.stationsUrl + stationId + '/';
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteStation'))
      );
  }

  // Plants

  getPlants() {
    this.http.get<Plant[]>('api/plants').subscribe(result => {
      console.log(result);
      this.plants = result;
    }, error => console.error(error));
  }

  addPlant(plant: Plant) {
    console.log('DataService - AddPlant', plant);
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

  // Equipments

  getEquipments() {
    this.http.get<Equipment[]>('api/equipments').subscribe(result => {
      console.log(result);
      this.equipments = result;
      this.filteredEquipments = result;
    }, error => console.error(error));
  }

  addEquipment(equipment: Equipment) {
    console.log('DataService - AddEquipment', equipment);
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

  filterEquipmentsByJobStation(stationId: number, equipments: Equipment[]) {
    this.equipmentsByJobStation = equipments.filter(equipment => stationId === equipment.stationId);
  }

  // Areas

  getAreas() {
    this.http.get<Area[]>('api/areas').subscribe(result => {
      console.log(result);
      this.areas = result;
    }, error => console.error(error));
  }

  addArea(area: Area) {
    console.log('DataService - AddArea', area);
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

  // Users

  getUsers() {
    this.http.get<User[]>('api/users').subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => console.error(error));

  }

  addUser(user: User) {
    console.log('DataService - AddUser', user);
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

  // JobAssignments

  getJobAssignments(job: Job) {
    const assignedIds: number[] = [];
    this.http.get<JobAssignments[]>('api/jobs/' + job.id.toString() + '/users').subscribe(result => {
      console.log('Job Assignments', result);
      this.jobAssignments = result;
      for (let i = 0; i < result.length; i++) {
        assignedIds[i] = result[i].id;
      }
      this.assignedUsers = this.users.filter((item) => assignedIds.includes(item.id));
      this.unassignedUsers = this.users.filter((item) => !assignedIds.includes(item.id));
    });
  }

  addJobAssignment(jobAssignment: JobAssignments, userId: string) {
    const url = this.jobsUrl + jobAssignment.jobId.toString() + '/users/' + userId;
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

  // Comments
  getComments(jobId = null, userId = null) {
    return this.http.get<Comment[]>('api/comments').subscribe(result => {
      this.comments = result;
      this.filteredComments = result;
      if (jobId) {
        this.jobComments = this.comments.filter(item => item.jobId === jobId);
        if (this.jobComments.length > 0) {
          this.unSeenComments = this.jobComments.filter(comment => comment.seen === false);
          this.unSeenComments.forEach(comment => {
            if ((userId !== comment.userId) && !comment.seen ) {
              comment.seen = true;
              this.updateJobComment(comment).subscribe(() => {
                this.getComments();
              });
            }
          });
        }
      }
    }, error => console.error(error));
  }

  addJobComment(comment: Comment) {
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
  }

  updateJobComment(comment: Comment) {
    const url = this.commentsUrl + comment.id + '/';
    return this.http.put<Job>(url, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateJob', comment))
      );
  }

  deleteJobComment(comment: Comment): Observable<{}> {
    const url = this.commentsUrl + comment.id.toString();
    console.log(url);
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('deleteJobComment'))
    );
  }

  getUserJobs(userId: number) {
    this.http.get<Job[]>('api/users/' + userId + '/jobs').subscribe(result => {
      console.log(result);
      this.userJobs = result;
      this.jobsAssigned = this.userJobs.filter(item => item.status === 2);
      this.jobsInProgress = this.userJobs.filter(item => item.status === 3);
      this.jobsOnHold = this.userJobs.filter(item => item.status === 4);
      this.jobsFinished = this.userJobs.filter(item => item.status === 5);
    }, error => console.error(error));
  }

  // Comments
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
