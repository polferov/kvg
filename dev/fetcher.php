<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Unbenanntes Dokument</title>
</head>

<body>
	<script>
		for(var i = 0; i < 57000; i++)
			{
				fetch("scan.php?nr=" + i);
			}
	</script>
</body>
</html>