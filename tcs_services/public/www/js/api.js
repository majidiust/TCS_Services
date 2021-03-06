/**
 * Created by Majid on 9/29/2014.
 */

var token;
var inter;
var images;
var index = 0;
var count;
var plate;
var pageSize = 500;
var lastPage;
var currentId;
var lastState;
var currentProfile;
var selectedUser;
var tp = 0 ;
var cp = 0 ;
var mp = 0;

function tablefy(tableid) {
    var table = $('#' + tableid);
    table.
    dataTable({
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	    if(aData[4])
	    {
		$(nRow).css('color', 'red');
		console.log(aData[4]);
	    }
	},
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "تاریخ"
            },
            {
                "sTitle": "زمان"
            },
            {
                "sTitle": "پلاک"
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    //sReturn = '<center><div onclick="openComplexModal(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures">Ø¬Ø²ÛŒÛŒØ§Øª</div></center>';
                    sReturn = '<center><div onclick="showDetails(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures" style="cursor:pointer;">جزییات</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            }
        ]
    });
    table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}

function tablefyCustom(tableid) {
    var table = $('#' + tableid);
    table.dataTable({
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	    if(aData[5])
	    {
		$(nRow).css('color', 'red');
		console.log(aData[5]);
	    }
	},
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
//	"bServerSide": true,
//	"bAjaxSource" : "/salam", 
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "تاریخ"
            },
            {
                "sTitle": "زمان"
            },
            {
                "sTitle": "پلاک"
            },
	    {
                "sTitle": "نام"
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    //sReturn = '<center><div onclick="openComplexModal(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures">Ø¬Ø²ÛŒÛŒØ§Øª</div></center>';
                    sReturn = '<center><div onclick="showDetails(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures" style="cursor:pointer;">جزییات</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            }
        ]
    });
    table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}


function initChangeLogTable(tableid) {
    var table = $('#' + tableid);
    table.dataTable({
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "از"
            },
            {
                "sTitle" : "به"
            },
            {
                "sTitle": "توسط"
            },
	    {
                "sTitle": "زمان"
            }
        ]
    });
table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}

function userActivityInit(tableid) {
    var table = $('#' + tableid);
    table.dataTable({
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "کد فعالیت"
            },
            {
                "sTitle": "نام فعالیت"
            },
            {
                "sTitle": "زمان"
            }
        ]
    });
table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}

function userTableInit(tableid) {
    var table = $('#' + tableid);
    table.dataTable({
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "نام کاربری"
            },
            {
                "sTitle": "نام"
            },
            {
                "sTitle": "نام خانوادگی"
            },
            {
                "sTitle": "شماره همراه"
            },
            {
                "sTitle": "وضعیت"
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    //sReturn = '<center><div onclick="openComplexModal(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures">Ø¬Ø²ÛŒÛŒØ§Øª</div></center>';
                    sReturn = '<center><div onclick="showUserDetails(' + "'" + sReturn + "'" + ');" class="button compact" style="cursor:pointer;">جزییات</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    sReturn = '<center><div onclick="changeUserStatus(' + "'" + sReturn + "'" + ');" class="button compact" style="cursor:pointer;">وضعیت</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            }
,
	    {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    sReturn = '<center><div onclick="showChangeUserPassword(' + "'" + sReturn + "'" + ');" class="button compact" style="cursor:pointer;">کلمه عبور</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            },
	    {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    sReturn = '<center><div onclick="showUserPeriods(' + "'" + sReturn + "'" + ');" class="button compact" style="cursor:pointer;">زمان</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            }
        ]
    });
table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}


function cameraTableInit(tableid) {
    var table = $('#' + tableid);
    table.dataTable({
        "aaSorting": [],
        "bDestroy": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bDeferRender": true,
        "oLanguage": {
            "sProcessing": "درحال پردازش...",
            "sLengthMenu": "نمایش محتویات _MENU_",
            "sZeroRecords": "موردی یافت نشد",
            "sInfo": "نمایش _START_ تا _END_ از مجموع _TOTAL_ مورد",
            "sInfoEmpty": "تهی",
            "sInfoFiltered": "(فیلتر شده از مجموع _MAX_ مورد)",
            "sInfoPostFix": "",
            "sSearch": "جستجو:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ابتدا",
                "sPrevious": "قبلی",
                "sNext": "بعدی",
                "sLast": "انتها"
            }
        },
        'sPaginationType': 'full_numbers',
        'fnInitComplete': function (oSettings) {
        },
        "aoColumns": [
            {
                "sTitle": "نام دوربین"
            },
            {
                "sTitle": "FPS"
            },
            {
                "sTitle": "RTSP"
            },
            {
                "sTitle": "وضعیت"
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    //sReturn = '<center><div onclick="openComplexModal(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures">Ø¬Ø²ÛŒÛŒØ§Øª</div></center>';
                    sReturn = '<center><div onclick="deleteCamera(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures" style="cursor:pointer;">حذف</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            },
            {
                "sTitle": "",
                "fnRender": function (obj) {
                    var sReturn = obj.aData[obj.iDataColumn];
                    sReturn = '<center><div onclick="changeCameraStatus(' + "'" + sReturn + "'" + ');" class="button compact icon-pictures" style="cursor:pointer;">فعال/غیرفعال</div></center>';
                    console.log(sReturn);
                    return sReturn;
                }
            }
        ]
    });
table.on('order.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('page.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('draw.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
}).
    on('search.dt', function(){console.log('table event');walk(document.body, replaceNumbers);
});
}

function loadPlatedData(pageSize) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getPlatedPageCount/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            //alert(result.pageCount);
            count = parseInt(result.pageCount);
            console.log(count);
            reloadPlatedData(count, pageSize, count);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}
function loadUnPlatedData(pageSize) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getUnPlatedPageCount/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            //alert(result.pageCount);
            count = parseInt(result.pageCount);
            console.log(count);
            reloadUnPlatedData(count, pageSize);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}
function reloadUnPlatedData(page, pageSize) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getUnPlatedTrafficPage/" + page + "/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            var exist = false;
            var results = [];
            var table = $('#unplated_traffic_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                exist = true;
                var d = "";
                var correctedPlate = result[i].persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
//                    d = (correctedPlate[6] + correctedPlate[7] +  " ا یران " + correctedPlate[4] + correctedPlate[5] + correctedPlate[3] + correctedPlate[1] + correctedPlate[2]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
		
                var newObject = [
                    result[i].date,
                    result[i].time,
                    d,
                    result[i]._id,
		    result[i].changeLog
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
                //results.push(newObject);
            }
            if (exist)
                if (page > 0 && page > count - 10) {
                    setTimeout(function () {
                        reloadUnPlatedData(page - 1, pageSize);
                    }, 100);
                }
        },
        error: function () {
        },
        async: true
    });
}
function loadData(pageSize) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getPageCount/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            //alert(result.pageCount);
            count = parseInt(result.pageCount);
            reload(count, pageSize);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}
function reloadPlatedData(page, pageSize, count) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getPlatedTrafficPage/" + page + "/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            var exist = false;
            var results = [];
            var table = $('#plated_traffic_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                exist = true;
                var d = "";
                var correctedPlate = result[i].persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
                    //d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
		var name = "";
		if(result[i].profile)
		    name = result[i].profile.firstName + " " + result[i].profile.lastName;
                var newObject = [
                    result[i].date,
                    result[i].time,
                    d,
		    name,
                    result[i]._id
,
		    result[i].changeLog
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
                //results.push(newObject);
            }
            if (exist)
                if (page > 0 && page > count - 5) {
                    setTimeout(function () {
                        reloadPlatedData(page - 1, pageSize, count);
                    }, 100);
                }
        },
        error: function () {
        },
        async: true
    });
}
function reload(page, pageSize) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getTrafficPage/" + page + "/" + pageSize,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            var exist = false;
            var results = [];
            var table = $('#traffic_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                exist = true;
                var d = "";
                var correctedPlate = result[i].persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
//                    d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
                var newObject = [
                    result[i].date,
                    result[i].time,
                    d,
                    result[i]._id,
		    result[i].changeLog
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
                //results.push(newObject);
            }
            if (true)//exist)
                if (page > count - 10 && page >= 1) {
                    setTimeout(function () {
                        reload(page - 1, pageSize);
                    }, 100);
                }
        },
        error: function () {
        },
        async: true
    });
}
function loadImage(recordId) {
    recordI = recordId;
    $.ajax({
        type: 'GET',
        url: "/traffic/getListOfImages/" + recordId,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
	//$("#detailsGallery").each(function(){
	//		var elem = $(this);
	//		elem.remove();
	//	});
            images = result;
$("#albumTab").html("");
            $("#DetailsImage").prop("src", recordId + '/' + result[0]);
		var con = '<ul class="gallery" id="detailsGallery">';
	for(var i = 0 ; i < images.length ; i++ ){
   		var el = '<li><a href="javascript:void(0);">';
		el += '<img class="framed" src="' + recordId + '/' + images[i] + '" onclick="showImageDialog(' + "'" + recordId + '/' + result[i] + "'" + ')">';
                el += '</a></li>';
		con += el;

		}	

		con += "</ul>";
                  		$("#albumTab").html(con);
		console.log(con);
//		$("#detailsGallery").listview("refresh");

        },
        error: function () {
        },
        async: true
    });
}
function showImages(id) {
    alert(id);
}
function openComplexModal(recordId) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getListOfImages/" + recordId,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $.modal({
                content: '<div  style="width:100%;"><img src="' + recordId + '/' + result[0] + '" width="100%"/> </div>',
                title: 'ØªØµÙˆÛŒØ±',
                width: 300,
                scrolling: true,
                actions: {
                    'Ø¨Ø³ØªÙ†': {
                        color: 'red',
                        click: function (win) {
                            win.closeModal();
                        }
                    },
                    'Ù…Ø±Ú©Ø²': {
                        color: 'green',
                        click: function (win) {
                            win.centerModal(true);
                        }
                    },
                    'Ø¨Ø²Ø±Ú¯Ù†Ù…Ø§ÛŒÛŒ': {
                        color: 'red',
                        click: function () {
                            window.location = recordId + '/' + result[0];
                        }
                    }
                },
                contentBg: false,
                buttons: {
                    'Ø¨Ø§Ø²Ú¯Ø´Øª': {
                        classes: 'huge blue-gradient glossy full-width kaveh',
                        click: function (win) {
                            win.closeModal();
                        }
                    }
                },
                buttonsLowPadding: true
            });
        },
        error: function () {
        },
        async: true
    });
}

function showImageDialog(imageUrl) {
  
            $.modal({
                content: '<div  style="width:100%"><img src="' + imageUrl + '" width="100%"/> </div>',
                title: 'تصویر',
                width: 600,
                scrolling: true,
                actions: {
                    'بستن': {
                        color: 'red',
                        click: function (win) {
                            win.closeModal();
                        }
                    },
                    'مرکز': {
                        color: 'green',
                        click: function (win) {
                            win.centerModal(true);
                        }
                    }
                },
                contentBg: false,
                buttons: {
                    'بستن': {
                        classes: 'huge blue-gradient glossy full-width kaveh',
                        click: function (win) {
                            win.closeModal();
                        }
                    }
                },
                buttonsLowPadding: true
            });
}

function getQueryStrings() {
    var assoc = {};
    var decode = function (s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
    };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');
    for (var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
            assoc[decode(key[0])] = decode(key[1]);
        }
    }
    return assoc;
}
function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
}
function replaceNumbers(node) {
    if (node.nodeType == 3) //Text nodes only
        node.nodeValue = node.nodeValue.replace(/[0-9]/g, getArabicNumber);
}
function getArabicNumber(n) {
    return String.fromCharCode(1632 + parseInt(n, 10));
}
function LoadById(id) {
    currentId = id;
    $.ajax({
        type: 'GET',
        url: "/traffic/getTrafficById/" + id,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $('#DetailsDetectedPlateEdit').hide();
            $('#DetailsDetectedPlate').show();
            $("#tableHolder").hide();
            $("#queryTableHolder").hide();
            $("#details").show();
	    $("#trafficDesc").html("");
	    $("#trafficDesc").html(result.desc);
            var results = [];


            var d = "";
            var correctedPlate = result.persianPlate2;
            plate = correctedPlate;
            getProfile();
            if (correctedPlate && correctedPlate.length == 8) {
//                d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                d = '<div style="direction:rtl">' + d + '</div>';
                $("#part1").val(correctedPlate[0] + correctedPlate[1]);
                $("#part2").val(correctedPlate[2]);
                $("#part3").val(correctedPlate[3] + correctedPlate[4] + correctedPlate[5]);
                $("#part4").val('ایران');
                $("#part5").val(correctedPlate[6] + correctedPlate[7]);
                $("#DetailsDetectedPlate").html(d);
            } else {
                $("#part1").val("");
                $("#part2").val("");
                $("#part3").val("");
                $("#part4").val("ایران");
                $("#part5").val("");
                $("#DetailsDetectedPlate").html("");
            }
            $("#DetailsTrafficDate").html(result.date);
            $("#DetailsTrafficTime").html(result.time);
            $("#firstName").val("-");
            $("#lastName").val("-");
            $("#nationalityCode").val("-");
            loadImage(result._id);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: false
    });
}
function nextImage() {
    index++;
    if (index >= images.length)
        index = 0;
    $("#DetailsImage").prop("src", recordI + '/' + images[index]);
}

function previousImage(){
    index--;
    if (index < 0)
        index = images.length - 1;
    $("#DetailsImage").prop("src", recordI + '/' + images[index]);

}

function saveDesc(){
	var desc = $("#trafficDesc").val();
    	$.ajax({
        	type: 'POST',
	        url: "/traffic/saveTrafficDesc",
	        dataType: 'json',
		headers: {token: token},
		data : {trafficId : currentId, desc: desc},
	        success: function (result) {
	            alert('با موفقیت ذخیره گردید.');
	           
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
		    if(xhr.status == 500)
		    	alert("شما اجازه اعمال تغیرات در این لحظه را ندارید.");
	        },
	        async: true
	    });
}

function saveDetails() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var nationalityCode = $("#nationalityCode").val();
    console.log(firstName + " : " + lastName + " : " + nationalityCode);
    $.ajax({
        type: 'GET',
        url: "/traffic/saveProfile/" + firstName + "/" + lastName + "/" + nationalityCode + "/" + plate + "/" + currentId,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            //alert('saved');
            walk(document.body, replaceNumbers);
        },
        error: function(xhr, ajaxOptions, thrownError) {
	    if(xhr.status == 500)
	    alert("شما اجازه اعمال تغیرات در این لحظه را ندارید.");
        },
        async: true
    });
    var pl = $("#part1").val() + $("#part2").val() + $("#part3").val() + $("#part5").val();
    console.log(pl);
    updatePlate(pl);
}
function getProfile() {
    $.ajax({
        type: 'GET',
        url: "/traffic/getProfile/" + plate,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $("#firstName").val(result.firstName);
            $("#lastName").val(result.lastName);
            $("#nationalityCode").val(result.nationalityCode);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}
function getAllRecordsForPlate(page, pageSize) {
    lastState = 8;
    console.log("all fo : " + plate);
    if (plate != "") {
        $.ajax({
            type: 'GET',
            url: "/traffic/getTrafficPageByPlate/" + page + "/" + pageSize + "/" + plate,
            dataType: 'json',
	    headers: {token: token},
            success: function (result) {
                $('#query_traffic_table').dataTable().fnClearTable();
                $("#details").hide();
                $("#tableHolder").hide();
                $('#queryTableHolder').show();
                var exist = false;
                var results = [];
                var table = $('#query_traffic_table').dataTable();
                for (var i = result.length - 1; i >= 0; i--) {
                    exist = true;
                    var d = "";
                    var correctedPlate = result[i].persianPlate2;
                    if (correctedPlate && correctedPlate.length == 8) {
//                        d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                        d = '<div style="direction:rtl">' + d + '</div>';
                    }
                    var newObject = [
                        result[i].date,
                        result[i].time,
                        d,
                        result[i]._id,
			result[i].changeLog
                    ];
                    table.fnAddData(newObject);
                    walk(document.body, replaceNumbers);
                    //results.push(newObject);
                }
            },
            error: function () {
            },
            async: true
        });
    }
}

function reloadoverview() {
    $.ajax({
        type: 'GET',
        url: "/traffic/getLastTraffic",
	headers: {token: token},
        dataType: 'json',
        success: function (result) {
            var results = [];
            $("#lastTrafficDate").html(result.date);
            $("#lastTrafficTime").html(result.time);
            if (result.persianPlate2) {
                $("#detectedPlate").html(result.persianPlate2);
                var d = "";
                var correctedPlate = result.persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
//                    d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
                $("#detectedPlate").html(d);
            }
            else
                $("#detectedPlate").html("-");
		if(result.detectedImage)
		{
		    var sss = result.detectedImage.split("/");
		    console.log(result._id + '/' + sss[sss.length - 1]);
		    $("#lastTrafficImage").prop("src", result._id + '/' + sss[sss.length - 1]);
		}
	        else{
        		loadImageoverview(result._id);
		}
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: false
    });
    $.ajax({
        type: 'GET',
        url: "/traffic/getTotalPlated",
	headers: {token: token},
        dataType: 'json',
        success: function (result) {
	    tp = parseInt(result);
calcStatistics();
            $("#totalPlated").html(result);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
    $.ajax({
        type: 'GET',
        url: "/traffic/getAutomaticPlated",
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
	    mp = parseInt(result);
calcStatistics();
            $("#manualPlated").html(result);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
    $.ajax({
        type: 'GET',
        url: "/traffic/getChangedPlate",
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
	    cp = parseInt(result);
 calcStatistics();
	    console.log(result);
            $("#changedPlate").html(result);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}

function calcStatistics(){
    $("#totalAllPlated").html(mp + cp + tp);
    $("#detectedAndCorrected").html(cp + tp);
    var plateRate = Math.round(((cp + tp)/ (mp + cp + tp)*100));
    var correctRate = Math.round(((tp) / (tp+cp))*100);
    console.log(plateRate + " : " + correctRate);
    $("#detectionRate").html(plateRate + "%");
    $("#correctedRate").html(correctRate + "%");
}
function loadImageoverview(recordId) {
    $.ajax({
        type: 'GET',
        url: "/traffic/getListOfImages/" + recordId,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $("#lastTrafficImage").prop("src", recordId + '/' + result[0]);
            //var img = '<img src="' + recordId + '/' + result[0]  + '" width="100%"/>';
        },
        error: function () {
        },
        async: true
    });
}


function loadSettings() {
    $.ajax({
        type: 'GET',
        url: "/settings/getSettings",
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $("#input-3").val(result.RTSPUrl);
            $("#input-4").val(result.FPS);
            $("#input-5").val(result.ReTryOpenSerialPort);
            $("#input-6").val(result.StopRTSPThr);
            walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}

function saveSettings() {
    if (!isUserInRole('editor')) {
        return;
    }
    var data = {
        RTSPUrl: $("#input-3").val(),
        FPS: $("#input-4").val(),
        ReTryOpenSerialPort: $("#input-5").val(),
        StopRTSPThr: $("#input-6").val()
    };
    console.log(data);
    $.ajax({
        type: 'POST',
        url: "/settings/setSettings",
        dataType: 'json',
        data: data,
	headers: {token: token},
        success: function (result) {
            $("#input-3").val(result.RTSPUrl);
            $("#input-4").val(result.FPS);
            $("#input-5").val(result.ReTryOpenSerialPort);
            $("#input-6").val(result.StopRTSPThr);
            walk(document.body, replaceNumbers);
        },
        error: function () {
            console.log("error in set settings");
        },
        async: true
    });
}
function queryByDate() {
    var date1 = $("#pcal1").val();
    var date2 = $("#pcal2").val();
    var dates1 = date1.split("/");
    var dates2 = date2.split("/");
    console.log(dates1[0] + " : " + dates1[1] + " : " + dates1[2]);
    console.log(dates2[0] + " : " + dates2[1] + " : " + dates2[2]);
    var fromDay = dates1[2];
    var fromMonth = dates1[1];
    var fromYear = dates1[0];
    var toDay = dates2[2];
    var toMonth = dates2[1];
    var toYear = dates2[0];
    var hasError = false;
    if (!fromDay || !fromMonth || !fromYear || !toYear || !toMonth || !toDay) {
        alert("تاریخ ها مطابقت ندارند");
        hasError = true;
    }
    else {
	ShowModalWindow('توجه','در حال دریافت داده ها  ....');
        var nimUrl = "/traffic/getTrafficPageByDate/" + fromDay + "/" + fromMonth + "/" + fromYear + "/" + toDay + "/" + toMonth + "/" + toYear + "/";
        $.ajax({
            type: 'GET',
            url: nimUrl + "0/" + pageSize,
            dataType: 'json',
	headers: {token: token},
            success: function (result) {
                reloadDateQuery(0, nimUrl);
                walk(document.body, replaceNumbers);
            },
            error: function () {
            },
            async: true
        });
    }
}
function reloadDateQuery(page, nimUrl) {
    
    $.ajax({
        type: 'GET',
	headers: {token: token},
        url: nimUrl + page + "/" + pageSize,
        dataType: 'json',
        success: function (result) {
            var exist = false;
            var results = [];
	    $('#date_traffic_table').dataTable().fnClearTable();
            var table = $('#date_traffic_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                exist = true;
                var d = "";
                var correctedPlate = result[i].persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
//                    d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
                var newObject = [
                    result[i].date,
                    result[i].time,
                    d,
                    result[i]._id,
		    result[i].changeLog
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
                //results.push(newObject);
            }

	CloseModalWindow();
//            if (exist)
            //if (page > 29) {
//                setTimeout(function () {
                //    reloadDateQuery(page + 1, pageSize);
//                }, 500);
            // }
        },
        error: function () {
	    CloseModalWindow();
        },
        async: true
    });
}

function reloadAllPlateData() {
    $('#plated_traffic_table').dataTable().fnClearTable();
    loadPlatedData(100);
}
function reloadAllUnPlateData() {
    $('#unplated_traffic_table').dataTable().fnClearTable();
    loadUnPlatedData(50);
}
function reloadAllData() {
    $('#traffic_table').dataTable().fnClearTable();
    loadData(50);
}
function nextRecord() {
    var url = "/traffic/getNextRecord/" + currentId;
    if (lastState == 5)
        url = "/traffic/getNextPlatedRecord/" + currentId;
    else if (lastState == 6)
        url = "/traffic/getNextUnPlatedRecord/" + currentId;
    else if (lastState == 8)
        url = "/traffic/getNextPlatedRecordByPlate/" + currentId + "/" + plate;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            currentId = result[0]._id;
            LoadById(result[0]._id);
        }
    });
}
function lastRecord() {
    var url = "/traffic/getLastRecord/" + currentId;
    if (lastState == 5)
        url = "/traffic/getLastPlatedRecord/" + currentId;
    else if (lastState == 6)
        url = "/traffic/getLastUnPlatedRecord/" + currentId;
    else if (lastState == 8)
        url = "/traffic/getLastPlatedRecordByPlate/" + currentId + "/" + plate;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            currentId = result[0]._id;
            LoadById(result[0]._id);
        }
    });
}

function updatePlate(plate) {
    $.ajax({
        type: 'POST',
        url: "/traffic/updatePlate",
        dataType: 'json',
	headers: {token: token},
        data: { id: currentId, plate: plate },
        success: function (result) {
        },
	error: function(xhr, ajaxOptions, thrownError){
	    if(xhr.status == 500)
		    alert("شما اجازه اعمال تغییرات در این لحظه را ندارید.");
            //alert(xhr.status);
            //alert(xhr.responseText);
            //alert(thrownError);
	}
    });
}

function returnToPage() {
    if (lastState == 2)
        ShowMain();
    else if (lastState == 5)
        LoadWithPlates();
    else if (lastState == 6)
        LoadWithoutPlates();
    else if (lastState == 3)
        ShowQueryByDate();
    else if (lastState == 8)
        getAllRecordsForPlate(0, 500);
    else if (lastState == 15)
        ShowUser();
}

function makeSearch() {
    ShowModalWindow('توجه','در حال دریافت اطلاعات از سرور ...');
    var name = $("#searchName").val();
    var date = $("#searchDate").val();
    var pl = $("#searchPart1").val() + $("#searchPart2").val() + $("#searchPart3").val() + $("#searchPart5").val();
    //    alert(name + " : "  +  " : " + pl);
    var url = '/traffic/searchTraffic/' + pl;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            //currentId = result[0]._id;
            //LoadById(result[0]._id);
            $('#search_traffic_table').dataTable().fnClearTable();
            var exist = false;
            var results = [];
            var table = $('#search_traffic_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                exist = true;
                var d = "";
                var correctedPlate = result[i].persianPlate2;
                if (correctedPlate && correctedPlate.length == 8) {
                //    d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                    d = '<div style="direction:rtl">' + d + '</div>';
                }
                var newObject = [
                    result[i].date,
                    result[i].time,
                    d,
                    result[i]._id
,
		    result[i].changeLog
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
            }
	    CloseModalWindow();
        }
    });
}

function loadCurrentUser() {
    var url = '/api/getCurrentUser';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        headers: {token: token},
        success: function (result) {
            currentProfile = result;
            detectACL();
        },
        error: function () {
            console.log('Error in get current user load');
        }
    });
}

function getUserList() {
    console.log(token);
    var url = '/api/userList';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        headers: {token: token},
        success: function (result) {
            $('#user_list_table').dataTable().fnClearTable();
            var results = [];
            var table = $('#user_list_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                var newObject = [
                    result[i].username,
                    result[i].firstname,
                    result[i].lastname,
                    result[i].mobileNumber,
                    result[i].isaproved,
                    result[i]._id,
                    result[i]._id
,
		    result[i]._id,
		    result[i]._id
                ];
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
            }
        },
        error: function () {
            console.log("error in getting the user list");
        }
    });
}

function isUserInRole(role) {
    console.log('isUserInRole');
    for (var i = 0; i < currentProfile.roles.length; i++) {
        console.log(currentProfile.roles[i].rolename);
        if (currentProfile.roles[i].rolename == role) {
            console.log("user is in role : " + role);
            return true;
        }
    }
    return false;
}

function detectACL() {

	$("#adminStatistics").hide();
    if (isUserInRole('admin')) {
	$("#adminStatistics").show();
        $("#saveProfileBtn").show();
        $("#menu9").show();
        $("#menu4").show();
	$("deviceSettings").show();
	$("changedRecords").show();
	$("manualPlateList").show();

	$("#totalPlated").show();
	$("#manualPlated").show();
	$("#changedPlate").show();
	$("#totalAllPlated").show();
	$("#detectedAndCorrected").show();
	$("#detectionRate").show();
	$("#correctedRate").show();
	return;
    }
    else if (isUserInRole('editor')) {
        $("#saveProfileBtn").show();
        $("#menu9").hide();
        $("#menu4").hide();
    }
    else {
        $("#menu9").hide();
        $("#menu4").hide();
        $("#saveProfileBtn").hide();
    }

    $("deviceSettings").hide();
    $("changedRecords").hide();
    $("manualPlateList").hide();
}

function addNewUser() {
    console.log(token);
    var newUser = {
        username: $("#newUserUsername").val(),
        firstName: $("#newUserFirstName").val(),
        lastName: $("#newUserLastName").val(),
        email: $("#newUserEmail").val(),
        mobileNumber: $("#newUserMobile").val(),
        password: $("#newUserPassword").val(),
        gender: 1
    };

    var url = '/api/signup';
    $.ajax({
        type: 'POST',
        url: url,
        headers: {token: token},
        dataType: 'json',
        data: newUser,
        success: function (result) {
            alert('نام کاربری ثبت گردید');
            ShowUser();
            addUserToRole($("#newUserRole").val(), result.userId);
        },
        error: function () {
            console.log("error in getting the user list");
            alert('افزودن کاربر با خطا روبرو گردید. مجددا تلاش نمایید.');
        }
    });
}

function showUserDetails(userId) {
    var url = "/api/getUserActivityCount/" + userId;
    $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
	    headers: {token: token},
            success: function (result) {
            $('#user_activity_table').dataTable().fnClearTable();
                ShowUserActivities();
		var count = Math.round(result.count / 200) ;
                reloadUserActivities(count , 200, count, userId);
                walk(document.body, replaceNumbers);
            },
            error: function () {
            },
            async: true
        });
}

function reloadUserActivities(page, size, count, userId){
    var url = '/api/getUserActivity/' + page + "/" + size + "/" + userId;
    $.ajax({
        type: 'GET',
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log('user activities');
            var table = $('#user_activity_table').dataTable();
            for (var i = 0 ; i < result.length; i++) {
                var newObject = [
                    result[i]._id,
                    result[i].activityname,
                    result[i].activitydate
                ];
                console.log(newObject);
                table.fnAddData(newObject);
                walk(document.body, replaceNumbers);
            }

	    if(page > 0 && page >= count - 3)
	    {
		setTimeout(function(){
		    reloadUserActivities(page - 1, size, count, userId);
		}, 200);
	    }
	    else 
	    {
		
	    }
        },
        error: function () {
            console.log("error in getting the user list");
        },
	async: true
    });
}


function addUserToRole(role, userId) {
    var url = '/api/addRoleToUser';
    $.ajax({
        type: 'POST',
        data: { rolename: role, userId: userId },
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.log("error in saving role");
        }});
}

function changeUserStatus(userId) {
    ShowModalWindow("توجه", "در حال تغییر وضعیت کاربر ...");
    var url = '/api/changeUserStatus';
    $.ajax({
        type: 'POST',
        data: { userId: userId },
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            getUserList();
	    CloseModalWindow();
        },
        error: function () {
            console.log("error in saving role");
            getUserList();
	    CloseModalWindow();

        }});
}

function reloadAllCameras() {
    console.log(token);
    var url = '/camera/getListOfCameras';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        headers: {token: token},
        success: function (result) {
            $('#camera_table').dataTable().fnClearTable();
            var results = [];
            var table = $('#camera_table').dataTable();
            for (var i = result.length - 1; i >= 0; i--) {
                var newObject = [
                    result[i].Name,
                    result[i].FPS,
                    result[i].RTSPUrl,
                    result[i].Status,
                    result[i]._id,
                    result[i]._id
                ];
                table.fnAddData(newObject);
                // walk(document.body, replaceNumbers);
            }
        },
        error: function () {
            console.log("error in getting the user list");
        }
    });
}

function addNewCamera() {
    var newCamera = {
        FPS: $("#newCameraFPS").val(),
        RTSPUrl: $("#newCameraRTSP").val(),
        IP: $("#newCameraIP").val(),
        Name: $("#newCameraName").val(),
        PanelUrl: $("#newCameraPanelUrl").val(),
        Role: $("#newCameraRole").val()
    };

    var url = '/camera/addNewCamera';
    $.ajax({
        type: 'POST',
        data: newCamera,
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            reloadAllCameras();
        },
        error: function () {
            reloadAllCameras();
        }});
}

function changeCameraStatus(cameraId) {
    var url = '/camera/changeCameraStatus';
    $.ajax({
        type: 'POST',
        data: { cameraId: cameraId },
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            reloadAllCameras();
        },
        error: function () {
            console.log("error in saving role");
            reloadAllCameras();
        }});
}

function deleteCamera(cameraId) {
    var url = '/camera/deleteCamera';
    $.ajax({
        type: 'POST',
        data: { cameraId: cameraId },
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            reloadAllCameras();
        },
        error: function () {
            reloadAllCameras();
        }});
}

function resetDevice() {
    var url = '/settings/resetServer';
    $.ajax({
        type: 'GET',
        url: url,
        headers: { token: token },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            reloadAllCameras();
        },
        error: function () {
            reloadAllCameras();
        }});
}

function saveNetworkSettings() {
    var pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
    var ip = $("#settingsIP").val();
    var mask = $("#settingsNetMask").val();
    var gateway = $("#settingsGateway").val();
    if (ip != "" && pattern.test(ip)) {
        if (mask != "" && pattern.test(mask)) {
            if (gateway != "" && pattern.test(gateway)) {
                var url = '/settings/setNetworkSettings';
                $.ajax({
                    type: 'POST',
                    url: url,
                    headers: { token: token },
                    data: {ip: ip, mask : mask, gateway : gateway},
                    dataType: 'json',
                    success: function (result) {
                        console.log(result);
                        reloadAllCameras();
                    },
                    error: function () {
                        reloadAllCameras();
                    }});
            }
            else{
                alert('ادرس دروازه را صحیح وارد نمایید.');
            }
        }
        else{
            alert('پوشش و ماسک شبکه را صحیح وارد نمایید');
        }
    }
    else{
        alert('شناسه شبکه را صحیح وارد نمایید.');
    }
}

function showDeviceSettings(){
    if(isUserInRole('admin')) {
        $("div[name=panel]").hide();
        $("#deviceSetting").show();
        clearInterval(inter);
        $("li[name=menu]").removeClass("current");
        lastState = 20;
	loadDeviceSettings();
    }
    else{
        var msg = 'شما مجور این کار را ندارید. لطفا با مدیر سیستم تماس بگیرید.';
	alert(msg);
//	ShowModalCloseButton();
    }
}



function loadDeviceSettings(){
    var ip = $("#settingsIP").val();
    var mask = $("#settingsNetMask").val();
    var gateway = $("#settingsGateway").val();
    var url = "/settings/getCurrentNetwork";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
	headers: {token: token},
        success: function (result) {
            $("#settingsIP").val(result.ip_address);
	    $("#settingsNetMask").val(result.netmask);
	    $("#settingsGateway").val(result.gateway_ip);
            //walk(document.body, replaceNumbers);
        },
        error: function () {
        },
        async: true
    });
}

function showCameraList() {
    $("div[name=panel]").hide();
    $("#cameraList").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu4").addClass("current");
    lastState = 4;
}

function showAddNewCamera() {
    $("div[name=panel]").hide();
    $("#addNewCamera").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    lastState = 17;
}

function showAddNewUser() {
    $("div[name=panel]").hide();
    $("#addNewUser").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    lastState = 10;
}

function ShowQueryByDate() {
    $("div[name=panel]").hide();
    $("#queryByDate").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu3").addClass("current");
    lastState = 3;
}


function showDetails(id) {
    //window.location.replace("'" + 'details.html?trafficId=' + id + "'");
    $("div[name=panel]").hide();
    LoadById(id);
    console.log(id);
}

function ShowUser() {
    $("div[name=panel]").hide();
    $("#userList").show();
    getUserList();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu9").addClass("current");
    lastState = 9;
}

function LoadWithoutPlates() {
    $("div[name=panel]").hide();
    $("#trafficWithoutPlate").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu6").addClass("current");
    lastState = 6;
}
function LoadWithPlates() {
    $("div[name=panel]").hide();
    $("#trafficWithPlate").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu5").addClass("current");
    lastState = 5;
}

function LoadSearch() {
    $("div[name=panel]").hide();
    $("#ProfileReport").show();
    $("li[name=menu]").removeClass("current");
    $("#menu7").addClass("current");
    lastState = 7;
}

function ShowMain() {
    $("div[name=panel]").hide();
    $("#tableHolder").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    $("#menu2").addClass("current");
    lastState = 2;
}

function ShowOverview() {
    $("div[name=panel]").hide();
    $("#overview").show();
    reloadoverview();
    inter = setInterval(reloadoverview, 10000);
    $("li[name=menu]").removeClass("current");
    $("#menu1").addClass("current");
    lastState = 1;
}

function ShowUserActivities() {
    $("div[name=panel]").hide();
    $("#userActivities").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    lastState = 15;
}


function showPasswordSetting() {
    $("div[name=panel]").hide();
    $("#passwordSetting").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    lastState = 26;
}


function ShowSettings() {

    showCameraList();
//
//    $("div[name=panel]").hide();
//    $("#settings").show();
//    loadSettings();
//    clearInterval(inter);
//    $("li[name=menu]").removeClass("current");
//    $("#menu4").addClass("current");
//    lastState = 4;
}

function ShowImageInNewTab() {
    console.log("Try to show image in new tab");
    var image = $('#DetailsImage').prop('src');
    console.log(image);
    // window.location.assign(image);
    window.open(image);
}


function ShowModalWindow(topic, message) {
    $("#openModel_Title").html(topic);
    $("#openModal_Message").html(message);
    DoSelfPageAct("#openModal");
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    $("#openModal_Close").hide();
}

function ShowModalCloseButton() {
    $("#openModal_Close").show();
}


function CloseModalWindow() {
    DoSelfPageAct("#close");
}

function DoSelfPageAct(url) {
    window.location = url;
}

function showManualPlate(){
    if(isUserInRole('admin')){
    lastState = 25;
    
    $("div[name=panel]").hide();
    $("#manualPlateList").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    ShowModalWindow('توجه', 'در حال دریافت داده ها ... ');
	$.ajax({
            type: 'GET',
            url: "/traffic/getManualPlated",
            dataType: 'json',
            headers: { token: token },
            success: function (result) {
		CloseModalWindow();
                $('#manual_traffic_table').dataTable().fnClearTable();
                var exist = false;
                var results = [];
                var table = $('#manual_traffic_table').dataTable();
                for (var i = result.length - 1; i >= 0; i--) {
                    exist = true;
                    var d = "";
                    var correctedPlate = result[i].persianPlate2;
                    if (correctedPlate && correctedPlate.length == 8) {
                        d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
                        d = '<div style="direction:rtl">' + d + '</div>';
                    }
                    var newObject = [
                        result[i].date,
                        result[i].time,
                        d,
                        result[i]._id,
			result[i].changeLog
                    ];
                    table.fnAddData(newObject);
                    walk(document.body, replaceNumbers);
                }
            },
            error: function () {
		CloseModalWindow();
            },
            async: true
        });
    }
    else{
	var msg = "شما مجوز این کار را ندارید. لطفا با مدیر سیستم تماس بگیرید.";
	alert(msg);
//	ShowModalCloseButton();
    }
}

function showChangeLogs(){
    lastState = 28;
    $("div[name=panel]").hide();
    $("#changeLog").show();
    clearInterval(inter);
	$.ajax({
            type: 'GET',
            url: "/traffic/getChangeLogs/" + currentId ,
            dataType: 'json',
            headers: { token: token },
            success: function (result) {
                $('#change_log_table').dataTable().fnClearTable();
                var exist = false;
                var results = [];
                var table = $('#change_log_table').dataTable();
                for (var i = result.length - 1; i >= 0; i--) {
                    exist = true;
                    var d = "";
		    var d2 = "";
                    var correctedPlate = result[i].last;
                    if (correctedPlate && correctedPlate.length == 8) {
//                        d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
		    d = (correctedPlate[6] + correctedPlate[7] +   " ایران " + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " " + correctedPlate[2] + " "  + correctedPlate[0] + correctedPlate[1]);
                        d = '<div style="direction:rtl">' + d + '</div>';
                    }
		    var correctedPlate2 = result[i].next;
                    if (correctedPlate2 && correctedPlate2.length == 8) {
//                        d2 = (correctedPlate2[0] + correctedPlate2[1] + correctedPlate2[2] + correctedPlate2[3] + correctedPlate2[4] + correctedPlate2[5] + " ایران " + correctedPlate2[6] + correctedPlate2[7]);
		    d2 = (correctedPlate2[6] + correctedPlate2[7] +   " ایران " + correctedPlate2[3] + correctedPlate2[4] + correctedPlate2[5] + " " + correctedPlate2[2] + " "  + correctedPlate2[0] + correctedPlate2[1]);
                        d2 = '<div style="direction:rtl">' + d2 + '</div>';
                    }
		    var userName = 'admin';
		    if(result[i].userName)
			userName = result[i].userName;
                    var newObject = [
                        d,
                        d2,
                        userName,
                        result[i].date
                    ];
                    table.fnAddData(newObject);
                    walk(document.body, replaceNumbers);
                }
            },
            error: function () {
            },
            async: true
        });
}

function returnToDetails(){
    showDetails(currentId);
}

function showChangedRecords(){
    if(isUserInRole("admin")){
    
    lastState = 30;
    $("div[name=panel]").hide();
    $("#changedRecordList").show();
    clearInterval(inter);
    ShowModalWindow('توجه','در حال دریافت داده ... ');
	$.ajax({
            type: 'GET',
            url: "/traffic/getChangedRecords",
            dataType: 'json',
            headers: { token: token },
            success: function (result) {
		CloseModalWindow();
                $('#changed_record_table').dataTable().fnClearTable();
                var exist = false;
                var results = [];
                var table = $('#changed_record_table').dataTable();
                for (var i = result.length - 1; i >= 0; i--) {
                    exist = true;
                    var d = "";
                    var correctedPlate = result[i].persianPlate2;
                    if (correctedPlate && correctedPlate.length == 8) {
                        d = (correctedPlate[0] + correctedPlate[1] + correctedPlate[2] + correctedPlate[3] + correctedPlate[4] + correctedPlate[5] + " ایران " + correctedPlate[6] + correctedPlate[7]);
                        d = '<div style="direction:rtl">' + d + '</div>';
                    }
                    var newObject = [
                        result[i].date,
                        result[i].time,
                        d,
                        result[i]._id,
			result[i].changeLog
                    ];
                    table.fnAddData(newObject);
                    walk(document.body, replaceNumbers);
                }
            },            
	    error: function () {
		CloseModalWindow();
            },
            async: true
        });
    }
    else{
	var msg = "شما مجوز این کار را ندارید. لطفا با مدیر سیستم تماس بگیرید.";
	alert(msg);
//	ShowModalCloseButton();
    }
}

function savePasswordSetting(){
    var currentPassword = $("#currentPassword").val();
    var password = $("#newPassword").val();
    var confirmPassword = $("newPasswordConfirmation").val();
    console.log(currentPassword + " : " + password + " : " + confirmPassword);
    $.ajax({
            type: 'POST',
            url: "/api/changePassword",
            dataType: 'json',
            headers: { token: token },
	    data : { currentPassword : currentPassword, password : password } ,
	    success : function(result){
		console.log(result);
		window.location = "login.html";
	    },
	    error: function(){
		console.log("error in getting data from the server");
		window.location = "login.html";
	    },
	    async : true
	});        
}

function signOut(){
    $.ajax({
            type: 'POST',
            url: "/api/signout",
            dataType: 'json',
            headers: { token: token },
	    success : function(result){
		console.log(result);
		localStorage.setItem("token", "");
		window.location = "login.html";
	    },
	    error: function(){
		console.log("error in getting data from the server");
		localStorage.setItem("token", "");
		window.location = "login.html";
	    },
	    async : true
	});        
}

function showChangeUserPassword(userId){
    console.log("chnage the password for user id : " + userId);
    $("div[name=panel]").hide();
    $("#changeUserPassword").show();
    clearInterval(inter);
    $("li[name=menu]").removeClass("current");
    lastState = 15;
    selectedUser = userId;
}

function saveUserPassword(){
    console.log('Save user password');
    var password = $("#otherUserPassword").val();
    var confirmPassword = $("otherUserPasswordConfirmation").val();
    console.log(password + " : " + confirmPassword);
    $.ajax({
            type: 'POST',
            url: "/api/changeUserPassword",
            dataType: 'json',
            headers: { token: token },
	    data : { userId : selectedUser, password : password } ,
	    success : function(result){
		console.log(result);
		ShowUser();
	    },
	    error: function(){
		console.log("error in getting data from the server");
		ShowUser();
	    },
	    async : true
	});        

}

function showUserPeriods(userId){
    selectedUser = userId;
    $("div[name=panel]").hide();
    $("#userPeriod").show();
    clearInterval(inter);
    console.log(userId);
    loadUserPeriods();
}

function loadUserPeriods(){
    ShowModalWindow('توجه','در حال دریافت داده ... ');
    $("#userBeginTime").val("");
    $("#userEndTime").val("");
    $.ajax({
	type: 'GET',
	url: "/api/getUserPeriod/" + selectedUser,
	dataType: 'json',
	headers: {token : token},
	success: function(result){
	    CloseModalWindow();
	    console.log(result);
	    if(result){
		$("#userBeginTime").val(result[0].begin);
		$("#userEndTime").val(result[0].end);
	    }
	},
	error:	function(){
	    console.log("error in getting the data");
	    CloseModalWindow();
	}
    });
}

function saveUserPeriods(){
    ShowModalWindow('توجه', 'در حال ارسال اطلاعات به سمت سرور ...');
    var begin = $("#userBeginTime").val();
    var end = $("#userEndTime").val();
    var data = {userId: selectedUser, begin: begin, end: end, day: 'everyday'};
    console.log(data);
    $.ajax({
	type: 'POST',
	url: "/api/setUserPeriod",
	dataType: 'json',
	headers: {token : token},
	data: data,
	success: function(result){
	    CloseModalWindow();
	    console.log(result);
	},
	error:	function(){
	    CloseModalWindow();
	    console.log("error in getting the data");
	}
    });
}
