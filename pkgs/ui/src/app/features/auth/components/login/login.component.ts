import { ChangeDetectionStrategy, Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DialogModule,
    ProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  isLoading = false;
  errorMessage = '';

  form = this.fb.group({
    email: new FormControl(
      { value: '', disabled: false },
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required] }),
  });

  onDialogHide(): void {
    this.visibleChange.emit(false);
    this.resetForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.form.disable();

      const formValue = this.form.value as LoginForm;
      this.authService
        .login(formValue)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.form.enable();
          })
        )
        .subscribe({
          next: () => {
            console.log(`Login successful! ${formValue.email}`);
            this.visibleChange.emit(false);
            this.resetForm();
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          },
        });
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.form.enable();
    this.errorMessage = '';
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }
}
