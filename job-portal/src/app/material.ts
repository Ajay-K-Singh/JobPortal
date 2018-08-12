import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
    MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, 
    MatSelectModule],
})
export class MaterialModule { }
