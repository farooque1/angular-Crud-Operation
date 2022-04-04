import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';

const routes: Routes = [  { path: '', component: Employee-dashboardComponent }
						           ,{ path: 'recaptcha', component: RecaptchaComponent }
            
					   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
