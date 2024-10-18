import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    this.http.get<any[]>(this.url).subscribe(data => {
      this.usersSubject.next(data); 
    });
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable(); 
  }

  addUser(newUser: any): Observable<boolean> {
    const currentUsers = this.usersSubject.value;

    const idExists = currentUsers.some(user => Number(user.id) === Number(newUser.id));

    if (!idExists) {
      
      this.usersSubject.next([...currentUsers, newUser]);
      console.log("User added:", newUser);
      return of(true); 
    } else {
      console.log("User ID already exists:", newUser.id);
      return of(false); 
    }
  }

  deleteUser(userId: number): void {
    const updatedUsers = this.usersSubject.value.filter(user => user.id !== userId);
    this.usersSubject.next(updatedUsers);
  }
}
