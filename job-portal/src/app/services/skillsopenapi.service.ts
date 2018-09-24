import { Injectable } from '@angular/core';
import { Skills } from '../models/skills.model';
import { HttpClient } from  '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SkillsOpenApiService {
  private skillSuggestions: Skills[] = [];
  private skillsSuggested = new Subject<Skills[]>();
  constructor(private http: HttpClient) { }

  suggestSkills (skill: string) {
    this.http.get<{ skills: any }>('https://localhost:3000/api/suggest-skills', 
    {params: {skill: skill}})
      .pipe(map((response: any[]) => {
        return response.map((res) => {
          return {
						suggestion: res.normalized_skill_name.charAt(0).toUpperCase() + res.normalized_skill_name.slice(1)
          }
        })
      }))
      .subscribe((suggestions: any) => {
        this.skillSuggestions = suggestions;
        this.skillsSuggested.next([...this.skillSuggestions])
      });
  }
  
  getPredictionsUpdateListener() {
    return this.skillsSuggested.asObservable();
  }
}