import { Box, Typography, Chip, Stack, Link as MuiLink } from "@mui/material";
import { GitHub } from '@mui/icons-material';
import { GitHubRepo } from "./githubAPI";
import { FirestoreProject } from "./firestoreAPI";
import FirebaseImage from "../../genericComponents/FirebaseImage";

interface ProjectDetailsProps {
    repoDetails: GitHubRepo;
    repoLanguages: string[];
    firestoreProject: FirestoreProject
}

function ProjectDetails({ repoDetails, repoLanguages, firestoreProject }: ProjectDetailsProps) {
    return (
        <Box>
            <Stack direction={'row'} alignItems="center" mb={2} spacing={2}>
                <FirebaseImage imagePath={firestoreProject.imageUrl} imageHeight="150px" />
                <Stack direction={'column'} spacing={0}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
                        <Typography variant="h6" sx={{ fontFamily: 'inter', fontWeight: 'bold' }}>{firestoreProject.name} / </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'inter' }}>{repoDetails.name}</Typography>
                    </Stack>
                    <Typography variant="subtitle1">Created on: {new Date(repoDetails.created_at).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Last commit on: {new Date(repoDetails.pushed_at).toLocaleDateString()}</Typography>
                </Stack>
            </Stack>
            <Typography variant="body1" mb={2}>{firestoreProject.projectDescription}</Typography>
            <Box mb={2}>
                {repoLanguages.map((language, index) => (
                    <Chip key={index} label={language} sx={{ margin: 0.5 }} />
                ))}
            </Box>
            <Stack direction="row" spacing={2} mb={2}>
                <MuiLink href={repoDetails.html_url} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                    <GitHub sx={{ marginRight: 0.5 }} />
                    View Source Code
                </MuiLink>
                {/* <MuiLink href="#" target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FileDownload sx={{ marginRight: 0.5 }} />
                    Download File
                </MuiLink> */}
            </Stack>
        </Box>
    );
}

export default ProjectDetails;