import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CustomResponseType} from './models/custom-response-type.model';
import {Observable} from 'rxjs';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {CookieService} from "ngx-cookie-service";
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit {
  protected readonly title = signal('Boxit_40_APP');
  protected menuVis: boolean = false;
  private progressActivated: boolean = false;
  private isLoggedIn: false;

  protected ToggleMenu() {
    this.menuVis = !this.menuVis;
  }

  constructor(private router: Router
    , private snackBar: MatSnackBar
    , private cookieService: CookieService
    , public deleteConfirmDialog: MatDialog
  ) {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 4;

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      // اگر توکن وجود نداشت، به Login برود
      this.router.navigate(['/login']);
    }
  }

  public async CallService(service: Observable<any>, successCallback: Function, errorCallback?: Function, lockScreen: boolean = true, completeFunction?: Function) {
    if (lockScreen) {
      this.FuncActiveProgress(true)
    }
    service.subscribe({
      next: (data: CustomResponseType<any>) => {
        if (data.needLogin) {
          this.SetLogoutMessage(data.message);
          this.logout();
        } else if (!data.isSuccess) {
          if (data.message != undefined && data.message.length > 0) {
            this.Snack_Red(data.message);
          }
        } else {
          //if (data.Token)
          //this.saveToken(data.Token, data.TokenExpireDateTime);
          localStorage.setItem('token', data.token);
          successCallback(data);
        }
      }, error: (data: any) => {
        //this.Snack('خطا در ورود کاربر لطفاً اطلاعات را بررسی نمایید');
        //this.router.navigate(['/login']);
        this.FuncActiveProgress(false);
        //this.apiService.SaveErrorLog(this.readToken() ,data).subscribe(data=>{

        //});
        this.Snack_Red("خطای سیستم");
        if (errorCallback != null) {

          errorCallback(data);
        }
      }, complete: () => {
        this.FuncActiveProgress(false);
        if (completeFunction != null) {
          completeFunction();
        }
      }
    })
  }

  FuncActiveProgress = (mode: boolean) => {
    return this.progressActivated = mode
  }


  SetLogoutMessage(message: string) {
    this.cookieService.set('LogoutMessage', JSON.stringify(message));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.cookieService.deleteAll();
    this.menuVis = false;
    this.router.navigate(['/login']);
  }

  Snack = (message: string) => {
    this.snackBar.open(message, 'بستن', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      direction: 'rtl',
    });
  };

  Snack_Green = (message: string) => {
    this.snackBar.open(message, 'بستن', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      direction: 'rtl',
      panelClass: ['GreenSnackBar']
    });
  };

  Snack_Red = (message: string) => {
    this.snackBar.open(message, 'بستن', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 100000,
      direction: 'rtl',
      panelClass: ['RedSnackBar']
    });
  };

  protected Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']); // بعد از Login، صفحه اصلی
  }

  openConfirmDialog(title: string, callback: Function, confirmTitle: string = "تأیید", cancelTitle: string = "انصراف") {
    const dialogRef = this.deleteConfirmDialog.open(DeleteConfirmDialogComponent, {
      width: '800px',
      height: '200px',
      data: {"title": title, 'confirmTitle': confirmTitle, 'cancelTitle': cancelTitle}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          callback();
        }
      }
    );
  }

  readToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
