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
  ticketsByStatus: Record<Status, Ticket[]> = {} as Record<Status, Ticket[]>;
  selectedTicket!: Ticket;
  ticketPendingDelete?: Ticket;
  isConfirmModalOpen = false;
  isModalOpen = false;
  isEditModalOpen = false;
  ticketFormError = '';
  isSubmittingTicketForm = false;
  isSubmittingEditForm = false;

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
    this.isSubmittingTicketForm = true;

    console.log('Creating ticket:', ticket);
    if (!this.ticketsByStatus[ticket.status]) {
      this.ticketsByStatus[ticket.status] = [];
    }

    this.http.post<Ticket>(environment.API_URL, ticket).subscribe({
      next: (createdTicket) => {
        this.ticketsByStatus[createdTicket.status].push(createdTicket);
        this.closeModal();
        this.ref.markForCheck();
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
        this.ticketFormError = `Failed to create ticket: error status ${err.status}`;
        this.isSubmittingTicketForm = false;
        this.ref.markForCheck();
      },
    });
  }

  handleUpdatedTicket(updatedTicket: Ticket): void {
    const url = `${environment.API_URL}/${updatedTicket.id}`;
    this.isSubmittingEditForm = true;

    this.http.put<Ticket>(url, updatedTicket).subscribe({
      next: (ticket) => {
        this.mergeTicket(updatedTicket);
        this.isSubmittingEditForm = false;
        this.closeEditModal();
        this.ref.markForCheck();
      },
      error: (error) => {
        console.error('Error updating ticket:', error);
        this.ticketFormError = `Failed to edit the ticket: error status ${error.status}`;
        this.isSubmittingEditForm = false;
        console.error(this.isSubmittingEditForm);
        this.ref.markForCheck();
      },
    });
  }

mergeTicket(updated: Ticket): void 
{
  const newTicketsByStatus: typeof this.ticketsByStatus = {};
  
  for (const status of Object.keys(this.ticketsByStatus)) 
  {
    newTicketsByStatus[status] = this.ticketsByStatus[status].filter(t => t.id !== updated.id);
  }

  //Add updated ticket to its new status
  const updatedStatus = updated.status as keyof typeof newTicketsByStatus;
  newTicketsByStatus[updatedStatus] = [...newTicketsByStatus[updatedStatus],{ ...updated },];
  this.ticketsByStatus = newTicketsByStatus;
}


  deleteTicketEvent(deleteTicket: Ticket): void {
    if (window.confirm(`Are you sure you want to delete this ticket`)) {
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
  }

  /*UPDATE Ticket Modal*/
  openEditModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isEditModalOpen = true;
    this.ticketFormError = '';
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  /*ADD Ticket Modal*/
  openModal(): void {
    this.isModalOpen = true;
    this.ticketFormError = '';
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
