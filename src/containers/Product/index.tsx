import { Button, Grid, Typography } from "@mui/material";
import { links } from '../../components/Navbar/links'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { IProduct } from '../../components/Products'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import api from "../../services/api";
import { useOrders } from "../../hooks/useOrder";
import { SelectQuantity } from "../../components/SelectQuantity";
import { SaveHeart } from "../../components/SaveHeart";

interface IItemAdditional {
    icon: any;
    text: string;
}

export function Product() {
    const { id, category } = useParams();
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [selected, setSelected] = useState<string | number>(1);
    const navigation = useNavigate()
    const { addingProduct, products: orders_products } = useOrders();

    useEffect(() => {
        (async () => {
            if((category && !JSON.stringify(links).includes(category)) && !window.location.pathname.includes('orders')){
                navigation('/')
            } 
            try {
                const response = await api.get('/api/product/' + id)
                setProduct(response.data)
            } catch (err) {
                navigation('/')
            }
        })()
    }, [])

    const ItemsAdittionals = ({icon, text}:IItemAdditional) => (
        <Grid
            display="flex"
            m="1rem"
        >
            <Grid>{icon}</Grid>
            <Grid>
                <Typography
                    variant="h6"
                    fontWeight="regular"
                    color="#00a650"
                    fontSize="16px"
                    ml="15px"
                >
                    {text}
                </Typography>
            </Grid>  
        </Grid>
    )

    return (
        <Grid
        >
            <Navbar />
            <Grid
                bgcolor="#ededed"
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding="0 5rem 15rem"
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="0.9rem"
                    ml="4rem"
                    display="flex"
                    color="rgba(0,0,0,0.5)"
                >
                    electronmeadow/{category}/{product.description}
                </Typography>

                <Grid
                    mt="1rem"
                    bgcolor="white"
                    borderRadius="10px"
                    container
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width="100%"
                >

                    <Grid
                        item
                        sm={7}
                    >
                        <Grid
                            height="544px"
                            width="544px"
                        >
                            <img height="544px" src={product.url_image} />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        sm={3}
                        border="1px solid rgba(0,0,0,.1)"
                        borderRadius="10px"
                        my="3rem"
                    >
                        <Grid>

                            <Grid
                                display="flex"
                                justifyContent="space-between"
                                sx={{cursor: 'pointer'}}
                            >
                                <Typography
                                    variant="body1"
                                    color="gray"
                                    fontSize="0.8rem"
                                    ml="10px"
                                    mt="5px"
                                >
                                    Novo | 15 vendidos
                                </Typography>
                                <SaveHeart id_product={product.id} />
                            </Grid>
                            <Typography
                                variant="h6"
                                style={{ wordBreak: 'break-all' }}
                                p="1rem"
                            >
                                {product.description}
                            </Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            mt="1rem"
                            ml="15px"
                        >
                            <Typography
                                variant="h6"
                                fontSize="2rem"
                                fontWeight="300"
                            >
                                R$ {product?.pricing?.split(".")[0]}
                            </Typography>

                            <Typography
                                variant="h6"
                                fontSize="1.5rem"
                                fontWeight="300"

                            >
                                {product?.pricing?.split(".")[1]}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography
                                ml="15px"
                                mt="-10px"
                                variant="h6"
                                display="flex"
                                fontWeight="regular"
                            >
                                em <Typography ml="5px" variant="body1" fontSize="1.25rem" color="#29c56f">{product.how_many_times}x R$ {(Number(product.pricing) / product.how_many_times).toFixed(2).replace(".", ",")} sem juros</Typography>
                            </Typography>
                        </Grid>

                        <ItemsAdittionals icon={<LocalShippingOutlinedIcon color="success"/>} text="Chegar?? gr??tis ter??a-feira"/>
                        <ItemsAdittionals icon={<StorefrontOutlinedIcon color="success"/>} text="Retire gr??tis a partir de ter??a-feira em uma ag??ncia Mercado Livre"/>

                        <Grid>
                            <SelectQuantity
                                items={
                                    product.quantity 
                                    ? Array(product.quantity + 1).fill(null).map((v,i) => i + 1) 
                                    : [0, 1]
                                }
                                onChange={(e) => setSelected(e)}
                                selected={selected}
                            />
                        </Grid>

                        <Grid
                            display="flex"
                            flexDirection="column"
                            padding="0 1rem"
                            my="1rem"
                        >
                            <Button 
                                variant="contained" 
                                onClick={() => navigation('/checkoutPayment')}
                            >
                                Comprar agora
                            </Button>
                            <Button 
                                variant="outlined" 
                                sx={{marginTop: "1rem"}}
                                onClick={() => addingProduct({
                                    id: product.id,
                                    quantity: Number(selected)
                                })}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}