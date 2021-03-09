import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRequestHelpDetailsComponent } from './approved-request-help-details.component';

describe('ApprovedRequestHelpDetailsComponent', () => {
  let component: ApprovedRequestHelpDetailsComponent;
  let fixture: ComponentFixture<ApprovedRequestHelpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRequestHelpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRequestHelpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
