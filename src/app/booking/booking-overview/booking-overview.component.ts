import { EventService } from './../../event/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event.model';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent implements OnInit {

  isLoading: boolean = false;

  events!: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.isLoading = false;
    });
  }
}
