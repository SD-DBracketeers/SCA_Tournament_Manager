import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ToTopComponent } from './to-top/to-top.component';
import { HomeComponent } from './home/home.component';

import { DatePickerComponent } from './date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './input/input.component';
import { SearchParticipantsComponent } from './search-participants/search-participants.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';

import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from './back-button/back-button.component';
import { GetParticipantsService } from './get-participants.service';
import { GetTournamentService } from './get-tournament.service';
import { GetTournamentByIdService } from './get-tournament-by-id.service';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { NewParticipantComponent } from './new-participant/new-participant.component';
import { UpdateParticipantComponent } from './update-participant/update-participant.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';
import { ListboxComponent } from './listbox/listbox.component';
import { BracketBlockComponent } from './bracket-block/bracket-block.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToTopComponent,
    HomeComponent,
    SearchParticipantsComponent,
    BackButtonComponent,
    TournamentInfoComponent,
    ViewTournamentComponent,
    CreateTournamentComponent,
    NewParticipantComponent,
    UpdateParticipantComponent,
    ViewParticipantComponent,
    ListboxComponent,
    BracketBlockComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputComponent,
    DatePickerComponent,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [BackButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    GetParticipantsService,
    GetTournamentService,
    GetTournamentByIdService,
    LoginService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
