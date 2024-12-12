import { object, bool } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { useRatesQuery } from '@api/useRatesQuery';
import { useDateSearchParams } from '@hooks/useDateSearchParams';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import { RateListItem } from './RateListItem';

export const RateList = ({ customRates, hideExtraColumns = false }) => {
    const { isMediaSM } = useBreakpoints();
    const { rates, ratesPending, topRates, ratesDiffer, todayDate } =
        useDateSearchParams();

    const todayRatesQuery = useRatesQuery(todayDate);
    const todayRates = todayRatesQuery?.rates;

    const todayRatesByCC = todayRates?.reduce((acc, rate) => {
        acc[rate.cc] = rate;
        return acc;
    }, {});

    const customRatesArray = customRates && Object.values(customRates);
    const ratesToMap =
        customRatesArray || (hideExtraColumns ? topRates : rates) || [];
    console.log({ ratesToMap, bool: hideExtraColumns ? rates : topRates });
    const rowsPerPage = 5;
    const rowHeight = 82;

    // const [page, setPage] = useState(0);
    // const handlePageChange = (_, newPage) => setPage(newPage);

    // const ratesWithPagination = ratesToMap?.slice(
    // 	page * rowsPerPage,
    // 	page * rowsPerPage + rowsPerPage
    // );

    const missingRowsCount = Math.max(
        0,
        rowsPerPage - (ratesToMap?.length || 0),
    );

    const emptyHeight = (rowHeight + 6) * missingRowsCount;

    const gridAreas =
        hideExtraColumns || isMediaSM
            ? `'currency rate'`
            : `'currency today difference rate'`;

    const showFullName = !isMediaSM || !hideExtraColumns;

    const showDiffColumns =
        (customRates || ratesDiffer) && !hideExtraColumns && !isMediaSM;

    const renderSkeletons = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <Skeleton
                key={`rate-skeleton-${i}`}
                width="100%"
                height={rowHeight}
                sx={{
                    transform: 'none',
                    animationDelay: `${i * 0.05}s`,
                    borderRadius: '9999px',
                    // mb: 'auto',
                }}
            />
        ));
    };

    return (
        <Stack
            alignItems="center"
            sx={{
                height: '100%',
                minWidth: '730px',
                borderRadius: '20px',
                // backgroundColor: 'custom.new.semiTransparent',
                // boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.15)',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateAreas: gridAreas,
                    gridTemplateColumns: `1fr ${showDiffColumns ? 'repeat(3, 117px)' : '117px'}`,
                    padding: '16px 28px',
                    borderBottom: '1px solid',
                    borderColor: 'custom.new.semiTransparent',
                }}
            >
                <Typography
                    variant="tableCellBold"
                    sx={{ gridArea: 'currency' }}
                >
                    Валюта
                </Typography>
                {showDiffColumns && (
                    <>
                        <Typography
                            align="center"
                            variant="tableCellBold"
                            sx={{ gridArea: 'today' }}
                        >
                            Сьогодні
                        </Typography>
                        <Typography
                            align="center"
                            variant="tableCellBold"
                            sx={{ gridArea: 'difference' }}
                        >
                            {customRates ? 'Критерій' : 'Різниця'}
                        </Typography>
                    </>
                )}
                <Typography
                    align="right"
                    variant="tableCellBold"
                    sx={{ ...(showDiffColumns ? { gridArea: 'rate' } : {}) }}
                >
                    Курс
                </Typography>
            </Box>
            {!ratesPending ? (
                <Stack
                    height="100%"
                    width="100%"
                    spacing={0.75}
                    sx={{
                        padding: 1,
                        overflowY: 'scroll',
                        maxHeight: (rowHeight + 6) * rowsPerPage + 10,
                    }}
                >
                    {ratesToMap?.map((rate) => {
                        const todayRate = todayRatesByCC
                            ? todayRatesByCC[rate.cc]?.rate
                            : null;
                        const rateDifference = rate.rate - todayRate;
                        return (
                            <RateListItem
                                key={rate?.cc}
                                rate={rate}
                                todayRate={ratesDiffer ? todayRate : null}
                                rateDifference={rateDifference}
                                hideExtraColumns={hideExtraColumns}
                                showFullName={showFullName}
                                gridAreas={gridAreas}
                            />
                        );
                    })}
                    {missingRowsCount > 0 && (
                        <Box sx={{ height: emptyHeight }} />
                    )}
                </Stack>
            ) : (
                <Stack height="100%" width="100%" spacing={0.75} sx={{ p: 1 }}>
                    {renderSkeletons(rowsPerPage)}
                </Stack>
            )}
        </Stack>
    );
};

RateList.propTypes = {
    customRates: object,
    hideExtraColumns: bool,
};
