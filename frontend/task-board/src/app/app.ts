import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketCard } from './components/ticket-card/ticket-card';
import { BoardColumn } from './components/board-column/board-column';
import { Ticket } from './models/ticket';
import { MOCK_TICKETS } from './data/mock';
import { BoardManager } from './components/board-manager/board-manager';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoardManager],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
