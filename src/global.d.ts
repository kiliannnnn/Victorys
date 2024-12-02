export {};

declare global {
  interface Window {
    addNotification: (
      message: string,
      type: "success" | "error" | "info" | "warning",
      position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
    ) => void;
  }
}
