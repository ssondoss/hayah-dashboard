import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHelpDetailsComponent } from './request-help-details.component';

describe('RequestHelpDetailsComponent', () => {
  let component: RequestHelpDetailsComponent;
  let fixture: ComponentFixture<RequestHelpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHelpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHelpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
