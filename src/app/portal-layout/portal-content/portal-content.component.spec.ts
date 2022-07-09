import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalContentComponent } from './portal-content.component';

describe('PortalContentComponent', () => {
  let component: PortalContentComponent;
  let fixture: ComponentFixture<PortalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
