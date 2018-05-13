import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DirectLine } from 'botframework-directlinejs';
import * as $ from 'jquery';
import * as responsiveVoice from 'responsivevoice';
import {ViewEncapsulation,PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
import { NgxAutoScrollModule } from "ngx-auto-scroll";
// import { texttospeech } from "../assets/javascript/demo";
declare var postActivity: any;


declare var message_from_directline: any;
declare var directLine: any;
declare var activity$: any;
declare var responsiveVoice: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// export interface IWindow extends Window {
//   webkitSpeechRecognition: any;
//   const {webkitSpeechRecognition} : IWindow = <IWindow>window;
//   this.recognition = new webkitSpeechRecognition();
// }
export class AppComponent implements OnInit {
  title = 'app';

  // video: string = "https://www.youtube.com/embed/CD-E-LDc384" ;
	video: string ;
  user_message: any;
  message_bol: any;
  responsiveVoice: any;
  rate: any;
	speak: String;
  total_message = [];
  cards = [];
  message_from_drestline: any;
 
  directLine: any;
  text_ui = [];
  OnLine = navigator.onLine;
  type_key: string;
  recognizing = false;
  ignore_onend: any;
  start_timestamp: any;
 
  current_style: any;
  first_char = /\S/;
  window: any;
  muted = false;
  ngOnInit(): void {
    this.directLine = new DirectLine({
      secret: 'HzA2pvI2Q-U.cwA.Glo.huF_gs2n_i52zgfuPcwatpLY8ilk1czp0EwDjA8uCBs',
      webSocket: true,
      pollingInterval: 1000
    });
    

   
    // this.message_speak.onstart = function (event) {
      // $('#lady').attr("src", "../assets/images/avatar.gif");
    // }

    // this.message_speak.onend = function (event) {
      // $('#lady').attr("src", "../assets/images/avatar_3.jpg");
    // }
    this.directLine.activity$.filter(activity => activity.type === 'message').subscribe(
      message => {
   
        console.log(message);
        if (message.from['name'] == "naveen_bot_dev") {
          if (message.text) {
            this.text_ui = [];
            this.message_from_drestline = message.text;
            console.log("message from bot :-", this.message_from_drestline);
            console.log(this.message_from_drestline[0]);
			
            if (!this.muted) {
              if (this.message_from_drestline[0] == '_') {
                this.message_from_drestline = this.message_from_drestline.substr(1).slice(0, this.message_from_drestline.length)
              }
              else {
				  
			
			
				var abc = this.message_from_drestline
            responsiveVoice.speak(abc);
				
              }
            }
            this.text_ui.push({ name: this.message_from_drestline, side: 'bot' });
			console.log(text_ui);
            this.total_message.push({ message_ui: this.text_ui });
          }
       
      
        }
        console.log(this.total_message);
      });
  }
  send() {
    
    this.user_message = $('.input_value').val();
    if (this.user_message != "") {
      this.directline_message(this.user_message);
    }
    $(".icon2").css("display", "none");
    $(".start").css("display", "none");
    $(".input_value").val("");
  }
  readmore(text) {

    this.directline_message(text);
  }
  card_submit(bot){
    let i;
    console.log(bot.attachment2.length);
    console.log(bot.attachment2);
    for (i=0;i < bot.attachment2.length;i++){
      console.log(i);
      var json1 = [];
      var text = bot.attachment2[i].text;
      console.log('cvcbsyuc0');
      console.log(text);
      json1.push({ text : $('.'+text).val()});
    }
    console.log(json1);
 
    this.directLine.postActivity({
      from: { id: Math.random().toString(36).substring(7), name: 'You' }, // required (from.name is optional)
      type: 'message',
      text: json1,
    }).subscribe(
      id => console.log("Posted activity, assigned ID ", id),
      error => console.log("Error posting activity", error)
    );
  }
  directline_message(text_input) {
   
    this.type_key = null;
    console.log(this.type_key);
    this.internet_connection();
    this.text_ui = [];
    this.text_ui.push({ name: text_input, side: 'user' });
    this.total_message.push({ message_ui: this.text_ui });
    console.log(text_input)
    this.directLine.postActivity({
      from: { id: 'arpit', name: 'You' }, // required (from.name is optional)
      type: 'message',
      text: text_input,
    }).subscribe(
      id => console.log("Posted activity, assigned ID ", id),
      error => console.log("Error posting activity", error)
    );
  }
  internet_connection() {
    this.OnLine = navigator.onLine;
    if (this.OnLine)
      console.log('internet');
    else
      alert('no internet');
  }
  keyboard_press() {
    this.type_key = 'TYPING....';
    console.log(this.type_key);
  }

  showButtons(style) {
    if (style == this.current_style) {
      return;
    }
    this.current_style = style;
  }
  cross() {
    $(".sidebox").css("width", "0vw");
    $(".lady").css("width", "0vw");
    $(".menu").css("display", "block");
    $(".chatbox").css("left", "14vw");
    $(".icon6").css("display", "none");
    $(".amanda").css("display", "none");
  }
  cross_no() {
    $(".sidebox").css("width", "25vw");
    $(".lady").css("width", "22vw");
    $(".menu").css("display", "none");
    $(".chatbox").css("left", "28vw");
  }
  mute() {
    
    console.log('hello@@');
    this.muted = true;
    $(".icon4").css("display", "none");
    $(".icon7").css("display", "block");
  }
  volume() {
    this.muted = false;
    $(".icon4").css("display", "block");
    $(".icon7").css("display", "none");
  }
  onKeydown(event) {
    this.send();
  }
}
