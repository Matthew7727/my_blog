import { Typography, IconButton } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Contact() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:matthew.eccleston17@gmail.com';
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/matthew-e-8a0174196/', '_blank');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        component="div" 
        sx={{ marginBottom: 4, textAlign: 'center', fontFamily: 'inter', fontWeight: 'bold' }}
      >
        Contact
      </Typography>
      <IconButton 
        color="primary" 
        onClick={handleEmailClick}
        sx={{ marginRight: 2 }}
      >
        <EmailIcon />
      </IconButton>
      <IconButton 
        color="primary" 
        onClick={handleLinkedInClick}
      >
        <LinkedInIcon />
      </IconButton>
    </div>
  );
}

export default Contact;