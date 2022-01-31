import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoReadComponent } from './todo-read.component';

describe('TodoReadComponent', () => {
  let component: TodoReadComponent;
  let fixture: ComponentFixture<TodoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
