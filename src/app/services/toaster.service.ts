import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private snackBar: MatSnackBar) {}

   
  showNotification(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000 
    });
  }
}
