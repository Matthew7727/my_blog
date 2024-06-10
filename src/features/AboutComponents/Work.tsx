import { Grid, Card, CardContent, Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import CustomChip from "../../genericComponents/CustomChipList";
import FirebaseImage from "../../genericComponents/FirebaseImage";
import { WorkExperience } from "./WorkExperiences";

interface WorkProps {
    work: WorkExperience
}

function Work({work}: WorkProps) {
     return (
        <Grid item sm={6} sx={{padding:'5px'}}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    {work.logoUrl && <FirebaseImage imagePath={work.logoUrl} imageHeight="100px" />}
                                    <Box>
                                        <Typography variant="h6" component="div">{work.jobTitle}</Typography>
                                        <Typography variant="subtitle1" color="text.secondary">{work.company}</Typography>
                                        <Typography variant="subtitle2" color="text.secondary">{work.duration}</Typography>
                                        {location && <Typography variant="subtitle2" color="text.secondary">{work.location}</Typography>}
                                    </Box>
                                    <CustomChip fillColour="#2986cc" textColour="#FFFFFF" text={work.jobType} />
                                </Box>
                                <Typography variant="body1" component="div" gutterBottom>Responsibilities:</Typography>
                                <List>
                                    {work.responsibilities.map((r, index) => (
                                        <ListItem key={index} sx={{pl: 0}}>
                                            <ListItemText primary={`- ${r}`} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Typography variant="body1" component="div" gutterBottom>Skills:</Typography>
                                <List>
                                    {work.skills.map((s, index) => (
                                        <CustomChip fillColour="#e22222" textColour="#FFFFFF" text={s} key={index} />
                                    ))}
                                </List>
                                {work.technologies && 
                                <>
                                <Typography variant="body1" component="div" gutterBottom>Technologies:</Typography>
                                <List>
                                    {work.technologies.map((t, index) => (
                                        <CustomChip textColour="#000000" text={t} key={index} />
                                    ))}
                                </List>
                                </> }
                            </CardContent>
                        </Card>
                    </Grid>
     )

}

export default Work