import { FormControlLabel, Grid, Typography } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import api from "../../services/api";
import { Navbar } from "../../components/Navbar"
import { IProduct, Products } from "../../components/Products";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { FILTERS_TYPES } from "./filters";

const PER_PAGE = 20;

export function ContentsProducts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState<IProduct[] | undefined>([] as IProduct[]);
  const [data, setData] = useState<IProduct[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async() => {
      try {
        const response = await api.get("api/products" + window.location.pathname); 
        setData(response.data);
      } catch (e) {
        setIsError(true);
      }
    })()
  }, [window.location.pathname])

  useEffect(() => {
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
              {
                FILTERS_TYPES.map((_, i) => (
                  <FormControlLabel value={_.value} key={i} control={<Radio />} label={_.label} />
                ))
              }
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
          count={Math.trunc(data ? data?.length / PER_PAGE : 1)}
          page={currentPage}
          onChange={(e, v) => setCurrentPage(v)}
        />
      </Grid>
    </Grid>
  )
}