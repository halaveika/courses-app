import { Component,Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  iconConf:any;
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.iconConf = ['fas', this.icon]
  }
}
