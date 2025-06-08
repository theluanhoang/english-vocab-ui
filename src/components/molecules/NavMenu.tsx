import { useNavItems } from '@/hooks/useNavItems';
import NavItem from '../atoms/NavItem';

function NavMenu() {
    const NAV_SUB_ITEMS = useNavItems();

    return (
    <span className={`flex items-center gap-6`}>
        <NavItem>Bộ sưu tập</NavItem>
        <NavItem subItems={NAV_SUB_ITEMS.practices}>Luyện tập</NavItem>
        <NavItem subItems={NAV_SUB_ITEMS.vocabularies}>Từ vựng</NavItem>
        <NavItem>Đăng nhập</NavItem>
    </span>
  )
}

export default NavMenu