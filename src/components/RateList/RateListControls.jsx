import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useState } from 'react';
import { usePalette } from '@hooks/usePalette';
import { useDateSearchParams } from '@hooks/useDateSearchParams';

import { Form, Formik } from 'formik';
import { Stack, TextField } from '@mui/material';
import { SearchDatePicker } from '@UI/SearchDatePicker/SearchDatePicker';

export const RateListControls = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { date, ratesPending, updateDate, isInvalidDate } =
        useDateSearchParams();

    const validationSchema = Yup.object().shape({
        date: Yup.date().nullable(),
    });

    const { blackMain, black200, black100, greenLight } = usePalette();

    const inputStyles = {
        '& .MuiInputBase-root': {
            width: '100%',
            height: '40px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
        },
        '& .MuiInputLabel-root': {
            color: blackMain,
            '&.Mui-focused': {
                color: blackMain,
            },
        },
        '& .MuiInputBase-input': {
            cursor: 'pointer',
            padding: '4px 14px 0',
            color: isInvalidDate ? black100 : blackMain,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: black200,
            borderWidth: '1px',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: greenLight,
            borderWidth: '1px',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: greenLight,
                borderWidth: '1px',
            },
    };

    return (
        <Formik
            initialValues={{ date }}
            validationSchema={validationSchema}
            onSubmit={(_, { setSubmitting }) => setSubmitting(true)}
        >
            {({ isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                    <Stack
                        sx={{
                            px: 2.5,
                            height: '40px',
                            width: '100%',
                            margin: '32px 0 16px',
                            // width: isMediaSM ? '100%' : '340px',
                            // margin: '32px auto -32px',
                        }}
                    >
                        <Stack
                            spacing={{ xs: 2, md: 3 }}
                            direction={{ md: 'row' }}
                        >
                            <TextField
                                label="Пошук по назві"
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                disabled={isSubmitting || ratesPending}
                                sx={inputStyles}
                            />
                            <SearchDatePicker
                                disableFuture
                                name="date"
                                value={dayjs(date)}
                                inputStyles={inputStyles}
                                disabled={isSubmitting || ratesPending}
                                onChange={(date) => updateDate(date)}
                            />
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
