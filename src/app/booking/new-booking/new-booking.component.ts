import { Booking } from './../booking.model';
import { BookingService } from './../booking.service';
import { EventService } from './../../event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  isLoading: boolean = false;

  eventId!: string;
  event!: Event;
  private sub: any;

  bookingForm!: FormGroup;
  submitted = false;

  booking: Booking;

  possibleParticipantsArray?: number[] = new Array();

  constructor(private route: ActivatedRoute, private eventService: EventService, private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.eventService.getEventById(this.eventId).subscribe(event => {
        this.event = event;
        this.initBookingForm();
        this.isLoading = false;
      })
    });
  }

  initBookingForm() {
    this.possibleParticipantsArray = [];
    for (let i = 1; i < this.event.maxParticipants + 1; i++) {
      this.possibleParticipantsArray.push(i);
    }

    this.bookingForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$')]),
      participants: new FormControl(1, [Validators.required]),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    });

  }

  get f() { return this.bookingForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    this.booking = new Booking();
    this.booking.eventId = this.eventId;
    this.booking.firstName = this.f.firstName.value;
    this.booking.lastName = this.f.lastName.value;
    this.booking.email = this.f.email.value;
    this.booking.participants = this.f.participants.value;
    this.bookingService.addBooking(this.booking).subscribe((booking) => {
      this.router.navigate(['bookings/details/', booking.id]);
    });
  }

  cancelBooking() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
