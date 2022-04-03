import React, { createContext, useCallback, useState, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export interface User {
    created_at: string;
    name: string;
    email: string;
    cpf: string;
    tel: string;
  }

  interface LikedProducts {
    id_like: string | number;
    id_user_like_product: string | number;
  }

  interface AuthState {
    user: User;
    token: string;
    liked_products: LikedProducts[];
  }

  interface SignInCredencials {
    login: string;
    password: string;
  }
  interface AuthContextData {
    user: User;
    liked_products: LikedProducts[];
    signIn(credencials: SignInCredencials): Promise<boolean>;
    signOut(): void;
    updateUser(user: User): void;
    updateLikedProducts(newStorage: string): void;
  }

  const AuthContext = createContext<AuthContextData>({} as AuthContextData);

  const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
      const user = localStorage.getItem("@meadow:user");
      const token = localStorage.getItem("@meadow:token");
      const likedProducts = localStorage.getItem("@meadow:liked_products");

      if (user && token) {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        return { user: JSON.parse(user), token, liked_products: JSON.parse(likedProducts || "{[]}") };
      }
      return {} as AuthState;
    });


    const updateLikedProducts = useCallback(async (newStorage: string) => {
      localStorage.setItem('@meadow:liked_products', newStorage)
    }, [data.liked_products])

    const signIn = useCallback(async ({ login, password }) => {
      try {
        const response = await api.post("/api/login", {
          name: login,
          password,
        });
        

        const { user, token } = response.data;
        localStorage.setItem("@meadow:user", JSON.stringify(user));
        localStorage.setItem("@meadow:token", token);

        setData({ ...data, user, token });
        api.defaults.headers.common["Authorization"] = "Bearer " + token;

      } catch (e: any) {
        if(e?.response?.status === 401) {
          toast.warning('Senha ou Usuário estão incorretos')
        }else {
          toast.warn(`Erro inesperado ${e.message}`)
        }
        return false
      }

      try {
        const response = await api.get("/api/likes");
        const { likes_for_user } = response.data;
        localStorage.setItem("@meadow:liked_products", JSON.stringify(likes_for_user));
        setData({ ...data, liked_products: likes_for_user });

      } catch (e) {
        console.log('erro ao capturar os likes do produto')
      }
      return true;
    }, []);

    const signOut = useCallback(() => {
      localStorage.removeItem("@meadow:user");
      localStorage.removeItem("@meadow:token");
      setData({} as AuthState);
    }, []);
    const updateUser = useCallback(
      (user: User) => {
        setData({ ...data,token: data.token, user });
        localStorage.setItem("@meadow:user", JSON.stringify(user));
      },
      [setData, data.token]
    );
    return (
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut, updateUser, liked_products: data.liked_products, updateLikedProducts }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
  }
  export { useAuth, AuthProvider };