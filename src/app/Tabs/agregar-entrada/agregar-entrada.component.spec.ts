import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEntradaComponent } from './agregar-entrada.component';

describe('AgregarEntradaComponent', () => {
  let component: AgregarEntradaComponent;
  let fixture: ComponentFixture<AgregarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
