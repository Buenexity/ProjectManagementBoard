import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  @Input() ticket!: Ticket;
  @Output() editTicket = new EventEmitter<Ticket>();
  @Output() deleteTicket = new EventEmitter<Ticket>();

  convertCatToColor(category?: string): string {
    if (!category) return '';

    return `category-${category.toLowerCase().replace('&', '').replace(/\s+/g, '')}`;
  }
}
