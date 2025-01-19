import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '@/env/environment';
import { User, AuthResponse, RegisterDto, LoginDto } from '@/core/models/auth.model';
import { isPlatformBrowser } from '@angular/common';

export enum UserRole {
  USER = 'USER',
  SUPER_USER = 'SUPER_USER',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly API_URL = `${environment.API_BASE_URL}/user`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private platformId = inject(PLATFORM_ID);
  private refreshTokenTimeout: any;

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStoredUser();
    }
  }

  private loadStoredUser() {
    const token = this.getStoredToken();
    if (token) {
      this.http.get<User>(`${this.API_URL}/me`).subscribe({
        next: (user) => {
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
        },
        error: () => this.logout(),
      });
    }
  }

  private startRefreshTokenTimer() {
    // Parse the JWT token to get expiration
    const token = this.getStoredToken();
    if (!token) return;

    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000; // Refresh 1 minute before expiry

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private refreshToken() {
    const userId = this.currentUserSubject.value?.id;
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!userId || !refreshToken) {
      return new Observable((subscriber) => {
        this.logout();
        subscriber.complete();
      });
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/refresh-token`, { userId, refreshToken }).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
        this.startRefreshTokenTimer();
      })
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, dto)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, {
        username: dto.email,
        password: dto.password,
      })
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.stopRefreshTokenTimer();
  }

  private handleAuthResponse(response: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    this.currentUserSubject.next(response.user);
    this.startRefreshTokenTimer();
  }

  getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role || '';
  }

  hasRole(role: UserRole): boolean {
    return this.getUserRole() === role;
  }

  handleTokenRefresh(): Observable<string> {
    const userId = this.currentUserSubject.value?.id;
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!userId || !refreshToken) {
      return new Observable((subscriber) => {
        this.logout();
        subscriber.error('No refresh token available');
      });
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/refresh-token`, { userId, refreshToken }).pipe(
      tap((response) => this.handleAuthResponse(response)),
      map((response) => response.accessToken)
    );
  }
}
