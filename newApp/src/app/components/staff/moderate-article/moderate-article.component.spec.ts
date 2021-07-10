import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateArticleComponent } from './moderate-article.component';

describe('ModerateArticleComponent', () => {
  let component: ModerateArticleComponent;
  let fixture: ComponentFixture<ModerateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerateArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
