import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { TestService } from '../../test.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
})
export class DialogTestComponent extends BaseComponent implements OnInit {
  constructor(
    injector: Injector,
    private testService: TestService,
    public dialogRef: MatDialogRef<DialogTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(injector, testService);
  }

  ngOnInit(): void {}
}
