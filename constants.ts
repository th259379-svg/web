import { ChartIcon, DashboardIcon, InventoryIcon, ProductIcon, PurchaseIcon, ReportIcon, SalesIcon, SettingsIcon, OrderIcon } from './components/icons';
// FIX: Corrected import path.
import { Currency } from './types';

export const NAV_LINKS = [
    { href: '/', labelKey: 'dashboard', icon: DashboardIcon },
    { href: '/products', labelKey: 'products', icon: ProductIcon },
    { href: '/sales', labelKey: 'sales', icon: SalesIcon },
    { href: '/purchases', labelKey: 'purchases', icon: PurchaseIcon },
    { href: '/orders', labelKey: 'orders', icon: OrderIcon },
];

export const REPORT_LINKS = [
    { href: '/reports/inventory', labelKey: 'inventoryReport', icon: InventoryIcon },
    { href: '/reports/sales', labelKey: 'salesReport', icon: ReportIcon },
    { href: '/reports/purchases', labelKey: 'purchaseReport', icon: ChartIcon },
    { href: '/reports/orders', labelKey: 'orderReport', icon: ReportIcon },
];

export const SETTINGS_LINK = { href: '/settings', labelKey: 'settings', icon: SettingsIcon };


export const LANGUAGES: { code: 'en' | 'my' | 'th'; name: string; flag: string; short: string; }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', short: 'EN' },
    { code: 'my', name: 'မြန်မာ', flag: '🇲🇲', short: 'MY' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', short: 'TH' },
];

export const DEFAULT_CURRENCY: Currency = { symbol: '$', position: 'prefix' };