import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicProgressBarComponent } from './dynamic-progress-bar.component';

describe('DynamicProgressBarComponent', () => {
  let component: DynamicProgressBarComponent;
  let fixture: ComponentFixture<DynamicProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
