<html>
<head>
	<title>.:: BMW RBI Summary Report (Email Notification) ::.</title>
	<style type="text/css">
		.table-css {
			border:solid 1px #000000;
		}
		.upper-th-css {
			border-bottom:solid 1px #000000;
			background-color:#D0D0D0; 
			padding-left:1px;
			font-family:Arial;
			font-size:14px;
		}
		.left-td-css {
			border-bottom:solid 1px #000000;
			border-right:solid 1px #000000;
			padding-left:10px;
			background-color:#F0F0F0; 
			font-family:Arial;
			font-size:12px;
		}
		.mid-td-css {
			border-bottom:solid 1px #000000;
			border-right:solid 1px #000000;
			padding-left:10px;
			padding-right:5px;
			font-family:Arial;
			font-size:12px;
		}
		.right-td-css {
			border-bottom:solid 1px #000000;			
			padding-right:10px;
			font-family:Arial;
			font-size:12px;
		}
		.lower-th-css {
			background-color:#FFFFFF; 
			padding-left:5px;
			font-family:Arial;
			font-size:11px;
		}
.style2 {
	font-size: 12px;
	color: #999999;
}
    </style>
</head>

<body>
	<font face=Arial color=black size=2>Dear all, 
	<br>
	<br>
	Please find below the summary of uploaded record(s) for  ${DATE_PROCESS}.
	<br>
	<br>
	</font>
	
	<table cellSpacing=0 cellPadding=1 width=450px class="table-css"> 
		<tr>
			<th class="upper-th-css" align='center' colspan=2 bgcolor=#D0D0D0>BMW RBI  Summary Report </th>
		</tr>		
		<tr align="center">
			<td class="left-td-css"><b>Report Type</b></td>
			<td class="left-td-css"><b>Total Record(s)</b></td>
		</tr>
		<tr>
			<td class="left-td-css"><b>Remittance</b></td>
			<td class="mid-td-css">${count_remittance}</td>
		</tr>

		<tr>
			<td class="left-td-css"><b>Receivable</b></td>
			<td class="mid-td-css">${count_receivable}</td>
		</tr>		
		<tr>
			<td class="left-td-css"><b>Guaranteed Balance </b></td>
			<td class="mid-td-css">${count_guarantee}</td>
		</tr>		
	</table>
	
	<font face=Arial color=black size=2>
	<br>
	<br>Regards,
	<br>
	<br>
	${MAIL_SENDER}
	<br>
	<!--
	<br>
	</font><span class="style2"><font face=Arial>Email Address: <em>ASTIP-AIDTeam@ayalasystems.com</em></font> </span><font face=Arial color=black size=2><br>
	<br>
	-->
	</font>	

	<p>&nbsp;</p>
	<p class="style2">NOTE: <em>This is an auto   generated mail. Please do not reply to this mail.</em></p>
</body>
</html>