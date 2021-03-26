import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card;
  @Output() remove = new EventEmitter<any>();

  public newTaskControl: FormGroup;

  constructor(
    private _calendar: NgbCalendar,
    private _cardsService: CardsService,
    private _modalService: NgbModal) { }

  public today = this._calendar.getToday();


  public isDisabled = (date: NgbDate) =>
    (
      date.day < this.today.day &&
      date.month <= this.today.month &&
      date.year <= this.today.year
    )
    || date.month < this.today.month &&
    date.year == this.today.year
    || date.year < this.today.year;


  ngOnInit(): void {
    this.newTaskControl = new FormGroup({
      title: new FormControl(this.card.title, { validators: Validators.required }),
      date: new FormControl(this.card.date, { validators: Validators.required }),
      taskBody: new FormControl(this.card.taskBody, { validators: Validators.required })
    })
  }

  public removeCard(cardId): void {
    this._cardsService.removeCard(cardId);
    this.remove.emit();
  }

  public openModal(content): void {
    this._modalService.open(content);
    console.log(this.card.date);
  }

  public rewriteCard(): void {
    const newTaskInfo = {
      id: this.card.id,
      title: this.newTaskControl.value.title,
      date: this.newTaskControl.value.date,
      taskBody: this.newTaskControl.value.taskBody,
    }
    this._cardsService.rewriteCard(newTaskInfo);
  }
}
