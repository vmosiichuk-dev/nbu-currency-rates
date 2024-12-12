import dayjs from 'dayjs';
import { useRoutes } from 'react-router-dom';
import { useHistoryTransitions } from '@hooks/useHistoryTransitions';
import { capitalize } from '@utils/capitalize';
import { routes } from '@routes/routes';

function App() {
    const element = useRoutes(routes);

    const modifyDayjsLocale = () => {
        const modifiedLocale = dayjs.Ls['uk'];
        const initialLocaleMonths = modifiedLocale.months;

        modifiedLocale.months = (month) =>
            capitalize(initialLocaleMonths(month));
        modifiedLocale.monthsShort = modifiedLocale.monthsShort.map(capitalize);
        modifiedLocale.weekdaysMin = modifiedLocale.weekdaysMin.map(capitalize);

        dayjs.Ls['uk'] = modifiedLocale;
    };

    modifyDayjsLocale();
    useHistoryTransitions();

    return <>{element}</>;
}

export default App;
