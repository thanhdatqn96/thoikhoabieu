async function loadDataDsGiaoVien() {
    let result = await axios.get("getDsGiaoVien").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataTieuChuanTieuChi() {
    let result = await axios.get("dataTieuChuanTieuChi").then(res => {
        return res.data;
    });
    return result;
}

//biến toàn cục
var layDataDsGiaoVien,
	layDataTieuChuanTieuChi;

//
var selectToChuyenMon,
	selectNam;

window.onload = function () {
    initControl();
    initData();
    initEvent();
};

function initControl () {
	
}

async function initData () {
    layDataDsGiaoVien = await loadDataDsGiaoVien();
    layDataTieuChuanTieuChi = await loadDataTieuChuanTieuChi();
    hienThiSelectToChuyenMon();
    hienThiSelectNam();
}

function initEvent () {
	$('#selectNam').on('change',function(){
		let valTCM = $('#selectToChuyenMon').val();
		if(valTCM == ''){
			alert('Vui lòng chọn tổ chuyên môn');
			$('#selectNam').val('');
		}

		let dataGVTCM = [];

		for(let i=0;i<layDataDsGiaoVien.length;i++){
			let matochuyenmon = layDataDsGiaoVien[i].matochuyenmon;
			if(valTCM == matochuyenmon) {
				dataGVTCM.push(layDataDsGiaoVien[i]);
			}
		}

		let datas = dataGVTCM.map(function (value, label) {
			let data = value;
			let stt = label + 1;
			let datas = Object.assign(data, {stt: stt.toString()});
			return datas;
		});

		$("#girdDsGv").dxDataGrid({
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
				caption: "Tên giáo viên",
				dataField: "hovaten",	
			},	
			{
		        fixed: true,
		        fixedPosition: "right",
		        caption: "",
		        cellTemplate: function(container, options) {
		            container.addClass("center");
		            $("<div>")
		                .dxButton({
		                    template: function(e) {
		                        return $('<i class="fa fa-pencil-square-o"></i>');
		                    },
		                    onClick: function(e) {
		                    	let tenGv = options.data.hovaten;
		                    	$('#spanTenGV').text(tenGv);
		                    	modalDanhGiaGv();
		                    	// $('#modalDanhGiaGv').modal('show');
		                    },
		                })
		                .css('background-color', 'info')
		                .appendTo(container);
		        },
		        width: 50,
			}],
		});
	});

}

function hienThiSelectToChuyenMon () {

	axios.get('getDsToChuyenMon').then(function(response) {
		let data = response.data;
		let selectToChuyenMon = document.getElementById('selectToChuyenMon');
		$('#selectToChuyenMon').append("<option value='' selected='' disabled=''></option>");
		for(let i= 0; i< data.length;i++){
			let option = document.createElement("option");
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

function modalDanhGiaGv() {

	$('#bodyDanhGiaGv').empty();

	let noidungbang = "";

	for (let i = 0; i < layDataTieuChuanTieuChi.length; i++) {
        let rowspan = 0;
        let dataTieuChi = layDataTieuChuanTieuChi[i].dataTieuChi;
        let demDataTieuChi = dataTieuChi.length;
        rowspan += demDataTieuChi;
        noidungbang += "<tr><td class='sticky-col first-col' rowspan=" + parseInt(1 + rowspan) + ">" + layDataTieuChuanTieuChi[i].tentieuchuan + "</td></tr>";
        for (let j = 0; j < demDataTieuChi; j++) {
		  	let cotRong = '';
		  	let theadXepLoai = document.querySelectorAll('#tableDanhGiaGv thead tr .classXeploai');
        	for(let x=0;x<theadXepLoai.length;x++){
        		let maXepLoai = theadXepLoai[x].id;
	            cotRong += "<td rowspan=" + 1 + "><input type='checkbox' data-matieuchuan= "+layDataTieuChuanTieuChi[i].id+" data-matieuchi= "+dataTieuChi[j].id+" data-maxeploai= "+maXepLoai+" />&nbsp;</td>";
		  	}
            	
            noidungbang += "<tr>"
            +"<td class='sticky-col second-col'>"+ dataTieuChi[j].tentieuchi + "</td>"
            +cotRong
            +"</tr>";
        }
    }

    $("tbody#bodyDanhGiaGv").append(noidungbang);

    $('#modalDanhGiaGv').modal('show');

}