import { Stack } from '@mui/material';
import { NavigationLink } from './NavigationLink';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { HEADER_LINKS } from '@constants/links';

export const Navigation = () => {
    const { isMediaLG } = useBreakpoints();

    return (
        <Stack
            spacing={2.5}
            direction={isMediaLG ? 'column' : 'row'}
            sx={{
                position: 'fixed',
                bottom: { xs: 0, md: 'auto' },
                left: { xs: '50%', md: 'auto' },
                transform: { xs: `translateX(-50%)`, md: 'none' },
                margin: { xs: '24px 0', md: '24px' },
                zIndex: (theme) => theme.zIndex.appBar + 3,
                backgroundColor: 'custom.new.nonTransparentBg',
                borderRadius: '9999px',
                padding: '4px',
            }}
        >
            {Object.values(HEADER_LINKS).map((link) => (
                <NavigationLink key={link.key} linkData={link} />
            ))}
        </Stack>
    );
};
