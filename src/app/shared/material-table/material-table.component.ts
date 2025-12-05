import {Component, EventEmitter, Inject, Input, Optional, Output} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';
import moment from "jalali-moment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {BrowserModule} from "@angular/platform-browser";
import {CustomButton} from "./CustomButton";
import {max} from "rxjs";
import {App} from '../../app';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, MatDialogModule, MatCardModule, BaseChartDirective],
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.less'],
})
export class MaterialTableComponent {

  @Input() data: any[] = [];
  @Input() dataFieldKeys: string[] = [];
  @Input() dataSetLabels: string[] = [];
  @Input() pieChartDataFieldKeys: string[] = [];
  @Input() pieChartDataSetLabels: string[] = [];
  @Input() pieChartDataSetColors: string[] = [];
  @Input() type: any;
  @Input() appComponent: App;
  @Input() deleteMessageFn: (item: any) => string = (item) => `آیا مایل به حذف ${item.Title} هستید؟`;
  @Input() enableNested: boolean = false;
  @Input() enableActions: boolean = true;
  @Input() showDetailsInDialog: boolean = false;
  @Input() nestedType: any;  // برای جدول زیرمجموعه
  @Input() nestedDataKey: string = '';  // نام فیلدی که داده nested در هر ردیف قرار داره، مثلاً "Project"
  @Input() filterBoxCols = 3;
  @Input() showFilter = true;
  @Input() title = "";
  @Input() enableChart = false;
  @Input() enableEdit: boolean = true;
  @Input() enableDelete: boolean = true;
  @Input() backgroundColors: string[] = []; // optional manual colors
  @Input() CustomButtons: CustomButton[] = [];
  @Input() canDelete: (row: any) => boolean = () => true; // پیشفرض همیشه true
  @Input() pieChartOverallValue: number;
  @Input() postFixColumnsChars: any[];
  @Input() footer_class: string;
  @Input() footer_text: any;


  @Output() OnEdit = new EventEmitter<any>();
  @Output() OnDelete = new EventEmitter<any>();


  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = 'asc';
  filteredData: any[] = [];
  expandedRowIndex: number | null = null;

  getPieChartData(row: any): ChartData<'pie', number[], string> {
    let data = [];
    if (this.enableChart && this.pieChartDataFieldKeys && this.pieChartDataFieldKeys.length == 1) {
      data = [Math.min(100,row[(this.pieChartDataFieldKeys)[0]]), Math.max(0,100-row[(this.pieChartDataFieldKeys)[0]])];
    } else {
      data = this.pieChartDataFieldKeys.map(key => row[key] || 0);
    }
    //const data = this.pieChartDataFieldKeys.map(key => row[key] || 0);
    return {
      labels: this.pieChartDataSetLabels,
      datasets: [
        {
          data,
          backgroundColor: this.pieChartDataSetColors, // Customize as needed
          borderWidth: 0
        }
      ]
    };
  }

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
      tooltip: {enabled: true},
    }
  };

  public pieChartType: 'pie' = 'pie'; // ✅ use literal type here


  constructor(private dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData) {
      this.data = dialogData.data;
      this.type = dialogData.type;
      this.enableActions = false;
    }
  }

  ngOnInit() {
    this.updateFilteredData();
  }

  ngOnChanges() {
    this.updateFilteredData();
  }

  generateUniqueColors(count: number): string[] {
    const colors = new Set<string>();
    while (colors.size < count) {
      const color = '#' + Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0');
      colors.add(color);
    }
    return Array.from(colors);
  }

  updateFilteredData() {
    let result = this.data;

    // Apply search filter
    if (this.searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) => {
          const strValue = String(value); // Convert value to string safely
          return strValue.toLowerCase().includes(this.searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (this.sortColumn && this.sortDirection) {
      result = result.sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          const strA = String(valueA).toLowerCase();
          const strB = String(valueB).toLowerCase();

          if (strA < strB) return this.sortDirection === 'asc' ? -1 : 1;
          if (strA > strB) return this.sortDirection === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }


    this.filteredData = result;
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      // چرخش بین asc → desc → ''
      this.sortDirection =
        this.sortDirection === 'asc' ? 'desc' :
          this.sortDirection === 'desc' ? '' : 'asc';
    } else {
      // ستون جدید، شروع با asc
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.updateFilteredData();
  }

  onSearchChange() {
    this.updateFilteredData();
  }

  // Track column headers for better performance



  get columnHeaders(): { key: string; label: string; type: string; index: number }[] {
    if (!this.data || this.data.length === 0 || !this.type) return [];

    const headers: Record<string, { label: string; type: string; index: number }> = {};
    let proto = this.type;

    while (proto) {
      if (proto._columnHeaders) {
        Object.assign(headers, proto._columnHeaders);
      }
      proto = Object.getPrototypeOf(proto);
    }

    const visibleColumns: { key: string; label: string; type: string; index: number }[] = [];

    Object.keys(this.data[0]).forEach((key) => {
      const allNull = this.data.every((row) => row[key] === null || row[key] === undefined);

      if (!allNull && headers[key] !== undefined) {
        visibleColumns.push({
          key,
          label: headers[key].label || key,
          type: headers[key].type,
          index: headers[key].index ?? 0
        });
      }
    });

    // ✅ Sort by index before returning
    return visibleColumns.sort((a, b) => a.index - b.index);
  }


  trackByKey(index: number, col: { key: string; label: string; type: string; }): string {
    return col.key;
  }

  trackByRow(index: number, row: any): any {
    return row.id || index;
  }

  isPureNumber(rowElement: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(rowElement);
  }

  IsNumber(rowElement: any) {
    return this.isPureNumber(rowElement);
  }

  Edit(value: any) {
    this.OnEdit.emit(value);
  }

  Delete(value: any) {
    const message = this.deleteMessageFn(value);
    this.appComponent.openConfirmDialog(message, () => {
      this.OnDelete.emit(value);
    });
  }

  shamsi_date(date: any): string {
    if (date != null) {
      return moment(date).locale('fa').format('YYYY/MM/DD');
    } else {
      return " ";
    }
  }

  toggleRow(index: number) {
    this.expandedRowIndex = this.expandedRowIndex === index ? null : index;
  }

  openDetailsDialog(row: any) {
    const nestedData = this.nestedDataKey ? row[this.nestedDataKey] : null;
    if (!nestedData) return;

    this.dialog.open(MaterialTableComponent, {
      width: '90%',
      height: '80%',
      data: {
        data: Array.isArray(nestedData) ? nestedData : [nestedData],
        type: this.nestedType
      }
    });
  }

  GetFieldPostFix(fieldName: string): string {
    if (!this.postFixColumnsChars) return '';
    const item = this.postFixColumnsChars.find(x => x.fieldName === fieldName);
    return item ? item.postFix : '';
  }
}
