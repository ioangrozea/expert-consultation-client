import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-header',
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.scss']
})
export class UsersHeaderComponent {
  @Input()
  public activeView = 'list';
  @Output()
  public onActiveViewChanged: EventEmitter<string> = new EventEmitter();

  public isListViewActive() {
    return this.activeView === 'list';
  }

  public isCardViewActive() {
    return this.activeView === 'card';
  }

  public activateView(view: string) {
    this.activeView = view;
    this.onActiveViewChanged.emit(view);
  }
}
