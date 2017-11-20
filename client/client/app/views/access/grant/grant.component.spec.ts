/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrantComponent } from './grant.component';

describe('GrantComponent', () => {
  let component: GrantComponent;
  let fixture: ComponentFixture<GrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
