import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Companies } from './comapnies.model';

@Injectable({
  providedIn: 'root'
})

export class CompanyAutoSuggestionService {
  private companies: Companies[] =  [];
  private suggestedCompaniesResponse = new Subject<Companies[]>();
  constructor(private http: HttpClient){}
  
  suggestCompanies(nameOfCompany: string) {
    this.http.get<{ companies: any }>('http://localhost:3000/api/suggest-companies', 
    {params: {nameOfCompany: nameOfCompany}})
      .pipe(map((response) => {
        return response.map((res) => {
          return {
						domain: res.domain,
						logo: res.logo,
						name: res.name
          }
        })
      }))
      .subscribe((suggestions) => {
        this.companies = suggestions;
        this.suggestedCompaniesResponse.next([...this.companies])
      });
	}

	getPredictionsUpdateListener() {
    return this.suggestedCompaniesResponse.asObservable();
  }
}