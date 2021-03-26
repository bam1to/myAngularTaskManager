import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cards } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [NgbInputDatepickerConfig]
})
export class AddCardComponent implements OnInit {

  public model: NgbDateStruct;
  public fullTaskControl: FormGroup;

  constructor(
    private _calendar: NgbCalendar,
    private _cardsService: CardsService,
    private _modalService: NgbModal
  ) {
  }

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
    this.fullTaskControl = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      date: new FormControl(null, { validators: Validators.required }),
      taskBody: new FormControl(null, { validators: Validators.required })
    });
  }

  public open(content): void {
    this._modalService.open(content);
  }

  public saveNewCard() {
    const card: Cards = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      title: this.fullTaskControl.value.title,
      date: this.fullTaskControl.value.date,
      taskBody: this.fullTaskControl.value.taskBody
    }
    this._cardsService.addCard(card);
    this.fullTaskControl.reset();
  }
}
