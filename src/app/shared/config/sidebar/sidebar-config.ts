export interface MenuItems {
    link: string;
    titlei18n?: string;
    expanded?: boolean;
    icon?: string;
    sub?: any;
    click?: any;
    name : string;
}

export const SideBarConfig: MenuItems[] = [
    { name: 'Manage Orders', link: '#', sub: null },
    {
        name: 'Create Order', link: '#', sub:
            [
                { name: 'Single Order', link: '#', sub: null },
                { name: 'Bulk Order', link: '#', sub: null }
            ]
    }
];