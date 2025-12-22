// import { useEffect, useState, type ReactNode } from "react";
// import { AuthContext } from "./AuthContext";

// export interface User {
//   id: string;
//   email: string;
// }

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // useEffect(() => {
//   //   const storedToken = localStorage.getItem("token");
//   //   const storedUser = localStorage.getItem("user");

//   //   // eslint-disable-next-line react-hooks/set-state-in-effect
//   //   setToken(storedToken ?? null);
//   //   setUser(storedUser ? JSON.parse(storedUser) : null);
//   //   setIsLoading(false);
//   // }, []);
//   useEffect(() => {
//     Promise.resolve().then(() => {
//       const storedToken = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");
//       if (storedToken && storedUser) {
//         setToken(storedToken);
//         setUser(JSON.parse(storedUser));
//       }
//       setIsLoading(false);
//     });
//   }, []);

//   const login = (user: User, token: string) => {
//     setUser(user);
//     setToken(token);
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
