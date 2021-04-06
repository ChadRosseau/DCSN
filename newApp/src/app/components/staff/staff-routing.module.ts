import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { OverviewComponent } from './overview/overview.component'

// Guards
import { StaffGuard } from '@guards/staff.guard';

const routes: Routes = [
    { path: '', component: OverviewComponent, canActivate: [StaffGuard] }, // default route of the module
    // { path: 'overview', component: OverviewComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }