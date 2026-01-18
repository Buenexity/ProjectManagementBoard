import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { environment } from '../../config/environmet';

import { BoardColumn } from '../board-column/board-column';
import { TicketForm } from '../ticket-form/ticket-form';
import { EditForm } from '../edit-form/edit-form';

import { Ticket, Status, STATUSES } from '../../models/ticket';
import { MOCK_TICKETS } from '../../data/mock';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-board-manager',
  standalone: true,
  imports: [CommonModule, DragDropModule, BoardColumn, TicketForm, EditForm],
  templateUrl: './board-manager.html',
  styleUrl: './board-manager.css',
})
export class BoardManager implements OnInit {
  columns: Status[] = STATUSES;
  connectedLists: string[] = STATUSES;
  ticketsByStatus: Record<Status, Ticket[]> = {} as Record<Status, Ticket[]>; //map tickets to the status type
  selectedTicket!: Ticket;
  isModalOpen = false;
  isEditModalOpen = false;

  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    //populate map with keys
    for (const status of this.columns) {
      this.ticketsByStatus[status] = [];
    }

    this.loadTickets();
  }

  loadTickets(): void {
    this.http.get<Ticket[]>(environment.API_URL).subscribe({
      next: (tickets) => {
        for (const ticket of tickets) {
          if (!ticket.status || !this.ticketsByStatus[ticket.status]) {
            console.warn('Invalid ticket status', ticket);
            continue;
          }

          this.ticketsByStatus[ticket.status].push(ticket);
        }
      },
      error: (err) => {
        console.error('Failed to load tickets', err);
      },
    });
  }

  handleCreateTicket(ticket: Ticket): void {
    console.log('Creating ticket:', ticket);
    if (!this.ticketsByStatus[ticket.status]) {
      this.ticketsByStatus[ticket.status] = [];
    }
    this.closeModal();

    this.http.post<Ticket>(environment.API_URL, ticket).subscribe({
      next: (createdTicket) => {
        this.ticketsByStatus[createdTicket.status].push(createdTicket);
        this.ref.markForCheck();
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
      },
    });
  }

  handleUpdatedTicket(updatedTicket: Ticket): void {
    const url = `${environment.API_URL}/${updatedTicket.id}`;

    this.http.put<Ticket>(url, updatedTicket).subscribe({
      next: (ticket) => {
        this.mergeTicket(updatedTicket);
        this.ref.markForCheck();
      },
      error: (error) => {
        console.error('Error updating ticket:', error);
      },
    });

    this.isEditModalOpen = false;
  }

  mergeTicket(ticket: Ticket) {
    const allTickets = Object.values(this.ticketsByStatus).flat();
    const existing = allTickets.find((t) => t.id === ticket.id);

    if (existing) {
      Object.assign(existing, ticket);
    } else {
      this.ticketsByStatus[ticket.status].push(ticket);
    }
  }

  deleteTicketEvent(deleteTicket: Ticket): void {
    const url = `${environment.API_URL}/${deleteTicket.id}`;
    const status = deleteTicket.status as Status;
    this.http.delete<Ticket>(url).subscribe({
      next: (response) => {
        console.log('Ticket deleted:', response);
        this.ticketsByStatus[status] = this.ticketsByStatus[status].filter(
          (ticket) => ticket.id !== deleteTicket.id,
        );
        this.ref.markForCheck();
      },
      error: (err) => {
        console.error('Error deleting ticket:', err);
      },
    });
  }

  /*UPDATE Ticket Modal*/
  openEditModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  /*ADD Ticket Modal*/
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
