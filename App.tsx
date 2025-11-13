import React, { useState, ReactNode, useEffect, PropsWithChildren } from 'react';
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';

import { useAppContext } from './hooks/useAppContext';
import { useLocalization } from './hooks/useLocalization';
import { Toaster } from './components/Toaster';

import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
// FIX: Corrected import path.
import Sales from './pages/Sales';
// FIX: Corrected import path.
import Purchases from './pages/Purchases';
// FIX: Corrected import path.
import Orders from './pages/Orders';
import InventoryReport from './pages/InventoryReport';
import SalesReport from './pages/SalesReport';
import PurchaseReport from './pages/PurchaseReport';
import OrderReport from './pages/OrderReport';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NAV_LINKS, REPORT_LINKS, SETTINGS_LINK } from './constants';

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void; }) => {
    const { t } = useLocalization();
    const location = useLocation();

    const renderLink = (link: { href: string; labelKey: string; icon: React.FC<{ className?: string }> }) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.href;
        return (
            <NavLink
                to={link.href}
                title={!isOpen ? t(link.labelKey as any) : undefined}
                onClick={() => { if (window.innerWidth < 1024 && isOpen) toggleSidebar(); }}
                className={`flex items-center text-sm font-medium transition-colors rounded-lg ${
                    isOpen ? 'w-full px-4 py-3' : 'w-14 h-14 justify-center'
                } ${
                    isActive ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300' : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="ml-3 whitespace-nowrap">{t(link.labelKey as any)}</span>}
            </NavLink>
        );
    };

    return (
        <aside className={`
            bg-white dark:bg-gray-800 border-r dark:border-gray-700
            transition-all duration-300 ease-in-out
            flex-shrink-0
            fixed lg:static inset-y-0 left-0 z-40
            ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}>
            <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden">
                <nav className="pt-20 lg:pt-4">
                     <div className={`space-y-1 ${isOpen ? 'm-2' : 'm-2'}`}>
                        {NAV_LINKS.map(link => <div key={link.href} className={!isOpen ? 'flex justify-center' : ''}>{renderLink(link)}</div>)}
                    </div>
                    
                    {isOpen ? (
                        <div className="mt-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('reports')}</div>
                    ) : (
                        <hr className="my-4 border-gray-300 dark:border-gray-600 w-12 mx-auto" />
                    )}

                    <div className={`space-y-1 ${isOpen ? 'm-2' : 'm-2'}`}>
                        {REPORT_LINKS.map(link => <div key={link.href} className={!isOpen ? 'flex justify-center' : ''}>{renderLink(link)}</div>)}
                    </div>
                    
                    {isOpen ? (
                        <div className="mt-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('settings')}</div>
                    ) : (
                        <hr className="my-4 border-gray-300 dark:border-gray-600 w-12 mx-auto" />
                    )}
                    <div className={`${isOpen ? 'm-2' : 'm-2'} ${!isOpen ? 'flex justify-center' : ''}`}>
                        {renderLink(SETTINGS_LINK)}
                    </div>
                </nav>
            </div>
        </aside>
    );
};


const PrivateLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {isSidebarOpen && window.innerWidth < 1024 && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleSidebar}></div>}
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/purchases" element={<Purchases />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/reports/inventory" element={<InventoryReport />} />
                        <Route path="/reports/sales" element={<SalesReport />} />
                        <Route path="/reports/purchases" element={<PurchaseReport />} />
                        <Route path="/reports/orders" element={<OrderReport />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <BottomNav />
            </div>
             <Toaster />
        </div>
    );
};


// FIX: Changed PrivateRoute to use PropsWithChildren to correctly type a component that accepts children, resolving a TypeScript error.
const PrivateRoute = ({ children }: PropsWithChildren<{}>) => {
    const { user } = useAppContext();
    return user ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <PrivateLayout />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;