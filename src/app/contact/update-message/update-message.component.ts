import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MonthService} from "../../services/month.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {ContactService} from "../../services/contact-service";

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrls: ['./update-message.component.css']
})
export class UpdateMessageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private contactService:ContactService,
              private dialogref:DialogRef<UpdateMessageComponent>,private coreService:CoreService) {
  }


  changeMessageStatus() {
    this.data.status=!this.data.status;
    this.contactService.updateContact(this.data).subscribe({
      next:(value:any) =>{
        this.coreService.openSnackBar('Message is opned','done');
        this.dialogref.close();
      },
      error:(err:any)=>{
        this.coreService.openSnackBar("Erreur!!");
    }
    })

  }
}
