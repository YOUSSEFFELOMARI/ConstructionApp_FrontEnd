import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EmployeeService} from "../../services/Employee.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {throwError} from "rxjs";
import {ConstructionSiteService} from "../../services/construction-site.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponentCS {

    constructor(@Inject(MAT_DIALOG_DATA) public data:any,private constructionSiteService:ConstructionSiteService,
                private dialogref:DialogRef<DeleteComponentCS>,private coreService:CoreService) {
    }


    deleteCSite() {
        let nameAndAdress:string=this.data.name+" "+this.data.address
        this.constructionSiteService.deleteCSite(this.data.constructionSiteId).subscribe({
            next: (value) => {
                this.coreService.openSnackBar(nameAndAdress+' Deleted','done');
                this.dialogref.close();
            },
            error:(err) =>{
                this.coreService.openSnackBar("You Dont Have the right");
              this.dialogref.close();

            }
        })
    }

}
