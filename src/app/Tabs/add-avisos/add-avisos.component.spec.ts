import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvisosComponent } from './add-avisos.component';

describe('AddAvisosComponent', () => {
  let component: AddAvisosComponent;
  let fixture: ComponentFixture<AddAvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
