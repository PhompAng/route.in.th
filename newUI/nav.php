<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <title>Starter Template - Materialize</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="materialize/css/materialize.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="materialize/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>

  <?php
    $ua = $_SERVER['HTTP_USER_AGENT'];
    $iphone = strpos($ua,"iPhone");
    $safari = strpos($ua,"Safari"); 
    if ($iphone == true && $safari == false){
        echo '<style> div#statusbar{ background: #00bcd4; height: 15pt; width:100%; position:-webkit-sticky; top:0;} </style>';
    }
    else{
        echo '<style> div#statusbar{ display:none;} </style>';
    }
  ?>

</head>
<body>
<div id="statusbar"></div>

  <header>
    <nav class="cyan">
      <div class="nav-wrapper">
        <span class="page-title brand-logo">Route Planner</span>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="side-nav fixed" id="mobile-demo">
          <li class="logo">
            <img src="imgs/logo.png">
          </li>
          <li class="bold active"><a class="">Route Planner</a></li>
          <li class="bold"><a href="#" class="waves-effect waves-teal">Train Network Maps</a></li>
          <li class="bold"><a href="#" class="waves-effect waves-teal">How to Use</a></li>
          <li class="bold"><a href="#" class="waves-effect waves-teal">About Us</a></li>
          <li class="bold"><a href="#" class="waves-effect waves-teal">Report a bug</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card">
          <div class="card-header">
            <span class="card-title black-text">Where do you want to go?</span>
            <div class="card-tool">
              <a id="toggle_setting_modal" href="#"><i class="material-icons grey-text text-lighten-1">settings</i></a>
            </div>
          </div>
          <div class="card-content">
            <div class="input-field">
              <i class="material-icons prefix">home</i>
              <input id="first_name" type="text" placeholder="Type or select your origin">
              <label for="first_name" class="cyan-text text-darken-2">Origin</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">place</i>
              <input id="first_name" type="text" placeholder="Type or select your destination">
              <label for="first_name" class="cyan-text text-darken-2">Destination</label>
            </div>
          </div>
          <div class="card-action no-padding">
            <a class="btn-flat btn-block blue-text text-darken-2"><i class="material-icons left">directions</i>Calculate</a>
          </div>
        </div>
        <div class="card-panel grey darken-3 white-text">
          <span class="white-text">
            This website is in <strong>ALPHA</strong> stage!
          </span>
        </div>
      </div>
    </div>

    <div id="setting_modal" class="modal bottom-sheet">
    <div class="modal-content">
      <h6 class="bold">BTS Fare Rate</h6>
      <div class="divider"></div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_adult_radio" />
          <label for="rabbit_adult_radio">Adult</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_std_radio" />
          <label for="rabbit_std_radio">Student</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_older_radio" />
          <label for="rabbit_older_radio">Older</label>
        </div>
      <h6 class="bold">MRT Fare Rate</h6>
      <div class="divider"></div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_adult_radio" />
          <label for="rabbit_adult_radio">Adult</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_std_radio" />
          <label for="rabbit_std_radio">Student</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_older_radio" />
          <label for="rabbit_older_radio">Older</label>
        </div>
      <h6 class="bold">ARL Fare Rate</h6>
      <div class="divider"></div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_adult_radio" />
          <label for="rabbit_adult_radio">Adult</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_std_radio" />
          <label for="rabbit_std_radio">Student</label>
        </div>
        <div class="radio-group">
          <input name="rabbit_type" class="with-gap" type="radio" id="rabbit_older_radio" />
          <label for="rabbit_older_radio">Older</label>
        </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Save</a>
    </div>
  </div>
  </main>

  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="materialize/js/materialize.min.js"></script>
  <script src="materialize/js/fastclick.js"></script>
  <script src="materialize/js/init.js"></script>

  </body>
</html>
