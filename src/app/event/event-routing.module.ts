import { NewEventComponent } from './new-event/new-event.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EventOverviewComponent
  },
  {
    path: "new",
    component: NewEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
