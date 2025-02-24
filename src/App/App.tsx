import { type FC, useEffect, useState } from "react";
import { RouterProvider } from "@tanstack/react-router";

import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const App: FC = () => {
  const [loading, setLoading] = useState(true);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const auth = useAuthStore((state) => state);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setLoading(false);
    };
    init();
  }, [initializeAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider
      context={{ auth }}
      router={router}
    />
  );
};

export default App;
