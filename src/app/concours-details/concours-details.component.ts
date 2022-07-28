import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ConcoursService } from '../_services/concours.service';
import { FormulairesService } from '../_services/formulaires.service';

@Component({
  selector: 'app-concours-details',
  templateUrl: './concours-details.component.html',
  styleUrls: ['./concours-details.component.css']
})
export class ConcoursDetailsComponent implements OnInit {
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  isOptional = false;
  postes:any[];
  currentConcours = null;
  message = '';
  formulaire:any;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private concoursService :ConcoursService,
    private formulairesService :FormulairesService,
    private router: Router) {}

  ngOnInit(): void {
    
    this.getConcours(this.route.snapshot.paramMap.get('id'));
    this.getPostesDuConcours(this.route.snapshot.paramMap.get('id'));


  this.firstFormGroup = this.formBuilder.group({
    postes: [null, Validators.required],
  });
  this.secondFormGroup = this.formBuilder.group({
    choix: [null, Validators.required],

  });
  }

  getConcours(id): void {
    this.concoursService.getConcours(id) 
      .subscribe(
        data => {
          this.currentConcours = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getPostesDuConcours(id): void {
    this.concoursService.getPoste(id)
      .subscribe(
        data => {
          this.postes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  get getPosteInForm() {
    return this.firstFormGroup.value.postes
  }

  loadFormulaire() {
    this.getFormulaireDuPoste(this.getPosteInForm);
    //this.firstFormGroup.value.postes
  }

  getFormulaireDuPoste(id):void {
    this.formulairesService.getFormulaireDuPoste(id).subscribe(
      data => {
        this.formulaire = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  getQuestionDuFormulaire():void {
    
  }



}
