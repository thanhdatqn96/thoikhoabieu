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

	//đánh giá giáo viên
	$('#selectNam').on('change',function(){
		let valNam = $(this).val();
		let dateCurrent = new Date();
  		let yearCurrent = dateCurrent.getFullYear();
		let valTCM = $('#selectToChuyenMon').val();

		if(valTCM == null){
			alert('Vui lòng chọn tổ chuyên môn');
			$('#selectNam').val('');
			return false;
		}

		if(valNam > yearCurrent || valNam < yearCurrent) {
			alert('Năm đánh giá không phù hợp');
			$('#selectNam').val('');
			return false;
		}

		$('#namDGVirtual').val(valNam);

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

		axios.get("statusDanhGiaGv").then(res => {

			let layStatusDanhGiaGv = res.data;

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
					caption: "",
					width: 50,
					// headerCellTemplate: function (header, info) {
		   //              $(
     //                        "<input type='checkbox' class='classChbxAllSelect'>"
     //                    ).appendTo(header);
		   //          },
					cellTemplate: function(container, options) {
						let dataCell = options.data;
						let status = 0;
						layStatusDanhGiaGv.forEach(function(iTem,key){
							if(iTem.matochuyenmon == dataCell.matochuyenmon && iTem.magiaovien == dataCell.id && iTem.namdanhgia == valNam && iTem.trangthai == 1){
								status = 1;
							}
							if(iTem.matochuyenmon == dataCell.matochuyenmon && iTem.magiaovien == dataCell.id && iTem.namdanhgia == valNam && iTem.trangthai == 2){
								status = 2;
							}
						});
						if(status == 1){
							$(
	                            "<input type='checkbox' class='classChbxSelect' data-matochuyenmon= "+dataCell.matochuyenmon+" data-magiaovien= "+dataCell.id+" data-matruong= "+dataCell.matruong+" data-namdanhgia= "+valNam+">"
	                        ).appendTo(container);
						}else{
							$(
	                            "<input type='checkbox' disabled>"
	                        ).appendTo(container);
						}	
					}
				}, {
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
					caption: "Trạng thái",
					cellTemplate: function(container, options) {
						let numBer = 0;

						let mTCM = $('#selectToChuyenMon').val();
	                	let nDG = $('#selectNam').val();
	                	let mGV = options.data.id;

	                	layStatusDanhGiaGv.forEach(function(iTem){
	                		if (iTem.matochuyenmon == mTCM && iTem.magiaovien == mGV && iTem.namdanhgia == nDG && iTem.trangthai == 1) {
		                        numBer = 1;
		                    }

		                    if (iTem.matochuyenmon == mTCM && iTem.magiaovien == mGV && iTem.namdanhgia == nDG && iTem.trangthai == 2) {
		                        numBer = 2;
		                    }
	                	});

	                	if(numBer == 0){
							$(
	                            "<span class='badge badge-pill badge-secondary'>Chưa đánh giá</span>"
	                        ).appendTo(container);
						}

						if(numBer == 1){
							$(
	                            "<span class='badge badge-pill badge-danger'>Đã đánh giá</span>"
	                        ).appendTo(container);
						}
						
						if(numBer == 2){
							$(
	                            "<span class='badge badge-pill badge-success'>Hoàn thành đánh giá</span>"
	                        ).appendTo(container);
						}
						
					},
					width: 150,
				}, 
				{
			        fixed: true,
			        fixedPosition: "right",
			        caption: "Đánh giá",
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

			                    		let doneDanhGia = 0;

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

				                    	layStatusDanhGiaGv.forEach(function(iTem){
				                    		if(iTem.matochuyenmon == maTCM && iTem.magiaovien == maGv && iTem.namdanhgia == namDG && iTem.trangthai == 2){
				                    			doneDanhGia = 1;
				                    		}
				                    	})

			                    		modalDanhGiaGv(dataDanhGiaGv,doneDanhGia);

									});

			                    },
			                })
			                .css('background-color', 'info')
			                .appendTo(container);
			        },
			        width: 80,
				}],
				onContextMenuPreparing: function(data) { 
					if (data.target == "content") {
						if (!data.items) data.items = [];
						data.items.push({
							template: function () {
								return $("<i class='fa fa-exchange'>").text("Hoàn thành đánh giá");                  
							},
							onItemClick: function() {
								hoanThanhDanhGia();
							}
						});
					} 
				}
			});
		});

		$('#cardDanhGiaGv').css('display','block');
	});
	
	$('#btnLuuDanhGiaGv').unbind("click");
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
						$('#inputMaGv').val('');
						$('#inputMaTruong').val('');
						$('#inputMaDGGV').val('');
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

	//đóng đánh giá giáo viên
	$('#btnCloseModal').on('click',function(){
		$('#modalDanhGiaGv').on('hidden.bs.modal', function() {
			$('#inputMaGv').val('');
			$('#inputMaTruong').val('');
			$('#inputMaDGGV').val('');
			$('#tableDanhGiaGv>tbody').empty();
		})
	});

	//xem đánh giá giáo viên
	$('#selectNamXem').on('change',function(){
		let valNam = $(this).val();
		let valTCM = $('#selectToChuyenMonXem').val();

		if(valTCM == null){
			alert('Vui lòng chọn tổ chuyên môn');
			$('#selectNam').val('');
			return false;
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

		axios.get("getKetQuaDanhGiaGv").then(res => {

			let layKetQuaDanhGiaGv = res.data;

			$("#girdKetQuaDanhGiaGv").dxDataGrid({
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
					caption: "Xếp loại",
					cellTemplate: function(container, options) {
						let numBer = 0;
						let maXeploai = 0;

						let mTCM = $('#selectToChuyenMonXem').val();
	                	let nDG = $('#selectNamXem').val();
	                	let mGV = options.data.id;

	                	layKetQuaDanhGiaGv.forEach(function(iTem){
	                		if (iTem.matochuyenmon == mTCM && iTem.magiaovien == mGV && iTem.namdanhgia == nDG ) {
		                        numBer = 1;
		                        maXeploai = iTem.maxeploai;
		                    }
	                	});

	                	if(numBer == 1 && maXeploai == 1){
	                		$(
	                            "<span class='badge badge-danger'>Chưa đạt</span>"
	                        ).appendTo(container);
	                	}

	                	if(numBer == 1 && maXeploai == 2){
	                		$(
	                            "<span class='badge badge-warning'>Đạt</span>"
	                        ).appendTo(container);
	                	}

	                	if(numBer == 1 && maXeploai == 3){
	                		$(
	                            "<span class='badge badge-primary'>Khá</span>"
	                        ).appendTo(container);
	                	}

	                	if(numBer == 1 && maXeploai == 4){
	                		$(
	                            "<span class='badge badge-success'>Tốt</span>"
	                        ).appendTo(container);
	                	}

						if(numBer == 0 && maXeploai == 0){
							$(
	                            "<span></span>"
	                        ).appendTo(container);
						}
						
					},
					width: 100,
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
			                    	let maTCM = $('#selectToChuyenMonXem').val();
			                    	let namDG = $('#selectNamXem').val();
			                    	let maGv = options.data.id;
			                    	let tenGv = options.data.hovaten;
			                    	$('#spanTenGVXem').text(tenGv);


			                    	axios.get("getDataDanhGiaGv").then(res => {
										let layDataDanhGiaGv = res.data;

			                    		let dataDanhGiaGv = [];

			                    		let doneDanhGia = 0;

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

				                    	layKetQuaDanhGiaGv.forEach(function(iTem){
				                    		if(iTem.matochuyenmon == maTCM && iTem.magiaovien == maGv && iTem.namdanhgia == namDG){
				                    			doneDanhGia = 1;
				                    		}
				                    	})

			                    		modalDanhGiaGvXem(dataDanhGiaGv,doneDanhGia);

									});

			                    },
			                })
			                .css('background-color', 'info')
			                .appendTo(container);
			        },
			        width: 50,
				}],
			});
		});

		$('#cardKetQuaDanhGiaGv').css('display','block');
	});

	//đóng modal xem đánh giá giáo viên
	$('#btnCloseModalXem').on('click',function(){
		$('#modalXemDanhGiaGv').on('hidden.bs.modal', function() {
			$('#tableDanhGiaGvXem>tbody').empty();
		})
	});

}

function hienThiSelectToChuyenMon () {
	$('#selectToChuyenMon').find('option').remove();
	$('#selectToChuyenMonXem').find('option').remove();
	axios.get('getDsToChuyenMon').then(function(response) {
		let data = response.data;
		let selectToChuyenMon = document.getElementById('selectToChuyenMon');
		let selectToChuyenMonXem = document.getElementById('selectToChuyenMonXem');
		$('#selectToChuyenMon').append("<option value='' selected='' disabled=''></option>");
		$('#selectToChuyenMonXem').append("<option value='' selected='' disabled=''></option>");
		for(let i= 0; i< data.length;i++){
			let option = document.createElement("option");
		    option.value = data[i].id;
		    option.text = data[i].tentocm;
		    selectToChuyenMon.appendChild(option);
		}

		for(let j= 0; j< data.length;j++){
			let option = document.createElement("option");
		    option.value = data[j].id;
		    option.text = data[j].tentocm;
		    selectToChuyenMonXem.appendChild(option);
		}
	});
	
	$('#selectToChuyenMon').select2({ width: '50%'});
	$('#selectToChuyenMonXem').select2({ width: '50%'});
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
    $('#selectNamXem').datepicker({
        format: "yyyy",
        orientation: "bottom",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "vi",
    });
}

//modal đánh giá gv
function modalDanhGiaGv(dataDanhGiaGv,doneDanhGia) {

	$('#bodyDanhGiaGv').empty();

	let dataDGGV = dataDanhGiaGv;

	let doneDG = doneDanhGia;

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

	if(doneDG !=0 ){
		$('#btnHuy').hide();
		$('#btnLuuDanhGiaGv').hide();
	}else{
		$('#btnHuy').show();
		$('#btnLuuDanhGiaGv').show();
	}

    $('#modalDanhGiaGv').modal('show');

    $('input[type="checkbox"]').on('change', function() {
	  $(this).closest('tr').find('input').not(this).prop('checked', false);
	});

}

//modal xem đánh giá gv
function modalDanhGiaGvXem(dataDanhGiaGv,doneDanhGia) {

	$('#bodyDanhGiaGvXem').empty();

	let dataDGGV = dataDanhGiaGv;

	let doneDG = doneDanhGia;

	if(doneDG == 0 ){
		Swal.fire(
		  'Thông báo',
		  'Giáo viên này chưa được xếp loại',
		  'info'
		)
	}else{
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
				  	let theadXepLoai = document.querySelectorAll('#tableDanhGiaGvXem thead tr .classXepLoaiXem');
		        	for(let x=0;x<theadXepLoai.length;x++){
		        		let maXepLoai = theadXepLoai[x].id;
			            cotRong += "<td rowspan=" + 1 + "><input class='classChbxXepLoaiXem' type='checkbox' disabled data-matieuchuan= "+layDataTieuChuanTieuChi[i].id+" data-matieuchi= "+dataTieuChi[j].id+" data-maxeploai= "+maXepLoai+" />&nbsp;</td>";
				  	}
		            	
		            noidungbang += "<tr>"
		            +"<td class='sticky-col second-col'>"+ dataTieuChi[j].tentieuchi + "</td>"
		            +cotRong
		            +"</tr>";
		        }
		    }

		    $("tbody#bodyDanhGiaGvXem").append(noidungbang);

		    let chbxXepLoai = document.querySelectorAll('#tableDanhGiaGvXem .classChbxXepLoaiXem');

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
	    
		}

    	$('#modalXemDanhGiaGv').modal('show');
		
	}
}

function refresh() {
    let valNamVir = $('#namDGVirtual').val();
    $('#selectNam').val(valNamVir).trigger('change');
}

jQuery(document).ready(function () {
	//modal đánh giá gv
    jQuery('#modalDanhGiaGv').on('hidden.bs.modal', function (e) {
        $('#inputMaGv').val('');
		$('#inputMaTruong').val('');
		$('#inputMaDGGV').val('');
		$('#tableDanhGiaGv>tbody').empty();
    });
    //modal xem đánh giá gv
    jQuery('#modalXemDanhGiaGv').on('hidden.bs.modal', function (e) {
		$('#tableDanhGiaGvXem>tbody').empty();
    });
});

function hoanThanhDanhGia () {
	let chbxSelect = document.querySelectorAll('.classChbxSelect');
	let arrChbx = [];
	chbxSelect.forEach(function(Item,key){
		if(chbxSelect[key].checked == true){
			let maTChuyenMon= chbxSelect[key].dataset.matochuyenmon;
            let maGVien = chbxSelect[key].dataset.magiaovien;
            let maTrg = chbxSelect[key].dataset.matruong;
            let namDGia = chbxSelect[key].dataset.namdanhgia;
			arrChbx.push({matochuyenmon: maTChuyenMon, magiaovien: maGVien, matruong: maTrg, namdanhgia: namDGia});
		}
	});
	let demArrChbx = arrChbx.length;
	if(demArrChbx == 0){
		alert('Vui lòng chọn giáo viên đã đánh giá');
		return false;
	}else{
		axios.post('addKetQuaDanhGiaGv', {
    		arrChbx: arrChbx
		}).then(function(response) {
			let data = response.data;
			if(data == 1){
				Swal.fire({
					title: 'Hoàn thành đánh giá',
					text: 'Đã lưu thành công',
					icon: 'success',
					confirmButtonText: 'OK'
				});
				refresh(); 
			}
		});
	}

}

