import type { FC } from "react";

import { useAuthStore } from "@/stores/authStore";

const Home: FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
