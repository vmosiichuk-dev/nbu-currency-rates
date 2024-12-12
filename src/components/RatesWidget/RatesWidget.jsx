import { bool, func } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { useDateSearchParams } from '@hooks/useDateSearchParams';
import { Stack, Box, Typography } from '@mui/material';
import { RateList } from '@components/RateList/RateList';
import { RateListStatus } from '@components/RateList/RateListStatus';

export const RatesWidget = ({
    hideExtraColumns = false,
    RateListControls = null,
}) => {
    const { isMediaSM, isMediaLG } = useBreakpoints();
    const { displayDate, isInvalidDate } = useDateSearchParams();

    const bannerBg = `
		https://images.unsplash.com/photo-1698248152617-55c4b9422b71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
	`;

    return (
        <Stack
            sx={{
                // m: '0 auto',
                height: '100%',
                width: 'fit-content',
                border: '8px solid',
                borderRadius: '24px',
                borderColor: 'transparent',
                backgroundColor: 'custom.new.semiTransparent',
            }}
        >
            <Stack
                direction={isMediaLG ? 'column' : 'row'}
                alignItems="center"
                justifyContent="center"
                sx={{
                    flexGrow: 1,
                    position: 'relative',
                    borderRadius: '20px',
                    backgroundColor: 'custom.new.bg',
                    backgroundImage: `url(${bannerBg})`,
                    backgroundPositionY: '-36%',
                    // backgroundSize: 'cover',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        background: '#130f1873',
                        borderRadius: '20px',
                        filter: 'blur(4px)',
                        zIndex: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            background: '#130f1873',
                            borderRadius: '20px',
                            filter: 'blur(4px)',
                            zIndex: 0,
                        }}
                    />
                </Box>
                <Typography
                    variant="documentTitle"
                    sx={{ whiteSpace: 'nowrap', zIndex: 1 }}
                >
                    Курси НБУ
                </Typography>
                {!isMediaSM ? (
                    <Typography
                        align="center"
                        variant="title"
                        sx={{ ml: { xs: '16px', md: 0 }, zIndex: 1 }}
                    >
                        {displayDate}
                    </Typography>
                ) : null}
            </Stack>
            <Stack
                sx={{
                    mt: 1,
                    borderRadius: '20px',
                    backgroundColor: 'custom.new.semiTransparent',
                    boxShadow: `
							inset 0px 0px 3px 1px rgba(85, 85, 85, 0.15),
							0px 0px 5px 1px rgba(0, 0, 0, 0.15)
						`,
                }}
            >
                {RateListControls && <RateListControls />}
                {isInvalidDate ? (
                    <RateListStatus
                        type="error"
                        textFirstLine="Неправильний формат дати"
                        textSecondLine="Оберіть дату ще раз"
                    />
                ) : (
                    <RateList hideExtraColumns={hideExtraColumns} />
                )}
            </Stack>
        </Stack>
    );
};

RatesWidget.propTypes = {
    hideExtraColumns: bool,
    RateListControls: func,
};
