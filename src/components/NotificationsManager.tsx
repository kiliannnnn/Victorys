import { createSignal, createEffect, For, Show, onCleanup } from 'solid-js';
import NotificationComp from "./Notification.astro";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/auth-js";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

const NotificationsManager = () => {
  const [notifications, setNotifications] = createSignal<Notification[]>([]);

  createEffect(() => {
    const setupSubscription = async () => {
      console.log("aaaa");
      
      const userData = await fetchUser();
      if (!userData) return;
  
      const subscription = supabase
        .channel('public:notifications')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user=eq.${userData.id}` },
          (payload) => {
            console.log('Notification payload:', payload);
          }
        )
        .subscribe();
  
      onCleanup(() => {
        subscription.unsubscribe();
      });
    };
  
    setupSubscription();
  });
  

  const fetchUser = async (): Promise<SupabaseUser | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  };
  

  const addNotification = (
    message: string, 
    type: Notification["type"], 
    position: Notification["position"]
  ) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, message, type, position },
    ]);
  
    setTimeout(() => removeNotification(id), 5000);
  };
  

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (typeof window !== "undefined") {
    window.addNotification = addNotification;
  }

  return (
    <div>
      {notifications().map((notification) => (
        <NotificationComp
          message={notification.message}
          position={notification.position}
          type={notification.type}
          visible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsManager;
