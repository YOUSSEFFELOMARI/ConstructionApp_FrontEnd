import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {catchError, throwError} from "rxjs";
import {DialogRef} from "@angular/cdk/dialog";
import {MonthService} from "../../services/month.service";

@Component({
  selector: 'app-update-month',
  templateUrl: './update-month.component.html',
  styleUrls: ['./update-month.component.css']
})
export class UpdateMonthComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private monthService:MonthService,
              private dialogref:DialogRef<UpdateMonthComponent>) {
  }

  ngOnInit() {
      // console.log(this.data)
  }

    changeMonthPayed() {
    if(this.data.months.length === 0){
      this.dialogref.close();
    }else{
      this.data.months[0].payed=!this.data.months[0].payed;
      this.monthService.updateMonth(this.data.months[0]).subscribe({
        next:(value)=>{
          this.dialogref.close();
      },
        error:(err)=>{
          //TODO message
          console.log(err)
        }
      });
    }
      // console.log(this.data)
    // this.data.month[0]=!this.data.month[0];

    //
  }
}
