import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    const url = environment.apiUrl + 'events';
    return this.http.get<Event[]>(url);
  }

  getEventById(id: string): Observable<Event> {
    const url = environment.apiUrl + `events/${id}`;
    return this.http.get<Event>(url);
  }

  deleteEvent(eventId: string): Observable<any> {
    const url = environment.apiUrl + `events/${eventId}`;
    return this.http.delete<Event>(url);
  }
}
