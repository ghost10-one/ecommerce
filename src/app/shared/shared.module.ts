import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

const PRIME_COMPONENTS = [
ToolbarModule,
CardModule,
ButtonModule
]
@NgModule({
  imports: [
    ...PRIME_COMPONENTS
  ],
  exports: [
    ...PRIME_COMPONENTS
  ],
})
export class SharedModule { }
