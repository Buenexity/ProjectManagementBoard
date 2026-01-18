import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-card',
  imports: [],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  @Input() ticket!: Ticket;
  @Output() editTicket = new EventEmitter<Ticket>();
  @Output() deleteTicket = new EventEmitter<Ticket>();
}
