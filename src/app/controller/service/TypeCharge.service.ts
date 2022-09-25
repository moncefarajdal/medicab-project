import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';



import {TypeChargeVo} from "../model/TypeCharge.model";


@Injectable({
    providedIn: 'root'
})
export class TypeChargeService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/typeCharge/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/typeCharge/';
    }

    private _typeCharges: Array<TypeChargeVo>;
    private _selectedTypeCharge: TypeChargeVo;
    private _typeChargeSelections: Array<TypeChargeVo>;
    private _createTypeChargeDialog: boolean;
    private _editTypeChargeDialog: boolean;
    private _viewTypeChargeDialog: boolean;
    public editTypeCharge$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchTypeCharge: TypeChargeVo;

    // methods

    public findAll() {
        return this.http.get<Array<TypeChargeVo>>(this.API);
    }

    public save(): Observable<TypeChargeVo> {
        return this.http.post<TypeChargeVo>(this.API, {
            ...this.selectedTypeCharge,
        });
    }

    delete(typeCharge: TypeChargeVo) {
        return this.http.delete<number>(this.API + 'id/' + typeCharge.id);
    }

    public edit(): Observable<TypeChargeVo> {
        return this.http.put<TypeChargeVo>(this.API, this.selectedTypeCharge);
    }

    public findByIdWithAssociatedList(typeCharge: TypeChargeVo): Observable<TypeChargeVo> {
        return this.http.get<TypeChargeVo>(this.API + 'detail/id/' + typeCharge.id);
    }

    // getters and setters

    get typeCharges(): Array<TypeChargeVo> {
        if (this._typeCharges == null) {
            this._typeCharges = new Array<TypeChargeVo>();
        }
        return this._typeCharges;
    }

    set typeCharges(value: Array<TypeChargeVo>) {
        this._typeCharges = value;
    }

    get selectedTypeCharge(): TypeChargeVo {
        if (this._selectedTypeCharge == null) {
            this._selectedTypeCharge = new TypeChargeVo();
        }
        return this._selectedTypeCharge;
    }

    set selectedTypeCharge(value: TypeChargeVo) {
        this._selectedTypeCharge = value;
    }

    get typeChargeSelections(): Array<TypeChargeVo> {
        if (this._typeChargeSelections == null) {
            this._typeChargeSelections = new Array<TypeChargeVo>();
        }
        return this._typeChargeSelections;
    }

    set typeChargeSelections(value: Array<TypeChargeVo>) {
        this._typeChargeSelections = value;
    }

    get createTypeChargeDialog(): boolean {
        return this._createTypeChargeDialog;
    }

    set createTypeChargeDialog(value: boolean) {
        this._createTypeChargeDialog = value;
    }

    get editTypeChargeDialog(): boolean {
        return this._editTypeChargeDialog;
    }

    set editTypeChargeDialog(value: boolean) {
        this._editTypeChargeDialog = value;
    }

    get viewTypeChargeDialog(): boolean {
        return this._viewTypeChargeDialog;
    }

    set viewTypeChargeDialog(value: boolean) {
        this._viewTypeChargeDialog = value;
    }

    get searchTypeCharge(): TypeChargeVo {
        if (this._searchTypeCharge == null) {
            this._searchTypeCharge = new TypeChargeVo();
        }
        return this._searchTypeCharge;
    }

    set searchTypeCharge(value: TypeChargeVo) {
        this._searchTypeCharge = value;
    }
}
