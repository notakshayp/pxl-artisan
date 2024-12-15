import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixeltabelComponent } from './pixeltabel.component';

describe('PixeltabelComponent', () => {
  let component: PixeltabelComponent;
  let fixture: ComponentFixture<PixeltabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixeltabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PixeltabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
