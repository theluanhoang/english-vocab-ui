import { useTheme } from 'next-themes'
import Button from './atoms/Button'

function Navbar() {
    const { theme, setTheme } = useTheme()
    const onSwitchTheme = () => {
        if (theme == 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    return (
        <div>
            <h1>Từ Vựng Tiếng Anh</h1>
            <p>Theme: {theme}</p>
            <Button onClick={onSwitchTheme}>Toggle Xin chào các bạn</Button>
        </div>
    )
}

export default Navbar