import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../_services/auth.service';
import { EventService } from './../event.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss']
})
export class EventOverviewComponent implements OnInit {

  @ViewChild('cancelEventModal') cancelEventModal: any;

  isLoading: boolean = false;

  events!: Event[];

  constructor(private eventService: EventService, private authService: AuthService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events.sort((x, y) => { return new Date(x.date).valueOf() - new Date(y.date).valueOf() });
      this.isLoading = false;
    })
  }

  isAuthenticated() {
    const user = this.authService.userValue;
    return user?.authdata;
  }

  deleteEvent(event: Event) {
    this.modalService.open(this.cancelEventModal, { centered: true }).result.then(
      (result) => {
        if (result == 'cancel') {
          this.eventService.deleteEvent(event.id).subscribe(() => {
            window.location.reload();
          })
        }
      }
    )
  }

}
