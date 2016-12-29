<?php
header('Content-Type: application/json; charset=utf-8');
$dir = "./articles/zh/*.txt";
$articles = glob($dir);

//沒有request article id, 直接給第0篇
$requestArticleID = $_POST['articleId'] ? $_POST['articleId'] : 0 ;
$requestArticle = $articles[$requestArticleID];

$afile = fopen($requestArticle, "r") or die( $content = "Unable to open file!");

$content = fread($afile,filesize($requestArticle));
fclose($afile);

$response = ['article' => rawurlencode($content) ];
print json_encode($response);



