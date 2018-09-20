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
  MatListModule,
  MatMenuModule
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
    MatListModule ,
    MatMenuModule
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
    MatListModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
