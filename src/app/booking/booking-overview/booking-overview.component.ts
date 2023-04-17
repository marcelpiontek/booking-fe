import { EventService } from './../../event/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event.model';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent implements OnInit {

  isLoading: boolean = false;

  events!: Event[];
  selectedEvent!: Event;

  bookingsForSelectedEvent!: Booking[];

  constructor(private eventService: EventService, private bookingService: BookingService) { }

  ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      if (events && events.length > 0) {
        this.selectEvent(events[0]);
      }
      this.isLoading = false;
    });
  }

  selectEvent(event: Event) {
    this.isLoading = true;
    this.bookingsForSelectedEvent = undefined;
    this.selectedEvent = event;
    this.bookingService.getBookingsByEventId(event.id).subscribe((bookings) => {
      this.bookingsForSelectedEvent = bookings;
      this.isLoading = false;
    })
  }

}
