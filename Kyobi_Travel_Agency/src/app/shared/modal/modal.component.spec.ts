import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  // ===== MODAL =====
  function openModal(type: string) {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    const el = document.getElementById('modal-' + type);
    if (el) {
      el.classList.add('open');
    }
  }
 
  function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }
 
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', function(e) {
      if (e.target === m) closeModal();
    });
  });


