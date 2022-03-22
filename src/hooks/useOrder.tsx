import { createContext, useCallback, useState, useContext } from "react";

interface IOrderProps {
    products: string[];
    addingProduct(id:string):void;
    removeProduct(id:string):void;
}

interface IOrderProvider {
    children: React.ReactNode
}

export const orderContext = createContext<IOrderProps>({} as IOrderProps)


export default function OrderProvider ({children}: IOrderProvider) {
    const [ordersId, setOrderId] = useState<string[]>([]);

    const addingProduct = useCallback((id:string) => {
        if(!ordersId.includes(id)) {
            setOrderId([...ordersId, id]);
        }
    }, [ordersId])

    const removeProduct = useCallback((id:string) => {
       setOrderId(state => state.filter(state => state !== id));
    }, [ordersId])
    return (
        <orderContext.Provider
            value={{products: ordersId, addingProduct, removeProduct}}
        >
            {children}
        </orderContext.Provider>
    )
}

export function useOrders(){
  const context = useContext(orderContext);
  return context;
}
