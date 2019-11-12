import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent extends BaseComponent implements OnInit {

  currentLanguage: string;

  constructor(private store: Store<CoreState>,
              private translate: TranslateService) {
    super();
    translate.onLangChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((langChange: LangChangeEvent) => this.currentLanguage = langChange.lang);
  }

  ngOnInit() {
  }

  logout() {
    alert('That`s sad, you just logged out');
  }

  applyFilter() {
  }

  profile() {
    this.store.dispatch(new fromStore.RouteChange({path: 'home'}))
  }

  about() {
    this.store.dispatch(new fromStore.RouteChange({path: 'about'}))
  }

  consultation() {
    this.store.dispatch(new fromStore.RouteChange({path: 'in-consultation'}))
  }

  archive() {
    this.store.dispatch(new fromStore.RouteChange({path: 'archive'}))
  }

  members() {
    this.store.dispatch(new fromStore.RouteChange({path: 'users'}))
  }

  login() {
    this.store.dispatch(new fromStore.RouteChange({path: 'authentication/log-in'}))
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
