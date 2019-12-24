import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemApiRequest } from '../service/system-api-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, OnDestroy {

  user: any;
  subscription = new Subscriber();
  newQuestList: any;
  evaluationData: any;
  columns = [
    {
      Display_Name: 'First Name',
      FieldName: 'first_name'
    },
    {
      Display_Name: 'Last Name',
      FieldName: 'last_name'
    },
    {
      Display_Name: 'Marks',
      FieldName: 'marks'
    },
    {
      Display_Name: 'Out Of',
      FieldName: 'out_of'
    }
  ];

  constructor(private sAR: SystemApiRequest, private actRoute: ActivatedRoute, private routes: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.actRoute.snapshot.paramMap.get('user'));
    console.log('user', this.user);
    this.newQuestList = {
      ...qu,
      admin_id: this.user.admin_id
    };
    this.subscription.add(this.sAR.getEvaluation(`admin_id=${this.user.admin_id}`).subscribe(res => {
      console.log('evalution list', res);
      this.evaluationData = res;
    }));
  }

  AddQuestions() {
    this.subscription.add(this.sAR.saveNewQuestions(this.newQuestList).subscribe(res => {
      alert('Successfully added');
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

const qu = {
  "question_type": "Genral Knowledge",
  "list": [
    {
      "options": [
        "11",
        "20",
        "30",
        "22"
      ],
      "question": "Solve 10 + 12?",
      "answer": "22"
    },
    {
      "options": [
        "mumbai",
        "pune",
        "delhi",
        "chennai"
      ],
      "question": "Capital of india?",
      "answer": "delhi"
    },
    {
      "options": [
        "20",
        "23",
        "30",
        "40"
      ],
      "question": "10, 15, ..., 25, 30. Fill in the blank?",
      "answer": "20"
    }
  ]
};
