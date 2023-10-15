import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConstructionSiteService} from "../services/construction-site.service";
import {DeleteComponentCS} from "./delete/delete.component";
import {UpdateCsiteComponent} from "./update-csite/update-csite.component";
import {CSiteNameService} from "../services/csite-name.service";
import {DeleteCSNameComponent} from "./delete-csname/delete-csname.component";
import {UpdateCSNameComponent} from "./update-csname/update-csname.component";
import {SaveCSNameComponent} from "./save-csname/save-csname.component";

@Component({
  selector: 'app-construction-sites',
  templateUrl: './construction-sites.component.html',
  styleUrls: ['./construction-sites.component.css']
})
export class ConstructionSitesComponent {
    displayedColumns: string[] = [
        'constructionSiteId','name', 'address', 'startDate','endDate','action'
    ];
    displayedNameColumns: string[] = [
        'constructionSiteNameId','name','action'
    ];


    dataSource!: MatTableDataSource<any>;
    dataSourceNames!: MatTableDataSource<any>;

    @ViewChild('paginatorBottom') paginator!: MatPaginator;
    @ViewChild('paginatorTop') paginator1!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatSort) sort1!: MatSort;

    errorMessage!: string;


    constructor(private constructionSiteService:ConstructionSiteService
        ,private cSiteNameService:CSiteNameService
        ,private formBuilder:FormBuilder
        ,private router:Router
        ,private _dialog:MatDialog) {}

  ngOnInit(){
        this.getCsiteList();
        this.getCsiteNameList();
  }

  getCsiteNameList() {
    this.cSiteNameService.getAllCSiteNameList().pipe().subscribe({
      next: (res) => {
        this.dataSourceNames = new MatTableDataSource<any>(res);
        this.dataSourceNames.sort = this.sort;
        this.dataSourceNames.paginator = this.paginator1;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  getCsiteList() {
        this.constructionSiteService.getAllCSiteList().pipe().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource<any>(res);
                this.dataSource.sort = this.sort1;
                this.dataSource.paginator = this.paginator;
            },
            error: (err) => {
                this.errorMessage = err.message;
            },
        });
  }


  applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator){
            this.dataSource.paginator.firstPage();
        }
    }
  applyFilterNames(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNames.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceNames.paginator) {
      this.dataSourceNames.paginator.firstPage();
    }
  }
    openEditCsiteModel(data:any) {
        const dialogRef=this._dialog.open(UpdateCsiteComponent,{
            data,
        });
        dialogRef.afterClosed().subscribe({
            next:(value)=>{
                this.getCsiteList();
            }
        })
    }
  deleteCSite(data:any){
        const dialogRef=this._dialog.open(DeleteComponentCS,{
            data,
        })
        dialogRef.afterClosed().subscribe({
            next:(value)=>{
                this.getCsiteList();
            }
        })
    }
    openSaveCSiteModal() {
        const dialogRef=this._dialog.open(SaveCSNameComponent);
        dialogRef.afterClosed().subscribe({
            next:(value)=>{
                this.getCsiteNameList();
            }
        })
    }
  deleteCSiteName(data:any) {
    const dialogRef=this._dialog.open(DeleteCSNameComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
        this.getCsiteNameList();
      }
    })
  }
  openEditCSNameModel(data:any) {
    const dialogRef=this._dialog.open(UpdateCSNameComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.getCsiteNameList();
      }
    })
  }

}
