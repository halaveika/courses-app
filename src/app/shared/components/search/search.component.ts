import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() searchEvent = new EventEmitter<{action: string, payload:{title: string}}>();

  query!: string;

  onSubmit() {
    this.searchEvent.emit({ action:'search', payload: {title: this.query} });
  }
}

