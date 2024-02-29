import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 60,
    },
  },
  palette: {
     black: '#000',
     red:"#d50000",
     green: "#2e7d32",
     brown:"#FDFAF5",
     gray:"#BEBEBE"
  },
});
 
