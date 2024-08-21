import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SsoAuthService } from './sso-auth.service';
import { RecordIterationPipe } from './record-iteration.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, NgForOf, RecordIterationPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly ssoAuthService = inject(SsoAuthService);
  readonly destroyRef = inject(DestroyRef);
  readonly http = inject(HttpClient);

  ngOnInit() {
    this.ssoAuthService
      .initialize()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  ping() {
    this.http
      .get('http://localhost:5161/ping', { withCredentials: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
