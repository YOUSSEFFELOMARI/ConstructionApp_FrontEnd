import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";
import {Contact} from "../models/Contact.model";
import {ContactService} from "../services/contact-service";
import {CoreService} from "../services/core/core-service.service";

@Component({
  selector: 'app-contatc-form',
  templateUrl: './contatc-form.component.html',
  styleUrls: ['./contatc-form.component.css']
})
export class ContatcFormComponent {
  ContactForm!: FormGroup ;
  ConstructionSitesNames: any;
  constructor(private fb:FormBuilder,private contactService:ContactService,
              private router: Router,private coreService:CoreService) {
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

  mapFormToMessage():any{
    return {
      name: this.ContactForm.value.name+""+this.ContactForm.value.lastName,
      mobileNum: this.ContactForm.value.phone,
      email: this.ContactForm.value.email,
      subject: this.ContactForm.value.subject,
      status: false
    }
  }

  onFormSubmit() {
    const message : Contact = this.mapFormToMessage();

    this.contactService.saveContact(message).subscribe( {
      next:(value:any) =>{
        this.coreService.openSnackBar("Message Sent","done")
      },
      error:(err:any)=>{
        this.coreService.openSnackBar("Message Not Sent");
      }
    });
  }
}
