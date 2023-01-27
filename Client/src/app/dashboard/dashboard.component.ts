import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
  }

  api(){
    this.userService.getUser()
    .subscribe(
    Response=>{
    console.log(Response)
  })
  }

  logout(){
    sessionStorage.removeItem('token');
    this.authService.startLogOut();
  }

}
