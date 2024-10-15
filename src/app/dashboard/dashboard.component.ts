import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../Services/users-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any 
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
    this.userData.users().subscribe((data) => {
      this.users = data; 
      console.log(this.users);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value; 
      this.users.push(newUser); 
      this.userForm.reset(); 
    }
  }
}
