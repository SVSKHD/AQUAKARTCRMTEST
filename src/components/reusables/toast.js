import toast from "react-hot-toast"
const AquaToast = (message, error) => {
    let emoji = error ? '❗' : '👏'
    toast(message,
        {
            icon: emoji,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        }
    );
}
export default AquaToast


