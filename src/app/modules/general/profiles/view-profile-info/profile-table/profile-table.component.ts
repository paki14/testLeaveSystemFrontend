import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from './profile.model';
import { ProfileInfoService } from './profile-info.service';
import { RefereesService } from '../view-referees/referees.service';
import { TokenStorageService } from 'src/app/services/login/token-storage.service';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css']
})

export class ProfileTableComponent implements OnInit {
  
  userpassId
  employees: Profile[] ;
  user= new Profile();
  users:Profile[];
  // empl:Profile[];
  info: any;
  seachTerm:string;
  constructor(private router:Router,
    private generalInfoService:ProfileInfoService,
    private refereeService:RefereesService,
    private route:ActivatedRoute,
    private token: TokenStorageService) { }

  ngOnInit() {
    
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getAllUser();
    this.getUserListByName();
    // if(this.info.authorities==='EMPLOYEE'){
    //   this.getUserListByName(this.info.username);
    // }
    // else{
    //   this.getAllUser();
    // }
  }

  
  onClick(empId:number){
    this.userpassId = this.generalInfoService.useSelectedUserId(empId);
    this.router.navigate([empId],{relativeTo:this.route});
    
   }
  //  getUserListById(){
  //   return this.generalInfoService.getUserListById(this.user).subscribe(data=>{
  //     this.user=data;
  //   })
  //  }

   getUserListByName(){
    return this.generalInfoService.getUserListByname(this.info.username).subscribe(data=>{
      // this.users=Object.assign({},data)
      this.users=data;
      // this.empl=data;
      console.log(this.users)
      // console.log(this.empl)
    })
   }
   
   getAllUser(){
     
     this.generalInfoService.getGenerelInfo().subscribe(data=>{
       console.log(data);
      this.employees=data;
    })
  }
  
  getUserById(id){
    this.generalInfoService.getUserById(id).subscribe(data=>{
      
    })
  }
  GenralInfo(id){
    this.router.navigate(['emp']);
  }

}

