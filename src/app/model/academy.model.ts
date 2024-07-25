/*
In questa applicazione sarà presente una Classe Service che eseguirà 
delle chiamate REST verso le operazioni Rest esposte dall'Applicazione Spring
L'applicazione Spring restituirà del JSON

La Classe Service utilizzerà una API frontend chiamata Observable in grado di 
mappare i JSON restituiti dal BackEnd in Oggetti TypeScript creati secondo lo schema di una Interfaccia
*/

export interface Academy{

    code:string
    title:string
    cityLocation:string
    studentNumber:number
}