import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRequestHelpComponent } from './approved-request-help.component';

describe('ApprovedRequestHelpComponent', () => {
  let component: ApprovedRequestHelpComponent;
  let fixture: ComponentFixture<ApprovedRequestHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRequestHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRequestHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
