import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/Employee.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {CoreService} from "../../services/core/core-service.service";
import {CSiteNameService} from "../../services/csite-name.service";

@Component({
  selector: 'app-update-emplyee',
  templateUrl: './update-emplyee.component.html',
  styleUrls: ['./update-emplyee.component.css']
})
export class UpdateEmplyeeComponent implements OnInit{

  emplpyeeForm!:FormGroup;
  datePipe!: DatePipe;
  ConstructionSitesNames: string[]=[];
  constructor(private fb:FormBuilder, private employeeService:EmployeeService,
              private dialogref:DialogRef<UpdateEmplyeeComponent>,private coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data:any,private cSiteNameService:CSiteNameService){
    this.datePipe = new DatePipe('en-US');
    this.emplpyeeForm=this.fb.group({
      employerId:'',
      name: '',
      lastName:'',
      homeAddress:'',
      salary:'',
      phone:'',
      months:'',
      constructionSiteDto : this.fb.group({
        constructionSiteId:'',
        name: '',
        startDate: '',
        endDate: '',
        address: ''
      })
    })
  }

  formatDate(date: MatDatepickerInputEvent<Date>): void {
    if (date.value) {
      const formattedDate = this.datePipe.transform(date.value, 'yyyy-MM-dd');
      // this.emplpyeeForm.get('startDate')?.setValue(formattedDate);
      this.emplpyeeForm.get('constructionSiteDto.endDate')?.setValue(formattedDate);
    }
  }

  ngOnInit(){
    this.emplpyeeForm.patchValue(this.data);
    this.getCSiteNames();
  }

  mapFormToEmployee(): { employerId:any; lastName: any; months: void | undefined; phone: any; name: any;
    constructionSiteDto: { constructionSiteId:any;address: any; endDate: any; name: any; startDate: any };
    salary: any; homeAddress: any } {

    return {
      employerId: this.emplpyeeForm.get('employerId')?.value,
      name: this.emplpyeeForm.get('name')?.value,
      lastName: this.emplpyeeForm.get('lastName')?.value,
      homeAddress: this.emplpyeeForm.get('homeAddress')?.value,
      salary: this.emplpyeeForm.get('salary')?.value,
      phone: this.emplpyeeForm.get('phone')?.value,
      months: this.emplpyeeForm.get('months')?.setValue(null),
      constructionSiteDto:{
        constructionSiteId:this.emplpyeeForm.get('constructionSiteDto.constructionSiteId')?.value,
        name: this.emplpyeeForm.get('constructionSiteDto.name')?.value,
        startDate: this.datePipe.transform(this.emplpyeeForm.get('constructionSiteDto.startDate')?.value, 'yyyy-MM-dd') || '',
        endDate: this.datePipe.transform(this.emplpyeeForm.get('constructionSiteDto.endDate')?.value, 'yyyy-MM-dd') || '',
        address: this.emplpyeeForm.get('constructionSiteDto.address')?.value,
      }
    };
  }

  onFormSubmit() {
    if(this.emplpyeeForm.valid) {
      if(this.data){
        let employeeModelFinal;
        const employeeModel: { employerId: any; lastName: any; months: void | undefined; phone: any; name: any; constructionSiteDto: {
            constructionSiteId: any;
            address: any; endDate: any; name: any; startDate: any }; salary: any; homeAddress: any } = this.mapFormToEmployee();

        if (
          (employeeModel.constructionSiteDto.name == '' || undefined)&&
          (employeeModel.constructionSiteDto.address === '' || undefined)&&
          (employeeModel.constructionSiteDto.startDate === '' || undefined)&&
          (employeeModel.constructionSiteDto.endDate === ''|| undefined)
        ) {
          employeeModelFinal = {
            employerId: employeeModel.employerId,
            name: employeeModel.name,
            lastName: employeeModel.lastName,
            homeAddress: employeeModel.homeAddress,
            salary: employeeModel.salary,
            phone: employeeModel.phone,
            months: employeeModel.months,
            constructionSiteDto: {
              constructionSiteId : employeeModel.constructionSiteDto.constructionSiteId,
                name :employeeModel.constructionSiteDto.name,
                address : employeeModel.constructionSiteDto.address,
                startDate : employeeModel.constructionSiteDto.startDate,
                endDate : employeeModel.constructionSiteDto.endDate,
            },
          };
        } else {
          employeeModelFinal = employeeModel;
        }
      // console.log(employeeModelFinal);
        this.employeeService.updateEmployee(employeeModelFinal).subscribe({
          next: (value:any) => {
            this.coreService.openSnackBar('Employee Updated','done');
            this.dialogref.close();
          },
          error: (err:any) =>{
            this.coreService.openSnackBar(err);
          }
        });
      }
    }
  }
  getCSiteNames(){
    this.cSiteNameService.getAllCSiteNameList().subscribe({
      next:(value)=>{
        this.ConstructionSitesNames=value.map(item=> item.name);
      }
    });
  }
}
