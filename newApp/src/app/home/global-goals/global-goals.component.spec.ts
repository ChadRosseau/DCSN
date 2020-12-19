import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalGoalsComponent } from './global-goals.component';

describe('GlobalGoalsComponent', () => {
  let component: GlobalGoalsComponent;
  let fixture: ComponentFixture<GlobalGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
