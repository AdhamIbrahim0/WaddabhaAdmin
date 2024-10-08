import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesRouterComponent } from './categories-router.component';

describe('CategoriesRouterComponent', () => {
  let component: CategoriesRouterComponent;
  let fixture: ComponentFixture<CategoriesRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
