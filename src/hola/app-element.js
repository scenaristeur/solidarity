import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';

import Swiper from 'swiper';

import './banner-element.js'
import './inbox-element.js'
import './chat-element.js'
import './contacts-element.js'
import './dialog-element.js'

class AppElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
    };
  }

  constructor() {
    super();
  }

  render(){
    return html`
    <link rel="stylesheet" href="./css/swiper.min.css">
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/hola.css" rel="stylesheet">

    <style>
    :host {
      position: relative;
      height: 100%;
    }
    .swiper-container {
      width: auto;
      height: 100%; /*88vh;*/
    }
    .swiper-button-next, .swiper-button-prev {
    position: absolute;
    top: 95%;
    width: calc(var(--swiper-navigation-size)/ 44 * 27);
    height: calc(var(--swiper-navigation-size)/10);

    /*  .swiper-container {
    width: 300px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
  }*/
  .swiper-slide {
    background-position: center;
    background-size: cover;
  }
  </style>

  <div class="container-fluid" >
  <div class="col shadow-lg p-3 mt-3 ml-n1 mr-n1 bg-white" style="height:96vh;width:100vw;border-radius: 25px;">

  <banner-element name="Banner"></banner-element>
  <!-- Slider main container -->
  <div class="swiper-container">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
  <!-- Slides -->
  <div class="swiper-slide">
  <chat-element name="Chat">Chat</chat-element>
  </div>

  <div class="swiper-slide">
  <inbox-element name="Inbox">Inbox</inbox-element>

  </div>

  <div class="swiper-slide"><contacts-element name="Contacts">Contacts</contacts-element></div>

  <div class="swiper-slide"><notes-element name="Notes">Notes</notes-element></div>

  <div class="swiper-slide"><holacratie-element name="Holacratie">Holacratie</holacratie-element></div>

  <div class="swiper-slide"><bookmarks-element name="Bookmarks">Bookmarks</bookmarks-element></div>

  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <!--  <div class="swiper-scrollbar"></div>-->
  </div>
  </div>
  </div>
  <dialog-element name="Dialog"></dialog-element>

  `;
}

firstUpdated(){
  var app = this;
  const slide = this.shadowRoot.querySelector('.swiper-container');
  const prev = this.shadowRoot.querySelector('.swiper-button-prev');
  const next = this.shadowRoot.querySelector('.swiper-button-next');
  const pagination = this.shadowRoot.querySelector('.swiper-pagination');
  const scrollbar = this.shadowRoot.querySelector('.swiper-scrollbar');

  const mySwiper = new Swiper(slide, {
    navigation: {
      nextEl: next,
      prevEl: prev,
      //  hideOnClick : true
    },

    // Optional parameters
    direction: 'horizontal',
    //  loop: true,

    // If we need pagination
    pagination: {
      el: pagination
    },
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    // Navigation arrows
    /*  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },*/

  // And if we need scrollbar
  /*  scrollbar: {
  el: scrollbar,
},*/
});
}

}

customElements.define('app-element', AppElement);
