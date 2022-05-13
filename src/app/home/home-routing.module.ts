import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { ListUserComponent } from '@app/list-user/list-user.component';
import { EditUserComponent } from '@app/edit-user/edit-user.component';
import { AddUserComponent } from '@app/add-user/add-user.component';
import { TestTable } from '@app/test-table/test-table.component';
import { TestSearch } from '@app/test-search/test-table.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    { path: 'list-user', component: ListUserComponent, data: { title: marker('List') } },
    { path: 'edit-user', component: EditUserComponent, data: { title: marker('Edit') } },
    { path: 'add-user', component: AddUserComponent, data: { title: marker('Add') } },
    { path: 'table', component: TestTable, data: { title: marker('Table') } },
    { path: 'search', component: TestSearch, data: { title: marker('Search') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
