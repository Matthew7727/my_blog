import { Grid, Card, CardContent, Box, Typography, List, ListItem, ListItemText, Stack } from "@mui/material";
import CustomChip from "../../genericComponents/CustomChipList";
import FirebaseImage from "../../genericComponents/FirebaseImage";
import { WorkExperience } from "./WorkExperiences";

interface WorkProps {
    work: WorkExperience
}

function Work({ work }: WorkProps) {
    return (
        <Grid item sm={6} sx={{ padding: '5px' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        {work.logoUrl && <FirebaseImage imagePath={work.logoUrl} imageHeight="100px" />}
                        <Stack direction='row' spacing={1}>
                            <CustomChip fillColour="#2986cc" textColour="#FFFFFF" text={work.jobType} />
                            {work.current && <CustomChip fillColour="#2986cc" textColour="#FFFFFF" text="Current Role" />}
                        </Stack>

                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontFamily: 'inter', fontWeight: 'bold' }} component="div">{work.jobTitle}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{work.company}</Typography>
                        {work.department && <Typography variant="subtitle1" color="text.secondary">{work.department}</Typography>}
                        <Typography variant="subtitle2" color="text.secondary">{work.duration}</Typography>
                        {work.location && <Typography variant="subtitle2" color="text.secondary">{work.location}</Typography>}
                    </Box>
                    <Typography variant="body1" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold' }} gutterBottom>Responsibilities:</Typography>
                    <List sx={{ padding: 0, margin: 0 }}>
                        {work.responsibilities.map((r, index) => (
                            <ListItem key={index} sx={{ pl: 0, py: 0 }}>
                                <ListItemText primary={`- ${r}`} sx={{ margin: 0 }} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold' }} gutterBottom>Skills:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {work.skills.map((s, index) => (
                            <CustomChip fillColour={work.colour} textColour="#FFFFFF" text={s} key={index} />
                        ))}
                    </Box>
                    {work.technologies &&
                        <>
                            <Typography variant="body1" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold' }} gutterBottom>Technologies:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {work.technologies.map((t, index) => (
                                    <CustomChip textColour="#000000" text={t} key={index} />
                                ))}
                            </Box>
                        </>
                    }
                </CardContent>
            </Card>
        </Grid>
    )

}

export default Work