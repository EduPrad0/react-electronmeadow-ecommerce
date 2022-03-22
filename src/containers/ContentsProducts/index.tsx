import { FormControlLabel, Grid, Typography } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useQuery, useQueryClient, } from "react-query";
import api from "../../services/api";
import { Navbar } from "../../components/Navbar"
import { IProduct, Products } from "../../components/Products";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';



export function ContentsProducts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState<IProduct[] | undefined>([] as IProduct[]);
  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery<IProduct[]>(
    // "product_" + window.location.pathname.replace('/', ''),
    "teste",
    async () => {
      const response = await api.get("getProducts" + window.location.pathname);
      return response.data;
    }
  );

  useEffect(() => {
    console.log( "product_" + window.location.pathname.replace('/', ''))
    // total de paginas
    const tps = Math.ceil(data ? data?.length / 20 : 1)

    if (data) {
      const initialPage = currentPage === 1 ? 0 : currentPage * 20;
      const endPage = tps === currentPage ? initialPage + (data.length - initialPage) : initialPage + 20;
      setPages(data.slice(initialPage, endPage))
    }
  }, [currentPage, data])

  function comparePricing(products: any) {
    const newArray = products.sort(function compare(a:any, b:any) {
      const ap = Number(a.pricing.replace(",", "."))
      const bp = Number(b.pricing.replace(",", "."))
      if (ap < bp)
        return -1;
      if (ap > bp)
        return 1;
      return 0;
    })

    return newArray;
  }

  return (
    <Grid
    >
      <Navbar />
      <Grid>
        <Typography
          variant="h3"
          fontWeight="bold"
          textTransform="capitalize"
          textAlign="center"
        >
          {window.location.pathname.replace("/", "")} 
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={2} >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
          >
            Filtros
          </Typography>

          <Grid
            display="flex"
            justifyContent="center"
            pt="1rem"
          >
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue="more_popular"
            >
              <FormControlLabel value="more_popular" control={<Radio />} label="More popular" />
              <FormControlLabel value="biggest_price" control={<Radio />} label="Biggest price" />
              <FormControlLabel value="lowest_price" control={<Radio />} label="Lowest price" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {
            isError 
            ? <Typography 
              variant="h5" 
              fontWeight="bold"
              textAlign="center"
            >
                Ocorreu um erro ao buscar os produtos
            </Typography> 
            : 
            <Products
              data={pages}
              isFetching={isFetching}
            />
          }
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        pb="5rem"
      >
        <Pagination
          count={Math.trunc(data ? data?.length / 20 : 1)}
          page={currentPage}
          onChange={(e, v) => setCurrentPage(v)}
        />
      </Grid>
    </Grid>
  )
}