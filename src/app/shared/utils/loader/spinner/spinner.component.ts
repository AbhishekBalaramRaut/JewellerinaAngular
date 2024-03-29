import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/loader/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;

  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status: any) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
