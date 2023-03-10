import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() title: string='';
  @Input() message: string='';
  @Input() okButtonText: string='';
  @Input() cancelButtonText: string='';
  @Output() modalResult: EventEmitter<boolean> = new EventEmitter<boolean>();
}
