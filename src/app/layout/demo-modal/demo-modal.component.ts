import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoModalService } from '../../shared/demo-modal.service';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './demo-modal.component.html',
  styleUrl: './demo-modal.component.scss'
})
export class DemoModalComponent {
  private readonly fb = inject(FormBuilder);
  readonly demoModal = inject(DemoModalService);
  /** Shows the thank-you state after a valid submit. */
  readonly sent = signal(false);

  readonly products = [
    'Ai Vision Analytics',
    'Enterprise Analytics Chatbot',
    'Object Recognition',
    'AI-Driven Biomechanics',
    'Automated Customer Care',
    'Smart Gesture Recognition',
    'Next-Gen Virtual Try-On',
    'AI-Driven Infrastructure Protection',
    'Health Management Solution',
    'Smart Building Management Solution',
    'Campus Management System',
    'Connect95',
    'Smart Energy Monitoring Platform',
    'AI-Driven Proposal and Project Cost Management',
    'FleetOps360',
    'AI-Based Chatbot for Data Analytics',
    'Wateen Watapp',
    'Other'
  ];

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    product: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      if (this.demoModal.open()) {
        this.sent.set(false);
        const product = this.demoModal.preselectedProduct();
        this.form.reset({
          fullName: '',
          email: '',
          phone: '',
          product: product || '',
          message: ''
        });
      }
    });
  }

  close(): void {
    this.demoModal.hide();
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.form.reset();
    this.sent.set(true);
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.demoModal.open()) this.close();
  }
}
