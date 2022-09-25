import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ChargeVo} from '../model/Charge.model';

@Injectable({
    providedIn: 'root'
})
export class ChargeService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/charge/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/charge/';
    }

    private _charges: Array<ChargeVo>;
    private _selectedCharge: ChargeVo;
    private _chargeSelections: Array<ChargeVo>;
    private _createChargeDialog: boolean;
    private _editChargeDialog: boolean;
    private _viewChargeDialog: boolean;
    public editCharge$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchCharge: ChargeVo;

    // methods

    public findAll() {
        return this.http.get<Array<ChargeVo>>(this.API);
    }

    public save(): Observable<ChargeVo> {
        return this.http.post<ChargeVo>(this.API, {
            ...this.selectedCharge,
        });
    }

    delete(charge: ChargeVo) {
        return this.http.delete<number>(this.API + 'id/' + charge.id);
    }

    public edit(): Observable<ChargeVo> {
        return this.http.put<ChargeVo>(this.API, this.selectedCharge);
    }

    public findByCriteria(charge: ChargeVo): Observable<Array<ChargeVo>> {
        return this.http.post<Array<ChargeVo>>(this.API + 'search', charge);
    }

    public findByIdWithAssociatedList(charge: ChargeVo): Observable<ChargeVo> {
        return this.http.get<ChargeVo>(this.API + 'detail/id/' + charge.id);
    }

    // getters and setters

    get charges(): Array<ChargeVo> {
        if (this._charges == null) {
            this._charges = new Array<ChargeVo>();
        }
        return this._charges;
    }

    set charges(value: Array<ChargeVo>) {
        this._charges = value;
    }

    get selectedCharge(): ChargeVo {
        if (this._selectedCharge == null) {
            this._selectedCharge = new ChargeVo();
        }
        return this._selectedCharge;
    }

    set selectedCharge(value: ChargeVo) {
        this._selectedCharge = value;
    }

    get chargeSelections(): Array<ChargeVo> {
        if (this._chargeSelections == null) {
            this._chargeSelections = new Array<ChargeVo>();
        }
        return this._chargeSelections;
    }

    set chargeSelections(value: Array<ChargeVo>) {
        this._chargeSelections = value;
    }

    get createChargeDialog(): boolean {
        return this._createChargeDialog;
    }

    set createChargeDialog(value: boolean) {
        this._createChargeDialog = value;
    }

    get editChargeDialog(): boolean {
        return this._editChargeDialog;
    }

    set editChargeDialog(value: boolean) {
        this._editChargeDialog = value;
    }

    get viewChargeDialog(): boolean {
        return this._viewChargeDialog;
    }

    set viewChargeDialog(value: boolean) {
        this._viewChargeDialog = value;
    }

    get searchCharge(): ChargeVo {
        if (this._searchCharge == null) {
            this._searchCharge = new ChargeVo();
        }
        return this._searchCharge;
    }

    set searchCharge(value: ChargeVo) {
        this._searchCharge = value;
    }

}
