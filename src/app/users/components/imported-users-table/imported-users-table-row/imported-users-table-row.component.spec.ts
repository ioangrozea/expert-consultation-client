import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedUsersTableRowComponent } from './imported-users-table-row.component';

describe('ImportedUsersTableRowComponent', () => {
  let component: ImportedUsersTableRowComponent;
  let fixture: ComponentFixture<ImportedUsersTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedUsersTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedUsersTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
