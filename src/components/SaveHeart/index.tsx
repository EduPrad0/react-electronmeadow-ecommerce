import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import api from "../../services/api";

interface ISaveHeart {
  id_product: number;
}

interface LikedProducts {
  id_like: string | number;
  id_user_like_product: string | number;
}


export function SaveHeart ({id_product}: ISaveHeart) {
  const [ idLike, setIdLike ] = useState(-1);
  const [localStorageLikes, setLocalStorageLikes] = useState<LikedProducts[]>(() => {
    const oldS = localStorage.getItem("@meadow:liked_products")
    if(oldS) {
      return JSON.parse(oldS);
    }

    return {};
  })

  const { updateLikedProducts } = useAuth();

  async function handleLikedProduct () {
    try {
      const { data: responseData } = await api.post('/likes', {
        type: "add",
        id_product: Number(id_product)
      })

      if(responseData) {
        const item = {
          id_like: responseData.response.id,
          id_user_like_product: id_product
        }

        setLocalStorageLikes([...localStorageLikes, item])
        setIdLike(responseData.response.id)
        toast('Salvo com sucesso', {type: 'success'})
      }
    } catch (err) {
      toast('erro ao salvar produto, por favor tente novamente', {
        type: 'error'
      })
    }
  }


  async function handleRemoveProduct () {
    try {
      const { data: responseData } = await api.post('/likes', {
        type: "delete",
        id_product: idLike
      })

      if(responseData) {
        const itemRemoved = responseData.response.id_product;

        setLocalStorageLikes(oldState => oldState.filter(item => item.id_user_like_product !== itemRemoved))
        setIdLike(-1)
        toast('Removido com sucesso', {type: 'success'})
      }
    } catch (err) {
      toast('erro ao remover produto, por favor tente novamente', {
        type: 'error'
      })
    }
  }

  useEffect(() => {
    updateLikedProducts(JSON.stringify(localStorageLikes))
  }, [localStorageLikes])

  useEffect(() => {
    if(localStorageLikes?.find(item => item.id_user_like_product === id_product)){
      const data = localStorageLikes.find(item => item.id_user_like_product === id_product);
      setIdLike(Number(data?.id_like));
    }
  }, [])

  useEffect(() => {
    setLocalStorageLikes(JSON.parse(localStorage.getItem("@meadow:liked_products") || "[{}]"))
  }, [localStorage.getItem("@meadow:liked_products")])

  return idLike !== -1 
    ? <FavoriteIcon color="error" onClick={handleRemoveProduct} /> 
    : <FavoriteIcon color="disabled" onClick={handleLikedProduct}/>     
}