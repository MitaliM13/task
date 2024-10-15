import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private route: Router){}

  navLinks = [
    {path: '/home', label: 'Home'},
    {path: '/dashboard', label: 'Dashboard'},
    {path: '/contact', label: 'Contact'},
    {path: '/about', label: 'About'},
    {path: '/logout', label: 'Logout'},
  ]
  
  navigateTo(path:string){
    this.route.navigate([path])
  }
}
