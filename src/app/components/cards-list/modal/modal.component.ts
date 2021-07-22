import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cards } from 'src/app/interfaces/card.interface';
import { modalConfig } from 'src/app/interfaces/modal.interface';
import { CardsService } from 'src/app/services/cards.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  @Input() public modalConfig: modalConfig;
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef;

  public fullTaskControl: FormGroup;

  constructor(private _calendar: NgbCalendar, private _cardsService: CardsService, private modalService: NgbModal) {

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
    })
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose());
      this.modalRef.close();
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

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss());
      this.modalRef.dismiss();
    }
  }
}
