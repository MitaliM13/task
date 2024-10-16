import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<any[]>([]); 

  constructor(private http: HttpClient) {
    this.loadUsers(); 
  }

  private loadUsers(): void {
    this.http.get<any[]>(this.url).subscribe((data) => {
      this.usersSubject.next(data); 
    });
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable(); 
  }

  addUser(newUser: any): void {
    const currentUsers = this.usersSubject.value; 
    this.usersSubject.next([...currentUsers, newUser]); 
  }
}
