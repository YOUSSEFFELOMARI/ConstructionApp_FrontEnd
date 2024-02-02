import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EmployeeService} from "../../services/Employee.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {throwError} from "rxjs";
import {ContactService} from "../../services/contact-service";

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.css']
})
export class DeleteMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private contactService:ContactService,
              private dialogref:DialogRef<DeleteMessageComponent>,private coreService:CoreService) {
  }


  deleteMessage() {
    let nameAndLastName:string=this.data.name
    this.contactService.deleteContact(this.data.contactId).subscribe({
      next: (value) => {
        this.coreService.openSnackBar('Message Deleted','done');
        this.dialogref.close();
      },
      error: (err) => {
        this.coreService.openSnackBar('Error','Undo');
      }
    })
  }
}
