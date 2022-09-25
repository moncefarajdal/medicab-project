import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MedicamentVo} from '../model/Medicament.model';


@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/medicament/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/medicament/';
    }
     private _medicaments: Array<MedicamentVo> ;
     private _selectedMedicament: MedicamentVo;
     private _medicamentSelections: Array<MedicamentVo>;
     private _createMedicamentDialog: boolean;
     private _editMedicamentDialog: boolean;
     private _viewMedicamentDialog: boolean;
     public editMedicament$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchMedicament:MedicamentVo ;

    // methods
    public archiver(medicament: MedicamentVo): Observable<MedicamentVo> {
        return this.http.put<MedicamentVo>(this.API + 'archiver/' ,medicament);
    }
    public desarchiver(medicament: MedicamentVo): Observable<MedicamentVo> {
    return this.http.put<MedicamentVo>(this.API + 'desarchiver/' ,medicament);
    }

    public findAll(){
     return this.http.get<Array<MedicamentVo>>(this.API);
    }

    public save(): Observable<MedicamentVo> {
           return this.http.post<MedicamentVo>(this.API, {...this.selectedMedicament,dateCreation: moment(this.selectedMedicament.dateCreation).format("YYYY-MM-DD")});
    }

    delete(medicament: MedicamentVo) {
         return this.http.delete<number>(this.API + 'id/' + medicament.id);
    }


    public edit(): Observable<MedicamentVo> {
        return this.http.put<MedicamentVo>(this.API, this.selectedMedicament);
    }


     public findByCriteria(medicament:MedicamentVo):Observable<Array<MedicamentVo>>{
           return this.http.post<Array<MedicamentVo>>(this.API +'search', medicament);
    }

   public findByIdWithAssociatedList(medicament:MedicamentVo):Observable<MedicamentVo>{
         return this.http.get<MedicamentVo>(this.API + 'detail/id/' +medicament.id);
    }

    // getters and setters


    get medicaments(): Array<MedicamentVo> {
    if(this._medicaments==null){
    this._medicaments=new Array<MedicamentVo>();
    }
return this._medicaments;
       }

    set medicaments(value: Array<MedicamentVo>) {
        this._medicaments = value;
       }

    get selectedMedicament(): MedicamentVo {
    if(this._selectedMedicament==null){
    this._selectedMedicament=new MedicamentVo();
    }
           return this._selectedMedicament;
       }

    set selectedMedicament(value: MedicamentVo) {
        this._selectedMedicament = value;
       }

    get medicamentSelections(): Array<MedicamentVo> {
    if(this._medicamentSelections==null){
    this._medicamentSelections=new Array<MedicamentVo>();
    }
        return this._medicamentSelections;
       }


    set medicamentSelections(value: Array<MedicamentVo>) {
        this._medicamentSelections = value;
       }

    get createMedicamentDialog(): boolean {
        return this._createMedicamentDialog;
       }

    set createMedicamentDialog(value: boolean) {
        this._createMedicamentDialog = value;
       }

    get editMedicamentDialog(): boolean {
        return this._editMedicamentDialog;
       }

    set editMedicamentDialog(value: boolean) {
        this._editMedicamentDialog = value;
       }

    get viewMedicamentDialog(): boolean {
        return this._viewMedicamentDialog;
       }

    set viewMedicamentDialog(value: boolean) {
        this._viewMedicamentDialog = value;
       }

     get searchMedicament(): MedicamentVo {
     if(this._searchMedicament==null){
    this._searchMedicament=new MedicamentVo();
    }
        return this._searchMedicament;
    }

    set searchMedicament(value: MedicamentVo) {
        this._searchMedicament = value;
       }

}
