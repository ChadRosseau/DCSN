import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public dcImages = {
    map: 'url("https://drive.google.com/uc?id=11scR8_wk_4MTPWKIcJsoBXlmDN0xK9OD")',
    groupwork: 'url("https://drive.google.com/uc?id=1paM6_4yyIAMvRMwo_ZRptOYmm7gJ2pNf")',
    presentation: 'url("https://drive.google.com/uc?id=1AgHEEMiEmxMfNlHOa0pAMFOkLVaKcf_7")',
    techDuo: 'url("https://drive.google.com/uc?id=1ACLirFjyNvnio1eyKSbi-855zJaMyxbG")',
    mapPointing: 'url("https://drive.google.com/uc?id=1fuEwgmlbkHLnf_TwDIeDIWQ8rNybeZoJ")',
    moderator: 'url("https://drive.google.com/uc?id=1CECRcnXcIUymxaH4qslU3dyT8zksPik-")',
    techSingle: 'url("https://drive.google.com/uc?id=1D-WrOpO2OzyLffAINmMu_PWG81WP6BU-")',
    writerDuo: 'url("https://drive.google.com/uc?id=1_zeRTYylRcDzWIIzSoyCwKfpKMl_lnmC")',
    graphics: 'url("https://drive.google.com/uc?id=1n7GgVnrmp_oFxvauDb_w5Hge_uLl4aww")',
    graphicsPro: 'url("https://drive.google.com/uc?id=1W5SFWDW86HZPtjIwP9YI7AVgq8i6uyI_")',
    groupPhoto: 'url("https://drive.google.com/uc?id=1QIoxS3zyTCMjcW8_sA3lwUZGKXxhZREL")',
  };

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
      'Gender Equality',
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
      Economy: 'rgba(213, 214, 132, 0.75)',
      Poverty: 'rgba(212, 119, 119, 0.75)',
      Sustainability: 'rgba(128, 189, 120, 0.75)',
      Politics: 'rgba(126, 203, 223, 0.75)'
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
      image: this.dcImages.writerDuo,
      icon: `<i class="roleIcon far fa-edit"></i>`
    },
    Moderators: {
      name: 'Moderators',
      description: `Student moderators edit, evaluate, and approve content submitted by contributors, graphics supplied by the graphic designers, and software developed by ICT technicians. 
                  <br></br>
                  This group forms the <b>content moderation team</b>, the main priority of which is to publish content for the newspaper by a majority vote while adhering to the <a href="">content guidelines</a>. 
                  <br></br>
                  Acting as a mix between a judicial and legislative body, the content moderation team rules on important decisions and has the power to make, change, or repeal the guidelines of the newspaper.`,
      image: this.dcImages.moderator,
      icon: `<i class="roleIcon far fa-copy"></i>`
    },
    ICT: {
      name: 'ICT',
      description: `The ICT division is responsible for managing, maintaining, and updating any software the newspaper requires. Website management, upkeep and development are core elements of an ICT technician’s role. 
                  <br><br>
                  The DCSN website is built using the Angular CLI framework and maintains a Firebase database backend. Technicians must be eager to learn and improve, and familiar with working with APIs and external documentation to write custom code. It should be noted that the level of programming skill required for this role exceeds that of the average high-school student.
                  <br><br>
                  Prospective programmers must have basic knowledge of HyperText Markup Language (HTML) and Cascading Style Sheets (CSS), along experience with at least one object-oriented programming language (<b>JavaScript, TypeScript</b>, Java, C++, C#, Python, etc). Since Angular uses ES6 Javascript and Typescript, previous familiarity with these languages is preferred.`,
      image: this.dcImages.techSingle,
      icon: `<i class="roleIcon fas fa-laptop-code"></i>`
    },
    Graphics: {
      name: 'Graphics',
      description: `The Graphic Design department at DCSN provides a variety of visual content for the newspaper. 
                    <br><br>
                    The primary role of the Graphic Design department lies in creating artistic pieces to accompany articles or other media produced by contributors. However, there are also a variety of other areas it contributes to, including graphics for the ICT team to implement in the DCSN website, standalone content in the form of posters or banners, and promotional content such as advertising graphics for social media, the school Ding page, and more.
                    <br><br>
                    Prospective artists should possess a solid understanding of basic artistic principles and a passion for creativity. While DCSN does accept use of a variety of mediums for artistic creation, experience using digital art tools and/or editing software is favourable.`,
      image: this.dcImages.graphicsPro,
      icon: `<i class="roleIcon fas fa-palette"></i>`
    },
  }

  public joinusInfo = [
    {
      head: "Applications",
      body: `Once you have submitted your application, the department heads at DCSN will review your form. 
             <br><br>
             Should they determine that you fufill the requirements for role and are suitable for the position, you will be notified and given access to the organization.`
    },
    {
      head: "Leadership",
      body: `DCSN is one of few organisations at DC which allow for students to remain with the network over multiple years.
             <br><br>
             As students grow older and gain experience, additional leadership roles may open in availability for them, including heads of department, assistant heads, and more.`
    },
    {
      head: "CE/CAS",
      body: `Every position at DCSN holds credit for the MYP/DP Community Engagement program, the types of which
             differ between positions. 
             <br><br>
             Joining DCSN is a great way to give back to the local community while helping to promote
             student awareness and achievement within our school.`
    },
  ]


  constructor() { }
}
