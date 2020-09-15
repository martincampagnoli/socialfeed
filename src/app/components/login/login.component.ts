import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  login(user: string, pass: string){
    this.authService.login(user, pass).subscribe(
      r => {
        this.authService.storeUserInfo(r.user.uid);
        this.router.navigate(['']);
      },
      e => this.error = e.message
    );
  }

}
