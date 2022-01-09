import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrastornosComponent } from './addtrastornos.component';

describe('AddtrastornosComponent', () => {
  let component: AddtrastornosComponent;
  let fixture: ComponentFixture<AddtrastornosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtrastornosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrastornosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
