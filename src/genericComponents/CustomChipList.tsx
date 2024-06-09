import { Chip } from '@mui/material';

interface CustomChipProps {
  text: string;
  textColour?: string;
  fillColour?: string;
}

function CustomChip({ text, fillColour, textColour }: CustomChipProps) {
  return (
    <Chip
      label={text}
      sx={{
        backgroundColor: fillColour,
        color: textColour,
        borderRadius: 0,
        margin: '2px'
      }}
    />
  );
}

export default CustomChip;