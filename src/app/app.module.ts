import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './components/cards-list/card/card.component';
import { AddCardComponent } from './components/cards-list/add-card/add-card.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateConverterPipe } from './pipes/date-converter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/cards-list/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AddCardComponent,
    CardsListComponent,
    DateConverterPipe,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
