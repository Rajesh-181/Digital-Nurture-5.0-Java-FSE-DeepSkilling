import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentFormComponent } from '../../pages/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from '../../pages/reactive-enrollment-form.component';

@NgModule({
  declarations: [
    EnrollmentFormComponent,
    ReactiveEnrollmentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EnrollmentRoutingModule
  ]
})
export class EnrollmentModule { }
