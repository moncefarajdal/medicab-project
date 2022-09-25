import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementVo} from '../model/Paiement.model';


@Injectable({
    providedIn: 'root'
})
export class PaiementService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/paiement/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/paiement/';
    }

    private _paiements: Array<PaiementVo>;
    private _selectedPaiement: PaiementVo;
    private _paiementSelections: Array<PaiementVo>;
    private _createPaiementDialog: boolean;
    private _editPaiementDialog: boolean;
    private _viewPaiementDialog: boolean;
    public editPaiement$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchPaiement: PaiementVo;
    private _monthlyRevenue: number;

    // methods

    public archiver(paiement: PaiementVo): Observable<PaiementVo> {
        return this.http.put<PaiementVo>(this.API + 'archiver/', paiement);
    }

    public desarchiver(paiement: PaiementVo): Observable<PaiementVo> {
        return this.http.put<PaiementVo>(this.API + 'desarchiver/', paiement);
    }

    public findAll() {
        return this.http.get<Array<PaiementVo>>(this.API);
    }

    public save(): Observable<PaiementVo> {
        return this.http.post<PaiementVo>(this.API, {
            ...this.selectedPaiement,
            dateCreation: moment(this.selectedPaiement.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(paiement: PaiementVo) {
        return this.http.delete<number>(this.API + 'id/' + paiement.id);
    }

    public edit(): Observable<PaiementVo> {
        return this.http.put<PaiementVo>(this.API, this.selectedPaiement);
    }

    public findByCriteria(paiement: PaiementVo): Observable<Array<PaiementVo>> {
        return this.http.post<Array<PaiementVo>>(this.API + 'search', paiement);
    }

    // public revenue(date: String): Observable<Array<PaiementVo>> {
    //     return this.http.post<Array<PaiementVo>>(this.API + 'revenue', date);
    // }

    // public revenue(date: String): Observable<number> {
    //     return this.http.post<number>(this.API + 'revenue/' + date, date);
    // }

    public revenue(date: String): Observable<number> {
        return this.http.get<number>(this.API + 'revenue/' + date);
    }

    public findByIdWithAssociatedList(paiement: PaiementVo): Observable<PaiementVo> {
        return this.http.get<PaiementVo>(this.API + 'detail/id/' + paiement.id);
    }

    // getters and setters

    get paiements(): Array<PaiementVo> {
        if (this._paiements == null) {
            this._paiements = new Array<PaiementVo>();
        }
        return this._paiements;
    }

    set paiements(value: Array<PaiementVo>) {
        this._paiements = value;
    }

    get selectedPaiement(): PaiementVo {
        if (this._selectedPaiement == null) {
            this._selectedPaiement = new PaiementVo();
        }
        return this._selectedPaiement;
    }

    set selectedPaiement(value: PaiementVo) {
        this._selectedPaiement = value;
    }

    get paiementSelections(): Array<PaiementVo> {
        if (this._paiementSelections == null) {
            this._paiementSelections = new Array<PaiementVo>();
        }
        return this._paiementSelections;
    }

    set paiementSelections(value: Array<PaiementVo>) {
        this._paiementSelections = value;
    }

    get createPaiementDialog(): boolean {
        return this._createPaiementDialog;
    }

    set createPaiementDialog(value: boolean) {
        this._createPaiementDialog = value;
    }

    get editPaiementDialog(): boolean {
        return this._editPaiementDialog;
    }

    set editPaiementDialog(value: boolean) {
        this._editPaiementDialog = value;
    }

    get viewPaiementDialog(): boolean {
        return this._viewPaiementDialog;
    }

    set viewPaiementDialog(value: boolean) {
        this._viewPaiementDialog = value;
    }

    get searchPaiement(): PaiementVo {
        if (this._searchPaiement == null) {
            this._searchPaiement = new PaiementVo();
        }
        return this._searchPaiement;
    }

    set searchPaiement(value: PaiementVo) {
        this._searchPaiement = value;
    }

    get monthlyRevenue(): number {
        return this._monthlyRevenue;
    }

    set monthlyRevenue(value: number) {
        this._monthlyRevenue = value;
    }
}
