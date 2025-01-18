import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported in this browser');
      return false;
    }

    console.log('Current permission:', Notification.permission);
    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    console.log('Permission after request:', permission);
    return permission === 'granted';
  }

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    console.log('Attempting to show notification:', title);
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      new Notification(title, options);
      console.log('Notification created successfully');
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  }
}
