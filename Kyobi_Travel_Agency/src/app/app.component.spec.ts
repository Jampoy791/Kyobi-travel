/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Kyobi_Travel_Agency' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Kyobi_Travel_Agency');
  });

  it('should open the auth modal when the navbar requests it', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const modal = jasmine.createSpyObj('ModalComponent', ['openModal']);
    app['modalComponent'] = modal as any;

    app.openAuthModal('login');

    expect(modal.openModal).toHaveBeenCalledWith('login');
  });
});

