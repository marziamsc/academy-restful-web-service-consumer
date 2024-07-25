import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { AcademyService } from '../academy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Academy } from '../../../model/academy.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  code!: string

  academy!: Academy

  form!: FormGroup

  private academyService = inject<AcademyServiceI>(academy_service_token)

  /*
  All'interno del Costruttore iniettiamo l'API ActivatedRoute, che consente di
  recuperare da una URL il valore di una path variable

  Nel nostro caso dovremo recuperare dalla url un code che viene inserito al click sull'Edit della IndexComponent
  */
  constructor(private router: Router, private route: ActivatedRoute) {}

  submit() {

    this.academyService.updateAcademy(this.form.value).subscribe((res: any) => {
      console.log('Academy updated successfully!');
      this.router.navigateByUrl('academy/index');
    })
  }

  ngOnInit(): void {

    // Recupero della path variable code dalla url
    this.code = this.route.snapshot.params['code'];
    // Invochiamo il metodo getAcademyByCode per farci restituire l'Academy selezionata
    this.academyService.getAcademyByCode(this.code).subscribe((data) => {
      // Valorizziamo un Oggetto TypeScript con il JSON restituito
      this.academy = data
      console.log(this.academy)
    })

    this.form = new FormGroup({
      code: new FormControl(''),
      title: new FormControl(''),
      cityLocation: new FormControl(''),
      studentNumber: new FormControl()
    });
  }
}
