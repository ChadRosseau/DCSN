import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { StaffRoutingModule } from './staff-routing.module';

// Staff Components
import { OverviewComponent } from './overview/overview.component';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
  ],
  declarations: [OverviewComponent, PermissionsComponent]
})
export class StaffModule { }
