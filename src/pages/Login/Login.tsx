import type { FC } from "react";

import { useAuthStore } from "@/stores/authStore";

const Login: FC = () => {
  const login = useAuthStore((state) => state.login);

  return <button onClick={login}>Login</button>;
};

export default Login;
