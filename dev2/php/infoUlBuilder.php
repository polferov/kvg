<?php

ini_set("display_errors", 1);


$arrival = "http://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=";
$departure = "http://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop=";

$data = null;

ini_set("display_errors", 0);

if(isset($_GET['stop']))
{
	if(isset($_GET['mode']))
	{
		if($_GET['mode'] == "arr")
			$data = file_get_contents($arrival . $_GET['stop']);
		
		if($GET['mode'] == "dep")
			$data = file_get_contents($departure . $_GET['stop']);
	}
	else
		$data = file_get_contents($departure . $_GET['stop']);
}

//echo $data;

if($data == -1){
	echo -1;
	die();
}

$data = json_decode($data);

$tgs = null;
if(isset($_GET['tags']))
	$tgs = $_GET['tags'];
$tgs = json_decode($tgs);

echo generateInfoUl($data);

function createTags($tags)
{
	if(!$tags)
		return 'Hello';
	
	$td = '<div class="tags">';
	foreach($tags as $tag)
		$td .= '<div style="background: '.$tag.';" class="tag"></div>';
	$td .= '</div>';
	return($td);
}


function createLI($obj)
{
	$html = "";
	$html .= "<li>";
	$html .= "<div>";
	$html .= '<p class="busTitle">'.$obj->patternText.' --> '.$obj->direction.'</p>';
	
	$ptxt = $obj->patternText;
	if(isset($GLOBALS['tgs']->$ptxt))
		$html .= createTags($GLOBALS['tgs']->$ptxt);
	
	$html .='<div class="fixedTimeDiv">';
	$html .= '<span class="actualTime';
	if(isset($obj->actualTime))
	if($obj->plannedTime != $obj->actualTime)
		$html .= ' overwritten';
	$html .='">'.$obj->plannedTime.'</span>';
	if(isset($obj->actualTime))
	if($obj->plannedTime != $obj->actualTime)
		$html .= '<span class="actualTime">'.$obj->actualTime.'</span>';
	$html .= "</div>";
	
	$time = $obj->actualRelativeTime;
	if(isset($_GET['timeInMin']))
		if($_GET['timeInMin'] == "true")
			$time = secToMin($time);
//	echo $_GET['timeInMin'];
	
	$html .= '<div class="timeContainer">';
	$html .= '<span class="countdown">'.$time.'</span>';
	$td = calcTimeDif($obj->plannedTime, $obj->actualTime);
	if($td == 0 || $obj->actualTime = null || !isset($obj->actualTime))
		$td = '';
	$html .= '<span class="delay">'.((String) $td).'</span>';
	$html .= "</div>";
	
	$html .= "</div>";
	$html .= "</li>";
	
	return($html);
		
	/*	var ptxt = lmnt.patternText;
		var dir = lmnt.direction;
		var art = lmnt.actualRelativeTime;
		var at = lmnt.actualTime;
		var mt = lmnt.mixedTime;
		var ptme = lmnt.plannedTime;
		var stts = lmnt.status;
		
		d.appendChild(pte);
		
		var tme = document.createElement("div");
		tme.classList.add("timeContainer");
		var sece = document.createElement("span");
		var verspe = document.createElement("span");
		var fixedTimeDiv = document.createElement("div");
		fixedTimeDiv.classList.add("fixedTimeDiv");
		
		var pte = document.createElement("span");
		pte.innerHTML = ptme;
		pte.classList.add("actualTime");
		fixedTimeDiv.appendChild(pte);
		if(ptme != at)
			{
				var ate = document.createElement("span");
				ate.innerHTML = at;
				ate.classList.add("actualTime");
				pte.classList.add("overwritten");
				fixedTimeDiv.appendChild(ate);
			}
		
		sece.innerHTML = settings.get(settings.convertTime) ? Math.floor(art/60) + ':' + (Math.abs(art%60).toString().length == 2 ? Math.abs(art%60).toString() : (Math.abs(art%60).toString().length == 1 ? "0" + Math.abs(art%60).toString() : (Math.abs(art%60).toString().length == 0 ? "00" : "error"))) : art;
		var td = timeDiffInMin(ptme, at);
		verspe.innerHTML = td != 0 ? td : "";
		d.appendChild(fixedTimeDiv);
		tme.appendChild(sece);
		tme.appendChild(verspe);
		d.appendChild(tme);
		
		
		
	});*/
}

function generateInfoUl($Obj){
//	console.log(Obj);
	//time stamp
	$html = "";
	$html .= '<div class="lastUpdate" id="lastUpdate">';
	$html .= "Last update at: ". date("h:i:s");
	$html .= '</div>';
	
	
	if(!isset($Obj->actual[0]))
			return('<p>no current Information</p>');
	
	$html .= '<ul id="infoUL">';
	
	foreach($Obj->actual as $i)
	{
		$html .= createLI($i);
	}
	
	$html .= "</ul>";
	
	
	return($html);
	
	/*var ul = document.createElement("ul");
	ul.id = "infoUL";
	Obj.actual.sort((a,b) => a.actualRelativeTime != b.actualRelativeTime ? a.actualRelativeTime - b.actualRelativeTime : (a.patternText != b.patternText ? a.patternText - b.patternText : a.direction < b.direction)).forEach(function(lmnt){
		
		var li = document.createElement("li");
		ul.appendChild(li);
		var d = document.createElement("div");
		li.appendChild(d);
		
		var ptxt = lmnt.patternText;
		var dir = lmnt.direction;
		var art = lmnt.actualRelativeTime;
		var at = lmnt.actualTime;
		var mt = lmnt.mixedTime;
		var ptme = lmnt.plannedTime;
		var stts = lmnt.status;
		
		
		var pte = document.createElement("p");
		pte.classList.add("busTitle");
		pte.innerHTML = ptxt + " --> " + dir;
		if(tags)
			{
				var tgs = tags[ptxt];
				if(tgs)
					for(var i = 0; i < tgs.length; i++)
						{
	//				console.log("Hello");
							var tag = document.createElement("div");
							tag.style.display = "inline-block";
							tag.style.marginLeft = "10px";
							tag.style.padding = 0;
							tag.style.height = "10px";
							tag.style.width = "10px";
							tag.style.background = tgs[i];
							pte.appendChild(tag);
						}
			}
		d.appendChild(pte);
		
		var tme = document.createElement("div");
		tme.classList.add("timeContainer");
		var sece = document.createElement("span");
		var verspe = document.createElement("span");
		var fixedTimeDiv = document.createElement("div");
		fixedTimeDiv.classList.add("fixedTimeDiv");
		
		var pte = document.createElement("span");
		pte.innerHTML = ptme;
		pte.classList.add("actualTime");
		fixedTimeDiv.appendChild(pte);
		if(ptme != at)
			{
				var ate = document.createElement("span");
				ate.innerHTML = at;
				ate.classList.add("actualTime");
				pte.classList.add("overwritten");
				fixedTimeDiv.appendChild(ate);
			}
		
		sece.innerHTML = settings.get(settings.convertTime) ? Math.floor(art/60) + ':' + (Math.abs(art%60).toString().length == 2 ? Math.abs(art%60).toString() : (Math.abs(art%60).toString().length == 1 ? "0" + Math.abs(art%60).toString() : (Math.abs(art%60).toString().length == 0 ? "00" : "error"))) : art;
		var td = timeDiffInMin(ptme, at);
		verspe.innerHTML = td != 0 ? td : "";
		d.appendChild(fixedTimeDiv);
		tme.appendChild(sece);
		tme.appendChild(verspe);
		d.appendChild(tme);
		
		
		
	});
	return ul;*/
}

function secToMin($sec){
	$min = (String)((Int)($sec / 60));
	$sec = (String)abs($sec % 60);
	
	if(strlen($sec) == 0)
		$sec = "00";
	if(strlen($sec) == 1)
		$sec = "0".$sec;
	if(strlen($sec) > 2)
		$sec = "Error";
	return($min . ':' . $sec);
}

function calcTimeDif($a, $b)
{
	return timeStringToMin($b) - timeStringToMin($a);
}

function timeStringToMin($t){
	$t = explode(':', $t);
	$min = ((Int)$t[0])*60 + ((Int)$t[1]);
	return($min);
}