<?php

$gi = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . "/getInfo.php";

if(isset($_GET['stop']))
{
	$data = null;
	if(isset($_GET['mode']))
		$data = file_get_contents($gi . "?stop=" . $_GET['stop'] . "&mode=" . $_GET['mode']);
	else
		$data = file_get_contents($gi . "?stop=" . $_GET['stop']);
}
else
	echo "Hello4";

$data = json_decode($data);

$tgs = $_POST['tags'];

echo generateInfoUl($data);

function createTags($tags)
{
	if(!$tags)
		return '';
	$td = '<div class="tags">';
	foreach($tags as $tag)
		$td .= '<div style="background = '.$tag.'" class="tag"></div>';
	$td .= '</div>';
	return($td);
}


function createLI($obj)
{
	$html = "<li>";
	$html .= "<div>";
	$html .= '<p class="busTitle">'.$obj->patternText.' --> '.$obj->direction.'</p>';
	if(isset($tgs[$obj->patternText]))
		$html .= createTags($tgs[$obj->patternText]);
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
	if($_POST['timeInMin'])
		$time = secToMin($time);
	
	$html .= '<div class="timeContainer">';
	$html .= '<span>'.$time.'</span>';
	$html .= '<span>'."latency".'</span>';
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
	if(!isset($Obj->actual[0]))
			return('<p>no current Information</p>');
	
	$html = '<ul id="infoUL">';
	
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
	$sec = (String)($sec % 60);
	
	if(sizeof($sec) == 0)
		$sec = "00";
	if(sizeof($sec) == 1)
		$sec = "0".$sec;
	if(sizeof($sec) > 2)
		$sec = "Error";
}