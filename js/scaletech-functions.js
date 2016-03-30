/*****************************************************************
	Plan to my cookies
	Method: createCookie(name,value,days)
			createCookie(name,value,0)
			readCookie(name)
			eraseCookie(name)
 */

/*
 * createCookie('ppkcookie','testcookie',7)
 * 7days - active, 0 - close browser remove, less than 0 after opening a browser it will erase automatic
 */
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = '; expires=' + date.toGMTString();
	}
	else var expires = '';
	document.cookie = name + '=' + value + expires + '; path=/';
}

/*
	var x = readCookie('ppkcookie1')
	if (x) {
		[do something with x]
	}
 */
function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

/*
 * eraseCookie('ppkcookie')
 */ 
function eraseCookie(name) {
	createCookie(name, '', -1);
}

function logout() {
	removeToContext()
	eraseCookie('username');
	eraseCookie('userid');
	window.location = DEFAULT_ROOT;
};

function notFoundContextSave(sUserId, sUserName) {
	$.ajax({
		type: 'POST',
		url: '/scaletech/services/UserInfoServices/checkIfUserIsAuthentication',
		data: {
			userId: sUserId, 
			userName: sUserName
		},
		success: function(oXml, textStatus, jqXHR) {
			var sData = getXMLData(oXml, 'type');
			if (sData === 'SUCCESS') {
				// do nothing
			} else {
				logout();
			};
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
		}
	});
};

function removeToContext() {
	$.ajax({
		type: 'POST',
		url: '/scaletech/services/UserInfoServices/removeUser',
		data: {
			user_name: readCookie('username')
		},
		success: function(oXml) {
			var sData = getXMLData(oXml, 'type'); 
			if (sData === 'SUCCESS') {
				return true;
			} else {
				console.log(oXml);
			}
		},
		error: function() {
			alert('error on logout...');
		}
	});
	return false;;
};