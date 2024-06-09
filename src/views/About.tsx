import { Box, Stack } from "@mui/material";
import AboutBackground from "../features/AboutComponents/AboutBackground";
import AboutSkillsAnExpertise from "../features/AboutComponents/AboutSkillsAnExpertise";
import Introduction from "../features/AboutComponents/Introduction";
import WorkExperiences from "../features/AboutComponents/WorkExperiences";

function About() {
    return (
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Introduction />
            <Box>
                <AboutBackground />
                <AboutSkillsAnExpertise />
                <WorkExperiences />
            </Box>
        </Stack>

    )
}

export default About;