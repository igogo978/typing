<?php
header('Content-Type: application/json; charset=utf-8');
$dir = "./articles/zh/*.txt";
$articles = glob($dir);

//print_r($articles);
//print basename($articles[0],'.txt');

foreach($articles as $key => $values){
	// print $values;
	$filename = get_basename($values);
	// $articles[$key] = rawurlencode($filename);
	$collect['articles'][] = ['id' => $key,'fileName' => rawurlencode($filename), 'filePath' => rawurlencode($values)];
}

// print json_encode($articles);
print json_encode($collect);

function get_basename($filename){
     $filename = preg_replace('/^(.+[\\\\\\/])/', '', $filename);
     $filename = preg_replace('/\.txt$/', '', $filename);
     return $filename;
}

