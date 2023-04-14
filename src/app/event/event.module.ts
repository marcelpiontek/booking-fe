import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { NewEventComponent } from './new-event/new-event.component';


@NgModule({
  declarations: [
    EventOverviewComponent,
    NewEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
