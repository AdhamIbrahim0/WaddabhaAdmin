import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRouterComponent } from './users-router.component';

describe('UsersRouterComponent', () => {
  let component: UsersRouterComponent;
  let fixture: ComponentFixture<UsersRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
