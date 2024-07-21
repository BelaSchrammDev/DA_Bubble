import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatmessageheadlineComponent } from './privatmessageheadline.component';

describe('PrivatmessageheadlineComponent', () => {
  let component: PrivatmessageheadlineComponent;
  let fixture: ComponentFixture<PrivatmessageheadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatmessageheadlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatmessageheadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
