import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface SkillsListProps {
    title: string
    skills: string[]
}
const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 0,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function SkillsList({ skills, title}: SkillsListProps) {
    return (
        <List sx={style}>
        <Typography variant="subtitle2" sx={{padding:'10px', fontFamily:'inter', fontWeight:'bold', fontSize:'20px', alignSelf:'center'}}>{title}</Typography>
            {skills.map((skill) => (
                <>
                    <ListItem>
                        <ListItemText primary={skill} sx={{fontFamily:'inter'}} />
                    </ListItem>
                </>
            ))}
        </List>
    )
}

export default SkillsList