<?php
header('Content-Type: application/json; charset=utf-8');

$afile = fopen("article.txt", "r") or die("Unable to open file!");

$content = fread($afile,filesize("article.txt"));
fclose($afile);

print '{ "article": "' . $content.'"}';

/*
print '{
	"article": "周五夜不當循行平常的生活路線，心思視野總歡喜在綠園道上行走。月出，星還在路上，寬闊草原人潮仍未聚集，遊人散坐一旁階梯，滑手機或聊天，街頭藝人各占據點架設麥克風，電吉他錚錚撥出零散試音，音箱被抬至合適位置，仰天、相對或分開些！夜氛未濃，七點過後台上旋音仍然鬆散，兩位主唱嗓音未開，左調麥克風右轉接頭，提袋裡的小瑪爾濟斯屢要逃出，名喚D的年輕歌者一次次起身將牠拉回。旋律慵懶，忙碌與休閒未能順接，路人三兩經過，各方狗兒陸續登場。拉不拉多犬晃動一身棕土色厚毛，咧嘴吐舌微笑著，小博美輕靈快步，約克夏自另一頭蹦來，輕繩抑不住躁動，被關禁了整星期就等這刻。"
}';
*/