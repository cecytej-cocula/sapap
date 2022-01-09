import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrastornosComponent } from './edittrastornos.component';

describe('EdittrastornosComponent', () => {
  let component: EdittrastornosComponent;
  let fixture: ComponentFixture<EdittrastornosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittrastornosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittrastornosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
