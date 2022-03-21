import { Grid } from "@mui/material"
import { Navbar } from "../Navbar"

interface ILayout {
  children: React.ReactNode
}

export function Layout ({children}: ILayout) {
  return (
    <Grid>
      <Navbar />
      <Grid>
        {children}
      </Grid>
    </Grid>
  )
}