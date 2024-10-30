import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchParticipantsComponent } from './search-participants/search-participants.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to Home
  { path: 'search-participants', component: SearchParticipantsComponent } // Route for Search Participants page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
