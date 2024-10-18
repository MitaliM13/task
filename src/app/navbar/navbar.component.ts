import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../Services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private route: Router, private auth: AuthService){}

  navLinks = [
    {path: '/home', label: 'Home'},
    {path: '/dashboard', label: 'Dashboard'},
    {path: '/contact', label: 'Contact'},
    {path: '/about', label: 'About'},
    {path: '/logout', label: 'Logout'},
    {path: '/insight', label: 'Insight'}
  ]
  
  navigateTo(path:string){
    if (path === '/logout' || path==='') {
      this.auth.logout()
      this.route.navigate(['/home'])
    } else {
      this.route.navigate([path])
    }
  }
}
