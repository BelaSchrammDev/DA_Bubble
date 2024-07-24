import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendermessageComponent } from './rendermessage.component';

describe('RendermessageComponent', () => {
  let component: RendermessageComponent;
  let fixture: ComponentFixture<RendermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendermessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
