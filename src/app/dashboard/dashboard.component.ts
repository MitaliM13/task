import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../Services/users-data.service';
import { AbstractControl, ValidationErrors, ValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = []; 
  displayedUser: any[] = [];
  userForm: FormGroup;
  showError!: boolean; 

  constructor(private userData: UsersDataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: ['', [Validators.required]],
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
    this.showError =  this.userData.idExists

    this.userData.getUsers().subscribe((data) => {
      this.users = data; 
      this.displayedUser = [...this.users];
      console.log(this.users);
    }, (err) => {
      console.log(err);
    });
  }
  
  idValid2 : boolean = false;
  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userData.addUser(newUser);
  
      if (this.userData.idExists) {
        this.idValid2 = true; 
        return; 
      } else {
        this.idValid2 = false; 
      }
      
      console.log("User added successfully:", newUser);
      this.userForm.reset();
    }
  }

  deleteUser(userId: number): void {
    console.log("before deletion:", this.displayedUser);
    this.displayedUser = this.displayedUser.filter(user => user.id !== userId)
    console.log('After Deletion:',this.displayedUser);
    console.log('Original Users:',this.users);
    this.userData.deleteUser(userId)
  }
}
