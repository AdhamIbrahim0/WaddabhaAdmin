import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsRouterComponent } from './contracts-router.component';

describe('ContractsRouterComponent', () => {
  let component: ContractsRouterComponent;
  let fixture: ComponentFixture<ContractsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
