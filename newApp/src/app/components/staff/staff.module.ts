import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';

// Staff Components
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule
  ],
  declarations: [OverviewComponent]
})
export class StaffModule { }
