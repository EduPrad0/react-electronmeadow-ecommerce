import { Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { IProduct } from '../../components/Products'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import api from "../../services/api";
import { useOrders } from "../../hooks/useOrder";

const sizes = [
    'P', 'M', 'G', 'GG', 'XG', 'XGG'
]

export function Checkout() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const navigation = useNavigate()
    const { addingProduct } = useOrders();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/checkout/' + id)

                setProduct(response.data)

            } catch (err) {
                navigation('/')
            }
        })()
    }, [])

    return (
        <Grid>
            <Navbar />
            <Grid
                container
                spacing={2}
                justifyContent="center"
                mt="4rem"
            >
                <Grid
                    item
                    xs={5}
                >
                    <img width="400px" src={product.url_image} alt="product" />
                    <Grid>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            maxWidth="450px"
                            textAlign="center"
                        >
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={5}
                >
                    <Grid>

                        <Typography
                            variant="h5"
                            fontFamily="-moz-initial"
                            fontWeight="bold"
                        >
                            {product.description}
                        </Typography>


                        <Typography
                            mb="1rem"

                        >
                            Code : {id}
                        </Typography>
                        <Divider />
                        <Typography
                            variant="body1"
                        >
                            Selecione a opção de Tamanho:

                        </Typography>
                        <Grid
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            mt="0.5rem"
                        >
                            {
                                sizes.map((item, index) => (

                                    <Typography
                                        bgcolor="#63c58e"
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-around"
                                        color="white"
                                        fontWeight="bold"
                                        padding="0 0.5rem"
                                    >
                                        {item}
                                    </Typography>
                                ))
                            }
                        </Grid>

                        <Typography
                            mt="1rem"
                            variant="body1"
                            display="flex"
                            alignItems="center"
                        >
                            {product.how_many_times}X de  <Typography variant="h5" ml="4px" fontWeight="bold"> R$ {(Number(product.pricing) / Number(product.how_many_times) + "")?.replace(".", ",")}</Typography>
                        </Typography>

                        <Typography
                            mt="2rem"
                            variant="h5"
                            fontWeight="bold"
                        >
                            Total : R$ {product.pricing?.replace(".", ",")}
                        </Typography>

                    </Grid>
                    <Grid
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt="2rem"
                    >
                        <Button variant="contained" onClick={() => addingProduct(product.id)}> <AddShoppingCartIcon style={{marginRight: "10px"}}/> Adicionar ao carrinho</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}