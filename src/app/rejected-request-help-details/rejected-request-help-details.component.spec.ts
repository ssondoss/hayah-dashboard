import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRequestHelpDetailsComponent } from './rejected-request-help-details.component';

describe('RejectedRequestHelpDetailsComponent', () => {
  let component: RejectedRequestHelpDetailsComponent;
  let fixture: ComponentFixture<RejectedRequestHelpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedRequestHelpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedRequestHelpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
