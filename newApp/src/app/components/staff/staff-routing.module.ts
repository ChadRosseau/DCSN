import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

// Guards
import { ChiefGuard } from '@guards/chief.guard';

// Components
import { OverviewComponent } from './overview/overview.component'
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
    { path: '', redirectTo: 'overview' }, // Redirect to overview page
    { path: 'overview', component: OverviewComponent }, // default route of the module
    { path: 'permissions', component: PermissionsComponent, canActivate: [ChiefGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }