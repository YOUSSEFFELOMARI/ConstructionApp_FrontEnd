import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contatc-form',
  templateUrl: './contatc-form.component.html',
  styleUrls: ['./contatc-form.component.css']
})
export class ContatcFormComponent {
  formLogin !: FormGroup;
  ContactForm!: FormGroup ;
  ConstructionSitesNames: any;
  constructor(private fb:FormBuilder,
              private router: Router) {
    this.ContactForm=this.fb.group({
      name:'',
      lastName:'',
      phone:'',
      email:'',
      subject:''
    })
  }

  ngOnInit(){
  }


  onFormSubmit() {

  }
}
