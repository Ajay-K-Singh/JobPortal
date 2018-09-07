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
  MatTabsModule,
  MatProgressSpinnerModule
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
    MatTabsModule,
    MatProgressSpinnerModule
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
    MatTabsModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
