import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatChipsModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule,
    MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatChipsModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, 
    MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatChipsModule]
})
export class MaterialModule { }
