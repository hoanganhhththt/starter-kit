import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {LoginComponent} from "./login/login.component";
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TestTable } from './test-table/test-table.component';
import { TestSearch } from './test-search/test-table.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'table', component: TestTable },
  { path: 'search', component: TestSearch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
