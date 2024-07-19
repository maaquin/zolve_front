import toast from "react-hot-toast";
export const validateCvc = (number) => {
    const cvcNumber = Number(number);
    if (Number.isInteger(cvcNumber) && cvcNumber.length === 3) {
        toast('Invalid number', {
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