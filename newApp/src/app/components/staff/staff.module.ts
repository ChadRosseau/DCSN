import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';

// Staff Components
import { OverviewComponent } from './overview/overview.component';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule
  ],
  declarations: [OverviewComponent, PermissionsComponent]
})
export class StaffModule { }
