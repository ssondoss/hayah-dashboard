import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRequestHelpComponent } from './rejected-request-help.component';

describe('RejectedRequestHelpComponent', () => {
  let component: RejectedRequestHelpComponent;
  let fixture: ComponentFixture<RejectedRequestHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedRequestHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedRequestHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
