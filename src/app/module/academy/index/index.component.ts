import { Component, inject, OnInit } from '@angular/core';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { AcademyService } from '../academy.service';
import { Academy } from '../../../model/academy.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  /*
  Array inizialmente vuoto, che conterrà le Academies restituite dal metodo getAcademies del Service
  */
  academies: Academy[] = [];

  /*
  Node.JS eseguirà la seguente azione:
  academyService : AcademyServiceI = new AcademyService();
  */
  private academyService = inject<AcademyServiceI>(academy_service_token)

  /*
  La funzione subscribe è una funzione che accetta in input 2 funzioni di callback:
  - una che gestisce il caso positivo (next)
  - una che gestisce il caso negativo (error)
  */
  getAcademies(): void {

    this.academyService.getAcademies().subscribe({
      next: (res) => {
        this.academies = res;
        console.log('Data fetched successfully', res);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  /*
  In fase di caricamento (ngOnInit) questa Component deve invocare il metodo getAcademies() della Classe AcademyService
  e, dopo aver ottenuto le academies, le deve inserire in un Array il cui contenuto dovrà essere mostrato sul template
  */

  /*
  Metodo invocato al click del button Remove del template
  Invoca il removeAcademy del Service, se tutto funziona l'Academy selezionata viene cancellata e la lista viene refreshata
  */
  removeAcademy(code: string) {

    this.academyService.removeAcademyByCode(code).subscribe(res => {
      console.log(res.data)
      this.getAcademies()

    })
  }

  ngOnInit(): void {

    this.getAcademies()
  }
}
