import { Component, OnInit, EventEmitter, Output, Input , OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Companies } from '../../utils/comapnies.model';
import { Subscription } from 'rxjs';
import { CompanyAutoSuggestionService } from '../../utils/companyautosuggestions.service';

@Component({
    selector: 'app-company-autosuggetion',
    templateUrl: './company-auto-suggestions.component.html',
    styleUrls: ['./company-auto-suggestions.component.scss']
  })
  export class CompanyAutocompleteComponent implements OnInit, OnDestroy {
  @Output() private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();  
  @Output() private onSelectedCompany = new EventEmitter<any>();
  private form: FormGroup; 
  companies: Companies[] = [];
  @Input() label: string;
  @Input() placeholder: string;
  private companiesAutoSuggestions: Subscription;
  predictionFilled = false;
  constructor(private fb: FormBuilder, public copanyAutoSuggestService: CompanyAutoSuggestionService) { 
    this.form = this.fb.group({
			"nameOfCompany": new FormControl()
    });
    this.form.get('nameOfCompany').valueChanges.subscribe(
      (value) => {
        if (this.companies.length > 0) {
          this.companies.forEach(company => { 
            if (company.name === value) {
              this.predictionFilled = true;
            }
          });
        } else {
          this.predictionFilled = false;
        }
        if (value === "") {
          this.predictionFilled = false;
          this.companies = [];
        }
        this.onChangeCompanyName(value)
      }
    );
  }

  onChangeCompanyName(nameOfCompany) {
    if ( this.predictionFilled || nameOfCompany == '' ) {
      return;
    }
    this.copanyAutoSuggestService.suggestCompanies(nameOfCompany);
    this.companiesAutoSuggestions = this.copanyAutoSuggestService.getPredictionsUpdateListener().subscribe((companies: Companies[]) => {
      console.log(companies);
      this.companies = companies;
    });
  }

  onSelect(event, company) {
    this.onSelectedCompany.emit({event, company})
  }

  ngOnInit() {
    this.formReady.emit(this.form);
  }
    
  ngOnDestroy() {
      if(this.companiesAutoSuggestions){
        this.companiesAutoSuggestions.unsubscribe();
      }
    }
  }