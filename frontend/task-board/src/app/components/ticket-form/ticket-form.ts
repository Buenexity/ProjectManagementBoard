import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATUSES, CATEGORIES } from '../../models/ticket';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>(); //send to parent div to close it
  @Output() createTicket = new EventEmitter<Ticket>();
  @Input() httpError: string | null = null;
  @Input() isSubmittingTicketForm = false;

  statuses_selection = STATUSES;
  categories_selection = CATEGORIES;

  ticketForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [this.statuses_selection[0]],
      category: [this.categories_selection[0]],
    });
  }

  submit() {
    if (this.ticketForm.invalid || this.isSubmittingTicketForm) return;

    console.log(this.ticketForm.value);
    const newTicket: any = {
      title: this.ticketForm.value.title,
      description: this.ticketForm.value.description,
      status: this.ticketForm.value.status,
      category: this.ticketForm.value.category,
    };
    this.createTicket.emit(newTicket);

    this.ticketForm.reset({
      title: '',
      description: '',
      status: this.statuses_selection[0],
      category: this.categories_selection[0],
    });
  }

  onBackdropClick() {
    if (this.isSubmittingTicketForm) return;
    this.close.emit();
  }
}
