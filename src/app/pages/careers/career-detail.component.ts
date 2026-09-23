import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { CAREER_OPENINGS } from './careers-data';

const CV_TYPES = ['.pdf', '.doc', '.docx'];

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, UncodeAnimDirective],
  templateUrl: './career-detail.component.html',
  styleUrls: ['./careers.component.scss', './career-detail.component.scss']
})
export class CareerDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly fb = inject(FormBuilder);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: ''
  });

  private readonly index = computed(() => CAREER_OPENINGS.findIndex((o) => o.slug === this.slug()));
  readonly opening = computed(() => CAREER_OPENINGS[this.index()]);
  readonly prev = computed(() => CAREER_OPENINGS[this.index() - 1]);
  readonly next = computed(() => CAREER_OPENINGS[this.index() + 1]);

  readonly cvTypes = CV_TYPES.join(', ');
  readonly cvAccept = CV_TYPES.join(',');
  readonly cvFile = signal<File | null>(null);
  readonly cvError = signal('');
  readonly submitted = signal(false);
  readonly sent = signal(false);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    bio: [''],
    consent: [false, Validators.requiredTrue]
  });

  constructor() {
    effect(() => {
      const opening = this.opening();
      if (!opening) {
        if (this.slug()) this.router.navigate(['/careers']);
        return;
      }
      this.title.setTitle(`${opening.title} - Wateen Digital Solutions`);
      // Fresh form when moving between openings with PREV/NEXT.
      this.form.reset();
      this.cvFile.set(null);
      this.cvError.set('');
      this.submitted.set(false);
      this.sent.set(false);
    });
  }

  onCvChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.cvFile.set(file);
    this.cvError.set(file && !CV_TYPES.some((ext) => file.name.toLowerCase().endsWith(ext))
      ? `Please upload a ${this.cvTypes} file.`
      : '');
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  cvMissing(): boolean {
    return this.submitted() && !this.cvFile();
  }

  submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.cvFile() || this.cvError()) return;
    this.sent.set(true);
  }
}
