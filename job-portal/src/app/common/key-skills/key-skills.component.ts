import {Component, EventEmitter, Output, Input , OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Skills } from '../../models/skills.model';
import { SkillsOpenApiService } from '../../services/skillsopenapi.service';
import { Subscription } from 'rxjs';

export interface Skills {
  name: string;
}

@Component({
  selector: 'key-skills',
  templateUrl: 'key-skills.component.html',
  styleUrls: ['key-skills.component.scss'],
})
export class KeySkillsComponent implements OnInit, OnDestroy {
  skills: Skills[] = [];
  skillsChipListArray = [];
  private form: FormGroup;
  predictionFilled: boolean = false;
  private skillSuggestions:  Subscription;
  @Output() private selectedSkillSet = new EventEmitter<any>();
  private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
	constructor(private fb: FormBuilder, public skillsService: SkillsOpenApiService) { 
		this.form = this.fb.group({
			"keySkills": new FormControl()
    });
    this.form.get('keySkills').valueChanges.subscribe(
      (value) => {
        if (this.skills.length > 0) {
          this.skills.forEach(skill => { 
            if (skill.suggestion === value) {
              this.predictionFilled = true;
              this.addSkillsToArray(value);
            }
          });
        } else {
          this.predictionFilled = false;
        }
        if (value === "") {
          this.predictionFilled = false;
          this.skills = [];
        }
        this.onChangeSkill(value)
      }
    );
  }

  ngOnInit() {
    this.formReady.emit(this.form);
  }
  
  onChangeSkill(partialSkill) {
    if ( this.predictionFilled || partialSkill == '' ) {
      return;
    }
    this.skillsService.suggestSkills(partialSkill);
    this.skillSuggestions = this.skillsService.getPredictionsUpdateListener().subscribe((skills: Skills[]) => {
      this.skills = skills;
    });
  }

  addSkillsToArray(skill) {
    if ((skill || '').trim()) {
        this.skillsChipListArray.push({name: skill.trim()});
			}
    this.form.reset();
    this.skills = [];
    this.predictionFilled = false;
    event.preventDefault();
  }

  setSelectedSkillSet() {
    this.selectedSkillSet.emit({skillSet: this.skillsChipListArray});
  }

  ngOnDestroy() {
    if(this.skillSuggestions){
      this.skillSuggestions.unsubscribe();
     }
  }
}