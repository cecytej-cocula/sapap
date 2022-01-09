import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotransComponent } from './infotrans.component';

describe('InfotransComponent', () => {
  let component: InfotransComponent;
  let fixture: ComponentFixture<InfotransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfotransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfotransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
