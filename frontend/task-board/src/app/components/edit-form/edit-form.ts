import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { STATUSES, CATEGORIES, Ticket } from '../../models/ticket';

@Component({
  selector: 'app-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm implements OnChanges {
  @Input() ticket!: Ticket;
  @Output() closeEditForm = new EventEmitter<void>();
  @Output() updatedTicket = new EventEmitter<Ticket>();

  statuses_selection = STATUSES;
  categories_selection = CATEGORIES;

  ticketForm: FormGroup;
  oldCopy!: Ticket;

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      title: [''],
      description: [''],
      status: [''],
      category: [''],
    });
  }

  onBackdropClick() {
    this.closeEditForm.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] && this.ticket) {
      this.oldCopy = { ...this.ticket };
      this.editForm.patchValue(this.ticket);
    }
  }

  get editForm() {
    return this.ticketForm;
  }

  handleTicketChanges(): void {
    //updates Ticket with most recent form value
    const updatedTicket: Ticket = {
      ...this.ticket,
      ...this.ticketForm.value,
    };

    console.log('ticket updated to', updatedTicket);

    this.updatedTicket.emit(updatedTicket);
    this.closeEditForm.emit();
  }

  cancel(): void {
    this.ticketForm.patchValue(this.oldCopy);
    this.closeEditForm.emit();
  }
}
