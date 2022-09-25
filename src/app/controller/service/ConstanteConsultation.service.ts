import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConstanteConsultationVo} from '../model/ConstanteConsultation.model';


@Injectable({
  providedIn: 'root'
})
export class ConstanteConsultationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/constanteConsultation/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/constanteConsultation/';
    }
     private _constanteConsultations: Array<ConstanteConsultationVo> ;
     private _selectedConstanteConsultation: ConstanteConsultationVo;
     private _constanteConsultationSelections: Array<ConstanteConsultationVo>;
     private _createConstanteConsultationDialog: boolean;
     private _editConstanteConsultationDialog: boolean;
     private _viewConstanteConsultationDialog: boolean;
     public editConstanteConsultation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConstanteConsultation:ConstanteConsultationVo ;

    // methods
    public archiver(constanteConsultation: ConstanteConsultationVo): Observable<ConstanteConsultationVo> {
        return this.http.put<ConstanteConsultationVo>(this.API + 'archiver/' ,constanteConsultation);
    }
    public desarchiver(constanteConsultation: ConstanteConsultationVo): Observable<ConstanteConsultationVo> {
    return this.http.put<ConstanteConsultationVo>(this.API + 'desarchiver/' ,constanteConsultation);
    }

    public findAll(){
     return this.http.get<Array<ConstanteConsultationVo>>(this.API);
    }

    public save(): Observable<ConstanteConsultationVo> {
           return this.http.post<ConstanteConsultationVo>(this.API, {...this.selectedConstanteConsultation,dateCreation: moment(this.selectedConstanteConsultation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(constanteConsultation: ConstanteConsultationVo) {
         return this.http.delete<number>(this.API + 'id/' + constanteConsultation.id);
    }


    public edit(): Observable<ConstanteConsultationVo> {
        return this.http.put<ConstanteConsultationVo>(this.API, this.selectedConstanteConsultation);
    }


     public findByCriteria(constanteConsultation:ConstanteConsultationVo):Observable<Array<ConstanteConsultationVo>>{
           return this.http.post<Array<ConstanteConsultationVo>>(this.API +'search', constanteConsultation);
    }

   public findByIdWithAssociatedList(constanteConsultation:ConstanteConsultationVo):Observable<ConstanteConsultationVo>{
         return this.http.get<ConstanteConsultationVo>(this.API + 'detail/id/' +constanteConsultation.id);
    }

    // getters and setters


    get constanteConsultations(): Array<ConstanteConsultationVo> {
    if(this._constanteConsultations==null){
    this._constanteConsultations=new Array<ConstanteConsultationVo>();
    }
return this._constanteConsultations;
       }

    set constanteConsultations(value: Array<ConstanteConsultationVo>) {
        this._constanteConsultations = value;
       }

    get selectedConstanteConsultation(): ConstanteConsultationVo {
    if(this._selectedConstanteConsultation==null){
    this._selectedConstanteConsultation=new ConstanteConsultationVo();
    }
           return this._selectedConstanteConsultation;
       }

    set selectedConstanteConsultation(value: ConstanteConsultationVo) {
        this._selectedConstanteConsultation = value;
       }

    get constanteConsultationSelections(): Array<ConstanteConsultationVo> {
    if(this._constanteConsultationSelections==null){
    this._constanteConsultationSelections=new Array<ConstanteConsultationVo>();
    }
        return this._constanteConsultationSelections;
       }


    set constanteConsultationSelections(value: Array<ConstanteConsultationVo>) {
        this._constanteConsultationSelections = value;
       }

    get createConstanteConsultationDialog(): boolean {
        return this._createConstanteConsultationDialog;
       }

    set createConstanteConsultationDialog(value: boolean) {
        this._createConstanteConsultationDialog = value;
       }

    get editConstanteConsultationDialog(): boolean {
        return this._editConstanteConsultationDialog;
       }

    set editConstanteConsultationDialog(value: boolean) {
        this._editConstanteConsultationDialog = value;
       }

    get viewConstanteConsultationDialog(): boolean {
        return this._viewConstanteConsultationDialog;
       }

    set viewConstanteConsultationDialog(value: boolean) {
        this._viewConstanteConsultationDialog = value;
       }

     get searchConstanteConsultation(): ConstanteConsultationVo {
     if(this._searchConstanteConsultation==null){
    this._searchConstanteConsultation=new ConstanteConsultationVo();
    }
        return this._searchConstanteConsultation;
    }

    set searchConstanteConsultation(value: ConstanteConsultationVo) {
        this._searchConstanteConsultation = value;
       }

}
