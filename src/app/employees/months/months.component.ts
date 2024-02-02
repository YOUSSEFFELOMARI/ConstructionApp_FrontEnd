import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MonthService} from "../../services/month.service";
import {CoreService} from "../../services/core/core-service.service";

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogref:DialogRef<MonthsComponent>,
              private monthService: MonthService, private  coreService : CoreService) {
  }

  ngOnInit(){

  }
  addLastMonth() {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const month = {
      date: formattedDate,
      employeeName: this.data.name,
      payed: false,
      employeeLastName: this.data.lastName,
    };
    this.monthService.saveMonth(month).subscribe({
      next: (value:any) => {
        this.dialogref.close();
        this.coreService.openSnackBar("Month added successfully");
      },
      error : (err :any) =>{
        this.coreService.openSnackBar(err);
      }
    });

  }
}
