import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MonthService} from "../../services/month.service";
import {DialogRef} from "@angular/cdk/dialog";
import {EmployeeService} from "../../services/Employee.service";
import {throwError} from "rxjs";
import {CoreService} from "../../services/core/core-service.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private employeeService:EmployeeService,
              private dialogref:DialogRef<DeleteComponent>,private coreService:CoreService) {
  }


  deleteEmployee() {
    let nameAndLastName:string=this.data.name+" "+this.data.lastName
    this.employeeService.deleteEMployee(this.data.employerId).subscribe({
      next: (value) => {
        this.coreService.openSnackBar(nameAndLastName+' Deleted','done');
        this.dialogref.close();
      },
      error: (err) => throwError(err)
    })
  }
}
