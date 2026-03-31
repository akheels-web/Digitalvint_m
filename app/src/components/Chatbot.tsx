import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed@1.3.14/dist/web.js";
      window.Chatbot = Chatbot;
      window.dispatchEvent(new Event('chatbot-loaded'));
    `;
    document.body.appendChild(script);

    const handleChatbotLoaded = () => {
      initializeChatbot();
    };

    window.addEventListener('chatbot-loaded', handleChatbotLoaded);
    
    // Check if it's already there (though unlikely with this script method)
    // @ts-ignore
    if (window.Chatbot) {
      initializeChatbot();
    }

    return () => {
      window.removeEventListener('chatbot-loaded', handleChatbotLoaded);
    };

    function initializeChatbot() {
      // @ts-ignore
      if (window.Chatbot) {
        // @ts-ignore
        window.Chatbot.init({
          chatflowid: "3941270f-b092-433a-8a3d-9c3ddb0395e2",
          apiHost: "https://flowise-production-b519.up.railway.app",
          theme: {
            button: {
              backgroundColor: "#0082f3",
              right: 24,
              bottom: 168, // Exactly above WhatsApp Icon
              size: 56,
              iconColor: "white",
            },
            tooltip: {
              showTooltip: false,
              tooltipMessage: "Chat with Vint 👋",
              tooltipBackgroundColor: "#000000",
              tooltipTextColor: "white",
            },
            chatWindow: {
              showTitle: true,
              title: "Vint — DigitalVint AI",
              welcomeMessage: "Hi! I'm Vint 👋 How can I help grow your business?",
              backgroundColor: "#000000",
              height: 580,
              width: 380,
              fontSize: 16,
              botMessage: {
                backgroundColor: "#1a1a1a",
                textColor: "#e2e8f0",
                showAvatar: false,
              },
              userMessage: {
                backgroundColor: "#0082f3",
                textColor: "#ffffff",
              },
              textInput: {
                placeholder: "Type your message...",
                backgroundColor: "#1a1a1a",
                textColor: "#e2e8f0",
                sendButtonColor: "#0082f3",
                maxChars: 200,
              }
            }
          }
        });
      }
    }
  }, []);

  return null;
};

export default Chatbot;
