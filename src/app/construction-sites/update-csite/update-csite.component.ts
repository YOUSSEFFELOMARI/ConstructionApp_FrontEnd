import {Component, Inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreService} from "../../services/core/core-service.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {ConstructionSiteService} from "../../services/construction-site.service";
import {ConstructionSiteDto} from "../../models/ConstructionSite.model";

@Component({
  selector: 'app-update-csite',
  templateUrl: './update-csite.component.html',
  styleUrls: ['./update-csite.component.css']
})
export class UpdateCsiteComponent {

  constructionSiteDtoForm!:FormGroup;
  datePipe!: DatePipe;
  ConstructionSitesNames: string[]=[
    'constrcut 1',
    'constrcut 2',
    'constrcut 3',
    'constrcut 4',
    'constrcut 5'
  ];

  constructor(private fb:FormBuilder, private CSiteService:ConstructionSiteService,
              private dialogref:DialogRef<UpdateCsiteComponent>,private coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data:any){
    this.datePipe = new DatePipe('en-US');
      this.constructionSiteDtoForm = this.fb.group({
        constructionSiteId:'',
        name: '',
        startDate: '',
        endDate: '',
        address: ''
      });
  }

  formatDate(date: MatDatepickerInputEvent<Date>): void {
    if (date.value) {
      const formattedDate = this.datePipe.transform(date.value, 'yyyy-MM-dd');
      // this.constructionSiteDtoForm.get('startDate')?.setValue(formattedDate);
      this.constructionSiteDtoForm.get('endDate')?.setValue(formattedDate);
    }
  }
  ngOnInit(){
    this.constructionSiteDtoForm.patchValue(this.data)
  }

  mapFormToCSite(): ConstructionSiteDto {
    return {
        constructionSiteId:this.constructionSiteDtoForm.get('constructionSiteId')?.value,
        name: this.constructionSiteDtoForm.get('name')?.value,
        startDate: this.datePipe.transform(this.constructionSiteDtoForm.get('startDate')?.value, 'yyyy-MM-dd') || '',
        endDate: this.datePipe.transform(this.constructionSiteDtoForm.get('endDate')?.value, 'yyyy-MM-dd') || '',
        address: this.constructionSiteDtoForm.get('address')?.value,
      };
  }

  onFormSubmit() {
    if(this.constructionSiteDtoForm.valid) {
      let constructionSiteDtoFormFinal;
      if(this.data){
        constructionSiteDtoFormFinal = this.mapFormToCSite();
      }
        // console.log(employeeModelFinal);
        this.CSiteService.updateCSite(constructionSiteDtoFormFinal).subscribe({
          next: (value:any) => {
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
