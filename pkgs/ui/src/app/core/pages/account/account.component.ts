import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@/features/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-6">Account</h1>
      <div class="max-w-xl">
        <div class="bg-surface-700 rounded-lg p-6">
          <div class="flex flex-col gap-4">
            <div>
              <label class="text-sm text-surface-200">Email</label>
              <p class="text-lg">{{ email$ | async }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  private authService = inject(AuthService);
  email$ = this.authService.currentUser$.pipe(map((user) => user?.email));
}
