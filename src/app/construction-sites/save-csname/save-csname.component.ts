import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CSiteNameService} from "../../services/csite-name.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-save-csname',
  templateUrl: './save-csname.component.html',
  styleUrls: ['./save-csname.component.css']
})
export class SaveCSNameComponent {
  constructionSiteNameForm!:FormGroup;
  constructor(private fb:FormBuilder, private cSNameService:CSiteNameService,
              private dialogref:DialogRef<SaveCSNameComponent>,private coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data:any){
    this.constructionSiteNameForm = this.fb.group({
      name: '',
    });
  }

  ngOnInit(){
    this.constructionSiteNameForm.patchValue(this.data);
  }

  mapFormToCSite(): { constructionSiteNameId:string,name: any } {
    return {
      constructionSiteNameId:"0",
      name: this.constructionSiteNameForm.get('name')?.value,
    };
  }

  onFormSubmit() {
    if(this.constructionSiteNameForm.valid) {
      let constructionSiteDtoFormFinal:{
        constructionSiteNameId:string,
        name:string}= this.mapFormToCSite();
      if(this.data){
        constructionSiteDtoFormFinal
      }
      this.cSNameService.saveCSiteName(constructionSiteDtoFormFinal).subscribe({
        next: () => {
          this.coreService.openSnackBar('CSite Saved','done');
          this.dialogref.close();
        },
        error: (err:any) =>{
          this.coreService.openSnackBar(err);
        }
      });
    }
  }
}
