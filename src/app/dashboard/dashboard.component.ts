import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersDataService } from '../Services/users-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = []; 
  displayedUser: any[] = [];
  userForm: FormGroup;
  showError: boolean = false; 
  deletedIds: Set<number> = new Set();

  constructor(private userData: UsersDataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.setupIdValidation();
  }

  private loadUsers(): void {
    this.userData.getUsers().subscribe(
      (data) => {
        this.users = data; 
        this.displayedUser = [...this.users];
      },
      (err) => {
        console.error('Error loading users:', err);
      }
    );
  }

  private setupIdValidation(): void {
    this.userForm.get('id')?.valueChanges.subscribe(value => {
      this.checkIfIdExists(value);
    });
  }

  private checkIfIdExists(id: string): void {
    const idNum = Number(id);
    this.showError = this.users.some(user => user.id === idNum) || this.deletedIds.has(idNum);
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.showError) {
      const newUser = this.userForm.value;

      this.userData.addUser(newUser).subscribe(
        success => {
          if (success) {
            console.log('User added successfully:', newUser);
            this.userForm.reset();
            this.loadUsers(); 
          } else {
            console.log('User ID already exists. Please enter a unique ID.');
          }
        },
        (err: any) => {
          console.error('Error adding user:', err);
        }
      );
    } else if (this.showError) {
      console.log('User ID already exists or has been deleted. Please enter a unique ID.');
    }
  }

  deleteUser(userId: number): void {
    this.deletedIds.add(userId); 
    this.userData.deleteUser(userId);
    this.loadUsers(); 
  }
}
