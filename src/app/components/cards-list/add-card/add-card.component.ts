import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { modalConfig } from 'src/app/interfaces/modal.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [NgbInputDatepickerConfig]
})
export class AddCardComponent implements OnInit {

  @ViewChild('modal') private modalComponent: ModalComponent
  async openModal() {
    return await this.modalComponent.open()
  }
  public modalConfig: modalConfig = {
    modalTitle: "Title",
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: "Save"
  };
  constructor() { }

  ngOnInit(): void {
  }

}
