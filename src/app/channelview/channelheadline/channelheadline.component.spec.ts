import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelheadlineComponent } from './channelheadline.component';

describe('ChannelheadlineComponent', () => {
  let component: ChannelheadlineComponent;
  let fixture: ComponentFixture<ChannelheadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelheadlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelheadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
