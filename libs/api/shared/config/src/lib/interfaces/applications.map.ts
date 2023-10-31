export enum Microservices {
  COLLABORATION = 'collaboration',
  INTEGRATION = 'integration',
  MESSAGING = 'messaging',
  PAYMENT = 'payment',
  REVIEW = 'review',
  USER = 'user',
}

enum Apps {
  CORE = 'CORE',
}

export type Applications = Microservices | Apps;
