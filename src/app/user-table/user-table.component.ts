import { Component, Input } from '@angular/core';
import { UsersDataService } from '../Services/users-data.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: any[] = [];
  @Input() deleteUser: ((userId: number) => void) | undefined
  
} 
