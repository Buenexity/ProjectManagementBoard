import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, copyArrayItem } from '@angular/cdk/drag-drop';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TicketCard } from '../ticket-card/ticket-card';
import { Ticket, Status } from '../../models/ticket';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../config/environmet';
import { error } from 'console';

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [CommonModule, TicketCard, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './board-column.html',
  styleUrl: './board-column.css',
})
export class BoardColumn {
  @Input({ required: true }) title!: Status;
  @Input() tickets: Ticket[] = [];
  @Input() connectedLists: string[] = [];
  @Output() editTicket = new EventEmitter<Ticket>();
  @Output() deleteTicket = new EventEmitter<Ticket>();

  constructor(private http: HttpClient) {}

  trackByTicketId(_: number, ticket: Ticket): number {
    return ticket.id;
  }

  drop(event: CdkDragDrop<any>) {
    const ticket = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //handle status update
      ticket.status = event.container.id as Status;
      this.handleStatusUpdate(ticket);
    }
  }

  handleStatusUpdate(updateStatusTicket: Ticket): void {
    const url = `${environment.API_URL}/${updateStatusTicket.id}`;
    this.http.put(url, updateStatusTicket).subscribe({
      next: (res) => {
        console.log('Ticket updated successfully:', res);
      },
      error: (err) => {},
    });
  }
}
