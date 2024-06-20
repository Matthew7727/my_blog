import { Typography } from "@mui/material";
import DailyCodingChallengesTable from "../features/CodingChallengeComponents/ChallengeTable";

function DailyCodingChallenges() {
    return (
        <>
            <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center', fontFamily: 'inter', fontWeight: 'bold' }}>
                Daily Coding Challenges
            </Typography>
            <DailyCodingChallengesTable />
        </>
    )
}

export default DailyCodingChallenges;