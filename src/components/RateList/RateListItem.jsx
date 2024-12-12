import { shape, string, number, bool } from 'prop-types';
import { useNavigateTransition } from '@hooks/useNavigateTransition';
import { usePalette } from '@hooks/usePalette';
import { useFlagQuery } from '@api/useFlagQuery';
import { useBreakpoints } from '@hooks/useBreakpoints';

import { ButtonBase, Box, Stack, Typography } from '@mui/material';
import { HigherLowerToggle } from '@UI/HigherLowerToggle/HigherLowerToggle';
import { FlagIcon } from '@UI/FlagIcon/FlagIcon';

export const RateListItem = ({
    rate,
    todayRate,
    rateDifference,
    showFullName,
    hideExtraColumns = false,
}) => {
    const navigate = useNavigateTransition();
    const { black300 } = usePalette();
    const { isMediaSM, isMediaLG } = useBreakpoints();
    const { flag, flagPending } = useFlagQuery(rate?.cc);

    const customRateDifference = rate?.rate - rate?.customRate;
    const currencyColumnMinWidth = showFullName
        ? isMediaLG
            ? '282px'
            : '262px'
        : '102px';

    const setColorBasedOnRateDifference = (rateDifference) => {
        let color = 'black';
        if (rateDifference > 0) color = 'success';
        if (rateDifference < 0) color = 'error';
        return color;
    };

    const formatDifference = (diff) => {
        if (diff === 0) return '–';

        if (diff > 100 || diff < -100) {
            return diff.toFixed(0);
        } else {
            return diff.toPrecision(3);
        }
    };

    return (
        <ButtonBase
            onClick={() => navigate(`/currency/${rate.cc}`)}
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                borderRadius: '9999px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 20px',
                minHeight: '82px',
                '&:hover, &.Mui-focusVisible': {
                    backgroundColor: 'custom.new.semiTransparent',
                },
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                width="100%"
                sx={{ minWidth: currencyColumnMinWidth }}
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minWidth: 50, overflowY: 'hidden' }}
                >
                    <FlagIcon flag={flag} flagPending={flagPending} />
                </Stack>
                <Stack
                    // justifyContent="center"
                    alignItems="flex-start"
                    sx={{ width: '100%', overflowY: 'hidden' }}
                >
                    {showFullName ? (
                        <Typography
                            variant="tableCell"
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 1,
                                // maxWidth: { xs: '180px', md: '222px' },
                            }}
                        >
                            {rate?.txt}
                        </Typography>
                    ) : null}
                    <Typography variant="body" color="custom.new.300">
                        {rate?.cc}
                    </Typography>
                </Stack>
            </Stack>
            {!hideExtraColumns &&
            !isMediaSM &&
            (todayRate || rate?.customRate) ? (
                <>
                    <Box sx={{ minWidth: '117px' }}>
                        <Typography
                            align="center"
                            variant="tableCell"
                            sx={{ color: black300 }}
                        >
                            {todayRate || rate?.rate}
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: '117px' }}>
                        <Typography
                            align="center"
                            variant="tableCell"
                            color={`${setColorBasedOnRateDifference(
                                rateDifference || customRateDifference,
                            )}.main`}
                        >
                            {rate?.customRate ? (
                                <HigherLowerToggle
                                    currencyCode={rate?.cc}
                                    notifyOnHigherRate={
                                        rate?.notifyOnHigherRate ?? true
                                    }
                                />
                            ) : (
                                formatDifference(rateDifference)
                            )}
                        </Typography>
                    </Box>
                </>
            ) : null}
            <Box align="right" sx={{ minWidth: '117px' }}>
                <Typography variant="tableCell">
                    {rate?.customRate || rate?.rate}
                </Typography>
            </Box>
        </ButtonBase>
    );
};

RateListItem.propTypes = {
    rate: shape({
        cc: string,
        txt: string,
        rate: number,
    }),
    todayRate: number,
    rateDifference: number,
    hideExtraColumns: bool,
    showFullName: bool,
};
