import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../Services/users-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = []; // Initialize as an empty array
  userForm: FormGroup;

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
    this.userData.getUsers().subscribe((data) => {
      this.users = data; // Subscribe to user updates
      console.log(this.users);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value; 
      this.userData.addUser(newUser); // Use the service method to add a new user
      this.userForm.reset(); // Reset the form
    }
  }
}
