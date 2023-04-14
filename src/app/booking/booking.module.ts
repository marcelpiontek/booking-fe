import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingOverviewComponent } from './booking-overview/booking-overview.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';


@NgModule({
  declarations: [
    BookingOverviewComponent,
    NewBookingComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class BookingModule { }
