export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(productName: string): string {
  return `Hi Kalakshetra, I'm interested in the '${productName}' hand-painted piece. Could you share details on size, fabric and price?`;
}

export function generalEnquiryMessage(): string {
  return "Hi Kalakshetra, I'd love to know more about your hand-painted pieces — size, fabric and price.";
}

export function commissionEnquiryMessage(): string {
  return "Hi Kalakshetra, I'd like to commission a custom hand-painted piece. Here's what I have in mind:";
}
