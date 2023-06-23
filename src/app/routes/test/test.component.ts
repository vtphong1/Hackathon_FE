import { Component, Injector, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Observable } from 'rxjs';
import { BaseComponent } from '@core/base.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent extends BaseComponent implements OnInit {
  columns = [
    {
      columnDef: 'stt',
      header: 'STT',
      flex: 0.3,
    },
    {
      columnDef: 'login',
      header: 'Tên đăng nhập',
    },
    {
      columnDef: 'ip',
      header: 'IP',
      flex: 1.5,
    },
    {
      columnDef: 'action',
      header: 'Actions',
      flex: 1.5,
      actions: ['edit'],
    },
  ];
  groups = [];
  users = [
    {
      login: 'Phong',
      ip: '10.10.10.10',
    },
    {
      login: 'Phong',
      ip: '10.10.10.10',
    },
  ];
  authorities = [];

  paginate: any = {
    keyword: '',
    authority: '',
    groupId: '',
    size: 10,
    page: 0,
    total: 0,
  };
  formGroup = this.fb.group({
    name: [null, Validators.compose([Validators.required])],
    age: [null, Validators.compose([Validators.required])],
  });
  constructor(injector: Injector, private testService: TestService) {
    super(injector, testService);
  }

  getData() {
    // return this.testService.searchData()
    this.testService.getUrl();
  }

  ngOnInit(): void {}

  open() {
    this.showDialog(ConfirmDialogComponent, {}, (value: any) => {
      if (value) {
        console.log(value);
      }
    });
  }
}
