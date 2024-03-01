export enum OrderStatusEnum {
  PENDING_PAYMENT = 'Pendiente de pago',
  PAYMENT_RECEIVED = 'Pago recibido',
  PROCESSING = 'En proceso de preparación',
  IN_TRANSIT = 'En tránsito',
  DELIVERED = 'Entregado',
  CANCELED_BY_CUSTOMER = 'Cancelado por el cliente',
  CANCELED_BY_COMPANY = 'Cancelado por la empresa',
  WAITING_FOR_PAYMENT_CONFIRMATION = 'En espera de confirmación de pago',
  REFUNDED = 'Reembolsado',
  CUSTOMS_PROCESSING = 'En proceso de aduanas',
  WAITING_FOR_DOCUMENTATION = 'En espera de documentación',
  INTERNATIONAL_TRANSIT = 'En tránsito internacional',
  HELD_IN_CUSTOMS = 'Retenido en aduanas'
}
