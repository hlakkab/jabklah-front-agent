import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../_services/Agent.service';
import { Client } from 'src/app/interfaces/Client';
import { TokenStorageService } from '../_services/token-storage.service';
import {Agent} from './../interfaces/Agent';
const AgentHasntChangedPassword = false;

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {
  agent: Agent ={
    id_agent: 0 ,
    adresse:'',
    date_naissance:new Date(),
    email:'',
    first_auth: false,
    nom:'',
    num_matriculation:'',
    num_pattente:'',
    num_piece_identite:'',
    num_tel:'',
    password:'',
    piece_identite:'',
    prenom:'',
    role:'',
    username:'',
  };
  username=window.sessionStorage.getItem("username");
  AgentHasFirstAuthentication :Boolean;
  clients:Client[];
  errorMessage: any;
  numberOfLines: number;
  constructor(private AgentService:AgentService,private router: Router, private tokenStorage:TokenStorageService) { }


 
  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['login']);
    }else{
      this.AgentService.getAgentHasFirstAuth(this.username).subscribe({
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
      this.AgentService.findAllClient().subscribe({
        next: data => {
          this.clients=data;
          console.log(data);
          this.numberOfLines = this.clients.length;
        },
        error: err => {
          this.errorMessage = err.error.message;
         
        }
       
      });
      this.AgentService.getAgent(this.username).subscribe({
        next: data => {
          console.log(data);
          this.agent=data;
                 
        },
        error: err => {
          console.log("erreur avec api while getting client");
        }
      });
    }
     
    console.log(this.clients);
  }
}
