import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Notification.css"; // Import the CSS file for transitions

interface NotificationProps {
  message: string | null;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 600); // Wait for transition to finish before calling onClose
      }, 5000); // Show notification for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <CSSTransition
      in={show}
      timeout={600}
      classNames="notification"
      unmountOnExit
    >
      <div className={`notification ${type}`}>{message}</div>
    </CSSTransition>
  );
};

export default Notification;
