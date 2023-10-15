import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogref:DialogRef<MonthsComponent>) {
  }

  ngOnInit(){
  }

  protected readonly alert = alert;
}
