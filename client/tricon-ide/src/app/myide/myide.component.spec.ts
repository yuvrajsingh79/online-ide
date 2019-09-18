import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyideComponent } from './myide.component';

describe('MyideComponent', () => {
  let component: MyideComponent;
  let fixture: ComponentFixture<MyideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
