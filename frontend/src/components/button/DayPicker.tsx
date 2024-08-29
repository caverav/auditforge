import { Box, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import React from 'react';

type DayPickerProps = {
  label: string;
  selectedDay: Dayjs | null;
  onChange: React.Dispatch<React.SetStateAction<Dayjs | null>>;
};

const DayPicker: React.FC<DayPickerProps> = ({
  label,
  selectedDay,
  onChange,
}) => {
  const customTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        paper: '#1e1e2e',
        default: '#1e1e2e',
      },
      text: {
        primary: '#ffffff',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#1d2432',
            '& .MuiInputBase-input': {
              color: '#ffffff',
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#1d2432',
              },
              '&:hover fieldset': {
                borderColor: '#1d2432',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1d2432',
              },
              '& .MuiFormLabel-root': {
                color: '#ffffff',
                '&.Mui-focused': {
                  color: '#ffffff',
                },
              },
            },
          },
        },
      },
    },
  });

  const handleDayChange = (value: Dayjs | null) => {
    value && onChange(value);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 2 }}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            label={label}
            onChange={handleDayChange}
            renderInput={params => (
              <TextField {...params} size="small" sx={{ minWidth: 200 }} />
            )}
            value={selectedDay}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DayPicker;
