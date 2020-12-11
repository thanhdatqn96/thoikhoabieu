import { baseURl } from "../api/api.js";
import xuattkbapi from "../api/xuattkbapi.js";
import { getFistDay, getLastDay } from "../ultils/Ultils.js";

//data Tkb
// import getDataTkb from '../api/getDataTkb.js';

// <--------------------------------------------------------------->

//xuất tkb
var progressExportTruongSC,
	progressExportGV,
	progressExportLop,
	progressExportPhong,
	idGV,
	idLop,
	idPhong,
	xuatTKBTruong,
    xuatTKBTruongSC,
    xuatTKBTruongS,
    xuatTKBTruongC,
    xuatTKBLop,
    xuatTKBGV,
    xuatTKBPhong,
    btnxuatTKBTruongSC,
    btnxuatTKBTruongS,
    btnxuatTKBTruongC,
    btnxuatTKBGV,
    btnxuatTKBLop,
    btnxuatTKBPhong;

var arrFile = [];

function initControl() {

	progressExportTruongSC = document.getElementById("progressExportTruongSC");
	progressExportGV = document.getElementById("progressExportGV");
	progressExportLop = document.getElementById("progressExportLop");
	progressExportPhong = document.getElementById("progressExportPhong");
	idGV = document.getElementById("idselectgv");
	idLop = document.getElementById("idselectlop");
	idPhong = document.getElementById("idselectphong");
    xuatTKBTruong = document.getElementById("xemtkbtruong");
    xuatTKBGV = document.getElementById("xemtkbgiaovien");
    xuatTKBLop = document.getElementById("xemtkblop");
    xuatTKBPhong = document.getElementById("xemtkbphong");
    xuatTKBTruongSC = $(".httkbsc");
    xuatTKBTruongS = $(".httkbs");
    xuatTKBTruongC = $(".httkbc");
    btnxuatTKBTruongSC = document.getElementById("btnxuatTKBTruongSC");
    btnxuatTKBTruongS = document.getElementById("btnxuatTKBTruongS");
    btnxuatTKBTruongC = document.getElementById("btnxuatTKBTruongC");
    btnxuatTKBGV = document.getElementById("btnxuatTKBGV");
    btnxuatTKBLop = document.getElementById("btnxuatTKBLop");
    btnxuatTKBPhong = document.getElementById("btnxuatTKBPhong");
}


function initEvent() {
  
    btnxuatTKBTruongSC.onclick = function (e) {
        downLoadTKBEvent();
    };

 	btnxuatTKBTruongS.onclick = function (e) {
        downLoadTKBEvent();
    };

    btnxuatTKBTruongC.onclick = function (e) {
        downLoadTKBEvent();
    };

    btnxuatTKBGV.onclick = function (e) {
        downLoadTKBEvent();
    };

    btnxuatTKBLop.onclick = function (e) {
        downLoadTKBEvent();
    };

    btnxuatTKBPhong.onclick = function (e) {
        downLoadTKBEvent();
    };
}

async function downLoadTKBEvent() {
    await exportExcel();
    await downloadTkb();
}

async function exportExcel() {
    let tkbtruong = 0,
        tkblop = 0,
        tkbGV = 0,
        tkbphong = 0,
        tkbdiemtruong = 0,
        tkbphancongcm = 0,
        buoi = 0,
        idTruong = 0,
        gvNghi = 0;

    if (xuatTKBTruong.checked == true && xuatTKBTruongSC.prop("checked")) {

        tkbtruong = 1;

        buoi = 3;
        
        arrFile.push("thoikhoabieutruong");

    }
    if (xuatTKBTruong.checked == true && xuatTKBTruongS.prop("checked")) {

        tkbtruong = 1;

        buoi = 1;
        
        arrFile.push("thoikhoabieutruongbuoisang");

    }
    if (xuatTKBTruong.checked == true && xuatTKBTruongC.prop("checked")) {

        tkbtruong = 1;

        buoi = 2;
        
        arrFile.push("thoikhoabieutruongbuoichieu");

    }
    if (xuatTKBLop.checked == true) {

        tkblop = 1;

        arrFile.push("tkblophoc");

    }
    if (xuatTKBGV.checked == true) {

        tkbGV = 1;

        arrFile.push("tkbgiaovien");

    }
    if (xuatTKBPhong.checked) {

        tkbphong = 1;
    }

    //xuất TKB trường sáng, chiều
    if (xuatTKBTruong.checked == true && xuatTKBTruongSC.prop("checked")) {
    	try {

	        progressExportTruongSC.classList.remove("hidden");

	        idTruong = $('#idtruong').val();
	        
	        let weekSelect = $("#selecttuantruong").val();
        	let monthSelect = $("#datepickerthangtuantruong").val();

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportTruongSC.setAttribute("aria-valuenow", "100");
	            progressExportTruongSC.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    // arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            progressExportTruongSC.setAttribute("aria-valuenow", "100");
	            progressExportTruongSC.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportTruongSC.setAttribute("aria-valuenow", "100");
	        progressExportTruongSC.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }
    
    //xuất TKB trường sáng
    if (xuatTKBTruong.checked == true && xuatTKBTruongS.prop("checked")) {
    	try {

	        progressExportTruongS.classList.remove("hidden");

	        idTruong = $('#idtruong').val();
	        
	        let weekSelect = $("#selecttuantruong").val();
        	let monthSelect = $("#datepickerthangtuantruong").val();

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportTruongS.setAttribute("aria-valuenow", "100");
	            progressExportTruongS.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    // arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            progressExportTruongS.setAttribute("aria-valuenow", "100");
	            progressExportTruongS.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportTruongS.setAttribute("aria-valuenow", "100");
	        progressExportTruongS.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }
    //xuất TKB trường chiều
    if (xuatTKBTruong.checked == true && xuatTKBTruongC.prop("checked")) {
    	try {

	        progressExportTruongC.classList.remove("hidden");

	        idTruong = $('#idtruong').val();
	        
	        let weekSelect = $("#selecttuantruong").val();
        	let monthSelect = $("#datepickerthangtuantruong").val();

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportTruongC.setAttribute("aria-valuenow", "100");
	            progressExportTruongC.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    // arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            progressExportTruongC.setAttribute("aria-valuenow", "100");
	            progressExportTruongC.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportTruongC.setAttribute("aria-valuenow", "100");
	        progressExportTruongC.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }
    //xuất TKB giáo viên
    if (xuatTKBGV.checked == true) {
    	try {

	        progressExportGV.classList.remove("hidden");

	        let arrSelect = [];
	        let weekSelect = $("#selecttuangv").val();
	        let monthSelect = $("#datepickerthangtuangv").val();
	        let tenGV = $('#idselectgv option:selected').text();

	        arrSelect.push({ id: idGV.value, name: tenGV });

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportGV.setAttribute("aria-valuenow", "100");
	            progressExportGV.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            progressExportGV.setAttribute("aria-valuenow", "100");
	            progressExportGV.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportGV.setAttribute("aria-valuenow", "100");
	        progressExportGV.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }

    //xuất TKB lớp
    if (xuatTKBLop.checked == true) {
    	try {

	        progressExportLop.classList.remove("hidden");

	        let arrSelect = [];
	        let weekSelect = $("#selecttuanlop").val();
        	let monthSelect = $("#datepickerthangtuanlop").val();
	        let tenLop = $('#idselectlop option:selected').text();

	        arrSelect.push({ id: idLop.value, name: tenLop });

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportGV.setAttribute("aria-valuenow", "100");
	            progressExportGV.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            progressExportLop.setAttribute("aria-valuenow", "100");
	            progressExportLop.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportLop.setAttribute("aria-valuenow", "100");
	        progressExportLop.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }

    //xuất TKB phòng
    if (xuatTKBPhong.checked) {
    	try {

	        progressExportPhong.classList.remove("hidden");

	        let arrSelect = [];
	        let weekSelect = $("#selecttuanphong").val();
        	let monthSelect = $("#datepickerthangtuanphong").val();
	        let tenPhong = $('#idselectphong option:selected').text();

	        arrSelect.push({ id: idPhong.value, name: tenPhong });

	        monthSelect = monthSelect.split("/");

	        let firstDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]) - 1,
	            1
	        );
	        let lastDay = new Date(
	            Number(monthSelect[1]),
	            Number(monthSelect[0]),
	            0
	        );

	        firstDay = moment(firstDay).format("YYYY/MM/DD");
	        lastDay = moment(lastDay).format("YYYY/MM/DD");

	        if (firstDay == "Invalid date" && lastDay == "Invalid date") {
	            progressExportGV.setAttribute("aria-valuenow", "100");
	            progressExportGV.classList.add("hidden");
	            Swal.fire(
	                "Xin vui lòng chọn thời gian muốn xuất",
	                "Chọn thời gian xuất",
	                "warning"
	            );
	        } else {
	            let result = await xuattkbapi.export(
	                JSON.stringify({
	                    tkbtruong: tkbtruong,
	                    tkblop: tkblop,
	                    tkbGV: tkbGV,
	                    tkbphong: tkbphong,
	                    tkbdiemtruong: tkbdiemtruong,
	                    tkbphancongcm: tkbphancongcm,
	                    arrSelect: JSON.stringify(arrSelect),
	                    // exportAll: selectAll.checked,
	                    tendaydu: true,
	                    tenviettat: false,
	                    startMonth: firstDay,
	                    endMonth: lastDay,
	                    week: weekSelect,
	                    buoi: buoi,
                    	idTruong: idTruong,
                    	gvNghi: gvNghi
	                })
	            );
	            if (xuatTKBPhong.checked == true) {
	                arrFile.length = 0;

	                result.data.forEach((item) => {
	                    let isset = arrFile.findIndex((x) => x == item);
	                    if (isset == -1) {
	                        arrFile.push(item);
	                    }
	                });
	            }
	            progressExportPhong.setAttribute("aria-valuenow", "100");
	            progressExportPhong.classList.add("hidden");
	        }
	    } catch (error) {
	        console.log(error);
	        progressExportPhong.setAttribute("aria-valuenow", "100");
	        progressExportPhong.classList.add("hidden");
	        Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
	    }
    }

}

function downloadTkb() {
    arrFile.forEach((file) => {
        window.open(`${baseURl}xuattkb/export/${file}.xlsx`);
    });
    arrFile.length = 0;
}




// <--------------------------------------------------------------->

//xem tkb

var layDataDsTruong;

async function loadDataDsTruong() {
    let result = await axios.get("getdstruong").then(res => {
        return res.data;
    });
    return result;
}


//load danh sách các trường trực thuộc

async function loaddanhsachtruong() {

	layDataDsTruong = await loadDataDsTruong();

	var datas = layDataDsTruong.map(function (value, label) {
		let data = value;
		let stt = label + 1;
		var datas = Object.assign(data, {stt: stt.toString()});
		return datas;
	});
	$("#girddstruong").dxDataGrid({
		dataSource: datas,
		showBorders: true,
		paging: {
			pageSize: 30
		},
		/* xap xep */
		sorting: {
			mode: "multiple"
		},
		/* loc du lieu */
		// filterRow: {
		// 	visible: true,
		// 	applyFilter: "auto"
		// },
		searchPanel: {
			visible: true,
			width: 240,
			placeholder: "Tìm kiếm..."
		},
		pager: {
			showPageSizeSelector: true,
			allowedPageSizes: [10,20,30],
			showInfo: true
		},
		/* co dan cot */
		allowColumnResizing: true,
		columnResizingMode: "widget",
		columns: [{
			caption: "STT",
			dataField: "stt",
			width: 50,
		}, {
			caption: "Tên trường",
			dataField: "tentruong",	
		},	{
			caption: "Cấp học",
			dataField: "caphoc",
			cellTemplate: function(element, info) {
				var dulieucap = info.value;
				var tencap;
				if(dulieucap == 1){
					tencap = "Tiểu học";
				}else if(dulieucap == 2){
					tencap = "Trung học cơ sở";
				}else if(dulieucap == 3){
					tencap = "Trung học phổ thông";
				}else if(dulieucap == 4){
					tencap = "Tiểu học & Trung học cơ sở";
				}
				$("<div>")
	            .appendTo(element)
	            .text(tencap);
			}	
		},	{
			caption:"Số lớp",
			dataField: "demdslop"
		},	{
			caption:"Số giáo viên",
			dataField: "demdsgv"
		},
		{
			caption:"Thời khoá biểu",
			dataField: "tkb",
			alignment: "center", 
			cellTemplate: function(element, info) {
				let dulieuTKB= info.value;
				if(dulieuTKB == 1){
					$(
                        "<button type='button' class='btn btn-success btn-sm'><i class='fa fa-check' aria-hidden='true'></i></button>"
                    ).appendTo(element);
				}else{
					$(
                       	"<button type='button' class='btn btn-warning btn-sm'><i class='fa fa-times' aria-hidden='true'></i></button>"
                    ).appendTo(element);
				}	
			},
			width: 110,
		},	
		{
	        fixed: true,
	        fixedPosition: "right",
	        caption: "Xem",
	        cellTemplate: function(container, options) {
	            container.addClass("center");
	            $("<div>")
	                .dxButton({
	                    template: function(e) {
	                        return $('<i class="fa fa-eye"></i>');
	                    },
	                    onClick: function(e) {
	                    	$("#bangdstruong").collapse('toggle');
	                    	$("#hieuungcongtru").addClass("fa fa-undo").removeClass("ft-minus ft-plus");
	                    	$("#idtentruong").text(options.data.tentruong);
	                    	$("#idtentruonggv").text(options.data.tentruong);
	                    	$("#idtentruonglop").text(options.data.tentruong);
	                    	$("#idtentruongphong").text(options.data.tentruong);
	                    	$('#idtruong').val(options.data.matruong);
	                    	var datadsgv = options.data.danhsachgv;
	                    	var datadslop = options.data.danhsachlop;
	                    	var datadskhoi = options.data.danhsachkhoihoc;
	                    	var datadsphong = options.data.danhsachphonghoc;
	                    	var matruong = options.data.matruong;
	                    	loadthoikhoabieutruong(matruong);
	                    	loaddanhsachgv(datadsgv,matruong);
	                    	loaddanhsachphong(datadsphong,matruong);
	                    	loaddanhsachkhoilop(datadskhoi,datadslop,matruong);
	                    	loadbanggiaovien(matruong);
	                    	loaddanhsachcothoikhoabieu(matruong);
	                    	document.getElementById("formxemtkb").style.display = "block";
	                    },
	                })
	                .css('background-color', 'info')
	                .appendTo(container);
	        },
	        width: 50,
		}],
	});

}

//tkb trường

function loadthoikhoabieutruong(matruong){

	axios.get(`getthoikhoabieutruong/${matruong}`).then(restkbtruong => {
		let layDataTkbTruong = restkbtruong.data;

		axios.get(`getdsloptruong/${matruong}`).then(reslopttruong => {
			let layDataLopTruong = reslopttruong.data;

			$('.httkbs').prop('disabled', true);
			$('.httkbc').prop('disabled', true);
			$('.httkbsc').prop('disabled', true);

			var idtruong = matruong;

			$('#selecttuantruong').on('change',function(){

				let valdateThang = $('#datepickerthangtuantruong').val();
				if(valdateThang == ''){
		            alert('Vui lòng chọn tháng');
		            $(this).val('none');
		            return;
		        }

		        //sáng
		        $('#phandautabletruongsang').empty();
				$('#phanthantabletruongsang').empty();

				//chiều
				$('#phandautabletruongchieu').empty();
				$('#phanthantabletruongchieu').empty();

				//sáng,chiều
		        $('#phandautabletruong').empty();
				$('#phanthantabletruong').empty();

		        const thangnamtuan = $('#datepickerthangtuantruong').val();
		        const date = moment(thangnamtuan, 'MM/YYYY');
		        const thang = date.format('M');
		        const nam = date.format('YYYY');

		        let tuan = $(this).val();

		        if(tuan == null) {
		        	return false;
		        }

		        if (tuan != '' && thangnamtuan != '') {
		            $('#idthangtuantruong').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
		        } else {
		            $('#idthangtuantruong').text('');
		        }

				//sáng
				for(let i =0;i<layDataTkbTruong.length;i++){
					let demnam = layDataTkbTruong[i].dsnam.length;
					for(let j=0;j<demnam;j++){
						let demthang = layDataTkbTruong[i].dsnam[j].dsthang.length;
						for(let k=0;k<demthang;k++){
							let demtuan = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan.length;
							for(let m=0;m<demtuan;m++){
								for(let n=0;n<layDataLopTruong.length;n++){
									if(layDataTkbTruong[i].matruong == idtruong && layDataLopTruong[n].matruong == idtruong && layDataTkbTruong[i].dsnam[j].nam == nam && layDataTkbTruong[i].dsnam[j].dsthang[k].thang == thang && layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].tuan == tuan){
										var datalop = layDataLopTruong[n].dslop;
										var phandautabletruong = document.getElementById("phandautabletruongsang");
										var phanthantabletruong = document.getElementById("phanthantabletruongsang");

										var ththu = document.createElement("th");
										ththu.setAttribute("class","stickyThu");
										ththu.appendChild(document.createTextNode('Thứ'));
										phandautabletruong.appendChild(ththu);

										var thtiet = document.createElement("th");
										thtiet.setAttribute("class","stickyTiet");
										thtiet.appendChild(document.createTextNode('Tiết'));
										phandautabletruong.appendChild(thtiet);

										for(let x=0;x<datalop.length;x++){
											var th = document.createElement("th");
											var tenlop = document.createTextNode(' ' + datalop[x].tenlop);
										    th.setAttribute("id",+datalop[x].malop);
										    th.setAttribute("class","classlop")
										    th.appendChild(tenlop);
										    phandautabletruong.appendChild(th);
										}

										var dsbuoithu = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].dsbuoithu;

								  		var noidungbang = "";

								  		var databuoithu = [
								  			{
								  				"mabuoi":0,
								  				"mathu":2,
								  				"mabuoithu":"0,2",
								  				"tenbuoithu":"Sáng thứ 2"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":2,
								  				"mabuoithu":"1,2",
								  				"tenbuoithu":"Chiều thứ 2"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":3,
								  				"mabuoithu":"0,3",
								  				"tenbuoithu":"Sáng thứ 3"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":3,
								  				"mabuoithu":"1,3",
								  				"tenbuoithu":"Chiều thứ 3"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":4,
								  				"mabuoithu":"0,4",
								  				"tenbuoithu":"Sáng thứ 4"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":4,
								  				"mabuoithu":"1,4",
								  				"tenbuoithu":"Chiều thứ 4"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":5,
								  				"mabuoithu":"0,5",
								  				"tenbuoithu":"Sáng thứ 5"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":5,
								  				"mabuoithu":"1,5",
								  				"tenbuoithu":"Chiều thứ 5"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":6,
								  				"mabuoithu":"0,6",
								  				"tenbuoithu":"Sáng thứ 6"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":6,
								  				"mabuoithu":"1,6",
								  				"tenbuoithu":"Chiều thứ 6"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":7,
								  				"mabuoithu":"0,7",
								  				"tenbuoithu":"Sáng thứ 7"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":7,
								  				"mabuoithu":"1,7",
								  				"tenbuoithu":"Chiều thứ 7"
								  			},
								  		];
								  		var datatiet = [
								  			{
								  				"tiet":1
								  			},
								  			{
								  				"tiet":2
								  			},
								  			{
								  				"tiet":3
								  			},
								  			{
								  				"tiet":4
								  			},
								  			{
								  				"tiet":5
								  			},
								  		];
								  		for (let i = 0; i < databuoithu.length; i++) {
								  			
								  			 if(databuoithu[i].mabuoi == 0) {

								  				var rowspan = 0;
									            var demdatatiet = datatiet.length;
									            rowspan += demdatatiet;
									            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoithu[i].tenbuoithu + "</td></tr>";
									            for (let j = 0; j < demdatatiet; j++) {

												  	var cotrong = '';
												  	var theadlop = document.querySelectorAll('#tablexemtkbtruongsang thead tr .classlop');
							                    	for(var x=0;x<theadlop.length;x++){
							                    		var idlop = theadlop[x].id;
											            cotrong += "<td rowspan=" + 1 + " data-mabuoithu = "+databuoithu[i].mabuoithu+" data-matiet="+datatiet[j].tiet+" data-malop="+idlop+" class='classorongtruong'></td>";
												  	}
					  		                    	
								                    noidungbang += "<tr>"
								                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
								                    +cotrong
								                   +"</tr>";

									            }
								  			}
								            
								        }
								        $("tbody#phanthantabletruongsang").append(noidungbang);

								        var tbodycotrong = document.querySelectorAll('#tablexemtkbtruongsang tbody tr td.classorongtruong');

								        for(let i=0;i<dsbuoithu.length;i++){
								        	var demtiet = dsbuoithu[i].dstiet.length;
								        	for(let j=0;j<demtiet;j++){
								        		var demlop = dsbuoithu[i].dstiet[j].dslop.length;
								        		for(let k=0;k<demlop;k++){
								        			for(let m=0;m<tbodycotrong.length;m++){
								        				var mabuoithu =tbodycotrong[m].dataset.mabuoithu; 
								        				var matiet = tbodycotrong[m].dataset.matiet;
								        				var malop = tbodycotrong[m].dataset.malop;
								        				if(dsbuoithu[i].mabuoithu == mabuoithu && dsbuoithu[i].dstiet[j].tiet == matiet && dsbuoithu[i].dstiet[j].dslop[k].malop == malop){
								        					var magiaovien = dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].magiaovien;
								        					tbodycotrong[m].innerHTML = "<span data-magiaovien="+magiaovien+" style='white-space: nowrap;'>"+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].tenmonhoc+' ('+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].bidanh+')'+"</span>";
								        				}
								        			}
								        		}
								        	}
								        }
								        	
									}
								}
							}
						}
					}
				}

				//chiều
				for(let i =0;i<layDataTkbTruong.length;i++){
					let demnam = layDataTkbTruong[i].dsnam.length;
					for(let j=0;j<demnam;j++){
						let demthang = layDataTkbTruong[i].dsnam[j].dsthang.length;
						for(let k=0;k<demthang;k++){
							let demtuan = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan.length;
							for(let m=0;m<demtuan;m++){
								for(let n=0;n<layDataLopTruong.length;n++){
									if(layDataTkbTruong[i].matruong == idtruong && layDataLopTruong[n].matruong == idtruong && layDataTkbTruong[i].dsnam[j].nam == nam && layDataTkbTruong[i].dsnam[j].dsthang[k].thang == thang && layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].tuan == tuan){
										var datalop = layDataLopTruong[n].dslop;
										var phandautabletruong = document.getElementById("phandautabletruongchieu");
										var phanthantabletruong = document.getElementById("phanthantabletruongchieu");

										var ththu = document.createElement("th");
										ththu.setAttribute("class","stickyThu");
										ththu.appendChild(document.createTextNode('Thứ'));
										phandautabletruong.appendChild(ththu);

										var thtiet = document.createElement("th");
										thtiet.setAttribute("class","stickyTiet");
										thtiet.appendChild(document.createTextNode('Tiết'));
										phandautabletruong.appendChild(thtiet);

										for(let x=0;x<datalop.length;x++){
											var th = document.createElement("th");
											var tenlop = document.createTextNode(' ' + datalop[x].tenlop);
										    th.setAttribute("id",+datalop[x].malop);
										    th.setAttribute("class","classlop")
										    th.appendChild(tenlop);
										    phandautabletruong.appendChild(th);
										}

										var dsbuoithu = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].dsbuoithu;

								  		var noidungbang = "";

								  		var databuoithu = [
								  			{
								  				"mabuoi":0,
								  				"mathu":2,
								  				"mabuoithu":"0,2",
								  				"tenbuoithu":"Sáng thứ 2"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":2,
								  				"mabuoithu":"1,2",
								  				"tenbuoithu":"Chiều thứ 2"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":3,
								  				"mabuoithu":"0,3",
								  				"tenbuoithu":"Sáng thứ 3"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":3,
								  				"mabuoithu":"1,3",
								  				"tenbuoithu":"Chiều thứ 3"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":4,
								  				"mabuoithu":"0,4",
								  				"tenbuoithu":"Sáng thứ 4"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":4,
								  				"mabuoithu":"1,4",
								  				"tenbuoithu":"Chiều thứ 4"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":5,
								  				"mabuoithu":"0,5",
								  				"tenbuoithu":"Sáng thứ 5"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":5,
								  				"mabuoithu":"1,5",
								  				"tenbuoithu":"Chiều thứ 5"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":6,
								  				"mabuoithu":"0,6",
								  				"tenbuoithu":"Sáng thứ 6"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":6,
								  				"mabuoithu":"1,6",
								  				"tenbuoithu":"Chiều thứ 6"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":7,
								  				"mabuoithu":"0,7",
								  				"tenbuoithu":"Sáng thứ 7"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":7,
								  				"mabuoithu":"1,7",
								  				"tenbuoithu":"Chiều thứ 7"
								  			},
								  		];
								  		var datatiet = [
								  			{
								  				"tiet":1
								  			},
								  			{
								  				"tiet":2
								  			},
								  			{
								  				"tiet":3
								  			},
								  			{
								  				"tiet":4
								  			},
								  			{
								  				"tiet":5
								  			},
								  		];
								  		for (let i = 0; i < databuoithu.length; i++) {
								  			
								  			if(databuoithu[i].mabuoi == 1) {

								  				var rowspan = 0;
									            var demdatatiet = datatiet.length;
									            rowspan += demdatatiet;
									            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoithu[i].tenbuoithu + "</td></tr>";
									            for (let j = 0; j < demdatatiet; j++) {

												  	var cotrong = '';
												  	var theadlop = document.querySelectorAll('#tablexemtkbtruongchieu thead tr .classlop');
							                    	for(var x=0;x<theadlop.length;x++){
							                    		var idlop = theadlop[x].id;
											            cotrong += "<td rowspan=" + 1 + " data-mabuoithu = "+databuoithu[i].mabuoithu+" data-matiet="+datatiet[j].tiet+" data-malop="+idlop+" class='classorongtruong'></td>";
												  	}
					  		                    	
								                    noidungbang += "<tr>"
								                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
								                    +cotrong
								                    +"</tr>";

									            }
								  			}
								            
								        }
								        $("tbody#phanthantabletruongchieu").append(noidungbang);

								        var tbodycotrong = document.querySelectorAll('#tablexemtkbtruongchieu tbody tr td.classorongtruong');

								        for(let i=0;i<dsbuoithu.length;i++){
								        	var demtiet = dsbuoithu[i].dstiet.length;
								        	for(let j=0;j<demtiet;j++){
								        		var demlop = dsbuoithu[i].dstiet[j].dslop.length;
								        		for(let k=0;k<demlop;k++){
								        			for(let m=0;m<tbodycotrong.length;m++){
								        				var mabuoithu =tbodycotrong[m].dataset.mabuoithu; 
								        				var matiet = tbodycotrong[m].dataset.matiet;
								        				var malop = tbodycotrong[m].dataset.malop;
								        				if(dsbuoithu[i].mabuoithu == mabuoithu && dsbuoithu[i].dstiet[j].tiet == matiet && dsbuoithu[i].dstiet[j].dslop[k].malop == malop){
								        					var magiaovien = dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].magiaovien;
								        					tbodycotrong[m].innerHTML = "<span data-magiaovien="+magiaovien+" style='white-space: nowrap;'>"+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].tenmonhoc+' ('+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].bidanh+')'+"</span>";
								        				}
								        			}
								        		}
								        	}
								        }
								        	
									}

								}
							}
						}
					}
				}

				//sáng,chiều
				for(let i =0;i<layDataTkbTruong.length;i++){
					let demnam = layDataTkbTruong[i].dsnam.length;
					for(let j=0;j<demnam;j++){
						let demthang = layDataTkbTruong[i].dsnam[j].dsthang.length;
						for(let k=0;k<demthang;k++){
							let demtuan = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan.length;
							for(let m=0;m<demtuan;m++){
								for(let n=0;n<layDataLopTruong.length;n++){
									if(layDataTkbTruong[i].matruong == idtruong && layDataLopTruong[n].matruong == idtruong && layDataTkbTruong[i].dsnam[j].nam == nam && layDataTkbTruong[i].dsnam[j].dsthang[k].thang == thang && layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].tuan == tuan){
										
										var datalop = layDataLopTruong[n].dslop;
										var phandautabletruong = document.getElementById("phandautabletruong");
										var phanthantabletruong = document.getElementById("phanthantabletruong");

										var ththu = document.createElement("th");
										ththu.setAttribute("class","stickyThu");
										ththu.appendChild(document.createTextNode('Thứ'));
										phandautabletruong.appendChild(ththu);

										var thtiet = document.createElement("th");
										thtiet.setAttribute("class","stickyTiet");
										thtiet.appendChild(document.createTextNode('Tiết'));
										phandautabletruong.appendChild(thtiet);

										for(let x=0;x<datalop.length;x++){
											var th = document.createElement("th");
											var tenlop = document.createTextNode(' ' + datalop[x].tenlop);
										    th.setAttribute("id",+datalop[x].malop);
										    th.setAttribute("class","classlop")
										    th.appendChild(tenlop);
										    phandautabletruong.appendChild(th);
										}

										var dsbuoithu = layDataTkbTruong[i].dsnam[j].dsthang[k].dstuan[m].dsbuoithu;

								  		var noidungbang = "";

								  		var databuoithu = [
								  			{
								  				"mabuoi":0,
								  				"mathu":2,
								  				"mabuoithu":"0,2",
								  				"tenbuoithu":"Sáng thứ 2"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":2,
								  				"mabuoithu":"1,2",
								  				"tenbuoithu":"Chiều thứ 2"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":3,
								  				"mabuoithu":"0,3",
								  				"tenbuoithu":"Sáng thứ 3"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":3,
								  				"mabuoithu":"1,3",
								  				"tenbuoithu":"Chiều thứ 3"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":4,
								  				"mabuoithu":"0,4",
								  				"tenbuoithu":"Sáng thứ 4"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":4,
								  				"mabuoithu":"1,4",
								  				"tenbuoithu":"Chiều thứ 4"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":5,
								  				"mabuoithu":"0,5",
								  				"tenbuoithu":"Sáng thứ 5"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":5,
								  				"mabuoithu":"1,5",
								  				"tenbuoithu":"Chiều thứ 5"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":6,
								  				"mabuoithu":"0,6",
								  				"tenbuoithu":"Sáng thứ 6"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":6,
								  				"mabuoithu":"1,6",
								  				"tenbuoithu":"Chiều thứ 6"
								  			},
								  			{
								  				"mabuoi":0,
								  				"mathu":7,
								  				"mabuoithu":"0,7",
								  				"tenbuoithu":"Sáng thứ 7"
								  			},
								  			{
								  				"mabuoi":1,
								  				"mathu":7,
								  				"mabuoithu":"1,7",
								  				"tenbuoithu":"Chiều thứ 7"
								  			},
								  		];
								  		var datatiet = [
								  			{
								  				"tiet":1
								  			},
								  			{
								  				"tiet":2
								  			},
								  			{
								  				"tiet":3
								  			},
								  			{
								  				"tiet":4
								  			},
								  			{
								  				"tiet":5
								  			},
								  		];
								  		for (let i = 0; i < databuoithu.length; i++) {
								            var rowspan = 0;
								            var demdatatiet = datatiet.length;
								            rowspan += demdatatiet;
								            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoithu[i].tenbuoithu + "</td></tr>";
								            for (let j = 0; j < demdatatiet; j++) {

											  	var cotrong = '';
											  	var theadlop = document.querySelectorAll('#tablexemtkbtruong thead tr .classlop');
						                    	for(var x=0;x<theadlop.length;x++){
						                    		var idlop = theadlop[x].id;
										            cotrong += "<td rowspan=" + 1 + " data-mabuoithu = "+databuoithu[i].mabuoithu+" data-matiet="+datatiet[j].tiet+" data-malop="+idlop+" class='classorongtruong'></td>";
											  	}
				  		                    	
							                    noidungbang += "<tr>"
							                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
							                    +cotrong
							                    +"</tr>";

								            }

								        }
								        $("tbody#phanthantabletruong").append(noidungbang);

								        var tbodycotrong = document.querySelectorAll('#tablexemtkbtruong tbody tr td.classorongtruong');

								        for(let i=0;i<dsbuoithu.length;i++){
								        	var demtiet = dsbuoithu[i].dstiet.length;
								        	for(let j=0;j<demtiet;j++){
								        		var demlop = dsbuoithu[i].dstiet[j].dslop.length;
								        		for(let k=0;k<demlop;k++){
								        			for(let m=0;m<tbodycotrong.length;m++){
								        				var mabuoithu =tbodycotrong[m].dataset.mabuoithu; 
								        				var matiet = tbodycotrong[m].dataset.matiet;
								        				var malop = tbodycotrong[m].dataset.malop;
								        				if(dsbuoithu[i].mabuoithu == mabuoithu && dsbuoithu[i].dstiet[j].tiet == matiet && dsbuoithu[i].dstiet[j].dslop[k].malop == malop){
								        					var magiaovien = dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].magiaovien;
								        					tbodycotrong[m].innerHTML = "<span data-magiaovien="+magiaovien+" style='white-space: nowrap;'>"+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].tenmonhoc+' ('+dsbuoithu[i].dstiet[j].dslop[k].dsmonhoc[0].dsgiaovien[0].bidanh+')'+"</span>";
								        				}
								        			}
								        		}
								        	}
								        }								        				        	
									}

								}
							}
						}
					}
				}

				//sáng
				if($(".httkbs").prop("checked") == true){
					var tbodysangs = $("#tablexemtkbtruongsang tbody#phanthantabletruongsang");
					if(tbodysangs.children().length == 0){
						Swal.fire(
						  'Thông báo',
						  'Không có thời khoá biểu nào phù hợp trong thời gian này',
						  'info'
						)
						document.getElementById("bangsang").style.display = "none";
						document.getElementById("cardxeptkbtruong").style.display = "none";
					}else{
						document.getElementById("bangsang").style.display = "block";
						document.getElementById("cardxeptkbtruong").style.display = "block";
					}			
				}else{
					document.getElementById("bangsang").style.display = "none";
				}

				//chiều
				if($(".httkbc").prop("checked")){
					var tbodychieuc = $("#tablexemtkbtruongchieu tbody#phanthantabletruongchieu");
					if(tbodychieuc.children().length == 0){
						Swal.fire(
						  'Thông báo',
						  'Không có thời khoá biểu nào phù hợp trong thời gian này',
						  'info'
						)
						document.getElementById("bangchieu").style.display = "none";
						document.getElementById("cardxeptkbtruong").style.display = "none";
					}else{
						document.getElementById("bangchieu").style.display = "block";
						document.getElementById("cardxeptkbtruong").style.display = "block";

					}
				}else{
					document.getElementById("bangchieu").style.display = "none";
				}

				//sáng, chiều
				if($(".httkbsc").prop("checked")){
					var tbodysangchieusc = $("#tablexemtkbtruong tbody#phanthantabletruong");
					if(tbodysangchieusc.children().length == 0){
						Swal.fire(
						  'Thông báo',
						  'Không có thời khoá biểu nào phù hợp trong thời gian này',
						  'info'
						)
						document.getElementById("bangsangchieu").style.display = "none";
						document.getElementById("cardxeptkbtruong").style.display = "none";
					}else{
						document.getElementById("bangsangchieu").style.display = "block";
						document.getElementById("cardxeptkbtruong").style.display = "block";
					}
				}else{
					document.getElementById("bangsangchieu").style.display = "none";
				}

				$('.httkbs').prop('disabled', false);
				$('.httkbc').prop('disabled', false);
				$('.httkbsc').prop('disabled', false);
				
			});
		});

	});
	

}

//tkb giáo viên

function loaddanhsachgv(datadsgv,matruong) {

	var datadsgv = datadsgv;
	var selectListGv = document.getElementById('idselectgv');
	$('#idselectgv').append("<option value='none' selected='' disabled=''></option>");
	for(var i= 0; i< datadsgv.length;i++){
		var option = document.createElement("option");
	    option.value = datadsgv[i].id;
	    option.text = datadsgv[i].hovaten;
	    selectListGv.appendChild(option);
	}
	$('#idselectgv').select2({ width: '50%'});

	axios.get(`getthoikhoabieugvtime/${matruong}`).then(restkbgv => {
		let layDataTkbGv = restkbgv.data;

		$('#selecttuangv').on('change', function() {
	        let valdateThang = $('#datepickerthangtuangv').val();
	        let valSelectgv = $('#idselectgv').val();
	        if(valSelectgv == null){
	            alert('Vui lòng chọn giáo viên');
	            $(this).val('none');
	            return;
	        }
	        if(valdateThang == ''){
	            alert('Vui lòng chọn tháng');
	            $(this).val('none');
	            return;
	        }
	 
	        const thangnamtuan = $('#datepickerthangtuangv').val();
	        const date = moment(thangnamtuan, 'MM/YYYY');
	        const thang = date.format('M');
	        const nam = date.format('YYYY');

	        let tuan = $(this).val();

	        if (tuan != '' && thangnamtuan != '') {
	            $('#idthangtuangv').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
	        } else {
	            $('#idthangtuangv').text('');
	        }
	      
	        var idgv = $('#idselectgv').val();
	        var text = $('#idselectgv option:selected').text();
	        $('#idtengv').text(text);

	        $('#phanthantablegiaovien').empty();

	    	for(let i =0;i<layDataTkbGv.length;i++){
	            let demdsgv = layDataTkbGv[i].dsgiaovien.length;
	            for(let j=0;j<demdsgv;j++){
	                let demnam = layDataTkbGv[i].dsgiaovien[j].dsnam.length;
	                for(let k=0;k<demnam;k++){
	                    let demthang = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang.length;
	                    for(let m=0;m<demthang;m++){
	                        let demtuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan.length;
	                        for(let n=0;n<demtuan;n++){
	                            if(layDataTkbGv[i].dsgiaovien[j].magiaovien == idgv && layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam == nam && layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].thang == thang && layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan[n].tuan == tuan){
	                                var phanthantablegiaovien = document.getElementById("phanthantablegiaovien");

									var dsbuoi = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan[n].dsbuoi;

									var databuoi = [
										{
											"mabuoi":0,
											"tenbuoi":"Sáng"
										},{
											"mabuoi":1,
											"tenbuoi":"Chiều"
										},
									];
									var datatiet = [
							  			{
							  				"tiet":1
							  			},
							  			{
							  				"tiet":2
							  			},
							  			{
							  				"tiet":3
							  			},
							  			{
							  				"tiet":4
							  			},
							  			{
							  				"tiet":5
							  			},
							  		];
									var noidungbang = "";
							        for (let i = 0; i < databuoi.length; i++) {
							            var rowspan = 0;
							            var demdatatiet = datatiet.length;
							            rowspan += demdatatiet;
							            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
							            for (let j = 0; j < demdatatiet; j++) {

										  	var cotrong = '';
										  	var theadthu = document.querySelectorAll('#tablexemtkbgiaovien thead tr .classthu');
					                    	for(var x=0;x<theadthu.length;x++){
					                    		var mathu = theadthu[x].id;
									            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronggiaovien'></td>";
										  	}
						                    	
						                    noidungbang += "<tr>"
						                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
						                    +cotrong
						                    +"</tr>";

							            }
							        }
							        $("tbody#phanthantablegiaovien").append(noidungbang);

							        var tbodycotrong = document.querySelectorAll('#tablexemtkbgiaovien tbody tr td.classoronggiaovien');

							        for(let i=0;i<dsbuoi.length;i++){
							        	var demtiet = dsbuoi[i].dstiet.length;
							        	for(let j=0;j<demtiet;j++){
							        		var demthu = dsbuoi[i].dstiet[j].dsthu.length;
							        		for(let k=0;k<demthu;k++){
							        			for(let m=0;m<tbodycotrong.length;m++){
							        				var mabuoi =tbodycotrong[m].dataset.mabuoi; 
							        				var matiet = tbodycotrong[m].dataset.matiet;
							        				var mathu = tbodycotrong[m].dataset.mathu;
							        				if(dsbuoi[i].mabuoi == mabuoi && dsbuoi[i].dstiet[j].tiet == matiet && dsbuoi[i].dstiet[j].dsthu[k].mathu == mathu){
							        					tbodycotrong[m].innerHTML = "<span style='white-space: nowrap;'>"+dsbuoi[i].dstiet[j].dsthu[k].dsmonhoc[0].tenmonhoc+' ('+dsbuoi[i].dstiet[j].dsthu[k].dsmonhoc[0].dslop[0].tenlop+')'+"</span>";
							        				}
							        			}
							        		}
							        	}
							        }

							        document.getElementById("cardxeptkbgiaovien").style.display = "block";
	                                      
	                            }

	                        }
	                    }
	                }
	                
	                
	            }
	            
	        }

	        var tbodygv = $("#tablexemtkbgiaovien tbody#phanthantablegiaovien");
			if(tbodygv.children().length == 0){
				Swal.fire(
				  'Thông báo',
				  'Không có thời khoá biểu nào phù hợp trong thời gian này',
				  'info'
				)
				document.getElementById("cardxeptkbgiaovien").style.display = "none";
			}  
	    });
	});

}

//tkb lớp

function loaddanhsachkhoilop(datadskhoi,datadslop,matruong){
	
	var datadskhoi = datadskhoi;
	var datadslop = datadslop;
	var selectListKhoi = document.getElementById('idselectkhoi');
	var selectListLop = document.getElementById('idselectlop');
	$('#idselectkhoi').append("<option value='none' selected='' disabled=''</option>");
	for(var i= 0; i< datadskhoi.length;i++){
		var option = document.createElement("option");
	    // option.value = datadskhoi[i].id;
	    option.value = datadskhoi[i].tenkhoi;
	    option.text = "Khối "+datadskhoi[i].tenkhoi;
	    selectListKhoi.appendChild(option);
	}

	$('#idselectkhoi').on('change',function(){
		document.getElementById("cardxeptkblop").style.display = "none";
		$('#idselectlop').find('option').remove();
		$('#idselectlop').append("<option value='none' selected='' disabled=''></option>");
		var datakhoi = $(this).val();
		for(var j=0;j<datadslop.length;j++){
			if(datadslop[j].khoi == datakhoi){
				var optionLop = document.createElement("option");
				optionLop.value = datadslop[j].id;
				optionLop.text = "Lớp "+datadslop[j].tenlop;
				selectListLop.appendChild(optionLop);
			}
		}
	});
	$('#idselectkhoi').select2({ width: '50%'});
	$('#idselectlop').select2({ width: '50%'});

	axios.get(`getthoikhoabieuloptime/${matruong}`).then(restkblop => {
		let layDataTkbLop = restkblop.data;

		$('#selecttuanlop').on('change',function(){
			let valdateThang = $('#datepickerthangtuanlop').val();
	        let valSelectkhoi = $('#idselectkhoi').val();
	        let valSelectlop = $('#idselectlop').val();
	        if(valSelectkhoi == null){
	            alert('Vui lòng chọn khối');
	            $(this).val('none');
	            return;
	        }
	        if(valSelectlop == ''){
	            alert('Vui lòng chọn lớp');
	            $(this).val('none');
	            return;
	        }
	        if(valdateThang == ''){
	            alert('Vui lòng chọn tháng');
	            $(this).val('none');
	            return;
	        }

	        const thangnamtuan = $('#datepickerthangtuanlop').val();
	        const date = moment(thangnamtuan, 'MM/YYYY');
	        const thang = date.format('M');
	        const nam = date.format('YYYY');

	        let tuan = $(this).val();

	        if (tuan != '' && thangnamtuan != '') {
	            $('#idthangtuanlop').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
	        } else {
	            $('#idthangtuanlop').text('');
	        }

	  		var text = $('#idselectlop option:selected').text();
			var idlop = $('#idselectlop').val();
			var idtruonglop = $('#idtruonglop').val();
	  		$('#idtenlop').text(text);

	  		$('#phanthantablelop').empty();

	  		for(let i =0;i<layDataTkbLop.length;i++){
	            let demdslop = layDataTkbLop[i].dslop.length;
	            for(let j=0;j<demdslop;j++){
	                let demnam = layDataTkbLop[i].dslop[j].dsnam.length;
	                for(let k=0;k<demnam;k++){
	                    let demthang = layDataTkbLop[i].dslop[j].dsnam[k].dsthang.length;
	                    for(let m=0;m<demthang;m++){
	                        let demtuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan.length;
	                        for(let n=0;n<demtuan;n++){
	                            if(layDataTkbLop[i].dslop[j].malop == idlop && layDataTkbLop[i].dslop[j].dsnam[k].nam == nam && layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].thang == thang && layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan[n].tuan == tuan){
	                                var phanthantablelop = document.getElementById("phanthantablelop");

									var dsbuoi = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan[n].dsbuoi;

									var databuoi = [
										{
											"mabuoi":0,
											"tenbuoi":"Sáng"
										},{
											"mabuoi":1,
											"tenbuoi":"Chiều"
										},
									];
									var datatiet = [
							  			{
							  				"tiet":1
							  			},
							  			{
							  				"tiet":2
							  			},
							  			{
							  				"tiet":3
							  			},
							  			{
							  				"tiet":4
							  			},
							  			{
							  				"tiet":5
							  			},
							  		];

									var noidungbang = "";
							        for (let i = 0; i < databuoi.length; i++) {
							            var rowspan = 0;
							            var demdatatiet = datatiet.length;
							            rowspan += demdatatiet;
							            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
							            for (let j = 0; j < demdatatiet; j++) {

										  	var cotrong = '';
										  	var theadthu = document.querySelectorAll('#tablexemtkblop thead tr .classthu');
					                    	for(var x=0;x<theadthu.length;x++){
					                    		var mathu = theadthu[x].id;
									            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronglop'></td>";
										  	}
						                    	
						                    noidungbang += "<tr>"
						                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
						                    +cotrong
						                    +"</tr>";

							            }
							        }
							        $("tbody#phanthantablelop").append(noidungbang);

							        var tbodycotrong = document.querySelectorAll('#tablexemtkblop tbody tr td.classoronglop');

							        for(let i=0;i<dsbuoi.length;i++){
							        	var demtiet = dsbuoi[i].dstiet.length;
							        	for(let j=0;j<demtiet;j++){
							        		var demthu = dsbuoi[i].dstiet[j].dsthu.length;
							        		for(let k=0;k<demthu;k++){
							        			for(let m=0;m<tbodycotrong.length;m++){
							        				var mabuoi =tbodycotrong[m].dataset.mabuoi; 
							        				var matiet = tbodycotrong[m].dataset.matiet;
							        				var mathu = tbodycotrong[m].dataset.mathu;
							        				if(dsbuoi[i].mabuoi == mabuoi && dsbuoi[i].dstiet[j].tiet == matiet && dsbuoi[i].dstiet[j].dsthu[k].mathu == mathu){
							        					tbodycotrong[m].innerHTML = "<span style='white-space: nowrap;'>"+dsbuoi[i].dstiet[j].dsthu[k].dsmonhoc[0].tenmonhoc+' ('+dsbuoi[i].dstiet[j].dsthu[k].dsmonhoc[0].dsgiaovien[0].bidanh+')'+"</span>";
							        				}
							        			}
							        		}
							        	}
							        }
							        document.getElementById("cardxeptkblop").style.display = "block";
	                                      
	                            }

	                        }
	                    }
	                }
	                
	                
	            }
	            
	        }

	        var tbodylop = $("#tablexemtkblop tbody#phanthantablelop");
			if(tbodylop.children().length == 0){
				Swal.fire(
				  'Thông báo',
				  'Không có thời khoá biểu nào phù hợp trong thời gian này',
				  'info'
				)
				document.getElementById("cardxeptkblop").style.display = "none";
			}
	  	});
	});

}

//tkb phòng học

function loaddanhsachphong(datadsphong,matruong) {
	
	var datadsphong = datadsphong;
	var selectListPhong = document.getElementById('idselectphong');
	$('#idselectphong').append("<option value='none' selected='' disabled=''></option>");
	for(var i= 0; i< datadsphong.length;i++){
		var option = document.createElement("option");
	    option.value = datadsphong[i].id;
	    option.text = datadsphong[i].tenphong;
	    selectListPhong.appendChild(option);
	}
	$('#idselectphong').select2({ width: '50%'});

	axios.get(`getthoikhoabieuphong/${matruong}`).then(restkbphong => {
		let layDataTkbPhong = restkbphong.data;

		$('#selecttuanphong').on('change',function(){

			let valdateThang = $('#datepickerthangtuanphong').val();
	        let valSelectgv = $('#idselectphong').val();
	        if(valSelectgv == null){
	            alert('Vui lòng chọn phòng');
	            $(this).val('none');
	            return;
	        }
	        if(valdateThang == ''){
	            alert('Vui lòng chọn tháng');
	            $(this).val('none');
	            return;
	        }

	        const thangnamtuan = $('#datepickerthangtuanphong').val();
	        const date = moment(thangnamtuan, 'MM/YYYY');
	        const thang = date.format('M');
	        const nam = date.format('YYYY');

	        let tuan = $(this).val();

	        if (tuan != '' && thangnamtuan != '') {
	            $('#idthangtuanphong').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
	        } else {
	            $('#idthangtuanphong').text('');
	        }

			var text = $('#idselectphong option:selected').text();
			var idphong = $('#idselectphong').val();
			var idtruonglop = $('#idtruongphong').val();
	  		$('#idtenphong').text(text);

			$('#phanthantablephong').empty();

			for(let i =0;i<layDataTkbPhong.length;i++){
	            let demdsphong = layDataTkbPhong[i].dsphong.length;
	            for(let j=0;j<demdsphong;j++){
	                let demnam = layDataTkbPhong[i].dsphong[j].dsnam.length;
	                for(let k=0;k<demnam;k++){
	                    let demthang = layDataTkbPhong[i].dsphong[j].dsnam[k].dsthang.length;
	                    for(let m=0;m<demthang;m++){
	                        let demtuan = layDataTkbPhong[i].dsphong[j].dsnam[k].dsthang[m].dstuan.length;
	                        for(let n=0;n<demtuan;n++){
	                            if(layDataTkbPhong[i].dsphong[j].maphong == idphong && layDataTkbPhong[i].dsphong[j].dsnam[k].nam == nam && layDataTkbPhong[i].dsphong[j].dsnam[k].dsthang[m].thang == thang && layDataTkbPhong[i].dsphong[j].dsnam[k].dsthang[m].dstuan[n].tuan == tuan){
	                                var phanthantablelop = document.getElementById("phanthantablephong");

									var dsbuoi = layDataTkbPhong[i].dsphong[j].dsnam[k].dsthang[m].dstuan[n].dsbuoi;

									var databuoi = [
										{
											"mabuoi":0,
											"tenbuoi":"Sáng"
										},{
											"mabuoi":1,
											"tenbuoi":"Chiều"
										},
									];
									var datatiet = [
							  			{
							  				"tiet":1
							  			},
							  			{
							  				"tiet":2
							  			},
							  			{
							  				"tiet":3
							  			},
							  			{
							  				"tiet":4
							  			},
							  			{
							  				"tiet":5
							  			},
							  		];

									var noidungbang = "";
							        for (let i = 0; i < databuoi.length; i++) {
							            var rowspan = 0;
							            var demdatatiet = datatiet.length;
							            rowspan += demdatatiet;
							            noidungbang += "<tr><td class='sticky-col first-col' style='color: red;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
							            for (let j = 0; j < demdatatiet; j++) {

										  	var cotrong = '';
										  	var theadthu = document.querySelectorAll('#tablexemtkbphong thead tr .classthu');
					                    	for(var x=0;x<theadthu.length;x++){
					                    		var mathu = theadthu[x].id;
									            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronglop'></td>";
										  	}
						                    	
						                    noidungbang += "<tr>"
						                    +"<td class='sticky-col second-col'>"+ datatiet[j].tiet + "</td>"
						                    +cotrong
						                    +"</tr>";

							            }
							        }
							        $("tbody#phanthantablephong").append(noidungbang);

							        var tbodycotrong = document.querySelectorAll('#tablexemtkbphong tbody tr td.classoronglop');

							        for(let i=0;i<dsbuoi.length;i++){
							        	var demtiet = dsbuoi[i].dstiet.length;
							        	for(let j=0;j<demtiet;j++){
							        		var demthu = dsbuoi[i].dstiet[j].dsthu.length;
							        		for(let k=0;k<demthu;k++){
							        			for(let m=0;m<tbodycotrong.length;m++){
							        				var mabuoi =tbodycotrong[m].dataset.mabuoi; 
							        				var matiet = tbodycotrong[m].dataset.matiet;
							        				var mathu = tbodycotrong[m].dataset.mathu;
							        				if(dsbuoi[i].mabuoi == mabuoi && dsbuoi[i].dstiet[j].tiet == matiet && dsbuoi[i].dstiet[j].dsthu[k].mathu == mathu){
							        					tbodycotrong[m].innerHTML = "<span style='white-space: nowrap;'>"+dsbuoi[i].dstiet[j].dsthu[k].dsgiaovien[0].dslop[0].tenmonhoc+" | "+dsbuoi[i].dstiet[j].dsthu[k].dsgiaovien[0].bidanh+' ('+dsbuoi[i].dstiet[j].dsthu[k].dsgiaovien[0].dslop[0].tenlop+')'+"</span>";
							        				}
							        			}
							        		}
							        	}
							        }
							        document.getElementById("cardxeptkbphong").style.display = "block";
	                                      
	                            }

	                        }
	                    }
	                }
	                
	                
	            }
	            
	        }

	        var tbodyphong = $("#tablexemtkbphong tbody#phanthantablephong");
			if(tbodyphong.children().length == 0){
				Swal.fire(
				  'Thông báo',
				  'Không có thời khoá biểu nào phù hợp trong thời gian này',
				  'info'
				)
				document.getElementById("cardxeptkbphong").style.display = "none";
			}

	  	});
	});

}

//bảng màu ds giáo viên

function loadbanggiaovien(matruong){

	$('#banggiaovien').empty();
	var idtruong = matruong;
	for(var i=0;i<layDataDsTruong.length;i++){
		if(idtruong == layDataDsTruong[i].matruong){
			var dsgv = layDataDsTruong[i].danhsachgv;
			var banggiaovien  = document.getElementById("banggiaovien");
			var demdsgv = dsgv.length;

	        for (var j = 0; j < demdsgv; j++) {
	            let tr = document.createElement("tr");
	            tr.appendChild(document.createElement('td'));
		        tr.appendChild(document.createElement('td'));
		        tr.appendChild(document.createElement('td'));

		        var randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);

		        var button = document.createElement("button");
		        button.style.backgroundColor = randomColor;
		        button.type = "button";
		        button.style.width = "20px";
		        button.style.height = "20px";
		        button.setAttribute("data-magiaovien",dsgv[j].id);
		        button.setAttribute("class","classbuttonmau");

		        button.onclick = function(e) {
					$('#tablemaugiaovien tbody tr').removeClass('active');
    				$(this).parent().parent().addClass('active');
    				xulythemmau(); 		
	            };

	        	tr.cells[0].appendChild(document.createTextNode('' +(j+1)));
		        tr.cells[1].appendChild(document.createTextNode(' ' + dsgv[j].bidanh));
		        tr.cells[1].setAttribute('class','tdBidanh');
		       	tr.cells[2].appendChild(button); 

		        banggiaovien.appendChild(tr); 
	        }

		}
	}
	
}

//xử lý thêm màu từ bảng màu ds giáo viên vào table trường cả buổi, sáng, chiều

function xulythemmau(){
	var tbodybangmauchon = document.querySelectorAll('#tablemaugiaovien tbody tr.active td button.classbuttonmau');
	//sáng và chiều
	var tbodycotrongtruong = document.querySelectorAll('#tablexemtkbtruong tbody tr td.classorongtruong span');
	var buttonmagiaovien = tbodybangmauchon[0].dataset.magiaovien;
	var laymau = tbodybangmauchon[0].style['background-color'];
	for(var i =0;i<tbodycotrongtruong.length;i++){
	var magiaovien =tbodycotrongtruong[i].dataset.magiaovien; 
		if(magiaovien == buttonmagiaovien){
			tbodycotrongtruong[i].style.backgroundColor = laymau;
			tbodycotrongtruong[i].style.color = "white";
		}else{
			tbodycotrongtruong[i].style.backgroundColor = '';
			tbodycotrongtruong[i].style.color = '';
		}
	}
	//sáng
	var tbodycotrongtruongsang = document.querySelectorAll('#tablexemtkbtruongsang tbody tr td.classorongtruong span');
	var buttonmagiaovien = tbodybangmauchon[0].dataset.magiaovien;
	var laymau = tbodybangmauchon[0].style['background-color'];
	for(var j =0;j<tbodycotrongtruongsang.length;j++){
	var magiaovien =tbodycotrongtruongsang[j].dataset.magiaovien; 
		if(magiaovien == buttonmagiaovien){
			tbodycotrongtruongsang[j].style.backgroundColor = laymau;
			tbodycotrongtruongsang[j].style.color = "white";
		}else{
			tbodycotrongtruongsang[j].style.backgroundColor = '';
			tbodycotrongtruongsang[j].style.color = '';
		}
	}
	//chiều
	var tbodycotrongtruongchieu = document.querySelectorAll('#tablexemtkbtruongchieu tbody tr td.classorongtruong span');
	var buttonmagiaovien = tbodybangmauchon[0].dataset.magiaovien;
	var laymau = tbodybangmauchon[0].style['background-color'];
	for(var k =0;k<tbodycotrongtruongchieu.length;k++){
	var magiaovien =tbodycotrongtruongchieu[k].dataset.magiaovien; 
		if(magiaovien == buttonmagiaovien){
			tbodycotrongtruongchieu[k].style.backgroundColor = laymau;
			tbodycotrongtruongchieu[k].style.color = "white";
		}else{
			tbodycotrongtruongchieu[k].style.backgroundColor = '';
			tbodycotrongtruongchieu[k].style.color = '';
		}
	}

}

// load danh sách có thời khoá biểu 

function loaddanhsachcothoikhoabieu(matruong) {
	axios.get(`getthoikhoabieutruong/${matruong}`).then(restkbtruong => {
		let layDataTkbTruong = restkbtruong.data;

		let tableDsCoTKBTruong = $('#tableDsCoTKBTruong').DataTable();
		let tableDsCoTKBGv = $('#tableDsCoTKBGv').DataTable();
		let tableDsCoTKBLop = $('#tableDsCoTKBLop').DataTable();
		let tableDsCoTKBPhong = $('#tableDsCoTKBPhong').DataTable();

		tableDsCoTKBTruong.destroy();
		tableDsCoTKBGv.destroy();
		tableDsCoTKBLop.destroy();
		tableDsCoTKBPhong.destroy();

		$('#bodyDSCoTKBTruong').empty();
		$('#bodyDSCoTKBGv').empty();
		$('#bodyDSCoTKBLop').empty();
		$('#bodyDSCoTKBPhong').empty();
		//
		let sttTruong = 0;
		let sttGv = 0;
		let sttLop = 0;
		let sttPhong = 0;

		//ds thời gian có tkb trường

		layDataTkbTruong.forEach(function(iTem){
			let truongItem = iTem.matruong;
			let dataNam = iTem.dsnam;
			dataNam.forEach(function(iTem1){
				let namItem1 = iTem1.nam;
				let dataThang = iTem1.dsthang;
				dataThang.forEach(function(iTem2){
					let thangItem2 = iTem2.thang;
					let dataTuan = iTem2.dstuan;
					dataTuan.forEach(function(iTem3){

						let noidungbang = "";

						sttTruong++;

						noidungbang += "<tr>"
						+"<td>"+ sttTruong + "</td>"
						+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+thangItem2+ "- Năm "+namItem1 + "</td>"
						+"<td><button type='button' class='btn btn-primary btn-sm classButtonTruong' data-tuan= "+iTem3.tuan+" data-thang= "+thangItem2+" data-nam="+namItem1+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
						+"</tr>";

						$("tbody#bodyDSCoTKBTruong").append(noidungbang);
					});
				});
			});
		});

		$('#tableDsCoTKBTruong').DataTable({
			"bLengthChange" : false,
			"oLanguage": {
			  	"sProcessing":   "Đang xử lý...",
				"sLengthMenu":   "Xem _MENU_ mục",
				"sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
				"sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
				"sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
				"sInfoFiltered": "(được lọc từ _MAX_ mục)",
				"sInfoPostFix":  "",
				"sSearch":       "Tìm:",
				"sUrl":          "",
				"oPaginate": {
					"sFirst":    "Đầu",
					"sPrevious": "Trước",
					"sNext":     "Tiếp",
					"sLast":     "Cuối"
				}
			}	
		});

		//ds thời gian có tkb gv

		layDataTkbTruong.forEach(function(iTem){
			let truongItem = iTem.matruong;
			let dataNam = iTem.dsnam;
			dataNam.forEach(function(iTem1){
				let namItem1 = iTem1.nam;
				let dataThang = iTem1.dsthang;
				dataThang.forEach(function(iTem2){
					let thangItem2 = iTem2.thang;
					let dataTuan = iTem2.dstuan;
					dataTuan.forEach(function(iTem3){

						let noidungbang = "";

						sttGv++;

						noidungbang += "<tr>"
						+"<td>"+ sttGv + "</td>"
						+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+thangItem2+ "- Năm "+namItem1 + "</td>"
						+"<td><button type='button' class='btn btn-primary btn-sm classButtonGv' data-tuan= "+iTem3.tuan+" data-thang= "+thangItem2+" data-nam="+namItem1+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
						+"</tr>";

						$("tbody#bodyDSCoTKBGv").append(noidungbang);
					});
				});
			});
		});

		$('#tableDsCoTKBGv').DataTable({
			"bLengthChange" : false,
			"oLanguage": {
			  	"sProcessing":   "Đang xử lý...",
				"sLengthMenu":   "Xem _MENU_ mục",
				"sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
				"sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
				"sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
				"sInfoFiltered": "(được lọc từ _MAX_ mục)",
				"sInfoPostFix":  "",
				"sSearch":       "Tìm:",
				"sUrl":          "",
				"oPaginate": {
					"sFirst":    "Đầu",
					"sPrevious": "Trước",
					"sNext":     "Tiếp",
					"sLast":     "Cuối"
				}
			}	
		});

		//ds thời gian có tkb lớp

		layDataTkbTruong.forEach(function(iTem){
			let truongItem = iTem.matruong;
			let dataNam = iTem.dsnam;
			dataNam.forEach(function(iTem1){
				let namItem1 = iTem1.nam;
				let dataThang = iTem1.dsthang;
				dataThang.forEach(function(iTem2){
					let thangItem2 = iTem2.thang;
					let dataTuan = iTem2.dstuan;
					dataTuan.forEach(function(iTem3){

						let noidungbang = "";

						sttLop++;

						noidungbang += "<tr>"
						+"<td>"+ sttLop + "</td>"
						+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+thangItem2+ "- Năm "+namItem1 + "</td>"
						+"<td><button type='button' class='btn btn-primary btn-sm classButtonLop' data-tuan= "+iTem3.tuan+" data-thang= "+thangItem2+" data-nam="+namItem1+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
						+"</tr>";

						$("tbody#bodyDSCoTKBLop").append(noidungbang);
					});
				});
			});
		});

		$('#tableDsCoTKBLop').DataTable({
			"bLengthChange" : false,
			"oLanguage": {
			  	"sProcessing":   "Đang xử lý...",
				"sLengthMenu":   "Xem _MENU_ mục",
				"sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
				"sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
				"sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
				"sInfoFiltered": "(được lọc từ _MAX_ mục)",
				"sInfoPostFix":  "",
				"sSearch":       "Tìm:",
				"sUrl":          "",
				"oPaginate": {
					"sFirst":    "Đầu",
					"sPrevious": "Trước",
					"sNext":     "Tiếp",
					"sLast":     "Cuối"
				}
			}	
		});

		//ds thời gian có tkb phòng học

		layDataTkbTruong.forEach(function(iTem){
			let truongItem = iTem.matruong;
			let dataNam = iTem.dsnam;
			dataNam.forEach(function(iTem1){
				let namItem1 = iTem1.nam;
				let dataThang = iTem1.dsthang;
				dataThang.forEach(function(iTem2){
					let thangItem2 = iTem2.thang;
					let dataTuan = iTem2.dstuan;
					dataTuan.forEach(function(iTem3){

						let noidungbang = "";

						sttPhong++;

						noidungbang += "<tr>"
						+"<td>"+ sttPhong + "</td>"
						+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+thangItem2+ "- Năm "+namItem1 + "</td>"
						+"<td><button type='button' class='btn btn-primary btn-sm classButtonPhong' data-tuan= "+iTem3.tuan+" data-thang= "+thangItem2+" data-nam="+namItem1+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
						+"</tr>";

						$("tbody#bodyDSCoTKBPhong").append(noidungbang);
					});
				});
			});
		});

		$('#tableDsCoTKBPhong').DataTable({
			"bLengthChange" : false,
			"oLanguage": {
			  	"sProcessing":   "Đang xử lý...",
				"sLengthMenu":   "Xem _MENU_ mục",
				"sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
				"sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
				"sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
				"sInfoFiltered": "(được lọc từ _MAX_ mục)",
				"sInfoPostFix":  "",
				"sSearch":       "Tìm:",
				"sUrl":          "",
				"oPaginate": {
					"sFirst":    "Đầu",
					"sPrevious": "Trước",
					"sNext":     "Tiếp",
					"sLast":     "Cuối"
				}
			}	
		});

	});
	

}

//tìm kiếm giáo viên bí danh

function Search(tdClass, searchTxt) {
    let td = document.getElementsByClassName(tdClass);
    let textSearch = searchTxt.value.toUpperCase();
    for (const item of td) {
        let tdValue = item.textContent || item.innerText;
        if (tdValue.toUpperCase().indexOf(textSearch) > -1) {
            item.parentElement.style.display = "";
        } else {
            item.parentElement.style.display = "none";
        }
    }
}


window.onload = function() {

	//call xuất tkb
	initControl();
    // initData();
    initEvent();
	//
	loaddanhsachtruong();
	$("#bangdstruong").on('show.bs.collapse', function(){
    	document.getElementById("formxemtkb").style.display = "none";
    	$('#idselectgv').find('option').remove();
    	$('#idselectlop').find('option').remove();
    	$('#idselectkhoi').find('option').remove();
    	$('#idselectphong').find('option').remove();
    	$('#xemtkbtruong').prop('checked', false);
  		$('#xemtkbgiaovien').prop('checked', false);
  		$('#xemtkblop').prop('checked', false);
  		$('.httkbs').prop('checked', false);
  		$('.httkbc').prop('checked', false);
  		$('.httkbsc').prop('checked', false);
  		document.getElementById("cardsangchieu").style.display = "none";
  		document.getElementById("cardmaugiaovien").style.display = "none";
  		document.getElementById("cardxeptkbtruong").style.display = "none";
  		document.getElementById("cardxeptkbgiaovien").style.display = "none";
  		document.getElementById("cardxeptkblop").style.display = "none";
  		document.getElementById("cardselectgv").style.display = "none";
  		document.getElementById("cardselectlop").style.display = "none";
  		document.getElementById("cardselectthoigiantruong").style.display = "none";
  		$('#datepickerthangtuantruong').val('');
    	$('#selecttuantruong').val('none');
    	$('#datepickerthangtuangv').val('');
    	$('#selecttuangv').val('none');
    	$('#datepickerthangtuanlop').val('');
    	$('#selecttuanlop').val('none');
    	$('#datepickerthangtuanphong').val('');
    	$('#selecttuanphong').val('none');
    	document.getElementById("cardxeptkbphong").style.display = "none";
    	document.getElementById("cardselectphong").style.display = "none";
    	$('#xemtkbphong').prop('checked', false);
  	});

  	$('#datepickerthangtuantruong').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $('#datepickerthangtuangv').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $('#datepickerthangtuanlop').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $('#datepickerthangtuanphong').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });


    $('#datepickerthangtuantruong').on('change',function(){
    	$('#selecttuantruong').val('none');
    });

    $('#datepickerthangtuangv').on('change',function(){
    	$('#selecttuangv').val('none');
    });

    $('#datepickerthangtuanlop').on('change',function(){
    	$('#selecttuanlop').val('none');
    });

    $('#datepickerthangtuanphong').on('change',function(){
    	$('#selecttuanphong').val('none');
    });

    $('#idselectgv').on('change',function(){
    	let thangNamGv = $('#datepickerthangtuangv').val();
    	let tuanGv = $('#selecttuangv').val();
    	if(thangNamGv != '' && tuanGv != null){
    		$('#selecttuangv').trigger('change');
    	}
    	// $('#datepickerthangtuangv').val('');
    	// $('#selecttuangv').val('none');
    	// document.getElementById("cardxeptkbgiaovien").style.display = "none";
    });

    $('#idselectlop').on('change',function(){
    	let thangNamLop = $('#datepickerthangtuanlop').val();
    	let tuanLop = $('#selecttuanlop').val();
    	if(thangNamLop != '' && tuanLop != null){
    		$('#selecttuanlop').trigger('change');
    	}
    	// $('#datepickerthangtuanlop').val('');
    	// $('#selecttuanlop').val('none');
    	// document.getElementById("cardxeptkblop").style.display = "none";
    });

    $('#idselectkhoi').on('change',function(){
    	let thangNamLop = $('#datepickerthangtuanlop').val();
    	let tuanLop = $('#selecttuanlop').val();
    	if(thangNamLop != '' && tuanLop != null){
    		
    	}else{
    		$('#datepickerthangtuanlop').val('');
    		$('#selecttuanlop').val('none');
    	}
    	
    });

    $('#idselectphong').on('change',function(){
    	let thangNamPhong = $('#datepickerthangtuanphong').val();
    	let tuanPhong = $('#selecttuanphong').val();
    	if(thangNamPhong != '' && tuanPhong != null){
    		$('#selecttuanphong').trigger('change');
    	}
    	// $('#datepickerthangtuanphong').val('');
    	// $('#selecttuanphong').val('none');
    	// document.getElementById("cardxeptkbphong").style.display = "none";
    });

	$("input[type='checkbox']").change(function () {
		//sáng
		if($(".httkbs").prop("checked")){
			var layThangTruong = $('#datepickerthangtuantruong').val();
			var layTuanTruong = $('#selecttuantruong').val();
			var tbodysang = $("#tablexemtkbtruongsang tbody#phanthantabletruongsang");

			if(layThangTruong == '' || layTuanTruong == null){
				alert('Vui lòng chọn thời gian');
				$('.httkbs').prop('checked',false);
			}else{
				if(tbodysang.children().length == 0){
					Swal.fire(
					  'Thông báo',
					  'Không có thời khoá biểu nào phù hợp trong thời gian này',
					  'info'
					)
					document.getElementById("bangsang").style.display = "none";
					document.getElementById("cardxeptkbtruong").style.display = "none";
				}else{
					document.getElementById("bangsang").style.display = "block";
					document.getElementById("cardxeptkbtruong").style.display = "block";
				}	
			}
					
		}else{
			document.getElementById("bangsang").style.display = "none";
		}

		//chiều
		if($(".httkbc").prop("checked")){
			var layThangTruong = $('#datepickerthangtuantruong').val();
			var layTuanTruong = $('#selecttuantruong').val();
			var tbodychieu = $("#tablexemtkbtruongchieu tbody#phanthantabletruongchieu");

			if(layThangTruong == '' && layTuanTruong == null){
				alert('Vui lòng chọn thời gian');
				$('.httkbc').prop('checked',false);
			}else{
				if(tbodychieu.children().length == 0){
					Swal.fire(
					  'Thông báo',
					  'Không có thời khoá biểu nào phù hợp trong thời gian này',
					  'info'
					)
					document.getElementById("bangchieu").style.display = "none";
					document.getElementById("cardxeptkbtruong").style.display = "none";
				}else{
					document.getElementById("bangchieu").style.display = "block";
					document.getElementById("cardxeptkbtruong").style.display = "block";
				}
			}
			
		}else{
			document.getElementById("bangchieu").style.display = "none";
		}

		//sáng và chiều
		if($(".httkbsc").prop("checked")){
			var layThangTruong = $('#datepickerthangtuantruong').val();
			var layTuanTruong = $('#selecttuantruong').val();
			var tbodysangchieu = $("#tablexemtkbtruong tbody#phanthantabletruong");

			if(layThangTruong == '' || layTuanTruong == null){
				alert('Vui lòng chọn thời gian');
				$('.httkbsc').prop('checked',false);
			}else{
				if(tbodysangchieu.children().length == 0){
					Swal.fire(
					  'Thông báo',
					  'Không có thời khoá biểu nào phù hợp trong thời gian này',
					  'info'
					)
					document.getElementById("bangsangchieu").style.display = "none";
					document.getElementById("cardxeptkbtruong").style.display = "none";
				}else{
					document.getElementById("bangsangchieu").style.display = "block";
					document.getElementById("cardxeptkbtruong").style.display = "block";
				}
			}
			
		}else{
			document.getElementById("bangsangchieu").style.display = "none";
		}
  	});

  	$(document).on('click', 'input[type="checkbox"]', function() {      
	    $('input[type="checkbox"]').not(this).prop('checked', false);      
	});

	$("#xemtkbtruong").change(function () {
		$('#idselectgv').val('none').trigger('change.select2');
		$('#idselectkhoi').val('none').trigger('change.select2');
		$('#idselectlop').val('none').trigger('change.select2');
		$('#datepickerthangtuangv').val('');
    	$('#selecttuangv').val('none');
    	$('#datepickerthangtuanlop').val('');
    	$('#selecttuanlop').val('none');
    	$('#datepickerthangtuanphong').val('');
    	$('#selecttuanphong').val('none');
    	$(".httkbsc").prop("checked",false);
    	$(".httkbs").prop("checked",false);
    	$(".httkbc").prop("checked",false);
		var tbodymaugv = $("#tablemaugiaovien tbody#banggiaovien");
		if(tbodymaugv.children().length == 0){
			document.getElementById("cardmaugiaovien").style.display = "none";
		}else{
			document.getElementById("cardmaugiaovien").style.display = "block";
		}
		
	});

	$("#xemtkblop").change(function () {
		$('#idselectgv').val('none').trigger('change.select2');
		$('#datepickerthangtuantruong').val('');
    	$('#selecttuantruong').val('none');
    	$('#datepickerthangtuangv').val('');
    	$('#selecttuangv').val('none');
    	$('#datepickerthangtuanphong').val('');
    	$('#selecttuanphong').val('none');
    	$('#idselectkhoi').val('none').trigger('change.select2');
		$('#idselectlop').val('none').trigger('change.select2')
	});

	$("#xemtkbgiaovien").change(function () {
		$('#datepickerthangtuantruong').val('');
    	$('#selecttuantruong').val('none');
    	$('#datepickerthangtuanlop').val('');
    	$('#selecttuanlop').val('none');
    	$('#datepickerthangtuanphong').val('');
    	$('#selecttuanphong').val('none');
		$('#idselectlop').val('none').trigger('change.select2');
	});
	
	$("#xemtkbphong").change(function () {
		$('#idselectgv').val('none').trigger('change.select2');
		$('#datepickerthangtuantruong').val('');
    	$('#selecttuantruong').val('none');
    	$('#datepickerthangtuangv').val('');
    	$('#selecttuangv').val('none');
    	$('#datepickerthangtuanlop').val('');
    	$('#selecttuanlop').val('none');
		$('#idselectphong').val('none').trigger('change.select2');
	});

	//button hiển thị ds có tkb

	$('#btnDSCoTKBTruong').on('click',function(){
		let tableDsCoTKBTruong = $('#tableDsCoTKBTruong').dataTable();
        
        let dataDsCoTKBTKBTruong = tableDsCoTKBTruong.fnGetData();

		if (dataDsCoTKBTKBTruong.length == 0) {
		    Swal.fire(
			  'Thông báo',
			  'Không có thời gian nào có thời khoá biểu',
			  'info'
			);
			return false;
		} else{
			$('#modalDsCoTKBTruong').modal('show');
		}
	});

	$('#btnDSCoTKBGv').on('click',function(){
		let tableDsCoTKBGv = $('#tableDsCoTKBGv').dataTable();
        
        let dataDsCoTKBGv = tableDsCoTKBGv.fnGetData();

		if (dataDsCoTKBGv.length == 0) {
		    Swal.fire(
			  'Thông báo',
			  'Không có thời gian nào có thời khoá biểu',
			  'info'
			);
			return false;
		} else{
			$('#modalDsCoTKBGv').modal('show');
		}
	});

	$('#btnDSCoTKBLop').on('click',function(){
		let tableDsCoTKBLop = $('#tableDsCoTKBLop').dataTable();
        
        let dataDsCoTKBLop = tableDsCoTKBLop.fnGetData();

		if (dataDsCoTKBLop.length == 0) {
		    Swal.fire(
			  'Thông báo',
			  'Không có thời gian nào có thời khoá biểu',
			  'info'
			);
			return false;
		} else{
			$('#modalDsCoTKBLop').modal('show');
		}
	});

	$('#btnDSCoTKBPhong').on('click',function(){
		let tableDsCoTKBPhong = $('#tableDsCoTKBPhong').dataTable();
        
        let dataDsCoTKBPhong = tableDsCoTKBPhong.fnGetData();

		if (dataDsCoTKBPhong.length == 0) {
		    Swal.fire(
			  'Thông báo',
			  'Không có thời gian nào có thời khoá biểu',
			  'info'
			);
			return false;
		} else{
			$('#modalDsCoTKBPhong').modal('show');
		}
	});

	//xử lý click thời gian có tkb trường

	$("#tableDsCoTKBTruong tbody").on("click", ".classButtonTruong", function() {
	    let tuan = $(this).data('tuan');
	    let thang = $(this).data('thang');
	    let nam = $(this).data('nam');
	    let thangNam = thang+"/"+nam;
	    $('#datepickerthangtuantruong').val(thangNam).trigger('change');
	    $('#selecttuantruong').val(tuan).trigger('change');
	    $('#modalDsCoTKBTruong').modal('hide');
	});

	//xử lý click thời gian có tkb gv

	$("#tableDsCoTKBGv tbody").on("click", ".classButtonGv", function() {
	    let tuan = $(this).data('tuan');
	    let thang = $(this).data('thang');
	    let nam = $(this).data('nam');
	    let thangNam = thang+"/"+nam;
	    let selectGv = $('#idselectgv').val();
	    if(selectGv != null){
	    	$('#datepickerthangtuangv').val(thangNam).trigger('change');
	    	$('#selecttuangv').val(tuan).trigger('change');
	    }else{
	    	$('#datepickerthangtuangv').val(thangNam).trigger('change');
	    	$('#selecttuangv').val(tuan);
	    }
	    
	    $('#modalDsCoTKBGv').modal('hide');
	});

	//xử lý click thời gian có tkb lớp

	$("#tableDsCoTKBLop tbody").on("click", ".classButtonLop", function() {
	    let tuan = $(this).data('tuan');
	    let thang = $(this).data('thang');
	    let nam = $(this).data('nam');
	    let thangNam = thang+"/"+nam;
	    let selectKhoi = $('#idselectkhoi').val();
	    let selectLop = $('#idselectlop').val();
	    if(selectKhoi != null && selectLop != null){
	    	$('#datepickerthangtuanlop').val(thangNam).trigger('change');
	    	$('#selecttuanlop').val(tuan).trigger('change');
	    }else{
	    	$('#datepickerthangtuanlop').val(thangNam).trigger('change');
	    	$('#selecttuanlop').val(tuan);
	    }
	    
	    $('#modalDsCoTKBLop').modal('hide');
	});

	//xử lý click thời gian có tkb lớp

	$("#tableDsCoTKBPhong tbody").on("click", ".classButtonPhong", function() {
	    let tuan = $(this).data('tuan');
	    let thang = $(this).data('thang');
	    let nam = $(this).data('nam');
	    let thangNam = thang+"/"+nam;
	    let selectPhong= $('#idselectphong').val();
	    if(selectPhong != null){
	    	$('#datepickerthangtuanphong').val(thangNam).trigger('change');
	    	$('#selecttuanphong').val(tuan).trigger('change');
	    }else{
	    	$('#datepickerthangtuanphong').val(thangNam).trigger('change');
	    	$('#selecttuanphong').val(tuan);
	    }
	    
	    $('#modalDsCoTKBPhong').modal('hide');
	});

	//tìm kiếm giáo viên bí danh
	var timkiemBidanh = document.getElementById("timkiemBidanh");

	timkiemBidanh.oninput = function (e) {
        Search("tdBidanh", timkiemBidanh);
    };

}

