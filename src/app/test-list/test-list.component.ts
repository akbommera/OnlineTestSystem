import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebApiRequest } from '../interface/webapi-request.interface';
import { Subscriber, Subject, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SystemApiRequest } from '../service/system-api-request.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit, OnDestroy {

  subscription = new Subscriber();
  questList = [];
  showQuestions = new Subject(); userAns = [];
  marksToShow = 0;
  showMarks = false;
  user: any;
  qCounter: any;
  totalSeconds = 0;
  out_of = 0;
  companyName = '';
  newQuestList: any;

  constructor(private sAR: SystemApiRequest, private route: Router, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showMarks = false;
    this.user = JSON.parse(this.actRoute.snapshot.paramMap.get('user'));
    console.log('user', this.user);
    this.showQuestions.next(false);
      const paramsEv = `admin_id=${this.user.admin_id}&login_id=${this.user.uid}&login_type=${this.user.login_type}`;
      this.subscription.add(
        combineLatest(
          this.sAR.getQustionList(`admin=${this.user.admin_id}`),
          this.sAR.getEvaluation(paramsEv)
        ).subscribe(([qList, evaluate]: any) => {
          console.log('evaluate', evaluate);
          if (evaluate.length === 0) {
            this.questList = qList;
            console.log(qList, 'test', this.questList[0].list.length, (this.questList[0].list.length * 60000) + 30000);
            this.totalSeconds = (this.questList[0].list.length * 60) + 30;
            this.showQuestions.next(true);
            setTimeout(() => {
              this.finalSubmit();
            }, (this.questList[0].list.length * 60000)); // every question will have 2 mins
            this.qCounter = setInterval(() => {
              this.totalSeconds -= 1;
            }, 1000);
          } else {
            this.marksToShow = evaluate[0].marks;
            this.out_of = evaluate[0].out_of;
            this.companyName = evaluate[0].company_name;
            this.showMarks = true;
          }
        }));
  }

  getAlphaCount(count) {
    return String.fromCharCode(count + 97);
  }

  selectAnswer(index, type) {
    this.userAns[index] = type;
  }
  finalSubmit() {
    for (let i = 0; i < this.questList[0].list.length; i++) {
      if (this.questList[0].list[i].answer === this.userAns[i]) {
        this.marksToShow = this.marksToShow + 1;
      }
    }
    this.out_of = this.questList[0].list.length;
    const evaluate = {
      login_uid: this.user.uid,
      admin_id: this.user.admin_id,
      user_name: this.user.user_name,
      list: this.questList[0].list.map(q => {
        return { question: q.question, options: q.options, answer: q.answer };
      }),
      marks: this.marksToShow,
      out_of: this.questList[0].list.length
    };
    this.subscription.add(this.sAR.saveEvaluation(evaluate).subscribe(res => {
      this.showMarks = true;
      clearInterval(this.qCounter);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
