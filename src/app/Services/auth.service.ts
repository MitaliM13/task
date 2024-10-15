import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dummyUser = { username: 'admin', password: 'admin123' };
  private loggedIn = false; 

  constructor(private router: Router) { }

  login({ username, password }: { username: string; password: string }): Observable<any> {
    if (username === this.dummyUser.username && password === this.dummyUser.password) {
      this.loggedIn = true; 
      return of({ name: 'Mitali', email: 'mitali@gmail.com' });
    }
    return throwError(new Error('Failed to Login'));
  }

  isAuthenticated(): boolean {
    return this.loggedIn; 
  }

  logout(): void {
    this.loggedIn = false; 
    this.router.navigate(['home']); 
  }
}

