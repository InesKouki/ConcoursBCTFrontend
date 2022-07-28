import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcoursDetailsComponent } from './concours-details.component';

describe('ConcoursDetailsComponent', () => {
  let component: ConcoursDetailsComponent;
  let fixture: ComponentFixture<ConcoursDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcoursDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcoursDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
