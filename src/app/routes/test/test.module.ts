import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { DataTableModule } from '@shared/components/data-table/data-table.module';
import { SharedModule } from '@shared';
import { ErrorMessageModule } from '@shared/components/error-message/error-message.module';

@NgModule({
  declarations: [TestComponent, DialogTestComponent],
  imports: [CommonModule, TestRoutingModule, SharedModule, DataTableModule, ErrorMessageModule],
})
export class TestModule {}
