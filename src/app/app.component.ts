import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallComponent } from './call/call.component';
import { CallingService } from './calling.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  callingService: CallingService;

  constructor(callingService: CallingService) {
    this.callingService = callingService;
  }

  setCallId(callId: string) {
    this.callingService.setCallId(callId);
  }

  leaveCall() {
    this.callingService.call()?.leave();
  }
}
