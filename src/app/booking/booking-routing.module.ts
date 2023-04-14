import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { AuthGuard } from './../_helpers/auth.guard';
import { BookingOverviewComponent } from './booking-overview/booking-overview.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: BookingOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new/:id",
    component: NewBookingComponent
  },
  {
    path: "details/:id",
    component: BookingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
