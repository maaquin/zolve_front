import toast from "react-hot-toast";
export const validateNumberCard = (number) => {
    const cardNumber = Number(number);
    if (Number.isInteger(cardNumber) && cardNumber.length === 16) {
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