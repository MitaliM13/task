import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject for user data

  constructor(private http: HttpClient) {
    this.loadUsers(); // Load initial users
  }

  private loadUsers(): void {
    this.http.get<any[]>(this.url).subscribe((data) => {
      this.usersSubject.next(data); // Emit initial user data
    });
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable(); // Expose the users as an observable
  }

  addUser(newUser: any): void {
    const currentUsers = this.usersSubject.value; // Get current users
    this.usersSubject.next([...currentUsers, newUser]); // Push the new user and emit the new array
  }
}
