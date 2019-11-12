import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users-header',
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.scss']
})
export class UsersHeaderComponent implements AfterViewInit {
  @ViewChild('searchTerm', {static: false}) searchTerm: ElementRef;

  @Input()
  public activeView = 'list';
  @Output()
  public activeViewChanged: EventEmitter<string> = new EventEmitter();
  @Output()
  public searchTermChanged: EventEmitter<string> = new EventEmitter();
  @Output()
  public addButtonClicked: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    if (!!this.searchTerm) {
      fromEvent(this.searchTerm.nativeElement, 'keyup')
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((event: any) => {
          this.searchTermChanged.emit(event.target.value);
        });
    }
  }

  public isListViewActive() {
    return this.activeView === 'list';
  }

  public isCardViewActive() {
    return this.activeView === 'card';
  }

  public activateView(view: string) {
    this.activeView = view;
    this.activeViewChanged.emit(view);
  }

  public onAddButtonClick() {
    this.addButtonClicked.emit();
  }
}
