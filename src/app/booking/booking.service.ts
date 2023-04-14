import { Booking } from './booking.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookingById(id: string): Observable<Booking> {
    const url = environment.apiUrl + `bookings/${id}`;
    return this.http.get<Booking>(url);
  }

  addBooking(booking: Booking): Observable<Booking> {
    const url = environment.apiUrl + 'bookings';
    return this.http.post<Booking>(url, booking);
  }

  deleteBooking(id: string): Observable<any> {
    const url = environment.apiUrl + `bookings/${id}`;
    return this.http.delete<Booking>(url);
  }
}
