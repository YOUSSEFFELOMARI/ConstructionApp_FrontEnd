import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message:string,action:string ='ok') {
    this._snackBar.open(message, action, {
      duration:5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarWithDiffPostion(message:string,action:string ='ok') {
    this._snackBar.open(message, action, {
      duration:5000,
      horizontalPosition: 'right',
      verticalPosition: this.verticalPosition,
    });
  }
}
