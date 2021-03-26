import { Injectable } from '@angular/core';
import { Cards } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: Cards[];

  constructor() { }

  public getCardsInfo(): Cards[] {
    this.cards = JSON.parse(localStorage.getItem('cards')) || [];
    return this.cards;
  }
  public addCard(cardInfo: Cards) {
    this.cards.push(cardInfo);
    localStorage.setItem('cards', JSON.stringify(this.cards));
    return this.cards;
  }
  public removeCard(cardId) {
    this.cards = this.cards.filter(card => card.id !== cardId);
    localStorage.setItem('cards', JSON.stringify(this.cards));
    return this.cards;
  }
  public rewriteCard(newTaskInfo) {
    this.cards.forEach((item, index) => {
      item.id === newTaskInfo.id ? this.cards[index] = newTaskInfo : undefined
    });
    localStorage.setItem('cards', JSON.stringify(this.cards));
    return this.cards;
  }
}
