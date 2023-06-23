import { Component, Injector } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { RESPONSE_BODY_CODE, SUCCESS } from '../app.constant';
import { BaseService } from '@core/base.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  template: ``,
  styles: [],
})
export class BaseComponent {
  public matDialog: MatDialog;
  public matSnackBar: MatSnackBar;
  public fb: FormBuilder;
  public baseService: BaseService;
  public dialogRef: MatDialogRef<any> | undefined;
  public listData: any;
  public dataDetail: any;
  public _destroy$ = new Subject();

  constructor(injector: Injector, service: BaseService, dialogRef?: MatDialogRef<any>) {
    this.matDialog = injector.get(MatDialog);
    this.matSnackBar = injector.get(MatSnackBar);
    this.fb = injector.get(FormBuilder);
    this.baseService = service;
    this.dialogRef = dialogRef;
  }

  showSnackBar(messages: string, type?: string): void {
    this.matSnackBar.open(messages, '', {
      panelClass: type === SUCCESS ? 'bg-primary' : type === 'warning' ? 'bg-warning' : 'bg-danger',
    });
  }

  showDialog(component?: any, options: MatDialogConfig = {}, callback?: any): void {
    const ref = this.matDialog.open(component, {
      width: '30vw',
      ...options,
    });
    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(value => {
        callback && callback(value);
      });
  }

  getListData(objSearch?: any): void {
    this.baseService
      .searchData(objSearch)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.handleDataResponse(res, this.listData);
      });
  }

  getDataDetail(id: any): void {
    this.baseService
      .getDetail(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.handleDataResponse(res, this.dataDetail);
      });
  }

  deleteItem(id: any): void {
    this.baseService
      .deleteItem(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Delete success', SUCCESS);
          this.dialogRef?.close('reload');
        }
      });
  }

  updateItem(obj: any): void {
    this.baseService
      .updateItem(obj)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Update item success', SUCCESS);
          this.dialogRef?.close('reload');
        }
      });
  }

  addItem(obj: any): void {
    this.baseService
      .addItem(obj)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Add new item success', SUCCESS);
          this.dialogRef?.close();
        }
      });
  }
  handleDataResponse(res: any, data: any): void {
    if (res?.body?.code === RESPONSE_BODY_CODE) {
      data = res.body.results;
    }
  }
}
