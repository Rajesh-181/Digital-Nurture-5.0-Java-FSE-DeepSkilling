import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  // Traditional Hierarchical DI: providing service at the component level.
  providers: [NotificationService],
  standalone: false
})
export class NotificationComponent implements OnInit {
  @Input() instanceId!: number;
  messageText: string = '';
  notifications: string[] = [];

  /*
    Task 2 Step 67 Explanation Comment:
    
    By declaring 'NotificationService' inside the component's 'providers' array, we configure Angular's 
    injector to create a brand new instance of this service every time this component is instantiated.
    
    If we render two <app-notification> components on the page, each gets its own private, isolated 
    instance of NotificationService. Adding notifications in one component will not affect the list 
    in the other component. This is different from providing a service in 'root', which makes it a 
    global singleton shared across all components in the entire application.
  */
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  // Adds message to the component-scoped service instance
  sendNotification(): void {
    if (!this.messageText) return;
    this.notificationService.addNotification(`[Widget ${this.instanceId}] ${this.messageText}`);
    this.notifications = this.notificationService.getNotifications();
    this.messageText = '';
  }

  // Clears messages for this component-scoped service instance
  clearNotifications(): void {
    this.notificationService.clear();
    this.notifications = this.notificationService.getNotifications();
  }
}
