// Dados de contato e helpers usados em todo o site.
// Para trocar o número ou a mensagem padrão, edite só aqui.

export const WHATSAPP_NUMBER = '5511945177464';
export const INSTAGRAM_URL = 'https://instagram.com/automationtoy';
export const EMAIL = 'contato@automationtoyou.com';

export function whatsappLink(message = 'Oi! Quero conversar sobre um site para o meu negócio.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
