<?
  /**
  * The following arguments can be passed:
  * @param string $main_title - title of the page
  * @param array  $main_templates - templates to include
  * @param array  $main_javascripts - javascripts to include
  **/
?>
<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title><?=$main_title?> - Vue-Symfony testing task</title>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css'>
  <link rel="stylesheet" href="src/css/style.css">
</head>

<body>



<? 
  foreach ($main_templates as $template) {
    include ("src/views/{$template}"); 
  }
?>

<div class="container">
  <main id="app"></main>
</div>

<script src='libs/vue.js'></script>
<script src='libs/vue-router.js'></script>
<script src='libs/axios.js'></script>
<script src='libs/lodash.js'></script>

<? 
  foreach ($main_javascripts as $javascript) {
    ?>
      <script src="src/js/<?=$javascript?>"></script>   
    <?
  }
?>

</body>
</html>
