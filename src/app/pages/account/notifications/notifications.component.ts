import { Component, OnInit } from '@angular/core';

import { notification } from './notifications.model';
import { rentNotificationData, saleNotificationData } from './data';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAccount } from 'src/app/models/user-account';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

/**
 * Notifications Component
 */
export class NotificationsComponent implements OnInit {
  date!:string;
  user!:UserAccount;
  from= '';
  to ='';
  image='';
  message = '';
  messages =  Array();
  users =Array();
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  masterSelected!:boolean;

  constructor(private http: HttpClient,public datepipe: DatePipe,private accountservice: AuthenticationService) {

    this.accountservice.user.subscribe(x => this.user = x);
    console.log(this.user);
  this.from=`${this.user.user_id}`;

  }

  ngOnInit(): void {
    
     this.breadCrumbItems = [
      { label: 'Home', link:'#' },
      { label: 'Account', link:'#' },
      { label: 'Notifications', active: true }
    ];

    Pusher.logToConsole = true;

    const pusher = new Pusher('f54a00cb04dcb4fa1d35', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });

    this.allusers();
  }


   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }




  submit(): void {


    let currentDateTime =this.datepipe.transform((new Date), 'MMM d,yy, h:mm a');
  
    console.log(currentDateTime);

    
    this.http.post('http://localhost:8000/api/messages', {
   
      message: this.message,
      from:this.from,
      to:this.to,
      created_at:currentDateTime
    }).subscribe(() => this.message = '');
  }


old_chat (){
  this.http.get('http://localhost:8000/api/chat').subscribe(

      (data:any)=>{
        // alert('data');
        // console.log(data);
        if(data.code ==0){

    console.log(data.errore);
    
        }else{
          console.log(data.data);
          this.messages=data.data;
          console.log(this.messages);
        }
      },
      (error:any)=>{
      console.log(error);
      


      }


    )
}



allusers(){

  this.http.get(`http://localhost:8000/api/users/${this.from}`).subscribe(

      (data:any)=>{
        // alert('data');
        // console.log(data);
        if(data.code ==0){

    console.log(data.errore);
    
        }else{
          console.log(data.data);
          this.users=data.data;
          console.log(this.messages);
        }
      },
      (error:any)=>{
      console.log(error);
      


      }


    )


}
 
to_user(usr:string,im:string){
this.to=usr;
this.image=im;
this.old_chat();

}

changeUserName(e:any) {
  console.log(e);
  this.from = e.target.value;

  // this.old_chat();
  // this.allusers();



}




}
