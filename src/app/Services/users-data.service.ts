import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private url = 'https://jsonplaceholder.typicode.com/users';
  private users: any[] = []; 

  constructor(private http: HttpClient) {}


  user() {
    return this.http.get<any[]>(this.url);
  }

  addUser(newUser: any) {
    this.users.push(newUser);
    return of(newUser).pipe(delay(1000)); 
  }

  getLocalUsers() {
    return of(this.users);
  }
}
