"use client";
import React, { useEffect, useState } from "react";

const Popup = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-[#FFD700] text-[#423309] px-4 py-2 rounded transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Popup;
