import { Typography, Box } from "@mui/material";
import TechCards from "./TechCard";
import OtherTech from "./OtherTech";
// import Skills from "./Skills";

function AboutSkillsAnExpertise() {
    return (
        <>
            <Typography variant='h5' noWrap sx={{ fontFamily: 'inter', color: 'black', paddingTop: '50px' }}>
                Key Skills & Expertise
            </Typography>
            <Box>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                    Key Programming Languages, Frameworks & DB's
                </Typography>
                <TechCards />
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                    Others 
                </Typography>
                <OtherTech />
                {/* <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                    Skills 
                </Typography>
                <Skills /> */}
            </Box>
        </>
    )
}

export default AboutSkillsAnExpertise