import {AfterViewInit, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DeleteConfirmDialogData {
  title: string;
  confirmTitle:string;
  cancelTitle:string;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.less',
  standalone:true
})

export class DeleteConfirmDialogComponent implements AfterViewInit{

  constructor() {
  }
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);
  readonly data = inject<DeleteConfirmDialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngAfterViewInit(): void {
  }

}
