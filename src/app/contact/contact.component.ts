import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable} from "rxjs";
import {Contact} from "../models/Contact.model";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ContactService} from "../services/contact-service";
import {UpdateMessageComponent} from "./update-message/update-message.component";
import {DeleteMessageComponent} from "./delete-message/delete-message.component";
import {MonthsComponent} from "../employees/months/months.component";
import {MessageDetailsComponent} from "./message-details/message-details.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  displayedColumns: string[] = [
    'contactId','name','mobileNum','email','subject', 'status', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  messages !: Observable<Array<Contact>>;
  errorMessage!: string;

  constructor(private contactService:ContactService
    ,private formBuilder:FormBuilder
    ,private router:Router
    ,private _dialog:MatDialog) {}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(){
    this.getContactList();
  }
  getContactList() {
    this.contactService.getAllContacts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          return data.name.toLocaleLowerCase().includes(filter) ||
            data.mobileNum.toLocaleLowerCase().includes(filter) ||
            data.subject.toLocaleLowerCase().includes(filter) ||
            data.email.toLocaleLowerCase().includes(filter);
        }
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'status';
        this.dataSource.sort.direction = 'asc';
        this.dataSource.sort.sortChange.emit({
          active: 'status',
          direction: 'asc',
        });
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  openDetailMessage(data:any) {
    const dialogRef=this._dialog.open(MessageDetailsComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
        this.getContactList();
      }
    })
  }

  deleteMessage(data:any) {
    const dialogRef=this._dialog.open(DeleteMessageComponent,{data});
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
        this.getContactList();
      }
    })
  }

  updateMessage(data:any) {
    const dialogRef=this._dialog.open(UpdateMessageComponent,{data});
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
        this.getContactList();
      }
    })
  }
}
