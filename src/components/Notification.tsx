import { createSignal } from "solid-js";
import type { Component } from "solid-js";

interface NotificationProps {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  visible: boolean;
  onClose: () => void;
  onRead: () => void;
  position: "bottom-left" | "bottom-right";
}

const Notification: Component<NotificationProps> = (props) => {
  const baseClass = "relative w-72 p-4 rounded-lg shadow-lg pointer-events-auto transition-all duration-300";
  const typeClass = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  }[props.type];

  const [exitAnimation, setExitAnimation] = createSignal("");

  // Handle Close Button Animation
  const handleClose = () => {
    const direction = props.position === "bottom-left" ? "-translate-x-full" : "translate-x-full";
    setExitAnimation(direction);
    setTimeout(() => props.onClose(), 300);
  };

  // Handle Read Button Animation
  const handleRead = () => {
    setExitAnimation("scale-0 opacity-0");
    setTimeout(() => props.onRead(), 300);
  };

  return (
    <div
      class={`${baseClass} ${typeClass} ${
        props.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      } ${exitAnimation()}`}
      style={{ width: "24rem" }}
    >
      {/* Read Button */}
      <button
        class="absolute top-2 right-10 p-1 rounded hover:bg-white hover:bg-opacity-20 focus:outline-none"
        onClick={handleRead}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>

      {/* Close Button */}
      <button
        class="absolute top-2 right-2 p-1 rounded hover:bg-white hover:bg-opacity-20 focus:outline-none"
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Title */}
      <h3 class="text-lg font-semibold mb-2 truncate">{props.title}</h3>

      {/* Message */}
      <p class="text-sm line-clamp-2">
        {props.message}
      </p>
    </div>
  );
};

export default Notification;
