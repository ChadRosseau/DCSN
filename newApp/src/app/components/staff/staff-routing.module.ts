import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

// Guards
import { ChiefGuard } from '@guards/chief.guard';
import { HeadGuard } from '@guards/head.guard';

// Components
import { OverviewComponent } from './overview/overview.component'
import { PermissionsComponent } from './permissions/permissions.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ModerateArticleComponent } from './moderate-article/moderate-article.component';
import { OnHoldComponent } from './on-hold/on-hold.component';

const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' }, // Redirect to overview page
    { path: 'overview', component: OverviewComponent }, // default route of the module
    { path: 'permissions', component: PermissionsComponent },
    { path: 'create-article', component: CreatePostComponent },
    { path: 'create-article/:articleId', component: CreatePostComponent },
    { path: 'moderate-article/:articleId', component: ModerateArticleComponent },
    { path: 'on-hold/:articleId', component: OnHoldComponent, canActivate: [HeadGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }