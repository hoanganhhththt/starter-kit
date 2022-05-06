import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeRoutingModule,
    NzLayoutModule,
    DemoNgZorroAntdModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
