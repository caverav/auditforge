import { Box, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { GetCustomFieldType } from '../../../../../services/data';

type DayPickerProps = {
  label: string;
  setCurrentCustomFields: React.Dispatch<
    React.SetStateAction<GetCustomFieldType[]>
  >;
  id: string;
  text?: string;
  currentLanguage: string;
};

const DayPickerCustom: React.FC<DayPickerProps> = ({
  label,
  setCurrentCustomFields,
  id,
  text,
  currentLanguage,
}) => {
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(
    text ? dayjs(text) : null,
  );

  useEffect(() => {
    setSelectedDay(text ? dayjs(text) : null);
  }, [text]);

  const onChange = (item: Dayjs) => {
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(itemIter =>
                itemIter.locale === currentLanguage
                  ? {
                      locale: itemIter.locale,
                      value: dayjs(item).format('YYYY-MM-DD'),
                    }
                  : itemIter,
              ),
            }
          : field,
      );
    });
  };

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

export default DayPickerCustom;
