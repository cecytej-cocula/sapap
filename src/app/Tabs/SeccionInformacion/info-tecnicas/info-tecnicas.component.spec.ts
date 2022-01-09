import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTecnicasComponent } from './info-tecnicas.component';

describe('InfoTecnicasComponent', () => {
  let component: InfoTecnicasComponent;
  let fixture: ComponentFixture<InfoTecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTecnicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
