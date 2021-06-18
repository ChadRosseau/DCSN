import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-global-goals',
  templateUrl: './global-goals.component.html',
  styleUrls: ['./global-goals.component.css']
})
export class GlobalGoalsComponent implements OnInit {
  currentGoalId;
  boxSize;
  screenHeight: number;
  screenWidth: number;

  goals = [
    {
      id: 0,
      image: "",
      url: "",
      display: "none"
    },
    {
      id: 1,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 2,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 3,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 4,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 5,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 6,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 7,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 8,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 9,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 10,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 11,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 12,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 13,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 14,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 15,
      image: "",
      url: "",
      display: "block"
    },
    {
      id: 16,
      url: "",
      display: "block"
    },
    {
      id: 17,
      image: "",
      url: "",
      display: "block"
    }
  ]

  constructor(private auth: AuthService) {
    this.auth.db.database.ref(`siteInfo/home/currentGoal`).once('value', snapshot => {
      this.currentGoalId = snapshot.val();
    }).then(() => {
      this.goals[this.currentGoalId].display = "none";
      for (let i = 0; i < this.goals.length; i++) {
        this.goals[i].image = this.getImage(this.goals[i].id);
      }
    });
  }

  ngOnInit(): void {

  }

  getImage(id) {
    return "../../../assets/images/un_goals/" + id + ".png";
  }
}
