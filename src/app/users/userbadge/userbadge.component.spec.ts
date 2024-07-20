import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbadgeComponent } from './userbadge.component';

describe('UserbadgeComponent', () => {
  let component: UserbadgeComponent;
  let fixture: ComponentFixture<UserbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
