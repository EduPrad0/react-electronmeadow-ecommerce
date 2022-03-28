import { createContext, useCallback, useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
type IProductForm = {
    id: number;
    quantity: number;
}
interface IOrderProps {
    products: IProductForm[];
    addingProduct(product: IProductForm): void;
    removeProduct(id: number): void;
}

interface IOrderProvider {
    children: React.ReactNode
}

export const orderContext = createContext<IOrderProps>({} as IOrderProps)


export default function OrderProvider({ children }: IOrderProvider) {
    const [ordersId, setOrdersId] = useState<IProductForm[]>(() => {
        const ordersByLocal = localStorage.getItem("orders");
        if (ordersByLocal) {
            return JSON.parse(ordersByLocal);
        }
        return []
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(ordersId));
    }, [ordersId]) 


    const addingProduct = useCallback((product: IProductForm) => {
        if (ordersId.find(i => i.id === product.id)) {
            setOrdersId(state => state.map(i => {
                if (i.id === product.id)
                    return product
                return i;
            }));

            toast(`Produto atualizado para ${product.quantity} unidade${product.quantity > 1 ? 's' : ''}`, {
                icon: <AddShoppingCartIcon />
            });
        } else {
            setOrdersId(state => [...state, product]);

            toast(`Produto Adicionado ao carrinho`, {
                icon: <AddShoppingCartIcon />
            });

        }
    }, [ordersId])

    const removeProduct = useCallback((id: number) => {
        setOrdersId(state => state.filter(item => item.id !== id));
    }, [ordersId])
    return (
        <orderContext.Provider
            value={{ products: ordersId, addingProduct, removeProduct }}
        >
            {children}
        </orderContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(orderContext);
    return context;
}
