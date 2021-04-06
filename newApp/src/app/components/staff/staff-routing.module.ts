import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { OverviewComponent } from './overview/overview.component'

const routes: Routes = [
    { path: '', component: OverviewComponent }, // default route of the module
    // { path: 'overview', component: OverviewComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }