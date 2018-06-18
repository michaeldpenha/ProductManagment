import * as $ from 'jquery';

export interface logo {
    path: string;
    link: string;
	imgClass: string;
	alt: string;
}

export interface leftLinks {
    icon: string;
    link?: string;
    class?: string;
    click: Function;
	dropdown: any;
	title?: string;
}

export interface rightLinks {
    name: string;
    icon: string;
    link?: string;
    dropdown?: any;
}


export const HeaderConfig = {
    logo: {path: '../../../../assets/images/logo.png', imgClass: 'hide-on-mobile', alt: 'ScopeRetail Logo', link: '#'},
    leftLinks: 
        [
            { icon: 'fa fa-bars', title: 'Toggle Menu', class: 'sidebarBtn',click:() =>{ $('#sidebar').toggleClass('active'); }, dropdown: null }
        ],
	rightLinks: 
		[
			{name: '', icon: 'fa fa-envelope', link: '#', dropdown: 
				[
					{ name: 'Mail 1', link: '#', dropdown: null },
					{ name: 'Mail 2', link: '#', dropdown: null }
				]
			},
			{name: '', icon: 'fa fa-bell', link: '#', dropdown: 
				[
					{ name: 'Notification 1', link: '#', dropdown: null },
					{ name: 'Notification 1', link: '#', dropdown: null }
				]
			},
			{name: 'John Smith', icon: 'fa fa-user', link: '#', dropdown: 
				[
					{ name: 'Logout', link: '#', dropdown: null }
				]
			},
		]
};