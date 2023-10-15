import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/Employee.service";
import {DialogRef} from "@angular/cdk/dialog";
import {DatePipe} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {CoreService} from "../../services/core/core-service.service";
import {CSiteNameService} from "../../services/csite-name.service";

@Component({
    selector: 'app-save-emplyee-modal',
    templateUrl: './save-emplyee-modal.component.html',
    styleUrls: ['./save-emplyee-modal.component.css'],

})
export class SaveEmplyeeModalComponent {

    ConstructionSitesNames: string[] = [];
    emplpyeeForm!: FormGroup;
    datePipe!: DatePipe;

    constructor(private fb: FormBuilder, private employeeService: EmployeeService,
                private dialogref: DialogRef<SaveEmplyeeModalComponent>, private coreService: CoreService,
                private cSiteNameService:CSiteNameService) {
        this.datePipe = new DatePipe('en-US');
        this.emplpyeeForm = this.fb.group({
            name: '',
            lastName: '',
            homeAddress: '',
            salary: '',
            phone: '',
            months: null,
            constructionSiteDto: this.fb.group({
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
            this.emplpyeeForm.get('startDate')?.setValue(formattedDate);
            this.emplpyeeForm.get('endDate')?.setValue(formattedDate);
        }
    }

    ngOnInit(){
        this.getCSiteNames();
    }
    mapFormToEmployee(): {
        lastName: any; months: void | undefined; phone: any; name: any;
        constructionSiteDto: { address: any; endDate: any; name: any; startDate: any };
        salary: any; homeAddress: any
    } {

        return {
            name: this.emplpyeeForm.get('name')?.value,
            lastName: this.emplpyeeForm.get('lastName')?.value,
            homeAddress: this.emplpyeeForm.get('homeAddress')?.value,
            salary: this.emplpyeeForm.get('salary')?.value,
            phone: this.emplpyeeForm.get('phone')?.value,
            months: this.emplpyeeForm.get('months')?.setValue(null),
            constructionSiteDto: {
                name: this.emplpyeeForm.get('constructionSiteDto.name')?.value,
                startDate: this.datePipe.transform(this.emplpyeeForm.get('constructionSiteDto.startDate')?.value, 'yyyy-MM-dd') || '',
                endDate: this.datePipe.transform(this.emplpyeeForm.get('constructionSiteDto.endDate')?.value, 'yyyy-MM-dd') || '',
                address: this.emplpyeeForm.get('constructionSiteDto.address')?.value,
            }
        };
    }

    onFormSubmit() {
        if (this.emplpyeeForm.valid) {
            let employeeModelFinal;
            const employeeModel: {
                lastName: any; months: void | undefined;
                phone: any; name: any;
                constructionSiteDto: {
                    address: any; endDate: any;
                    name: any; startDate: any
                };
                salary: any; homeAddress: any
            } = this.mapFormToEmployee();
            if (
                employeeModel.constructionSiteDto.name === '' &&
                employeeModel.constructionSiteDto.address === '' &&
                employeeModel.constructionSiteDto.startDate === '' &&
                employeeModel.constructionSiteDto.endDate === ''
            ) {
                employeeModelFinal = {
                    name: employeeModel.name,
                    lastName: employeeModel.lastName,
                    homeAddress: employeeModel.homeAddress,
                    salary: employeeModel.salary,
                    phone: employeeModel.phone,
                    months: employeeModel.months,
                    constructionSiteDto:
                        employeeModel.constructionSiteDto.name === '' &&
                        employeeModel.constructionSiteDto.address === '' &&
                        employeeModel.constructionSiteDto.startDate === '' &&
                        employeeModel.constructionSiteDto.endDate === ''
                            ? undefined
                            : employeeModel.constructionSiteDto,
                };
            } else {
                employeeModelFinal = employeeModel;
            }
            // save
            this.employeeService.saveEmployee(employeeModelFinal).subscribe({
                next: (value: any) => {
                    this.coreService.openSnackBar('employeeSaved', 'done');
                    this.dialogref.close();
                },
                error: (err: any) => {
                    this.coreService.openSnackBar(err);
                }
            });
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
