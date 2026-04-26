import { MessageCircle, Phone } from 'lucide-react';

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 z-50 flex gap-3 pointer-events-none left-1/2 -translate-x-1/2 flex-row md:left-auto md:right-6 md:translate-x-0 md:flex-col-reverse">
      <a
        href="tel:+919391795320"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 pointer-events-auto"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
      <a
        href="https://wa.me/919391795320"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 pointer-events-auto"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default FloatingActions;
