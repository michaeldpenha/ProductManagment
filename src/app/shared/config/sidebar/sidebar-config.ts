export interface MenuItems {
    link?: string;
    titlei18n?: string;
    expanded?: boolean;
    icon?: string;
    sub?: SubMenuItems[];
    click?: any;
    name : string;
}
export interface SubMenuItems {
    link?: string;
    titlei18n?: string;
    expanded?: boolean;
    icon?: string;
    sub?: any;
    click?: any;
    name : string;
}
export const SideBarConfig: MenuItems[] = [
    { name: 'Manage Orders', link: '/manage-order', icon: "fa fa-search-plus", sub: null },
    {
        name: 'Create Order', icon: "fa fa-cart-arrow-down", sub:
            [
                { name: 'Single Order', link: '/create-order/single-order', sub: null },
                { name: 'Bulk Order', link: '/create-order/bulk-order', sub: null }
            ]
    }
];