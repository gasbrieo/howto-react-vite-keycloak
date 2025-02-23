import type { FC } from "react";

import { useAuthStore } from "@/stores/authStore";

const Home: FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return <button onClick={logout}>Logout</button>;
};

export default Home;
