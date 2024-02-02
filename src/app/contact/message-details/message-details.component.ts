import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {ContactService} from "../../services/contact-service";

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogref: DialogRef<MessageDetailsComponent>,
              private contactService: ContactService, private coreService: CoreService) {
  }


}
