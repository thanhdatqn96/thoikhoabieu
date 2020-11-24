async function loadDataDsGiaoVien() {
    let result = await axios.get("getDsGiaoVien").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataTieuChuan() {
    let result = await axios.get("dataTieuChuan").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataTieuChi() {
    let result = await axios.get("dataTieuChi").then(res => {
        return res.data;
    });
    return result;
}

//biến toàn cục
var layDataDsGiaoVien,
	layDataTieuChuan,
	layDataTieuChi;

//
var selectToChuyenMon,
	selectNam;

window.onload = function () {
    initControl();
    initData();
    initEvent();
};

function initControl () {
	selectToChuyenMon = document.getElementById('selectToChuyenMon');
	selectNam = document.getElementById('selectNam');
}

async function initData () {
    layDataDsGiaoVien = await loadDataDsGiaoVien();
    layDataTieuChuan = await loadDataTieuChuan();
    layDataTieuChi = await loadDataTieuChi();
    hienThiSelectToChuyenMon();
    hienThiSelectNam();
}

function initEvent () {
	selectNam.onchange = function() {

		if(selectToChuyenMon.value == ''){
			alert('Vui lòng chọn tổ chuyên môn');
			selectNam.value = '';
		}

		let valTCM = selectToChuyenMon.value;
		let dataGVTCM = [];

		for(let i=0;i<layDataDsGiaoVien.length;i++){
			let matochuyenmon = layDataDsGiaoVien[i].matochuyenmon;
			if(valTCM == matochuyenmon) {
				dataGVTCM.push(layDataDsGiaoVien[i]);
			}
		}

		console.log(dataGVTCM);

		$('#girddanhgiagiaovien').dxDataGrid({
		    dataSource: dataGVTCM,
		    showBorders: true,
		    paging: {
		        pageSize: 10
		    },
		    /* xap xep */
		    sorting: {
		        mode: "multiple"
		    },
		    searchPanel: {
		        visible: true,
		        width: 240,
		        placeholder: "Tìm kiếm...",
		    },
		    pager: {
		        showPageSizeSelector: true,
		        allowedPageSizes: [5, 10, 20],
		        showInfo: true
		    },
		    allowColumnResizing: true,
		    columnResizingMode: "widget",
		    columns: [ {
		        caption: "Tên giáo viên",
		        dataField: "hovaten",
		    }
		    ],
		    masterDetail: {

		    }
		});
	};

}

function hienThiSelectToChuyenMon () {

	axios.get('getDsToChuyenMon').then(function(response) {
		var data = response.data;
		$('#selectToChuyenMon').append("<option value='' selected='' disabled=''></option>");
		for(var i= 0; i< data.length;i++){
			var option = document.createElement("option");
		    option.value = data[i].id;
		    option.text = data[i].tentocm;
		    selectToChuyenMon.appendChild(option);
		}
	});
	
	$('#selectToChuyenMon').select2({ width: '50%'});
}

function hienThiSelectNam () {
	$('#selectNam').datepicker({
        format: "yyyy",
        orientation: "bottom",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "vi",
    });
}

function danhgiagv() {

}