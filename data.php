<?php
header('Content-Type: application/json; charset=utf-8');
$request = $_POST['foo'];
if ($request == 'bar') {

	$afile = fopen("article.txt", "r") or die("Unable to open file!");

	$content = fread($afile,filesize("article.txt"));
	$content = urlencode($content);
	fclose($afile);

	// print '{ "article": "' . $content.'"}';
	print '{ "article": "' .$content .'"}';

} else {
 	$content = urlencode('空資料');
	print '{ "article": "' .$content .'"}';

}
