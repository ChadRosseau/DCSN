import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-global-goals',
  templateUrl: './global-goals.component.html',
  styleUrls: ['./global-goals.component.css']
})
export class GlobalGoalsComponent implements OnInit {

  boxSize;
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.boxSize = (this.screenWidth / 9)-2;
    console.log("window resized");
  }

  constructor() {
    this.onResize();
  }

  goals = [
    {
      id: 0,
      image: "",
      url: "",
      active: false
    },
    {
      id: 1,
      image: "",
      url: "",
      active: false
    },
    {
      id: 2,
      image: "",
      url: "",
      active: false
    },
    {
      id: 3,
      image: "",
      url: "",
      active: false
    },
    {
      id: 4,
      image: "",
      url: "",
      active: false
    },
    {
      id: 5,
      image: "",
      url: "",
      active: false
    },
    {
      id: 6,
      image: "",
      url: "",
      active: false
    },
    {
      id: 7,
      image: "",
      url: "",
      active: false
    },
    {
      id: 8,
      image: "",
      url: "",
      active: false
    },
    {
      id: 9,
      image: "",
      url: "",
      active: false
    },
    {
      id: 10,
      image: "",
      url: "",
      active: false
    },
    {
      id: 11,
      image: "",
      url: "",
      active: false
    },
    {
      id: 12,
      image: "",
      url: "",
      active: false
    },
    {
      id: 13,
      image: "",
      url: "",
      active: false
    },
    {
      id: 14,
      image: "",
      url: "",
      active: false
    },
    {
      id: 15,
      image: "",
      url: "",
      active: false
    },
    {
      id: 16,
      url: "",
      active: false
    },
    {
      id: 17,
      image: "",
      url: "",
      active: false
    }
  ]

  flipActive(id) {
    for(let i = 0; i < this.goals.length; i++) {
      if(id === this.goals[i].id) {
        if (this.goals[i].active === true) {
          this.goals[i].active = false;
        } else if (this.goals[i].active === false){
          this.goals[i].active = true;
        }
      }
    }
    console.log("flipped " + id);
  }

  getImage(id) {
    return "../../../assets/images/un_goals/"+id+".png";
  }

  ngOnInit(): void {
    for (let i = 0; i < this.goals.length; i++) {
      this.goals[i].image = this.getImage(this.goals[i].id);
    }
  }
}
