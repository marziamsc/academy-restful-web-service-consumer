import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { AcademyService } from '../academy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  /*
  Router è un API Angular tramite la quale è possibile implementare REDIRECT, 
  */
  private router: Router = new Router();

  /*
  FormGroup è una API Angular che consente ad una Component di caricare una REACTIVE FORM
  */
  form!: FormGroup;

  private academyService = inject<AcademyServiceI>(academy_service_token)

  submit() {

    this.academyService.saveAcademy(this.form.value).subscribe((res: any) => {
      console.log('Academy created successfully!');

      /*
      Invocando il metodo navigateByUrl dell'API Router chiediamo a Node.JS di andare a controllare
      nel file app.routes.ts se esiste il path identificato ne navigateByUrl
      */
      this.router.navigateByUrl('academy/index');
    })
  }

  ngOnInit(): void {

    /*
    All'avvio della Component deve essere creata una Component (FormGroup) contenente 4 FormControl
    (Ogni FormControl rappresenta un campo della form)

    FormGroup è una API che consente di creare Reactive Form

    Si usa Reactive Form per le form di inserimento dati, 
    mentre per le form di aggiornamento si usano le Template Driven Form
    */
    this.form = new FormGroup({
      code: new FormControl(''),
      title: new FormControl(''),
      cityLocation: new FormControl(''),
      studentNumber: new FormControl(0)
    });
  }
}
