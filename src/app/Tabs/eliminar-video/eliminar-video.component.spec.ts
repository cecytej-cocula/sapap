import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarVideoComponent } from './eliminar-video.component';

describe('EliminarVideoComponent', () => {
  let component: EliminarVideoComponent;
  let fixture: ComponentFixture<EliminarVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
