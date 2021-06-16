import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

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

  constructor() {
    this.currentGoalId = 1;

    this.goals[this.currentGoalId].display = "none";
  }



  // flipDisplay(id) {
  //   for (let i = 0; i < this.goals.length; i++) {
  //     if (id === this.goals[i].id) {
  //       if (this.goals[i].display === "block") {
  //         this.goals[i].display = "none";
  //       } else if (this.goals[i].display === "none") {
  //         this.goals[i].display = "block";
  //       }
  //     }
  //   }
  //   console.log("flipped " + id);
  // }

  getImage(id) {
    return "../../../assets/images/un_goals/" + id + ".png";
  }

  ngOnInit(): void {
    for (let i = 0; i < this.goals.length; i++) {
      this.goals[i].image = this.getImage(this.goals[i].id);
    }
  }
}
