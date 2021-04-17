import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

// Guards
import { ChiefGuard } from '@guards/chief.guard';
import { HeadGuard } from '@guards/head.guard';

// Components
import { OverviewComponent } from './overview/overview.component'
import { PermissionsComponent } from './permissions/permissions.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
    { path: '', redirectTo: 'overview' }, // Redirect to overview page
    { path: 'overview', component: OverviewComponent }, // default route of the module
    { path: 'permissions', component: PermissionsComponent, canActivate: [HeadGuard] },
    { path: 'create-article', component: CreatePostComponent },
    { path: 'create-article/:articleId', component: CreatePostComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }