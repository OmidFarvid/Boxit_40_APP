import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Gate} from '../models/gate.model';
import {Region} from '../models/cluster.model';

@Component({
  selector: 'app-gate-selector-dialog',
  imports: [],
  templateUrl: './gate-selector-dialog.html',
  styleUrl: './gate-selector-dialog.less',
})
export class GateSelectorDialog {
  gate: Gate;
  regions: Region[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      gate: Gate;
      regions: Region[];
    },
    private dialogRef: MatDialogRef<GateSelectorDialog>
  ) {
    this.gate = data.gate;
    this.regions = data.regions;
  }

  selectCluster(region: Region) {
    this.dialogRef.close(region);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
