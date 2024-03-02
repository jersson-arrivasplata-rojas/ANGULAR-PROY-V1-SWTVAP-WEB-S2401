export enum OrderStatusEnum {
  PENDING_PAYMENT = 'Pendiente de pago',
  PAYMENT_RECEIVED = 'Pago recibido',
  PROCESSING = 'En proceso de preparaci\u00F3n',
  IN_TRANSIT = 'En tr\u00E1nsito',
  DELIVERED = 'Entregado',
  CANCELED_BY_CUSTOMER = 'Cancelado por el cliente',
  CANCELED_BY_COMPANY = 'Cancelado por la empresa',
  WAITING_FOR_PAYMENT_CONFIRMATION = 'En espera de confirmaci\u00F3n de pago',
  REFUNDED = 'Reembolsado',
  CUSTOMS_PROCESSING = 'En proceso de aduanas',
  WAITING_FOR_DOCUMENTATION = 'En espera de documentaci\u00F3n',
  INTERNATIONAL_TRANSIT = 'En tr\u00E1nsito internacional',
  HELD_IN_CUSTOMS = 'Retenido en aduanas'
}
