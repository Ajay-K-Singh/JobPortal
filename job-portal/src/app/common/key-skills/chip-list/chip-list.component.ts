import {Component, Input} from '@angular/core';

@Component({
  selector: 'chip-list',
  templateUrl: 'chip-list.component.html',
  styleUrls: ['chip-list.component.scss'],
})
export class ChipListComponent {
	@Input() skills;
  selectable = true;
  removable = true;
	
	remove(skill) {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}