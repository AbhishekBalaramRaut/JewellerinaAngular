import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  modalData: any;

  constructor(private modal: NgbActiveModal) {}

  ngOnInit(): void {}

  modalClosed(action: any) {
    this.modal.close(action);
  }

  modalDismiss() {
    this.modal.dismiss();
  }
}
