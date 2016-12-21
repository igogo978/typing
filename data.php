<?php
header('Content-Type: application/json; charset=utf-8');
$request = $_POST['foo'];
// $request = 'bar';
$fileArticle = "./articles/zh/朱子治家格言.txt";
if ($request == 'bar') {

	$afile = fopen($fileArticle, "r") or die( $content = "Unable to open file!");

	$content = fread($afile,filesize($fileArticle));
	$content = urlencode($content);
	fclose($afile);

	// print '{ "article": "' . $content.'"}';
	print '{ "article": "' .$content .'"}';

} else {
 	$content = urlencode('空資料');
	print '{ "article": "' .$content .'"}';

}
