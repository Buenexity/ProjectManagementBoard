import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardManager } from './board-manager';

describe('BoardManager', () => {
  let component: BoardManager;
  let fixture: ComponentFixture<BoardManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardManager],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
