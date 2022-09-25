import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeConsultationVo} from '../model/TypeConsultation.model';
import {TypePaiementVo} from "../model/TypePaiement.model";


@Injectable({
    providedIn: 'root'
})
export class TypePaiementService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/typePaiement/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/typePaiement/';
    }

    private _typePaiements: Array<TypePaiementVo>;
    private _selectedTypePaiement: TypePaiementVo;
    private _typePaiementSelections: Array<TypePaiementVo>;
    private _createTypePaiementDialog: boolean;
    private _editTypePaiementDialog: boolean;
    private _viewTypePaiementDialog: boolean;
    public editTypePaiement$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchTypePaiement: TypePaiementVo;

    // methods

    public findAll() {
        return this.http.get<Array<TypePaiementVo>>(this.API);
    }

    public save(): Observable<TypePaiementVo> {
        return this.http.post<TypePaiementVo>(this.API, {
            ...this.selectedTypePaiement,
            // dateCreation: moment(this.selectedTypePaiement.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(typePaiement: TypePaiementVo) {
        return this.http.delete<number>(this.API + 'id/' + typePaiement.id);
    }


    public edit(): Observable<TypePaiementVo> {
        return this.http.put<TypePaiementVo>(this.API, this.selectedTypePaiement);
    }


    public findByCriteria(typeConsultation: TypeConsultationVo): Observable<Array<TypeConsultationVo>> {
        return this.http.post<Array<TypeConsultationVo>>(this.API + 'search', typeConsultation);
    }

    public findByIdWithAssociatedList(typePaiement: TypePaiementVo): Observable<TypePaiementVo> {
        return this.http.get<TypePaiementVo>(this.API + 'detail/id/' + typePaiement.id);
    }

    // getters and setters

    get typePaiements(): Array<TypePaiementVo> {
        if (this._typePaiements == null) {
            this._typePaiements = new Array<TypePaiementVo>();
        }
        return this._typePaiements;
    }

    set typePaiements(value: Array<TypePaiementVo>) {
        this._typePaiements = value;
    }

    get selectedTypePaiement(): TypePaiementVo {
        if (this._selectedTypePaiement == null) {
            this._selectedTypePaiement = new TypePaiementVo();
        }
        return this._selectedTypePaiement;
    }

    set selectedTypePaiement(value: TypePaiementVo) {
        this._selectedTypePaiement = value;
    }

    get typePaiementSelections(): Array<TypePaiementVo> {
        if (this._typePaiementSelections == null) {
            this._typePaiementSelections = new Array<TypePaiementVo>();
        }
        return this._typePaiementSelections;
    }

    set typePaiementSelections(value: Array<TypePaiementVo>) {
        this._typePaiementSelections = value;
    }

    get createTypePaiementDialog(): boolean {
        return this._createTypePaiementDialog;
    }

    set createTypePaiementDialog(value: boolean) {
        this._createTypePaiementDialog = value;
    }

    get editTypePaiementDialog(): boolean {
        return this._editTypePaiementDialog;
    }

    set editTypePaiementDialog(value: boolean) {
        this._editTypePaiementDialog = value;
    }

    get viewTypePaiementDialog(): boolean {
        return this._viewTypePaiementDialog;
    }

    set viewTypePaiementDialog(value: boolean) {
        this._viewTypePaiementDialog = value;
    }

    get searchTypePaiement(): TypePaiementVo {
        if (this._searchTypePaiement == null) {
            this._searchTypePaiement = new TypePaiementVo();
        }
        return this._searchTypePaiement;
    }

    set searchTypePaiement(value: TypePaiementVo) {
        this._searchTypePaiement = value;
    }
}
