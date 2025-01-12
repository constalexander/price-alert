import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sandbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
  // This component will be a container for various sandbox components
}
