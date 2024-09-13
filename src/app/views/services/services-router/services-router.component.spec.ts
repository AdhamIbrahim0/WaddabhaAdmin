import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRouterComponent } from './services-router.component';

describe('ServicesRouterComponent', () => {
  let component: ServicesRouterComponent;
  let fixture: ComponentFixture<ServicesRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
