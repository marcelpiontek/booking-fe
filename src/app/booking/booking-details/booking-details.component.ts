import { EventService } from './../../event/event.service';
import { Booking } from './../booking.model';
import { BookingService } from './../booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/event/event.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  @ViewChild('cancelModal') cancelModal: any;

  isLoading: boolean = false;

  bookingId?: string;
  booking: Booking;
  event: Event;

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private eventService: EventService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.bookingId = params['id'];

      this.bookingService.getBookingById(this.bookingId).subscribe(
        (booking) => {
          this.booking = booking;

          this.eventService.getEventById(this.booking.eventId).subscribe(
            (event) => {
              this.event = event;
              this.isLoading = false;
            }
          )
        },
        (error) => {
          this.booking = undefined;
          this.event = undefined;
          this.isLoading = false;
        }
      )
    });
  }

  cancelBooking(booking: Booking) {
    this.modalService.open(this.cancelModal, { centered: true, ariaLabelledBy: 'cancel-modal', }).result.then(
      (result) => {
        if (result == 'cancel') {
          this.bookingService.deleteBooking(booking.id).subscribe(() => {
            this.router.navigateByUrl('/');
          })
        }
      }
    )
  };



}
