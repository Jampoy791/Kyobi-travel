import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookingComponent } from './booking.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject blank and overlong destinations before confirming', () => {
    component.destination = '   ';
    component.confirmBooking();
    expect(component.confirmed).toBeFalse();
    expect(component.destinationError).toContain('where you want to go');

    component.destination = 'A'.repeat(200);
    component.confirmBooking();
    expect(component.confirmed).toBeFalse();
    expect(component.destinationError).toContain('80');
  });
});
