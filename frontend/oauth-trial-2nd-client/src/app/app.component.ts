import {AsyncPipe} from '@angular/common';
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {RecordIterationPipe} from "./record-iteration.pipe";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RecordIterationPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly oidcSecurityService = inject(OidcSecurityService);
  readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoffAndRevokeTokens()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => console.log(result));
  }
}
