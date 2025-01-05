export interface NotificationPayload {
  to: string;
  title: string;
  body: string;
  badge?: string;
  sound?: string;
}
