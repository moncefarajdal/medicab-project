import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {RoleService} from "./controller/service/role.service";
import {AuthService} from "./controller/service/Auth.service";
import {Router} from "@angular/router";
import {AppComponent} from "./app.component";

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item"
                    [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];
    modelsuperadmin: any[];
    modelanonymous: any[];
    modeladmin: any[];
    modelchercheur: any[];
    modelassistant: any[];
    modelmedecin: any[];
    modelpatient: any[];

    constructor(public appMain: AppMainComponent, public app: AppComponent, private roleService: RoleService,
                private authService: AuthService, private router: Router) {
    }

    // ngOnInit() {
    //     this.model = [
    //         {
    //             label: 'Home',
    //             items: [
    //                 {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']}
    //             ]
    //         },
    //         {
    //             label: 'Assistant Space',
    //             items: [
    //                 {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/assistant/dashboard']},
    //                 {label: 'Patient', icon: 'pi pi-user', routerLink: ['/assistant/patient']},
    //                 {label: 'Rendez-vous', icon: 'pi pi-clock', routerLink: ['/assistant/rendez-vous']},
    //                 {label: 'Constante', icon: 'pi pi-heart', routerLink: ['/assistant/constante']},
    //                 {label: 'Paiement', icon: 'pi pi-dollar', routerLink: ['/assistant/paiement']},
    //             ]
    //         },
    //         {
    //             label: 'UI Components',
    //             items: [
    //                 {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
    //                 {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
    //                 {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
    //                 {
    //                     label: 'Invalid State',
    //                     icon: 'pi pi-fw pi-exclamation-circle',
    //                     routerLink: ['/uikit/invalidstate']
    //                 },
    //                 {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
    //                 {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
    //                 {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
    //                 {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
    //                 {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
    //                 {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
    //                 {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
    //                 {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true},
    //                 {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
    //                 {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
    //                 {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
    //                 {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc']}
    //             ]
    //         },
    //         {
    //             label: 'Prime Blocks',
    //             items: [
    //                 {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'},
    //                 {
    //                     label: 'All Blocks',
    //                     icon: 'pi pi-fw pi-globe',
    //                     url: ['https://www.primefaces.org/primeblocks-ng'],
    //                     target: '_blank'
    //                 },
    //             ]
    //         },
    //         {
    //             label: 'Utilities',
    //             items: [
    //                 {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/icons']},
    //                 {
    //                     label: 'PrimeFlex',
    //                     icon: 'pi pi-fw pi-desktop',
    //                     url: ['https://www.primefaces.org/primeflex/'],
    //                     target: '_blank'
    //                 },
    //             ]
    //         },
    //         {
    //             label: 'Pages',
    //             items: [
    //                 {label: 'Crud', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud']},
    //                 {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
    //                 {label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['pages/landing']},
    //                 {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login']},
    //                 {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error']},
    //                 {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound']},
    //                 {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access']},
    //                 {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty']}
    //             ]
    //         },
    //         {
    //             label: 'Hierarchy',
    //             items: [
    //                 {
    //                     label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         {
    //                             label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
    //                             items: [
    //                                 {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
    //                                 {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
    //                                 {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
    //                             ]
    //                         },
    //                         {
    //                             label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
    //                             items: [
    //                                 {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
    //                             ]
    //                         },
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         {
    //                             label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
    //                             items: [
    //                                 {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
    //                                 {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
    //                             ]
    //                         },
    //                         {
    //                             label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
    //                             items: [
    //                                 {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
    //                             ]
    //                         },
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Get Started',
    //             items: [
    //                 {
    //                     label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
    //                 },
    //                 {
    //                     label: 'View Source',
    //                     icon: 'pi pi-fw pi-search',
    //                     url: ['https://github.com/primefaces/sakai-ng'],
    //                     target: '_blank'
    //                 }
    //             ]
    //         }
    //     ];
    // }

    ngOnInit() {

        this.modelmedecin =
            [
                {
                    label: 'Espace Medecin',
                    items: [
                        {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/medecin/dashboard']},
                        {label: 'Consultations', icon: 'pi pi-check-square', routerLink: ['/medecin/consultation']},
                        {label: 'Ordonnances', icon: 'pi pi-search', routerLink: ['/medecin/ordonnance']},
                        {label: 'Prescriptions', icon: 'pi pi-folder-open', routerLink: ['/medecin/prescription']},
                        {label: 'Certificats', icon: 'pi pi-copy', routerLink: ['/medecin/certificat']},
                        {label: 'Depenses', icon: 'pi pi-dollar', routerLink: ['/medecin/depense']},
                        // {label: 'Medicaments', icon: 'pi pi-check-square', routerLink: ['/medecin/medicament']},
                    ]
                },
            ];

        this.modelassistant =
            [
                {
                    label: 'Assistant Space',
                    items: [
                        {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/assistant/dashboard']},
                        {
                            label: 'Patient', icon: 'pi pi-user',
                            items: [
                                {label: 'Liste des patients', icon: 'pi pi-user', routerLink: ['/assistant/patient']},
                                {label: 'Ajouter un patient', routerLink: ['/assistant/patient/ajouter']}
                        ]},
                        {label: 'Rendez-vous', icon: 'pi pi-clock', routerLink: ['/assistant/rendez-vous']},
                        {label: 'Consultations', icon: 'pi pi-check-square', routerLink: ['/assistant/consultation']},
                        {label: 'Constante', icon: 'pi pi-heart', routerLink: ['/assistant/constante']},
                        {label: 'Paiement', icon: 'pi pi-dollar', routerLink: ['/assistant/paiement']},
                        // {label: 'Type Cons', icon: 'pi pi-list', routerLink: ['/assistant/type-consultation']},
                        {label: 'Calendar', icon: 'pi pi-calendar', routerLink: ['/assistant/calendar']},
                    ]
                },
            ];

        this.modelpatient =
            [
                {
                    label: 'Espace Patient',
                    items: [
                        {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/patient/dashboard']},
                    ]
                },
            ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roles) {

                this.authService.authenticatedUser.roles.forEach(role => {
                    const roleName: string = this.getRole();
                    this.roleService._role.next(roleName.toUpperCase());
                    eval('this.model = this.model' + this.getRole());
                    // eval('this.model = this.model' + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase());
                    // eval('model' + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase());
                    // console.log(this.model);
                });
                eval('this.model = this.model' + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase());
            }
        }
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }

    // getRole(text) {
    //     const [role, ...rest] = text.split('_');
    //     return rest.join('').toLowerCase();
    // }

    getRole() {
        return localStorage.getItem('role').substr(5, 20).toLocaleLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
