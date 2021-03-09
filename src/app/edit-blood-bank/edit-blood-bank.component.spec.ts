import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBloodBankComponent } from './edit-blood-bank.component';

describe('EditBloodBankComponent', () => {
  let component: EditBloodBankComponent;
  let fixture: ComponentFixture<EditBloodBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBloodBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBloodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
