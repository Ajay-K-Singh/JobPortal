import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
    MatSelectModule, MatAutocompleteModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, 
    MatSelectModule, MatAutocompleteModule],
})
export class MaterialModule { }
