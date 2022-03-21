import { Grid } from "@mui/material";
import { CardItem } from "./CardItem";

import CircularProgress from '@mui/material/CircularProgress';


export interface IProduct {
  id: string;
  is_favorited: boolean;
  url_image: string;
  description: string;
  pricing: string;
  how_many_times: string | number;
  avaliation: number;
  total_avaliation: number;
  comments?: string;
}

interface IProductProps {
  data?: IProduct[];
  isFetching?: boolean;
}

export function Products({ data, isFetching }: IProductProps) {
  return isFetching
    ?
    <Grid
      display="flex"
      justifyContent="center"
      mr="220px"
      mt="1rem"
    >
      <CircularProgress />
    </Grid>
    : (
      <>
        <Grid>
          <Grid
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            {
              data?.map((item) => (
                <Grid key={item.id + " product"} mx="0.7rem" my="1rem">
                  <CardItem data={item} />
                </Grid>
              )
              )
          }
          </Grid>
        </Grid>

      </>
    );
}