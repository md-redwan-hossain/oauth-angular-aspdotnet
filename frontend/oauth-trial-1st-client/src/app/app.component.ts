import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SsoAuthService } from './sso-auth.service';
import { RecordIterationPipe } from './record-iteration.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, NgForOf, RecordIterationPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly ssoAuthService = inject(SsoAuthService);

  ngOnInit() {
    this.ssoAuthService.refreshUser();
  }
}
