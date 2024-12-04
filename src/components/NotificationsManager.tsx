import { createSignal, onMount } from "solid-js";
import NotificationComp from "@/components/Notification";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/auth-js";

type NotificationsManagerProps = {
  currentUser: SupabaseUser;
  position: "bottom-left" | "bottom-right";
};

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export default function NotificationsManager({
  currentUser,
  position = "bottom-right",
}: NotificationsManagerProps) {
  const [notifications, setNotifications] = createSignal<Notification[]>([]);

  onMount(async () => {
    await fetchUnseen();
  });

  const subscription = supabase
    .channel(`notifications-${currentUser.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user=eq.${currentUser.id}`,
      },
      (payload) => {
        addNotification(
          payload.new.id,
          payload.new.title,
          payload.new.content,
          "info"
        );
      }
    )
    .subscribe();

  const addNotification = (
    id: number,
    title: string,
    message: string,
    type: Notification["type"]
  ) => {
    setNotifications((prev) => [
      { id, title, message, type },
      ...prev,
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = async (id: number) => {
    const { error } = await supabase
      .from("notifications")
      .update({ status: "seen" })
      .eq("id", id);

    if (error) {
      console.error("Failed to mark notification as read:", error);
    } else {
      removeNotification(id);
    }
  };

  const fetchUnseen = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user", currentUser.id)
      .eq("status", "unseen")
      .order("created", { ascending: true });

    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      data.forEach((element) => {
        addNotification(element.id, element.title, element.content, "success");
      });
    }
  };

  const managerClass = position === "bottom-left" ? "bottom-4 left-4" : "bottom-4 right-4";

  return (
    <div class={`fixed ${managerClass} space-y-2 pointer-events-none z-50`}>
      {notifications().map((notification) => (
        <NotificationComp
          title={notification.title}
          message={notification.message}
          type={notification.type}
          visible={true}
          position={position}
          onClose={() => removeNotification(notification.id)}
          onRead={() => markAsRead(notification.id)}
        />
      ))}
    </div>
  );
}
