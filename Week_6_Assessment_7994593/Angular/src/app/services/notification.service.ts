import { Injectable } from '@angular/core';

// This service is not providedIn 'root' by default in the decorator so that
// we can demonstrate component-level (hierarchical) DI providers.
@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  constructor() { }

  getNotifications(): string[] {
    return this.notifications;
  }

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  clear(): void {
    this.notifications = [];
  }
}
