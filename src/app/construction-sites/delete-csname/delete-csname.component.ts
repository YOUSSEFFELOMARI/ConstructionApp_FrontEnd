import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConstructionSiteService} from "../../services/construction-site.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {CSiteNameService} from "../../services/csite-name.service";

@Component({
  selector: 'app-delete-csname',
  templateUrl: './delete-csname.component.html',
  styleUrls: ['./delete-csname.component.css']
})
export class DeleteCSNameComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private cSiteService:CSiteNameService,
              private dialogref:DialogRef<DeleteCSNameComponent>,private coreService:CoreService) {
  }


  deleteCSite() {
    let name:string=this.data.name;
    this.cSiteService.deleteCSite(this.data.constructionSiteNameId).subscribe({
      next: (value) => {
        this.coreService.openSnackBar(name+' Deleted','done');
        this.dialogref.close();
      },
      error:(err) =>{
        this.coreService.openSnackBar("You Dont Have the right");
        this.dialogref.close();

      }
    })
  }
}
