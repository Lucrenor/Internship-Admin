import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../model/status';
import { ApplicantData } from '../model/applicant-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlUserData = 'http://localhost:8080/user';
  private apiUrlInternData = 'http://localhost:8080/intern';
  private apiUrlMail = 'http://localhost:8080/email';
  private apiUrlInbox = 'http://localhost:8080/email/inbox';
  private apiUrlDelete = 'http://localhost:8080/email/delete';
  private apiUrlAuth = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  getData(): Observable<ApplicantData[]> {
    return this.http.get<ApplicantData[]>(this.apiUrlUserData);
  }

  getStatusData(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrlInternData);
  }

  updateStatus(status: Status): Observable<any> {
    return this.http.put(`${this.apiUrlInternData}/update/${status.name}`, status);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlInternData);
  }

  changeStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrlInternData}/change/${status.name}`, status);
  }

  sendEmailsToInterns(payload: { status: string, name: string, department: string, date: string }): Observable<any> {
    return this.http.post(`${this.apiUrlMail}/send`, payload);
  }

  getSentEmails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlInbox);
  }

  deleteEmails(recipients: string[]): Observable<void> {
    return this.http.delete<void>(this.apiUrlDelete, { body: recipients });
  }

  login(username: string, password: string): Observable<string> {
    const payload = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrlAuth}/login`, payload, { headers, responseType: 'text' });
  }

  /*
    METHOD FOR POSTING NEW USER TO DATABASE TO ACTIVATE LOOK AT LOGIN.COMPONENT.TS

    register(username: string, password: string): Observable<string> {
    const payload = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrlAuth}/register`, payload, { headers, responseType: 'text' });
  }*/

}
