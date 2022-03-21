import { Grid, Typography } from '@mui/material'
import ImagePromotion from '../../assets/img/imageHome.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function Home () {
  return (
    <Grid
      mt="3rem"
      container
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
    <Grid item xs={6} ml="1rem">
      <Typography 
        variant="h1"
        fontWeight="bold"
        color="#23003e"
      >
        Compre com segurança e agilidade
      </Typography>

      <Grid
        bgcolor="#9100fb"
        display="flex"
        alignItems="center"
        justifyContent='space-around'
        width="300px"
        borderRadius="10px"
        padding="1rem"
        mt="0.6rem"
        sx={{cursor: 'pointer'}}
      >
        <Typography 
          variant="h5"
          color="#fff"
        >
          Comece as compras

        </Typography>
          <PlayArrowIcon color="warning"/>
      </Grid>
    </Grid>
     <Grid item xs={5}>
      <img width="80%" src={ImagePromotion} />
     </Grid>
    </Grid>
  )
}