import { Observable } from "rxjs";
import { Academy } from "../model/academy.model";
import { InjectionToken } from "@angular/core";

/*
Se vogliamo che una Classe Service venga iniettata in una Component tramite la sua Interfaccia 
occorre inizializzare sottoforma di const un InjectionToken da matchare all'interno della Component
*/
export const academy_service_token = new InjectionToken<AcademyServiceI>('academy_service_token')

export interface AcademyServiceI{

    getAcademies(): Observable<any>

    getAcademyByCode(code: string): Observable<any>

    saveAcademy(academy: Academy): Observable<any>

    updateAcademy(academy: Academy): Observable<any>

    removeAcademyByCode(code: string): Observable<any>
}