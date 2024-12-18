import { string, bool } from 'prop-types';
import { Box, Stack, Skeleton } from '@mui/material';
import { usePalette } from '@hooks/usePalette.jsx';
import { ReactComponent as FlagFallback } from '@assets/flag-fallback.svg';

export const FlagIcon = ({ flag, flagPending, useBigFlag = false }) => {
    const { black50, whiteMain, navyMain } = usePalette();
    const flagBackgroundColor = !flag ? navyMain : black50;

    return (
        <>
            {!flagPending ? (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        height: useBigFlag ? '140px' : '50px',
                        width: useBigFlag ? '200px' : '50px',
                        borderRadius: useBigFlag ? '6px' : '100%',
                        overflow: 'hidden',
                        border: `1px solid ${black50}`,
                    }}
                >
                    <Box
                        component={!flag ? FlagFallback : 'img'}
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: !flag ? (useBigFlag ? '26px' : '6px') : 0,
                            objectFit: 'cover',
                            backgroundColor: flagBackgroundColor,
                            fill: whiteMain,
                            color: whiteMain,
                        }}
                        alt=""
                        src={flag ?? ''}
                    />
                </Stack>
            ) : (
                <Skeleton
                    width={50}
                    height={50}
                    sx={{ borderRadius: '100%', transform: 'none' }}
                />
            )}
        </>
    );
};

FlagIcon.propTypes = {
    flag: string,
    flagPending: bool.isRequired,
    useBigFlag: bool,
};
