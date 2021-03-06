import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { Project } from '../../modal/project';
import { Registration } from '../../modal/Registration';
import { UserRegister } from '../../modal/user-register';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { TypeaheadOptions } from 'ngx-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportForm;
  projects: Project[];
  users: Registration[];
  users2 : Registration;
  user:UserRegister;
  selectedDate;
  projectName="";
  reportingLeads;
  userName="";
  date="";
  selectedUserId;
  selectedProjectId;
  //user: UserRegister;
  selectedProject;
  selectedUser;
  constructor(private router:Router,private reportsrv:VictorServiceService) {

    this.user = new UserRegister();
    this.users2 = new Registration();
    // this.reportForm = new FormGroup({
    //   'date':new FormControl('',Validators.compose([Validators.required])),
    //   'projectName': new FormControl('',Validators.compose([Validators.required])),
    //   'userName':new FormControl('',Validators.compose([Validators.required])),

    // });

    this.reportsrv.get_projects_of_company(localStorage.getItem('user_name')).subscribe((data: Project[])=>{
      this.projects = data;
      console.log(this.projects);
      
    });

    this.reportsrv.get_user_of_company(localStorage.getItem('user_name')).subscribe((data: Registration[])=>{
      this.users = data;
      //this.loading=false;
      console.log('Users',this.users);
     // console.log(this.users);
      
      //console.log('projects', this.projects);
    });
   }

  ngOnInit() {
  }

  selectProject(){
    for(let i =0;i<this.projects.length;i++){
      if(this.selectedProject==this.projects[i].name){
        this.selectedProjectId = this.projects[i].projectid;
        break;
      }
    }
 }

 selectUser(){
   for(let i=0;i<this.users.length;i++){
     if(this.selectedUser==this.users[i].username){
       this.selectedUserId = this.users[i].userid;
     }
   }
 }
 selectDate(){
   console.log('date',this.selectedDate);

 }

//  reportUser(reportForm){
//   this.userName=reportForm.userName;
//   this.projectName=reportForm.projectName;
//   this.date=reportForm.date;
//   if(this.userName.length===0||this.projectName.length===0||this.date.length===0){
//     console.log(this.projectName,this.userName,this.date);

//   }
//   this.reportsrv.getReport(this.selectedProjectId,this.selectedUserId).subscribe((data: any[])=>{
//     this.reportingLeads = data;
//      console.log('Users leads',this.reportingLeads);
   
//    });
//  }

 createExcel():void {
   console.log('submit',this.selectedProjectId,this.selectedUserId,this.selectedDate);
  this.reportsrv.getReport(this.selectedProjectId,this.selectedUserId).subscribe((data: any[])=>{
   //this.reportingLeads = data;
    console.log('Users leads',data);
    this.reportsrv.exportAsExcelFile(data, 'report');
  
  });
 
//  // console.log('Leads',this.selectedProjectId,this.selectedUserId);
 }//end of create excel
}