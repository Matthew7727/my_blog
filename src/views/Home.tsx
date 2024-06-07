import { Divider, Grid } from "@mui/material";
import IntroQuestion from "../features/introQuestion/IntroQuestion";

function Home() {
    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '16px'}}>
            <Grid item justifyContent="flex-start" alignItems="center">
                <IntroQuestion />
            </Grid>
            <Divider />
        </Grid>

    )
}
export default Home;