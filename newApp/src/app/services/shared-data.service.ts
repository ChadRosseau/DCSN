import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public subcategories = {
    Economy: [
      'Responsible Consumption',
      'Decent Work',
      'Industry & Innovation',
      'Wealth Inequality',
    ],
    Poverty: [
      'Hunger',
      'Health & Wellbeing',
      'Education',
      'Clean Water & Sanitation',
      'Gender Equality'
    ],
    Sustainability: [
      'Clean Energy',
      'Climate Action',
      'Life On Land',
      'Life Below Water',
      'Sustainable Cities'
    ],
    Politics: [
      'Peace & Justice',
      'Partnerships'
    ]
  };

  public categories = Object.keys(this.subcategories);

  public colors = {
    categories: {
      Economy: 'rgba(253, 255, 156, 0.85)',
      Poverty: 'rgba(255, 141, 141, 0.85)',
      Sustainability: 'rgba(173, 255, 162, 0.85)',
      Politics: 'rgba(166, 237, 255, 0.85)'
    },
    subcategories: {
      Economy: 'rgba(213, 214, 132, 0.6)',
      Poverty: 'rgba(212, 119, 119, 0.6)',
      Sustainability: 'rgba(128, 189, 120, 0.6)',
      Politics: 'rgba(126, 203, 223, 0.6)'
    },
    roles: {
      Contributors: 'peachpuff',
      Graphics: 'palegreen',
      Technology: 'aquamarine',
      Moderators: 'lightcoral'
    }
  }

  public roleData = {
    Contributors: {
      name: 'Contributors',
      description: `Contributors are a body of the newspaper who create various types of content, whether they be articles, op-eds, videos, artwork, photos, plays, and more, on a plethora of global and local issues. Exemplary classwork could also be featured on the website. The group is split between <b>regular</b> and <b>irregular</b> contributors. 
                  <br></br>
                  <b>Regular</b> contributors are required to submit content for every rotational period (at this moment it is every month). They are liable for certain external benefits that come with the student school newspaper such as scheduled guest speakers, tours, awards, and more. 
                  <br></br>
                  <b>Irregular</b> contributors can submit content at any time. They are not liable for external benefits.`,
      image: "url('https://www.gannett-cdn.com/-mm-/1a8acce37f9dec687e28fea0dcc2cd1a63bf2357/c=114-0-1799-952/local/-/media/2017/03/21/Hattiesburg/Hattiesburg/636257086773922310-AP16345247271964.jpg?width=1600&height=800&fit=crop')"
    },
    Moderators: {
      name: 'Moderators',
      description: `Student moderators edit, evaluate, and approve content submitted by contributors, graphics supplied by the graphic designers, and software developed by ICT technicians. 
                  <br></br>
                  This group forms the <b>content moderation team</b>, the main priority of which is to publish content for the newspaper by a majority vote while adhering to the <a href="">content guidelines</a>. 
                  <br></br>
                  Acting as a mix between a judicial and legislative body, the content moderation team rules on important decisions and has the power to make, change, or repeal the guidelines of the newspaper.`,
      image: "url('https://ca-times.brightspotcdn.com/dims4/default/684fd24/2147483647/strip/true/crop/500x394+0+0/resize/840x662!/quality/90/?url=https%3A%2F%2Fwww.trbimg.com%2Fimg-50216713%2Fturbine%2Fsns-jobs-food-critic')"
    },
    ICT: {
      name: 'ICT',
      description: `The ICT division is responsible for managing, maintaining, and updating any software the newspaper requires. Website management, upkeep and development are core elements of an ICT technician’s profession. 
                  <br><br>
                  The DCSN website is built using the Angular CLI framework and maintains a Firebase database backend. Technicians must be eager to learn and improve, and familiar with working with APIs and external documentation to write custom code. It should be noted that the level of programming skill required for this role exceeds that of the average high-school student.
                  <br><br>
                  Prospective programmers must have basic knowledge of HyperText Markup Language (HTML) and Cascading Style Sheets (CSS), along experience with at least one object-oriented programming language (<b>JavaScript, TypeScript</b>, Java, C++, C#, Python, etc). Since Angular uses ES6 Javascript and Typescript, previous familiarity with these languages is preferred.`,
      image: "url('https://acimg.auctivacommerce.com/imgdata/0/0/0/0/9/7/webimg/2290592.jpg')"
    },
    Graphics: {
      name: 'Graphics',
      description: `Graphic designers are a group working for the newspaper to provide all kinds of illustrations for the newspaper. This may include graphics for advertisement, for accompanying articles, or for standalone content in the form of posters, banners, videos, and more.`,
      image: "url('https://paintingvalley.com/images/rapunzel-painting-30.jpg')"
    },
  }

  constructor() { }
}
