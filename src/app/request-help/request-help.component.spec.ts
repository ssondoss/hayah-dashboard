import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHelpComponent } from './request-help.component';

describe('RequestHelpComponent', () => {
  let component: RequestHelpComponent;
  let fixture: ComponentFixture<RequestHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
