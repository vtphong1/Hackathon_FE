import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() rows: any = [];
  @Input() columns: any[] = [];
  @Input() paginate: any = {
    page: 0,
    size: 10,
    total: 0,
  };
  @Input() rowTemplate: TemplateRef<any> | undefined;
  @Input() actionTemplate: TemplateRef<any> | undefined;
  @Output() pageChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  actions = [
    {
      id: 'delete',
      label: 'Delete',
      icon: 'delete',
      color: 'red',
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'create',
      color: 'orange',
    },
    {
      id: 'lock',
      label: 'Lock',
      icon: 'lock',
      color: 'red',
    },
    {
      id: 'resetPassword',
      label: 'Reset Password',
      icon: 'heroicons_outline:refresh',
      color: 'red',
    },
  ];
  displayedActions: any[] = [];

  getListActions() {
    this.displayedActions = this.columns
      ?.find((col: any) => col.columnDef === 'action')
      ?.actions?.map((act: any) => {
        return this.actions.find(a => a.id === act);
      });
  }

  get displayedColumns() {
    return this.columns.map((c: any) => c.columnDef);
  }

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.getListActions();
  }

  changePage(e: any): void {
    this.pageChange.emit(e);
  }

  calcColumnWidth(column: any): string {
    const totalFlex = this.columns?.reduce((total: any, col: any) => (col.flex ?? 1) + total, 0);
    return (column.flex ?? 1) / totalFlex + '%';
  }

  emitAction(actionType: any, rowData: any): any {
    const data = {
      type: actionType,
      data: rowData,
    };
    this.action.emit(data);
  }

  getRowIndex(row: any): number {
    return this.rows.indexOf(row);
  }
}
