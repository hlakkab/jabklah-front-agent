import { TokenStorageService } from './../_services/token-storage.service';
import { AgentService } from './../_services/Agent.service';
import { Component, OnInit } from '@angular/core';
import { Router , NavigationExtras } from '@angular/router';

const AgentHasntChangedPassword = false;
@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  clientAdded: boolean = false;
  
  username=window.sessionStorage.getItem("username");
  AgentHasFirstAuthentication :Boolean;
  errorMessage:String;
  client={
    emailconf:'',
    userName:"",
    firstName:"",
    lastName:'',
    email:'',
    phoneNumber:'',

  }
  constructor(private agentService:AgentService,
    private tokenService :TokenStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
     
    if(this.tokenService.getToken()==null){
      this.router.navigate(['/home']); 
    }
    
    if(this.tokenService.getToken()!=null){
    this.agentService.getAgentHasFirstAuth(this.username).subscribe({
      next: data => {
        console.log(data);
        if(data==AgentHasntChangedPassword){
          this.router.navigate(['changePassword']); 
        }
      
      },
      error: err => {
        console.log("erreur while getting firstauth")
      }
    });
  }
}
 

  addClientFormSubmited(){

    if (this.client.email.trim() === '' || this.client.userName.trim() === ''|| this.client.firstName.trim() === '' || this.client.phoneNumber.trim() === '' || this.client.lastName.trim() === '' || this.client.email !== this.client.emailconf)  {
      alert("fill all the fields or emails are wrong " );; // Do not proceed with form submission if any of the fields are empty
    }
    else{
    this.agentService.saveClient(
      this.client.userName,
      this.client.firstName,
      this.client.lastName,
      this.client.email,
      this.client.phoneNumber
      ).subscribe(
        {
          next: data => {
          },
          error: err => {
            this.errorMessage = err.error.message;
            console.log(err.error.message);
          
          }
         
        }
      )

       const navigationExtras: NavigationExtras = {
         state: {
          phoneNumber: this.client.phoneNumber,
         },
       };
      // this.router.navigate(['clientHome/recharge/form'], navigationExtras);
      // console.log('clicked');

      this.router.navigate(['/compte'], navigationExtras);
      this.clientAdded = true;
  }
}

//   reloadPage(): void {


// }
  }
