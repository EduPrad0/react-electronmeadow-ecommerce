import { Grid } from "@mui/material";
import { CardItem } from "./CardItem";

import CircularProgress from '@mui/material/CircularProgress';


export interface IProduct {
  id: number;
  url_image: string;
  description: string;
  pricing: string;
  how_many_times: number;
  total_avaliation: number;
  quantity: number;
}

interface IProductProps {
  data?: IProduct[];
}

export function Products({ data }: IProductProps) {
  return (
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