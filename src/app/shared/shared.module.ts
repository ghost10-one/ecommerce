import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const PRIME_COMPONENTS = [
ToolbarModule,
CardModule,
ButtonModule
]
@NgModule({
  imports: [
    ...PRIME_COMPONENTS, HttpClientModule , ReactiveFormsModule
  ],
  exports: [
    ...PRIME_COMPONENTS , HttpClientModule , ReactiveFormsModule
  ],
})
export class SharedModule { }
