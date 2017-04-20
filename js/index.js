/*为主页实现自动填充内容和分页的功能，
 * 一页有6个post
 */
var jsonstr, //数据
	pagenum, //页数
	currentpn; //当前页码
$(document).ready(function() {
	initpage();
});

function initpage(e) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			createpage(xmlhttp.responseText, 0);
			jsonstr = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "postindex.json", true);
	xmlhttp.send();
}

function createpage(jsstr, pageindex) {
	var jsobj = eval(jsstr);
	var obj = [];
	pagenum = jsobj.length;
	currentpn = pageindex;
	createpageNavigator();
	var pageobj = jsobj[pageindex];
	for (var i = 0; i < pageobj.length; i++) {
		var post = $('<div class="post"><h1 class="title"><a>EX04</a></h1><div class="post-meta"><i class="fa fa-calendar"></i></div><div class="post-cnt"></div><p class="readmore"><a href="src/ex04.html">more<i class="fa fa-angle-double-right"></i></a> </p></div>');


		post.children('.title').children('a').attr('href', pageobj[i].src);
		post.children('.title').children('a').text(pageobj[i].title);
		post.children('.post-meta').append(pageobj[i].postmeta);
		post.children('.post-cnt').text(pageobj[i].postcnt);
		post.children('.readmore').children('a').attr('href', pageobj[i].src);

		obj.push(post);
	}
	for (var i = obj.length - 1; i >= 0; i--) {
		$('.cnt-container').prepend(obj[i]);
	}
	//绑定事件：
	var numobj = $('.num');
	for (var i = 0; i < numobj.length; i++) {
		if (i != currentpn) {
			numobj.eq(i).on('click', changepage);
		}
	}
}

/*创建页目录*/
function createpageNavigator() {
	$('.num').remove();
	for (var i = 1; i <= pagenum; i++) {
		var pgn = $('<a class="num" href="#"></a>');
		if (i == currentpn + 1) {
			pgn = $('<span class="num current"></span>');
		}
		pgn.text(i);
		$('.page-num').append(pgn);
	}
}
//页码的点击事件
function changepage() {
	var pageindex = $(this).index();
	$('.cnt-container').children('.post').remove();
	createpage(jsonstr, pageindex);
}