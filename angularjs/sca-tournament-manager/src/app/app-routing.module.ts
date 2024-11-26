import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchParticipantsComponent } from './search-participants/search-participants.component';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { NewParticipantComponent } from './new-participant/new-participant.component';
import { UpdateParticipantComponent } from './update-participant/update-participant.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to Home
  { path: 'search-participants', component: SearchParticipantsComponent }, // Route for Search Participants page
  { path: 'bracket', component: ViewTournamentComponent },
  { path: 'create-tournament', component: CreateTournamentComponent },
  { path: 'new-participant', component: NewParticipantComponent },
  { path: 'update-participant', component: UpdateParticipantComponent },
  { path: 'view-participant', component: ViewParticipantComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
