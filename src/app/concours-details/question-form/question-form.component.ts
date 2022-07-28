import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  secondFormGroup:FormGroup;
  tests: string[] = ["Dockerfile", "docker-compose"];
  
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.secondFormGroup = this.formBuilder.group({
      choix: [null, Validators.required],
  
    });
  }



}
