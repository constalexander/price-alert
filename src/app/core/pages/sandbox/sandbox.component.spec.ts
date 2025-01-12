import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxComponent } from './sandbox.component';

describe('SandboxComponent', () => {
  let component: SandboxComponent;
  let fixture: ComponentFixture<SandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sandbox');
  });

  it('should have a grid container for sandbox components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.grid');
    expect(grid).toBeTruthy();
    expect(grid?.classList.contains('grid-cols-1')).toBeTruthy();
    expect(grid?.classList.contains('md:grid-cols-2')).toBeTruthy();
    expect(grid?.classList.contains('lg:grid-cols-3')).toBeTruthy();
  });
});
