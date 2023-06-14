import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetUserListComponent } from './get-user-list/get-user-list.component';
import { AddNewComponent } from './add-new/add-new.component';
import { UpdateExistingUserComponent } from './update-existing-user/update-existing-user.component';

const routes: Routes = [
  {
    path: '',
    component: GetUserListComponent,
    children: [
      { path: 'addNewUser', component: AddNewComponent },
      { path: 'updateUser/:id', component: UpdateExistingUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUsersRoutingModule {}
