import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// Tiny Text Editor
import { EditorModule } from '@tinymce/tinymce-angular';

// Routing
import { StaffRoutingModule } from './staff-routing.module';

// Staff Components
import { OverviewComponent } from './overview/overview.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { CreatePostComponent } from './create-post/create-post.component';


@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EditorModule,
  ],
  declarations: [OverviewComponent, PermissionsComponent, CreatePostComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StaffModule { }
