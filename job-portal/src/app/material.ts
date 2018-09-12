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
  MatProgressSpinnerModule,
  MatSnackBarModule
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
    MatProgressSpinnerModule,
    MatSnackBarModule
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
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
