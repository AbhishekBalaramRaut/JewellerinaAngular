import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  @ViewChild('confirm') confirmModal : any;

  ngOnInit(): void {
  }

  modalOptions: NgbModalOptions = {backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title',centered: true};
  
  constructor(private modalService: NgbModal,
    private router: Router) {}

  confirmOrder() {
    this.modalService.open(this.confirmModal, this.modalOptions).result.then((result) => {

      this.router.navigate(['portal/order-history']);
    }, (reason) => {
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
