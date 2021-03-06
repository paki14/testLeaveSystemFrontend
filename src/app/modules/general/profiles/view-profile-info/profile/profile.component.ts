import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile-table/profile.model';
import { TokenStorageService } from 'src/app/services/login/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
constructor(
  private token: TokenStorageService){}
 
info:any
  ngOnInit() {
    
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }
 

}
