import {Component} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

export interface Skills {
  name: string;
}

@Component({
  selector: 'key-skills',
  templateUrl: 'key-skills.component.html',
  styleUrls: ['key-skills.component.scss'],
})
export class KeySkillsComponent {
	skills: Skills[] = [];
	private form: FormGroup; 
	constructor(private fb: FormBuilder) { 
		this.form = this.fb.group({
			"keySkills": new FormControl()
    });
	}

  onAddSkills(event) {
    if (event.key === "Enter" || event.key===",") {
        this.addSkillsToArray(this.form.value['keySkills']);
    }
  }

  onBlurMethod() {
			this.addSkillsToArray(this.form.value['keySkills'])
  }

  addSkillsToArray(skill) {
    if ((skill || '').trim()) {
        this.skills.push({name: skill.trim()});
			}
		this.form.reset();
    event.preventDefault();
  }
}