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

// async function loadDataDanhGiaGv() {
//     let result = await axios.get("getDataDanhGiaGv").then(res => {
//         return res.data;
//     });
//     return result;
// }

//biến toàn cục
var layDataDsGiaoVien,
	layDataTieuChuanTieuChi;

//

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
    // layDataDanhGiaGv = await loadDataDanhGiaGv();
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
		                    	let maTCM = $('#selectToChuyenMon').val();
		                    	let namDG = $('#selectNam').val();
		                    	let maGv = options.data.id;
		                    	let maTruong = options.data.matruong;
		                    	let tenGv = options.data.hovaten;
		                    	$('#spanTenGV').text(tenGv);
		                    	$('#inputMaGv').val(maGv);
		                    	$('#inputMaTruong').val(maTruong);


		                    	axios.get("getDataDanhGiaGv").then(res => {
									let layDataDanhGiaGv = res.data;

		                    		let dataDanhGiaGv = [];

									layDataDanhGiaGv.forEach(function(iTem1){
			                    		let dsNam = iTem1.dsnam;
			                    		dsNam.forEach(function(iTem2){
			                    			let dsGv = iTem2.dsgv;
			                    			dsGv.forEach(function(iTem3){
			                    				let dsDGGV = iTem3.dsdanhgiagv;
			                    				dsDGGV.forEach(function(iTem4){
			                    					if(iTem1.matochuyenmon == maTCM && iTem2.nam == namDG && iTem3.magiaovien == maGv) {
			                    						dataDanhGiaGv.push(iTem4);
				                    				}
			                    				});
			                    				
			                    			});
			                    		});
			                    	});

		                    		modalDanhGiaGv(dataDanhGiaGv);

								});

		                    },
		                })
		                .css('background-color', 'info')
		                .appendTo(container);
		        },
		        width: 50,
			}],
		});

		$('#cardDanhGiaGv').css('display','block');
	});

	$('#btnLuuDanhGiaGv').on('click',function(){
		let maDGGV = $('#inputMaDGGV').val();
		let maTruong = $('#inputMaTruong').val();
		let maGiaoVien = $('#inputMaGv').val();
		let maToChuyenMon = $('#selectToChuyenMon').val();
		let namDanhGia = $('#selectNam').val();
		let chbxXepLoai = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');
		let dataChBxXepLoaiTrue = [];
	    for (let i = 0; i < chbxXepLoai.length; i++) {
	        if (chbxXepLoai[i].checked) {
	            let maTieuChuan = chbxXepLoai[i].dataset.matieuchuan;
	            let maTieuChi = chbxXepLoai[i].dataset.matieuchi;
	            let maXepLoai = chbxXepLoai[i].dataset.maxeploai;
	            dataChBxXepLoaiTrue.push(
	            	{	maTruong: maTruong, 
	            		maToChuyenMon: maToChuyenMon, 
	            		maGiaoVien: maGiaoVien, 
	            		maTieuChuan: maTieuChuan, 
	            		maTieuChi: maTieuChi, 
	            		maXepLoai: maXepLoai,
	            		namDanhGia: namDanhGia
	            	}
	            );
	        }
	    }
	    let demChbxXepLoaiTrue = dataChBxXepLoaiTrue.length;
	    if(demChbxXepLoaiTrue < 15) {
	    	alert('Vui lòng đánh giá đầy đủ các tiêu chí');
	    }else{
	    	axios.post('addDanhGiaGv', {
	    		iddanhgiagv: maDGGV,
				dataChBxXepLoaiTrue: JSON.stringify(dataChBxXepLoaiTrue)
			}).then(function(response) {
				let data = response.data;
				if(data == 1){
					Swal.fire({
						title: 'Lưu',
						text: 'Đã lưu thành công',
						icon: 'success',
						confirmButtonText: 'OK'
					});
					$('#modalDanhGiaGv').modal("hide");
					$('#modalDanhGiaGv').on('hidden.bs.modal', function() {
						$('#tableDanhGiaGv>tbody').empty();
					})
					refresh(); 
				}
			});
	    }
	    
	});

	$('#selectToChuyenMon').on('change',function(){
		$('#selectNam').val('');
		$('#cardDanhGiaGv').css('display','none');
	});

}

function hienThiSelectToChuyenMon () {
	$('#selectToChuyenMon').find('option').remove();
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

function modalDanhGiaGv(dataDanhGiaGv) {

	$('#bodyDanhGiaGv').empty();

	let dataDGGV = dataDanhGiaGv;

	if(dataDGGV != ''){
		
		let noidungbang = "";

		for (let i = 0; i < layDataTieuChuanTieuChi.length; i++) {
	        let rowspan = 0;
	        let dataTieuChi = layDataTieuChuanTieuChi[i].dataTieuChi;
	        let demDataTieuChi = dataTieuChi.length;
	        rowspan += demDataTieuChi;
	        noidungbang += "<tr><td class='sticky-col first-col' rowspan=" + parseInt(1 + rowspan) + ">" + layDataTieuChuanTieuChi[i].tentieuchuan + "</td></tr>";
	        for (let j = 0; j < demDataTieuChi; j++) {
			  	let cotRong = '';
			  	let theadXepLoai = document.querySelectorAll('#tableDanhGiaGv thead tr .classXepLoai');
	        	for(let x=0;x<theadXepLoai.length;x++){
	        		let maXepLoai = theadXepLoai[x].id;
		            cotRong += "<td rowspan=" + 1 + "><input class='classChbxXepLoai' type='checkbox' data-matieuchuan= "+layDataTieuChuanTieuChi[i].id+" data-matieuchi= "+dataTieuChi[j].id+" data-maxeploai= "+maXepLoai+" />&nbsp;</td>";
			  	}
	            	
	            noidungbang += "<tr>"
	            +"<td class='sticky-col second-col'>"+ dataTieuChi[j].tentieuchi + "</td>"
	            +cotRong
	            +"</tr>";
	        }
	    }

	    $("tbody#bodyDanhGiaGv").append(noidungbang);

	    let chbxXepLoai = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');

	    let maDGGV = [];

	    dataDGGV.forEach(function(iTem){
	    	maDGGV.push({iddanhgiagv:iTem.iddanhgiagv});
	    	let maTChuan = iTem.matieuchuan;
	    	let maTChi = iTem.matieuchi;
	    	let maXLoai = iTem.maxeploai;
	    	chbxXepLoai.forEach(function(iTem1,key){
		    	let maTieuChuan = iTem1.dataset.matieuchuan;
	            let maTieuChi = iTem1.dataset.matieuchi;
	            let maXepLoai = iTem1.dataset.maxeploai;
	            if(maTChuan == maTieuChuan && maTChi == maTieuChi && maXLoai == maXepLoai){
	            	chbxXepLoai[key].checked=true;
	            }
		    });
	    });

	    $('#inputMaDGGV').val(JSON.stringify(maDGGV));
	    
	}else{

		let noidungbang = "";

		for (let i = 0; i < layDataTieuChuanTieuChi.length; i++) {
	        let rowspan = 0;
	        let dataTieuChi = layDataTieuChuanTieuChi[i].dataTieuChi;
	        let demDataTieuChi = dataTieuChi.length;
	        rowspan += demDataTieuChi;
	        noidungbang += "<tr><td class='sticky-col first-col' rowspan=" + parseInt(1 + rowspan) + ">" + layDataTieuChuanTieuChi[i].tentieuchuan + "</td></tr>";
	        for (let j = 0; j < demDataTieuChi; j++) {
			  	let cotRong = '';
			  	let theadXepLoai = document.querySelectorAll('#tableDanhGiaGv thead tr .classXepLoai');
	        	for(let x=0;x<theadXepLoai.length;x++){
	        		let maXepLoai = theadXepLoai[x].id;
		            cotRong += "<td rowspan=" + 1 + "><input class='classChbxXepLoai' type='checkbox' data-matieuchuan= "+layDataTieuChuanTieuChi[i].id+" data-matieuchi= "+dataTieuChi[j].id+" data-maxeploai= "+maXepLoai+" />&nbsp;</td>";
			  	}
	            	
	            noidungbang += "<tr>"
	            +"<td class='sticky-col second-col'>"+ dataTieuChi[j].tentieuchi + "</td>"
	            +cotRong
	            +"</tr>";
	        }
	    }

	    $("tbody#bodyDanhGiaGv").append(noidungbang);

	}

    $('#modalDanhGiaGv').modal('show');

    $('input[type="checkbox"]').on('change', function() {
	  $(this).closest('tr').find('input').not(this).prop('checked', false);
	});

}
function refresh() {
    var dataGrid = $("#girdDsGv").dxDataGrid("instance");
    dataGrid.refresh();
}