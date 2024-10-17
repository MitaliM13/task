import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<any[]>([]); 
  idExists: boolean=false

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
  idValid: boolean = false;

  addUser(newUser: any): void {
    const currentUsers = this.usersSubject.value;
    console.log("current users ", currentUsers);
    
    console.log('id to be added ', newUser.id);
    
    this.idExists = currentUsers.some(user => Number(user.id) === Number(newUser.id));
    console.log("id Exists ", this.idExists);
    
  
    if (this.idExists) {
      console.log("User ID already exists:", newUser.id);
      return; 
    }
  
    this.usersSubject.next([...currentUsers, newUser]);
    console.log("User added:", newUser);
  }
  

  deleteUser(userId: number):void{
    const currentUsers = this.usersSubject.value
    const updatedUsers = currentUsers.filter(user => user.id !== userId)
    this.usersSubject.next(updatedUsers)
  }
}
