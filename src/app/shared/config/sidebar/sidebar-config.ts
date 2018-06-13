export interface MenuItems {
    link: string;
    titlei18n?: string;
    expanded?: boolean;
    icon?: string;
    sub?: SubMenuItems[];
    click?: any;
    name : string;
}
export interface SubMenuItems {
    link: string;
    titlei18n?: string;
    expanded?: boolean;
    icon?: string;
    sub?: any;
    click?: any;
    name : string;
}
export const SideBarConfig: MenuItems[] = [
    { name: 'Manage Orders', link: '#', icon: "fa fa-search-plus", sub: null },
    {
        name: 'Create Order', link: '#', icon: "fa fa-cart-arrow-down", sub:
            [
                { name: 'Single Order', link: '#', sub: null },
                { name: 'Bulk Order', link: '#', sub: null }
            ]
    }
];