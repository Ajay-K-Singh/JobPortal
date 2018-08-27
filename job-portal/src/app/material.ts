import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
    MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, 
    MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule],
})
export class MaterialModule { }
