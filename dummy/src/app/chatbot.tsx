"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";

const Chatbot: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleImageClick = () => {
    if (showChatbot) {
      setIsClosing(true);
      setTimeout(() => {
        setShowChatbot(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowChatbot(true);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_APIKEY;
  const chatbotUrl = "https://ai.nexus.corecotechnologies.com/chatbot-tenant";

  useEffect(() => {
    if (showChatbot) {
      setIsLoading(true);
    }
  }, [showChatbot]);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "SET_API_KEY", apiKey },
        "https://ai.nexus.corecotechnologies.com/chatbot-tenant"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1>Dummy Next.js TypeScript App</h1>

      {showChatbot && (
        <div
          className={`${styles.chatbotWrapper} ${
            isClosing ? styles.chatbotClosing : ""
          }`}
        >
          <iframe
            ref={iframeRef}
            title="Chatbot"
            src={chatbotUrl}
            onLoad={handleIframeLoad}
            className={`${styles.chatbotIframe} ${
              isLoading ? styles.hidden : styles.visible
            }`}
          />
        </div>
      )}

      <div
        className={`${styles.chatbotToggleBtn} ${
          showChatbot ? styles.hideLabel : ""
        }`}
        onClick={handleImageClick}
      >
        <img
          className={showChatbot ? styles.imgClose : styles.imgChat}
          src={
            showChatbot
              ? "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
              : "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
          }
          alt="Toggle Chatbot"
        />
      </div>
    </div>
  );
};

export default Chatbot;
