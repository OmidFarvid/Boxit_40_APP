import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Gate} from '../models/gate.model';

@Component({
  selector: 'app-gate-selector-dialog',
  imports: [],
  templateUrl: './gate-selector-dialog.html',
  styleUrl: './gate-selector-dialog.less',
})
export class GateSelectorDialog {
  gate: Gate;
  clusters: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      gate: Gate;
      clusters: string[];
    },
    private dialogRef: MatDialogRef<GateSelectorDialog>
  ) {
    this.gate = data.gate;
    this.clusters = data.clusters;
  }

  selectCluster(cluster: string) {
    this.dialogRef.close(cluster);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
