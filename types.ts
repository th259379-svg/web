

// FIX: Removed self-import of Product which caused a name conflict.
export interface Product {
    id: string;
    name: string;
    code: string;
    unit: string;
    sell_price: number;
    buy_price: number;
    min_qty: number;
    current_qty: number;
}

export interface SaleItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Sale {
    id: string;
    date: string;
    customer_name: string;
    customer_phone?: string;
    items: SaleItem[];
    total_amount: number;
    user_name: string;
}

export interface PurchaseItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Purchase {
    id: string;
    date: string;
    items: PurchaseItem[];
    total_amount: number;
    user_name: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    date: string;
    customer_name: string;
    customer_phone?: string;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    user_name: string;
}

export interface User {
    id: string;
    name: string;
    full_name: string;
    email: string;
    phone: string;
    password: string; 
    avatar_url: string;
    role: 'admin' | 'staff';
}

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

export interface Currency {
    symbol: string;
    position: 'prefix' | 'suffix';
}

export interface SignUpData {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}