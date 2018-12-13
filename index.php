<!DOCTYPE html>
<html lang="fr">

<head>
  <title>Brexit</title>
  <meta charset="utf-8">
  <meta name="description" content="Immersive experience">
  <meta property="og:title" content="Brexit ">
  <meta property="og:type" content="website">
  <meta property="og:image" content="#">
  <meta property="og:description" content="Immersive Experience">
  <meta property="og:site_name" content="Brexit">
  <meta property="og:locale" content="fr_FR">
  <link rel="shortcut icon" href="assets/img/favico-2.png">
  <link rel="stylesheet" type="text/css" href="assets/css/main.min.css?d=<?php echo rand(0,10000000000000000) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:200,300,400,500,600,700|Montserrat:200,300,400,500,600,700|Noto+Serif+SC|Josefin+Sans:300,400,600,700" rel="stylesheet">
</head>

<body>
  <!-- Map -->
  <div class="container-map">
      <?php require('map.php'); ?>
  </div>
  <div class="overflow center-title-main">
    <h1 class="title-main">The Brexit</h1>
  </div>
  <?php require("button.php"); ?>
  <?php require("timeline.php"); ?>
  <script type="module" src="assets/js/main.js"></script>
  <script type="module" src="assets/js/app.js"></script>
</body>

</html>
