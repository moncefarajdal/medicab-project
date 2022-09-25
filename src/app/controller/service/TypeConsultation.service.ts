import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeConsultationVo} from '../model/TypeConsultation.model';


@Injectable({
  providedIn: 'root'
})
export class TypeConsultationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/typeConsultation/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/typeConsultation/';
    }
     private _typeConsultations: Array<TypeConsultationVo> ;
     private _selectedTypeConsultation: TypeConsultationVo;
     private _typeConsultationSelections: Array<TypeConsultationVo>;
     private _createTypeConsultationDialog: boolean;
     private _editTypeConsultationDialog: boolean;
     private _viewTypeConsultationDialog: boolean;
     public editTypeConsultation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeConsultation:TypeConsultationVo ;

    // methods
    public archiver(typeConsultation: TypeConsultationVo): Observable<TypeConsultationVo> {
        return this.http.put<TypeConsultationVo>(this.API + 'archiver/' ,typeConsultation);
    }
    public desarchiver(typeConsultation: TypeConsultationVo): Observable<TypeConsultationVo> {
    return this.http.put<TypeConsultationVo>(this.API + 'desarchiver/' ,typeConsultation);
    }

    public findAll(){
     return this.http.get<Array<TypeConsultationVo>>(this.API);
    }

    public save(): Observable<TypeConsultationVo> {
           return this.http.post<TypeConsultationVo>(this.API, {...this.selectedTypeConsultation,dateCreation: moment(this.selectedTypeConsultation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeConsultation: TypeConsultationVo) {
         return this.http.delete<number>(this.API + 'id/' + typeConsultation.id);
    }


    public edit(): Observable<TypeConsultationVo> {
        return this.http.put<TypeConsultationVo>(this.API, this.selectedTypeConsultation);
    }


     public findByCriteria(typeConsultation:TypeConsultationVo):Observable<Array<TypeConsultationVo>>{
           return this.http.post<Array<TypeConsultationVo>>(this.API +'search', typeConsultation);
    }

   public findByIdWithAssociatedList(typeConsultation:TypeConsultationVo):Observable<TypeConsultationVo>{
         return this.http.get<TypeConsultationVo>(this.API + 'detail/id/' +typeConsultation.id);
    }

    // getters and setters


    get typeConsultations(): Array<TypeConsultationVo> {
    if(this._typeConsultations==null){
    this._typeConsultations=new Array<TypeConsultationVo>();
    }
return this._typeConsultations;
       }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this._typeConsultations = value;
       }

    get selectedTypeConsultation(): TypeConsultationVo {
    if(this._selectedTypeConsultation==null){
    this._selectedTypeConsultation=new TypeConsultationVo();
    }
           return this._selectedTypeConsultation;
       }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this._selectedTypeConsultation = value;
       }

    get typeConsultationSelections(): Array<TypeConsultationVo> {
    if(this._typeConsultationSelections==null){
    this._typeConsultationSelections=new Array<TypeConsultationVo>();
    }
        return this._typeConsultationSelections;
       }


    set typeConsultationSelections(value: Array<TypeConsultationVo>) {
        this._typeConsultationSelections = value;
       }

    get createTypeConsultationDialog(): boolean {
        return this._createTypeConsultationDialog;
       }

    set createTypeConsultationDialog(value: boolean) {
        this._createTypeConsultationDialog = value;
       }

    get editTypeConsultationDialog(): boolean {
        return this._editTypeConsultationDialog;
       }

    set editTypeConsultationDialog(value: boolean) {
        this._editTypeConsultationDialog = value;
       }

    get viewTypeConsultationDialog(): boolean {
        return this._viewTypeConsultationDialog;
       }

    set viewTypeConsultationDialog(value: boolean) {
        this._viewTypeConsultationDialog = value;
       }

     get searchTypeConsultation(): TypeConsultationVo {
     if(this._searchTypeConsultation==null){
    this._searchTypeConsultation=new TypeConsultationVo();
    }
        return this._searchTypeConsultation;
    }

    set searchTypeConsultation(value: TypeConsultationVo) {
        this._searchTypeConsultation = value;
       }

}
