<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<head>
	<script type="text/javascript">
	function clickMe() {
		alert('Content: \n'+ document.getElementById("passValue"));
		
	}
    </script>
</head>

<html>

	<body>
		<form action="" method="post" enctype="multipart/form-data">
			<div name="passValue">
				<%= request.getAttribute("content") %>
			</div>
			
			<input type="button" value="Validate License Key" onclick="javascript: clickMe();">
		</form>
	</body>
</html>