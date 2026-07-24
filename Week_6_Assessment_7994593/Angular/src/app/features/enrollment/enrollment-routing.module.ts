import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentFormComponent } from '../../pages/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from '../../pages/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: EnrollmentFormComponent },
  { path: 'reactive', component: ReactiveEnrollmentFormComponent, canDeactivate: [unsavedChangesGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
