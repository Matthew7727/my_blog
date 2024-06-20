import { Grid } from "@mui/material";
import IntroQuestion from "../features/IntroQuestion/IntroQuestion";


function Home() {
    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '16px'}}>
            <Grid item justifyContent='flex-start' alignItems='center' xs={12}>
                <IntroQuestion />
            </Grid>
        </Grid>

    )
}
export default Home;