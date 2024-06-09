import { Divider, Grid } from "@mui/material";
import IntroQuestion from "../features/introQuestion/IntroQuestion";
import QuestionResultsTable from "../features/introQuestion/QuestionResultsTable";

function Home() {
    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '16px'}}>
            <Grid item justifyContent='flex-start' alignItems='center' xs={12}>
                <IntroQuestion />
            </Grid>
            <Divider  />
            <Grid item justifyContent='flex-start' alignItems='center' xs={12}>
                <QuestionResultsTable />
            </Grid>
        </Grid>

    )
}
export default Home;