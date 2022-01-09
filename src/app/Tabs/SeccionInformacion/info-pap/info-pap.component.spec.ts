import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPAPComponent } from './info-pap.component';

describe('InfoPAPComponent', () => {
  let component: InfoPAPComponent;
  let fixture: ComponentFixture<InfoPAPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPAPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
