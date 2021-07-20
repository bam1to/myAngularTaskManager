import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {

  public cardsList: Cards[];

  constructor(private _cardsService: CardsService) { }

  ngOnInit(): void {
    this.updateList();
  }

  public updateList(): void {
    this.cardsList = this._cardsService.getCardsInfo();
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardsList, event.previousIndex, event.currentIndex);
  }

}
