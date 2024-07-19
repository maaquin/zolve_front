import toast from "react-hot-toast";

export const validateExpiryDate = (date) => {
    const [month, year] = date.split('/');

    if (!month || !year || month.length !== 2 || year.length !== 2) {
        toast('Invalid date format', {
            icon: '❌',
            style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
        });
        return false;
    }

    const monthNumber = Number(month);
    const yearNumber = Number('20' + year);  // Convert 2-digit year to 4-digit year

    if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        toast('Invalid month', {
            icon: '❌',
            style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
        });
        return false;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns month index (0-11), so we add 1

    if (yearNumber < currentYear || (yearNumber === currentYear && monthNumber < currentMonth)) {
        toast('Expiry date is in the past', {
            icon: '❌',
            style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
        });
        return false;
    }

    return true;
}