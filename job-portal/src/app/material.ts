import { MatButtonModule, 
  MatCheckboxModule, 
  MatCardModule,
  MatInputModule, 
  MatToolbarModule,
  MatSelectModule, 
  MatAutocompleteModule, 
  MatExpansionModule, 
  MatIconModule, 
  MatChipsModule,
  MatDividerModule,
  MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, 
    MatCheckboxModule, 
    MatCardModule, 
    MatInputModule, 
    MatToolbarModule,
    MatSelectModule, 
    MatAutocompleteModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatChipsModule,
    MatDividerModule,
    MatTabsModule
  ],
  exports: [MatButtonModule, 
    MatCheckboxModule, 
    MatCardModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatSelectModule, 
    MatAutocompleteModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatChipsModule,
    MatDividerModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
