import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dropDown() {
    let wrapper = document.getElementById("genreContainerWrapper");
    wrapper.style.lineHeight = "1.5";
    wrapper.style.height = "30px";
    wrapper.style.color = "#000";
    wrapper.style.borderBottom = "2px solid #000"
    wrapper.style.overflow = "visible";
    wrapper.style.marginTop = "0px;"
  }

  dropUp() {
    let wrapper = document.getElementById("genreContainerWrapper");
    wrapper.style.lineHeight = "0";
    wrapper.style.height = "0px";
    wrapper.style.color = "transparent";
    wrapper.style.overflow = "hidden";
    wrapper.style.marginTop = "-2px;"
  }

}
