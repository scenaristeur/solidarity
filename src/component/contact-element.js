import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class ContactElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Contact Element"
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/fontawesome/css/all.css" rel="stylesheet">

    <style>
    body,html{
    height: 100%;
    margin: 0;
    background: #7F7FD5;
       background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
  }

  .chat{
    margin-top: auto;
    margin-bottom: auto;
  }
  .card{
    height: 500px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .contacts_body{
    padding:  0.75rem 0 !important;
    overflow-y: auto;
    white-space: nowrap;
  }
  .msg_card_body{
    overflow-y: auto;
  }
  .card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
  }
 .card-footer{
  border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
}
  .container{
    align-content: center;
  }
  .search{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
  }
  .search:focus{
       box-shadow:none !important;
         outline:0px !important;
  }
  .type_msg{
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
    height: 60px !important;
    overflow-y: auto;
  }
    .type_msg:focus{
       box-shadow:none !important;
         outline:0px !important;
  }
  .attach_btn{
border-radius: 15px 0 0 15px !important;
background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .send_btn{
border-radius: 0 15px 15px 0 !important;
background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .search_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .contacts{
    list-style: none;
    padding: 0;
  }
  .contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
  }
.active{
    background-color: rgba(0,0,0,0.3);
}
  .user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;

  }
  .user_img_msg{
    height: 40px;
    width: 40px;
    border:1.5px solid #f5f6fa;

  }
.img_cont{
    position: relative;
    height: 70px;
    width: 70px;
}
.img_cont_msg{
    height: 40px;
    width: 40px;
}
.online_icon{
  position: absolute;
  height: 15px;
  width:15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0.2em;
  right: 0.4em;
  border:1.5px solid white;
}
.offline{
  background-color: #c23616 !important;
}
.user_info{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span{
  font-size: 20px;
  color: white;
}
.user_info p{
font-size: 10px;
color: rgba(255,255,255,0.6);
}
.video_cam{
  margin-left: 50px;
  margin-top: 5px;
}
.video_cam span{
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.msg_cotainer{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: #82ccdd;
  padding: 10px;
  position: relative;
}
.msg_cotainer_send{
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
}
.msg_time{
  position: absolute;
  left: 0;
  bottom: -15px;
  color: rgba(255,255,255,0.5);
  font-size: 10px;
}
.msg_time_send{
  position: absolute;
  right:0;
  bottom: -15px;
  color: rgba(255,255,255,0.5);
  font-size: 10px;
}
.msg_head{
  position: relative;
}
#action_menu_btn{
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
}
.action_menu{
  z-index: 1;
  position: absolute;
  padding: 15px 0;
  background-color: rgba(0,0,0,0.5);
  color: white;
  border-radius: 15px;
  top: 30px;
  right: 15px;
  display: none;
}
.action_menu ul{
  list-style: none;
  padding: 0;
margin: 0;
}
.action_menu ul li{
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
}
.action_menu ul li i{
  padding-right: 10px;

}
.action_menu ul li:hover{
  cursor: pointer;
  background-color: rgba(0,0,0,0.2);
}
@media(max-width: 576px){
.contacts_card{
  margin-bottom: 15px !important;
}
}
</style>
    <h4>${this.something}</h4>

<!--
    <div class="container-fluid h-100">
  			<div class="row justify-content-center h-100">-->
  				<div class="col-md-4 col-xl-12 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
  					<div class="card-header">
  						<div class="input-group">
  							<input type="text" placeholder="Search..." name="" class="form-control search">
  							<div class="input-group-prepend">
  								<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
  							</div>
  						</div>
  					</div>
  					<div class="card-body contacts_body">
  						<ui class="contacts">
  						<li class="active">
  							<div class="d-flex bd-highlight">
  								<div class="img_cont">
  									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
  									<span class="online_icon"></span>
  								</div>
  								<div class="user_info">
  									<span>Khalid</span>
  									<p>Kalid is online</p>
  								</div>
  							</div>
  						</li>
  						<li>
  							<div class="d-flex bd-highlight">
  								<div class="img_cont">
  									<img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img">
  									<span class="online_icon offline"></span>
  								</div>
  								<div class="user_info">
  									<span>Taherah Big</span>
  									<p>Taherah left 7 mins ago</p>
  								</div>
  							</div>
  						</li>
  						<li>
  							<div class="d-flex bd-highlight">
  								<div class="img_cont">
  									<img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img">
  									<span class="online_icon"></span>
  								</div>
  								<div class="user_info">
  									<span>Sami Rafi</span>
  									<p>Sami is online</p>
  								</div>
  							</div>
  						</li>
  						<li>
  							<div class="d-flex bd-highlight">
  								<div class="img_cont">
  									<img src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg" class="rounded-circle user_img">
  									<span class="online_icon offline"></span>
  								</div>
  								<div class="user_info">
  									<span>Nargis Hawa</span>
  									<p>Nargis left 30 mins ago</p>
  								</div>
  							</div>
  						</li>
  						<li>
  							<div class="d-flex bd-highlight">
  								<div class="img_cont">
  									<img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" class="rounded-circle user_img">
  									<span class="online_icon offline"></span>
  								</div>
  								<div class="user_info">
  									<span>Rashid Samim</span>
  									<p>Rashid left 50 mins ago</p>
  								</div>
  							</div>
  						</li>
  						</ui>
  					</div>
  					<div class="card-footer"></div>
  				</div></div>
<!--
  			</div>
  		</div>-->












    `;
  }

  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
    console.log(this.agent)
    this.agent.receive = function(from, message) {
      //  console.log("messah",message)
      if (message.hasOwnProperty("action")){
        //  console.log(message)
        switch(message.action) {
          case "webIdChanged":
          app.webIdChanged(message.webId)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateProfile();
    }else{

    }
  }

}

customElements.define('contact-element', ContactElement);
