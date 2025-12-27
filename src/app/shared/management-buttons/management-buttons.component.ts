import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {saveAs as importedSaveAs} from "file-saver";
import {CommonModule} from "@angular/common";
import {Api} from '../../api';
import {BaseEntity} from '../../models/base-entity.model';
import {App} from '../../app';

@Component({
  selector: 'app-management-buttons',
  imports: [CommonModule],
  templateUrl: './management-buttons.component.html',
  styleUrl: './management-buttons.component.less'
})
export class ManagementButtonsComponent {
  @Output() OnSubmit = new EventEmitter();
  @Output() OnClear = new EventEmitter();
  @Input() SubmitTitle: string = "ثبت";
  @Input() ClearTitle: string = "انصراف";
  @Input() ObjectToDelete: BaseEntity;
  @Input() ObjectToSave: BaseEntity;
  @Input() SaveService: (data: BaseEntity) => Observable<any>;
  @Input() DeleteService: (data: BaseEntity) => Observable<any>;

  @Input() SaveCallback: (res: any) => void;
  @Input() DeleteCallback: (res: any) => void;

  Submit() {
    this.OnSubmit.emit();
  }

  Clear() {
    this.OnClear.emit();
  }
}
