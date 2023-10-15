import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CSiteNameService} from "../../services/csite-name.service";

@Component({
  selector: 'app-update-csname',
  templateUrl: './update-csname.component.html',
  styleUrls: ['./update-csname.component.css']
})
export class UpdateCSNameComponent {

  constructionSiteNameForm!:FormGroup;
  constructor(private fb:FormBuilder, private cSNameService:CSiteNameService,
              private dialogref:DialogRef<UpdateCSNameComponent>,private coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data:any){
    this.constructionSiteNameForm = this.fb.group({
      constructionSiteNameId:'',
      name: '',
    });
  }

  ngOnInit(){
    this.constructionSiteNameForm.patchValue(this.data)
  }

  mapFormToCSite(): { constructionSiteNameId: any; name: any } {
    return {
      constructionSiteNameId:this.constructionSiteNameForm.get('constructionSiteNameId')?.value,
      name: this.constructionSiteNameForm.get('name')?.value,
    };
  }

  onFormSubmit() {
    if(this.constructionSiteNameForm.valid) {
      let constructionSiteDtoFormFinal;
      if(this.data){
        constructionSiteDtoFormFinal = this.mapFormToCSite();
      }
      this.cSNameService.updateCSiteName(constructionSiteDtoFormFinal).subscribe({
        next: () => {
          this.coreService.openSnackBar('CSite Updated','done');
          this.dialogref.close();
        },
        error: (err:any) =>{
          this.coreService.openSnackBar(err);
        }
      });
    }
  }
}
