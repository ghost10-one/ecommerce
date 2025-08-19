import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';

const PRIME_COMPONENTS = [
ToolbarModule,
CardModule,
ButtonModule
]
@NgModule({
  imports: [
    ...PRIME_COMPONENTS, HttpClientModule
  ],
  exports: [
    ...PRIME_COMPONENTS , HttpClientModule
  ],
})
export class SharedModule { }
