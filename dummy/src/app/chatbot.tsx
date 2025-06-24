"use client"; // This marks this file as a client-side component

import { useState, useRef } from "react";

const Chatbot: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const apiKey =
    "0c22bfd3dda9de720ba7edff2b1bc41e3f10b444fa791b83a6fa198457bc73db";
  const chatbotUrl = "https://ai.nexus.corecotechnologies.com/chatbot-tenant";

  const handleImageClick = () => {
    setShowChatbot(!showChatbot);
  };

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "SET_API_KEY", apiKey },
        "https://ai.nexus.corecotechnologies.com/chatbot-tenant"
      );
      console.log(apiKey);
    }
  };

  return (
    <div>
      <h1>Dummy Next.js TypeScript App</h1>
      <div>
        <img
          src="https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-ask-me-casual-labels-png-image_6578076.png"
          alt="Open Chatbot"
          style={{
            width: "80px",
            height: "80px",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleImageClick}
        />
      </div>

      {showChatbot && (
        <iframe
          ref={iframeRef}
          title="Chatbot"
          src={chatbotUrl}
          onLoad={handleIframeLoad}
          width="500"
          height="500"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

export default Chatbot;
