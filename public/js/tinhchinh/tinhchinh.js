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

	//đánh giá giáo viên

	$('#selectToChuyenMon').on('change',function(){
		$('#selectNam').val('');
		document.getElementById('cardDanhGiaGv').style.display = "none";
	});

	$('#selectNam').on('change',function(){
		let valTCM = $('#selectToChuyenMon').val();
		let valNam = $(this).val();
		let dateCurrent = new Date();
  		let yearCurrent = dateCurrent.getFullYear();

		if(valTCM == null) {
			Swal.fire(
			  'Thông báo',
			  'Vui lòng tổ chuyên môn',
			  'info'
			);
			return false;
		}

		if(valNam == '') {
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn năm đánh giá',
			  'info'
			);
			$('#selectNam').val('');
			return false;
		}

		if(valNam > yearCurrent || valNam < yearCurrent) {
			Swal.fire(
			  'Thông báo',
			  'Năm đánh giá không phù hợp',
			  'info'
			);
			$('#selectNam').val('');
			document.getElementById('cardDanhGiaGv').style.display = "none";
			return false;
		}


  		$('#toChuyenMonVirtual').val(valTCM);

  		$('#namDanhGiaVirtual').val(valNam);

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
				columns: [
				{
					caption: "",
					width: 50,
					dataType: 'boolean',
					headerCellTemplate: function (header, info) {
		                // $(
                  //           "<input type='checkbox' class='classChbxAllSelect'>"
                  //       ).appendTo(header);
	                  	$('<div>')
		                .appendTo(header)
		                .dxCheckBox({
		                    onValueChanged: function(e){
		                        let chbxSelect = document.querySelectorAll('.classChbxSelect');
								chbxSelect.forEach(function(iTem,key){
									if(e.value == true){
										chbxSelect[key].checked = true;
									}else{
										chbxSelect[key].checked = false;
									}
								});
		                    }
		                })
		            },
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

	                	let mGV = options.data.id;

	                	layStatusDanhGiaGv.forEach(function(iTem){
	                		if (iTem.matochuyenmon == valTCM && iTem.magiaovien == mGV && iTem.namdanhgia == valNam && iTem.trangthai == 1) {
		                        numBer = 1;
		                    }

		                    if (iTem.matochuyenmon == valTCM && iTem.magiaovien == mGV && iTem.namdanhgia == valNam && iTem.trangthai == 2) {
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
				                    					if(iTem1.matochuyenmon == valTCM && iTem2.nam == valNam && iTem3.magiaovien == maGv) {
				                    						dataDanhGiaGv.push(iTem4);
					                    				}
				                    				});
				                    				
				                    			});
				                    		});
				                    	});

				                    	layStatusDanhGiaGv.forEach(function(iTem){
				                    		if(iTem.matochuyenmon == valTCM && iTem.magiaovien == maGv && iTem.namdanhgia == valNam && iTem.trangthai == 2){
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
				// onContextMenuPreparing: function(data) { 
				// 	if (data.target == "content") {
				// 		if (!data.items) data.items = [];
				// 		data.items.push({
				// 			template: function () {
				// 				return $("<i class='fa fa-exchange'>").text("Hoàn thành đánh giá");                  
				// 			},
				// 			onItemClick: function() {
				// 				hoanThanhDanhGia();
				// 			}
				// 		});
				// 	} 
				// }
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
		let dateCurrent = new Date();
  		let yearCurrent = dateCurrent.getFullYear();
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
	            		namDanhGia: yearCurrent
	            	}
	            );
	        }
	    }
	    let demChbxXepLoaiTrue = dataChBxXepLoaiTrue.length;
	    if(demChbxXepLoaiTrue < 15) {
	    	Swal.fire(
			  'Thông báo',
			  'Vui lòng đánh giá đầy đủ các tiêu chí',
			  'info'
			);
			return false;
	    }else{
	    	$('#modalLoading').modal('show');
	    	axios.post('addDanhGiaGv', {
	    		iddanhgiagv: maDGGV,
				dataChBxXepLoaiTrue: JSON.stringify(dataChBxXepLoaiTrue)
			}).then(function(response) {
				let data = response.data;
				if(data == 1){
					$('#modalLoading').modal('hide');
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

	
	//xem đánh giá giáo viên
	$('#selectToChuyenMonXem').on('change',function(){
		$('#selectNamXem').val('');
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
	});

	$('#selectNamXem').on('change',function(){
		let valNam = $(this).val();
		let valTCM = $('#selectToChuyenMonXem').val();

		if(valTCM == null){
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn tổ chuyên môn',
			  'info'
			);
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

	//đóng đánh giá giáo viên
	$('#btnCloseModal').on('click',function(){
		$('#modalDanhGiaGv').on('hidden.bs.modal', function() {
			$('#inputMaGv').val('');
			$('#inputMaTruong').val('');
			$('#inputMaDGGV').val('');
			$('#chbxChuaDatAll').prop('checked',false);
			$('#chbxDatAll').prop('checked',false);
			$('#chbxKhaAll').prop('checked',false);
			$('#chbxTotAll').prop('checked',false);
			$('#tableDanhGiaGv>tbody').empty();
		})
	});

	//đóng modal xem đánh giá giáo viên
	$('#btnCloseModalXem').on('click',function(){
		$('#modalXemDanhGiaGv').on('hidden.bs.modal', function() {
			$('#tableDanhGiaGvXem>tbody').empty();
		})
	});

	//đóng modal import
	$('#btnCloseModalImportDGGVCheck').on('click',function(){
		$('#modalImportDGGVCheck').on('hidden.bs.modal', function() {
			$('.classChbxImportDGGVCheckAll').prop('checked',false);
			$('#tableImportDGGVCheck>tbody').empty();
			$('#btnCheckImportDGGV').attr("disabled", false);
			$('#btnLuuImportDGGV').attr("disabled", true);
		})
	});
	
	$('#btnFileMauDGGV').on('click',function(){
		let valTCMExcel = $('#selectToChuyenMonExcel').val();
		if(valTCMExcel == null){
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn tổ chuyên môn',
			  'info'
			);
			return false;
		}else{
			$('#modalLoading').modal('show');
			axios.get(`getFileMauExcelDGGV/${valTCMExcel}`).then(res => {
				let status =  res.status;
				if(status == 200){
					$('#modalLoading').modal('hide');
					window.open('../public/export/danhgiagiaovien.xlsx');
				}else{
					$('#modalLoading').modal('hide');
					Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
				}
			});
		}
	});

	$('#btnFileMauDGGVToanTruong').on('click',function(){
		$('#modalLoading').modal('show');
		axios.get("getFileMauExcelDGGVToanTruong").then(res => {
			let status =  res.status;
			if(status == 200){
				$('#modalLoading').modal('hide');
				window.open('../public/export/danhgiagiaovien.xlsx');
			}else{
				$('#modalLoading').modal('hide');
				Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
			}
		});
	});

	$('#selectLoaiImport').on('change',function(){
		let valType = $(this).val();

		if(valType == 1){
			document.getElementById('btnFileMauDGGVToanTruong').style.display = "block";
			document.getElementById('divImportToChuyenMon').style.display = "none";
		}else{
			document.getElementById('divImportToChuyenMon').style.display = "block";
			document.getElementById('btnFileMauDGGVToanTruong').style.display = "none";
		}
	});

	document.getElementById('importFileDGGV').addEventListener('change', handleFileSelect, false);

	var ExcelToJSON = function() {

	    this.parseExcel = function(file) {

	        var reader = new FileReader();

	        reader.onload = function(e) {
	            var data = e.target.result;
	            var workbook = XLSX.read(data, {
	                type: 'binary'
	            });
	            workbook.SheetNames.forEach(function(sheetName) {

	                var xlsx = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Sheet1']);

	                var arrResult = [];
	                xlsx.forEach(function(element) {
	                    let obj = {};
	                    // Lap qua tung phan tu va tao obj moi chua cac key value nhu minh muon
	                    for (const property in element) {
	                        var str = property;
	                        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	                        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	                        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	                        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	                        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	                        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	                        str = str.replace(/đ/g, "d", );
	                        // str = str.replace(/[!@#$%^&*-;()]/g, "");
	                        str = str.replace(/\s+/g, '');
	                        str = str.trim();

	                        let key = str;
	                        obj[key] = element[property];
	                        // tao object moi chua key  da duoc thay doi cung value mac dinh
	                    }
	                    arrResult.push(obj);
	                });
	                if (arrResult != "") {
	                    importExcel(arrResult);
	                } else{
	                	Swal.fire("Dữ liệu không hợp lệ", "Lỗi", "error");
	    				return false;
	                }
	                // console.log(JSON.parse(XL_row_object));
	            })
	        };
	        reader.onerror = function(ex) {
	            console.log(ex);
	        };
	        reader.readAsBinaryString(file);
	    };
	};


	function handleFileSelect(evt) {
	    Swal.fire({
            title: 'Thông báo',
            text: "Bạn có muốn import file excel này không",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                var files = evt.target.files;
                var xl2json = new ExcelToJSON();
                xl2json.parseExcel(files[0]);

                // $('#modalLoading').modal('show');

                // var i = 0;
                // if (i == 0) {
                //     i = 1;
                //     var elem = document.getElementById("loading");
                //     var width = 1;
                //     var id = setInterval(frame, 80);

                //     function frame() {
                //         if (width >= 200) {
                //             clearInterval(id);
                //             i = 0;

                //         } else {
                //             width++;
                //             elem.style.width = width + "%";
                //             if (width == 200) {
                //                 $('#modalLoading').modal('toggle');
                //             }
                //         }
                //     }

                // }

            }
            $('#importFileDGGV').val('');
        })
	    
	}

	function importExcel(datas) {
		let maTruongImport = 0;
		let data = datas.map(function(value, key) {
			layDataDsGiaoVien.forEach(function(iTem){
				if(iTem.matochuyenmon == value.MaTCM && iTem.id == value.MaGV){
					maTruongImport = iTem.matruong;
				}
			});
			return {
				stt: value.STT,
				matochuyenmon: value.MaTCM,
				magiaovien: value.MaGV,
				namdanhgia: value.NamDG,
				hovaten: value.Hovaten,
				tentochuyenmon: value.Tochuyenmon,
				matruong: maTruongImport,
				tc1: value.TC1,
				tc2: value.TC2,
				tc3: value.TC3,
				tc4: value.TC4,
				tc5: value.TC5,
				tc6: value.TC6,
				tc7: value.TC7,
				tc8: value.TC8,
				tc9: value.TC9,
				tc10: value.TC10,
				tc11: value.TC11,
				tc12: value.TC12,
				tc13: value.TC13,
				tc14: value.TC14,
				tc15: value.TC15
			}
		});

		if(data != '') {

			$('#bodyImportDGGVCheck').empty();
		
			let noidungbang = "";

			for (let i = 0; i < data.length; i++) {
				let tc1,tc2,tc3,tc4,tc5,tc6,tc7,tc8,tc9,tc10,tc11,tc12,tc13,tc14,tc15;
				let arrNumber = [1,2,3,4];

				if( data[i].stt == null ||
					data[i].matochuyenmon == null ||
					data[i].magiaovien == null ||
					data[i].namdanhgia == null ||
					data[i].hovaten == null ||
					data[i].tentochuyenmon == null ||
					data[i].matruong == null ) {
					Swal.fire(
					  'Thông báo',
					  'Dữ liệu không hợp lệ, Vui lòng kiểm tra lại',
					  'info'
					)
					return false;
				}

				if(	!(arrNumber.includes(parseInt(data[i].tc1, 10)) && 
					arrNumber.includes(parseInt(data[i].tc2, 10)) && 
					arrNumber.includes(parseInt(data[i].tc3, 10)) && 
 					arrNumber.includes(parseInt(data[i].tc4, 10)) && 
					arrNumber.includes(parseInt(data[i].tc5, 10)) && 
					arrNumber.includes(parseInt(data[i].tc6, 10)) && 
					arrNumber.includes(parseInt(data[i].tc7, 10)) && 
					arrNumber.includes(parseInt(data[i].tc8, 10)) && 
					arrNumber.includes(parseInt(data[i].tc9, 10)) && 
					arrNumber.includes(parseInt(data[i].tc10, 10)) && 
					arrNumber.includes(parseInt(data[i].tc11, 10)) && 
					arrNumber.includes(parseInt(data[i].tc12, 10)) && 
					arrNumber.includes(parseInt(data[i].tc13, 10)) && 
					arrNumber.includes(parseInt(data[i].tc14, 10)) && 
					arrNumber.includes(parseInt(data[i].tc15, 10))) ) {
					Swal.fire(
					  'Thông báo',
					  'Có tiêu chí xếp loại không phù hợp',
					  'info'
					)
					return false;
				}

				//
				if(data[i].tc1 == 1) {
					tc1 = 'Chưa đạt';
				}else if(data[i].tc1 == 2){
					tc1 = 'Đạt';
				}else if(data[i].tc1 == 3){
					tc1 = 'Khá';
				}else if(data[i].tc1 == 4){
					tc1 = 'Tốt';
				}else{
					tc1 = '';
				}
				//
				if(data[i].tc2 == 1) {
					tc2 = 'Chưa đạt';
				}else if(data[i].tc2 == 2){
					tc2 = 'Đạt';
				}else if(data[i].tc2 == 3){
					tc2 = 'Khá';
				}else if(data[i].tc2 == 4){
					tc2 = 'Tốt';
				}else{
					tc2 = '';
				}
				//
				if(data[i].tc3 == 1) {
					tc3 = 'Chưa đạt';
				}else if(data[i].tc3 == 2){
					tc3 = 'Đạt';
				}else if(data[i].tc3 == 3){
					tc3 = 'Khá';
				}else if(data[i].tc3 == 4){
					tc3 = 'Tốt';
				}else{
					tc3 = '';
				}
				//
				if(data[i].tc4 == 1) {
					tc4 = 'Chưa đạt';
				}else if(data[i].tc4 == 2){
					tc4 = 'Đạt';
				}else if(data[i].tc4 == 3){
					tc4 = 'Khá';
				}else if(data[i].tc4 == 4){
					tc4 = 'Tốt';
				}else{
					tc4 = '';
				}
				//
				if(data[i].tc5 == 1) {
					tc5 = 'Chưa đạt';
				}else if(data[i].tc5 == 2){
					tc5 = 'Đạt';
				}else if(data[i].tc5 == 3){
					tc5 = 'Khá';
				}else if(data[i].tc5 == 4){
					tc5 = 'Tốt';
				}else{
					tc5 = '';
				}
				//
				if(data[i].tc6 == 1) {
					tc6 = 'Chưa đạt';
				}else if(data[i].tc6 == 2){
					tc6 = 'Đạt';
				}else if(data[i].tc6 == 3){
					tc6 = 'Khá';
				}else if(data[i].tc6 == 4){
					tc6 = 'Tốt';
				}else{
					tc6 = '';
				}
				//
				if(data[i].tc7 == 1) {
					tc7 = 'Chưa đạt';
				}else if(data[i].tc7 == 2){
					tc7 = 'Đạt';
				}else if(data[i].tc7 == 3){
					tc7 = 'Khá';
				}else if(data[i].tc7 == 4){
					tc7 = 'Tốt';
				}else{
					tc7 = '';
				}
				//
				if(data[i].tc8 == 1) {
					tc8 = 'Chưa đạt';
				}else if(data[i].tc8 == 2){
					tc8 = 'Đạt';
				}else if(data[i].tc8 == 3){
					tc8 = 'Khá';
				}else if(data[i].tc8 == 4){
					tc8 = 'Tốt';
				}else{
					tc8 = '';
				}
				//
				if(data[i].tc9 == 1) {
					tc9 = 'Chưa đạt';
				}else if(data[i].tc9 == 2){
					tc9 = 'Đạt';
				}else if(data[i].tc9 == 3){
					tc9 = 'Khá';
				}else if(data[i].tc9 == 4){
					tc9 = 'Tốt';
				}else{
					tc9 = '';
				}
				//
				if(data[i].tc10 == 1) {
					tc10 = 'Chưa đạt';
				}else if(data[i].tc10 == 2){
					tc10 = 'Đạt';
				}else if(data[i].tc10 == 3){
					tc10 = 'Khá';
				}else if(data[i].tc10 == 4){
					tc10 = 'Tốt';
				}else{
					tc10 = '';
				}
				//
				if(data[i].tc11 == 1) {
					tc11 = 'Chưa đạt';
				}else if(data[i].tc11 == 2){
					tc11 = 'Đạt';
				}else if(data[i].tc11 == 3){
					tc11 = 'Khá';
				}else if(data[i].tc11 == 4){
					tc11 = 'Tốt';
				}else{
					tc11 = '';
				}
				//
				if(data[i].tc12 == 1) {
					tc12 = 'Chưa đạt';
				}else if(data[i].tc12 == 2){
					tc12 = 'Đạt';
				}else if(data[i].tc12 == 3){
					tc12 = 'Khá';
				}else if(data[i].tc12 == 4){
					tc12 = 'Tốt';
				}else{
					tc12 = '';
				}
				//
				if(data[i].tc13 == 1) {
					tc13 = 'Chưa đạt';
				}else if(data[i].tc13 == 2){
					tc13 = 'Đạt';
				}else if(data[i].tc13 == 3){
					tc13 = 'Khá';
				}else if(data[i].tc13 == 4){
					tc13 = 'Tốt';
				}else{
					tc13 = '';
				}
				//
				if(data[i].tc14 == 1) {
					tc14 = 'Chưa đạt';
				}else if(data[i].tc14 == 2){
					tc14 = 'Đạt';
				}else if(data[i].tc14 == 3){
					tc14 = 'Khá';
				}else if(data[i].tc14 == 4){
					tc14 = 'Tốt';
				}else{
					tc14 = '';
				}
				//
				if(data[i].tc15 == 1) {
					tc15 = 'Chưa đạt';
				}else if(data[i].tc15 == 2){
					tc15 = 'Đạt';
				}else if(data[i].tc15 == 3){
					tc15 = 'Khá';
				}else if(data[i].tc15 == 4){
					tc15 = 'Tốt';
				}else{
					tc15 = '';
				}
				//
				noidungbang += "<tr>"
				+"<td style='width: 100px;position: sticky;z-index: 5;left: 0px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'><input class='classChbxImportDGGVCheck' type='checkbox' data-matochuyenmon= "+data[i].matochuyenmon+" data-magiaovien= "+data[i].magiaovien+" data-namdanhgia= "+data[i].namdanhgia+" data-matruong= "+data[i].matruong+" data-tc1= "+data[i].tc1+" data-tc2= "+data[i].tc2+" data-tc3= "+data[i].tc3+" data-tc4= "+data[i].tc4+" data-tc5= "+data[i].tc5+" data-tc6= "+data[i].tc6+" data-tc7= "+data[i].tc7+" data-tc8= "+data[i].tc8+" data-tc9= "+data[i].tc9+" data-tc10= "+data[i].tc10+" data-tc11= "+data[i].tc11+" data-tc12= "+data[i].tc12+" data-tc13= "+data[i].tc13+" data-tc14= "+data[i].tc14+" data-tc15= "+data[i].tc15+" /></td>"
	            +"<td style='width: 100px;position: sticky;z-index: 5;left: 100px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ data[i].stt + "</td>"
	            +"<td style='width: 100px;position: sticky;z-index: 5;left: 200px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ data[i].hovaten + "</td>"
	            +"<td style='width: 100px;position: sticky;z-index: 5;left: 300px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ data[i].tentochuyenmon + "</td>"
	            +"<td>"+ tc1 + "</td>"
	            +"<td>"+ tc2 + "</td>"
	            +"<td>"+ tc3 + "</td>"
	            +"<td>"+ tc4 + "</td>"
	            +"<td>"+ tc5 + "</td>"
	            +"<td>"+ tc6 + "</td>"
	            +"<td>"+ tc7 + "</td>"
	            +"<td>"+ tc8 + "</td>"
	            +"<td>"+ tc9 + "</td>"
	            +"<td>"+ tc10 + "</td>"
	            +"<td>"+ tc11 + "</td>"
	            +"<td>"+ tc12 + "</td>"
	            +"<td>"+ tc13 + "</td>"
	            +"<td>"+ tc14 + "</td>"
	            +"<td>"+ tc15 + "</td>"
	            +"</tr>";
		    }

		    $("tbody#bodyImportDGGVCheck").append(noidungbang);
	    
		}

		$('#modalImportDGGVCheck').modal('show');

	}

	$('.classChbxImportDGGVCheckAll').on('click',function(){
		let chbxImportDGGVCheck = document.querySelectorAll('#tableImportDGGVCheck .classChbxImportDGGVCheck');
		chbxImportDGGVCheck.forEach(function(iTem,key){
			if($(".classChbxImportDGGVCheckAll").is(':checked')){
				chbxImportDGGVCheck[key].checked = true;
			}else{
				chbxImportDGGVCheck[key].checked = false;
			}
		});

	});

	$('#chbxChuaDatAll').on('click',function(){
		$('#chbxDatAll').prop('checked',false);
		$('#chbxKhaAll').prop('checked',false);
		$('#chbxTotAll').prop('checked',false);
		let chbxXL = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');
		for(let i =0;i<chbxXL.length;i++){
			if(chbxXL[i].checked){
				chbxXL[i].checked = false;
			}
		}
		chbxXL.forEach(function(iTem,key){
			if($("#chbxChuaDatAll").is(':checked')){
				if(iTem.dataset.maxeploai == 1){

					chbxXL[key].checked = true;
				}	
			}else{
				if(iTem.dataset.maxeploai == 1){
					chbxXL[key].checked = false;
				}
			}
		});

	});

	$('#chbxDatAll').on('click',function(){
		$('#chbxChuaDatAll').prop('checked',false);
		$('#chbxKhaAll').prop('checked',false);
		$('#chbxTotAll').prop('checked',false);
		let chbxXL = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');
		for(let i =0;i<chbxXL.length;i++){
			if(chbxXL[i].checked){
				chbxXL[i].checked = false;
			}
		}
		chbxXL.forEach(function(iTem,key){
			if($("#chbxDatAll").is(':checked')){
				if(iTem.dataset.maxeploai == 2){

					chbxXL[key].checked = true;
				}	
			}else{
				if(iTem.dataset.maxeploai == 1){
					chbxXL[key].checked = false;
				}
			}
		});

	});

	$('#chbxKhaAll').on('click',function(){
		$('#chbxChuaDatAll').prop('checked',false);
		$('#chbxDatAll').prop('checked',false);
		$('#chbxTotAll').prop('checked',false);
		let chbxXL = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');
		for(let i =0;i<chbxXL.length;i++){
			if(chbxXL[i].checked){
				chbxXL[i].checked = false;
			}
		}
		chbxXL.forEach(function(iTem,key){
			if($("#chbxKhaAll").is(':checked')){
				if(iTem.dataset.maxeploai == 3){

					chbxXL[key].checked = true;
				}	
			}else{
				if(iTem.dataset.maxeploai == 1){
					chbxXL[key].checked = false;
				}
			}
		});

	});

	$('#chbxTotAll').on('click',function(){
		$('#chbxChuaDatAll').prop('checked',false);
		$('#chbxDatAll').prop('checked',false);
		$('#chbxKhaAll').prop('checked',false);
		let chbxXL = document.querySelectorAll('#tableDanhGiaGv .classChbxXepLoai');
		for(let i =0;i<chbxXL.length;i++){
			if(chbxXL[i].checked){
				chbxXL[i].checked = false;
			}
		}
		chbxXL.forEach(function(iTem,key){
			if($("#chbxTotAll").is(':checked')){
				if(iTem.dataset.maxeploai == 4){

					chbxXL[key].checked = true;
				}	
			}else{
				if(iTem.dataset.maxeploai == 1){
					chbxXL[key].checked = false;
				}
			}
		});

	});

	$('#btnCheckImportDGGV').on('click',function(){
		let chbxImportDGGVCheck = document.querySelectorAll('#tableImportDGGVCheck .classChbxImportDGGVCheck');
		let demChbxImport = chbxImportDGGVCheck.length;
		let mangChbxTrue = [];
		chbxImportDGGVCheck.forEach(function(iTem,key){
			if(iTem.checked == true){
				mangChbxTrue.push(iTem);
				
			}
		});

		if(mangChbxTrue.length < demChbxImport) {
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn tất cả giáo viên',
			  'info'
			);
			return false;
		}

		if(mangChbxTrue.length == '' ) {
			Swal.fire(
			  'Thông báo',
			  'Tất cả giáo viên đã hoàn thành đánh giá',
			  'info'
			);
			$('.classChbxImportDGGVCheckAll').prop('checked',false);
			$('.classChbxImportDGGVCheckAll').attr("disabled", true);
			return false;
		}

		if(mangChbxTrue.length == demChbxImport) {
			$('#modalLoading').modal('show');
			axios.get("statusDanhGiaGv").then(res => {
				let layStatusDanhGiaGv = res.data;

				axios.get("getDGGV").then(res1 => {
					let layDataDGGV = res1.data;

					if(layStatusDanhGiaGv == '' && layDataDGGV == '') {
						$('#modalLoading').modal('hide');
						Swal.fire(
						  'Hoàn tất',
						  'Kiểm tra hợp lệ',
						  'success'
						);
						$('#btnCheckImportDGGV').attr("disabled", true);
						$('#btnLuuImportDGGV').attr("disabled", false);
						return false;
					}

					let checkTrung = 0;
					let iddanhgiagv = [];

					layStatusDanhGiaGv.forEach(function(iTem){

						mangChbxTrue.forEach(function(iTem1,key1){

							let matochuyenmon = iTem1.dataset.matochuyenmon;
							let magiaovien = iTem1.dataset.magiaovien;
							let namdanhgia = iTem1.dataset.namdanhgia;

							//kiểm tra có dữ liệu đã hoàn thành đánh giá
							if(iTem.matochuyenmon == matochuyenmon && iTem.magiaovien == magiaovien && iTem.namdanhgia == namdanhgia && iTem.trangthai == 2){
								mangChbxTrue[key1].checked = false;
								mangChbxTrue[key1].setAttribute("disabled", true);
								mangChbxTrue[key1].setAttribute("class", "");
								checkTrung = 1;
								return false;
							}

							//kiểm tra có dữ liệu đã đc đánh giá
							if(iTem.matochuyenmon == matochuyenmon && iTem.magiaovien == magiaovien && iTem.namdanhgia == namdanhgia && iTem.trangthai == 1){
								for(let i=0;i<layDataDGGV.length;i++){
									if(layDataDGGV[i].matochuyenmon == matochuyenmon  && layDataDGGV[i].magiaovien == magiaovien && layDataDGGV[i].namdanhgia == namdanhgia && layDataDGGV[i].trangthai == 1){
	            						iddanhgiagv.push({iddanhgiagv:layDataDGGV[i].id});
	            					}
								}
							}
								
						});

						//kiểm tra trùng dữ liệu
						if(checkTrung == 1) {
							$('#modalLoading').modal('hide');
							Swal.fire(
							  'Thông báo',
							  'Có giáo viên đã hoàn thành đánh giá, Đã loại bỏ giáo viên',
							  'info'
							);

							$('#btnCheckImportDGGV').attr("disabled", false);
							$('#btnLuuImportDGGV').attr("disabled", true);
							return false;	

						}

						if(checkTrung == 0) {
							$('#modalLoading').modal('hide');
							Swal.fire(
							  'Hoàn tất',
							  'Kiểm tra hợp lệ',
							  'success'
							);

							$('#btnCheckImportDGGV').attr("disabled", true);
							$('#btnLuuImportDGGV').attr("disabled", false);
							return false;
						}

					});

					if(iddanhgiagv != ''){
						$('#inputMaDGGVImport').val(JSON.stringify(iddanhgiagv));
					}else{
						$('#inputMaDGGVImport').val('');
					}	

				});

			});

		}


	});

	$('#btnLuuImportDGGV').on('click',function(){
		let chbxImportDoneCheck = document.querySelectorAll('#tableImportDGGVCheck .classChbxImportDGGVCheck');
		let maDGGVImport = $('#inputMaDGGVImport').val();
		let dataChBxXepLoaiTrueImport = [];
		chbxImportDoneCheck.forEach(function(iTem){
			for(let i=1;i<16;i++){
				let xloai = 0;
				let mtchuan = 0;
				let mtchi = 0;
				if(i == 1 ){
					mtchuan = 1;
					mtchi = 1;
					xloai = iTem.dataset.tc1;
				}
				if(i == 2 ){
					mtchuan = 1;
					mtchi = 2;
					xloai = iTem.dataset.tc2;
				}
				if(i == 3 ){
					mtchuan = 2;
					mtchi = 3;
					xloai = iTem.dataset.tc3;
				}
				if(i == 4 ){
					mtchuan = 2;
					mtchi = 4;
					xloai = iTem.dataset.tc4;
				}
				if(i == 5 ){
					mtchuan = 2;
					mtchi = 5;
					xloai = iTem.dataset.tc5;
				}
				if(i == 6 ){
					mtchuan = 2;
					mtchi = 6;
					xloai = iTem.dataset.tc6;
				}
				if(i == 7 ){
					mtchuan = 2;
					mtchi = 7;
					xloai = iTem.dataset.tc7;
				}
				if(i == 8 ){
					mtchuan = 3;
					mtchi = 8;
					xloai = iTem.dataset.tc8;
				}
				if(i == 9 ){
					mtchuan = 3;
					mtchi = 9;
					xloai = iTem.dataset.tc9;
				}
				if(i == 10 ){
					mtchuan = 3;
					mtchi = 10;
					xloai = iTem.dataset.tc10;
				}
				if(i == 11 ){
					mtchuan = 4;
					mtchi = 11;
					xloai = iTem.dataset.tc11;
				}
				if(i == 12 ){
					mtchuan = 4;
					mtchi = 12;
					xloai = iTem.dataset.tc12;
				}
				if(i == 13 ){
					mtchuan = 4;
					mtchi = 13;
					xloai = iTem.dataset.tc13;
				}
				if(i == 14 ){
					mtchuan = 5;
					mtchi = 14;
					xloai = iTem.dataset.tc14;
				}
				if(i == 15 ){
					mtchuan = 5;
					mtchi = 15;
					xloai = iTem.dataset.tc15;
				}
				dataChBxXepLoaiTrueImport.push({
					maToChuyenMon: iTem.dataset.matochuyenmon,
					maGiaoVien: iTem.dataset.magiaovien,
					maTieuChuan: mtchuan,
					maTieuChi: mtchi,
					maXepLoai: xloai,
					namDanhGia: iTem.dataset.namdanhgia,
					maTruong: iTem.dataset.matruong
				});
			}
		});

		if(maDGGVImport != '') {
			Swal.fire({
	            title: 'Cảnh báo?',
	            text: "Đã có giáo viên được đánh giá, Bạn có muốn ghi đè dữ liệu",
	            icon: 'warning',
	            showCancelButton: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#d33',
	            confirmButtonText: 'OK'
	        }).then((result) => {
	        	if (result.value) {
	        		$('#modalLoading').modal('show');
	        		axios.post('addDanhGiaGv', {
			    		iddanhgiagv: maDGGVImport,
						dataChBxXepLoaiTrue: JSON.stringify(dataChBxXepLoaiTrueImport)
					}).then(function(response) {
						let data = response.data;
						if(data == 1){
							$('#modalLoading').modal('hide');
							Swal.fire({
								title: 'Import',
								text: 'Import dữ liệu thành công',
								icon: 'success',
								confirmButtonText: 'OK'
							});
							$('#modalImportDGGVCheck').modal("hide");
							$('#modalImportDGGVCheck').on('hidden.bs.modal', function() {
								$('#inputMaDGGVImport').val('');
								$('#tableImportDGGVCheck>tbody').empty();
								$('#btnCheckImportDGGV').attr("disabled", false);
								$('#btnLuuImportDGGV').attr("disabled", true);
							});
						}
					});
	        	}
	        });
		}else{
			$('#modalLoading').modal('show');
			axios.post('addDanhGiaGv', {
	    		iddanhgiagv: 0,
				dataChBxXepLoaiTrue: JSON.stringify(dataChBxXepLoaiTrueImport)
			}).then(function(response) {
				let data = response.data;
				if(data == 1){
					$('#modalLoading').modal('hide');
					Swal.fire({
						title: 'Import',
						text: 'Import dữ liệu thành công',
						icon: 'success',
						confirmButtonText: 'OK'
					});
					$('#modalImportDGGVCheck').modal("hide");
					$('#modalImportDGGVCheck').on('hidden.bs.modal', function() {
						$('#inputMaDGGVImport').val('');
						$('#tableImportDGGVCheck>tbody').empty();
						$('#btnCheckImportDGGV').attr("disabled", false);
						$('#btnLuuImportDGGV').attr("disabled", true);
					});
				}
			});
		}

	});

	$('#btnHoanThanhDanhGia').on('click',function(){
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
			Swal.fire(
				'Thông báo',
				'Vui lòng chọn giáo viên đã đánh giá',
				'info'
				);
			return false;
		}else{
			Swal.fire({
				title: 'Cảnh báo?',
				text: "Bạn có muốn hoàn thành đánh giá cho những giáo viên đã chọn",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'OK'
			}).then((result) => {
				if (result.value) {
					$('#modalLoading').modal('show');
					axios.post('addKetQuaDanhGiaGv', {
						arrChbx: arrChbx
					}).then(function(response) {
						let data = response.data;
						if(data == 1){
							$('#modalLoading').modal('hide');
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
			});
		}
	});
	
	//xuất đánh giá giáo viên

	$('#selectLoaiExport').on('change',function(){
		let valType = $(this).val();

		if(valType == 1){
			document.getElementById('divExportToanTruong').style.display = "block";
			document.getElementById('divExportToChuyenMon').style.display = "none";
			document.getElementById('cardXemExportKetQuaDanhGiaGv').style.display = "none";
			$('#selectToChuyenMonExport').val('none').trigger('change');
            $('#selectNamToChuyenMonExport').val('');
		}else{
			document.getElementById('divExportToChuyenMon').style.display = "block";
			document.getElementById('divExportToanTruong').style.display = "none";
			document.getElementById('cardXemExportKetQuaDanhGiaGv').style.display = "none";
			$('#selectNamToanTruongExport').val('');
		}
	});

	//xuất toàn trường
	$('#btnXuatToanTruong').on('click',function(){
		let valNamTr = $('#selectNamToanTruongExport').val();
		if(valNamTr == ''){
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn năm đánh giá',
			  'info'
			);
			return false;
		}else{
			$('#modalLoading').modal('show');
			axios.get(`getExportDGGVToanTruong/${valNamTr}`).then(res => {
				let status =  res.status;
				if(status == 204){
                    $('#modalLoading').modal('hide');
                    Swal.fire(
                      'Thông báo',
                      'Không có kết quả đánh giá giáo viên',
                      'info'
                    );
                }
				if(status == 200){
					$('#modalLoading').modal('hide');
					window.open('../public/export/ketquadanhgiagiaovien.xlsx');
				}
				// else{
				// 	$('#modalLoading').modal('hide');
				// 	Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
				// }
			});

		}
	});

	//xuất tổ chuyên môn
	$('#btnXuatToChuyenMon').on('click',function(){
		let valtcm = $('#selectToChuyenMonExport').val();
		let valnam = $('#selectNamToChuyenMonExport').val();

		if(valtcm == null){
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn tổ chuyên môn',
			  'info'
			);
			return false;
		}

		if(valnam == ''){
			Swal.fire(
			  'Thông báo',
			  'Vui lòng chọn năm đánh giá',
			  'info'
			);
			return false;
		}

		if(valtcm != '' && valnam != ''){
			$('#modalLoading').modal('show');
			axios.get(`getExportDGGVToChuyenMon/${valtcm}/${valnam}`).then(res => {
				let status =  res.status;
				if(status == 204){
                    $('#modalLoading').modal('hide');
                    Swal.fire(
                      'Thông báo',
                      'Không có kết quả đánh giá giáo viên',
                      'info'
                    );
                }
				if(status == 200){
					$('#modalLoading').modal('hide');
					window.open('../public/export/ketquadanhgiagiaovien.xlsx');
				}
				// else{
				// 	$('#modalLoading').modal('hide');
				// 	Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
				// }
			});
		}
	});

	$('#selectToChuyenMonExport').on('change',function(){
		$('#selectNamToChuyenMonExport').val('');
		document.getElementById('cardXemExportKetQuaDanhGiaGv').style.display = "none";
	});

	//xem xuất kết quả đánh giá giáo viên toàn trường
	$('#selectNamToanTruongExport').on('change',function(){
		$('#modalLoading').modal('show');
		let valNamXemTr = $(this).val();
		axios.get(`getXemExportDGGVToanTruong/${valNamXemTr}`).then(res => {
			let layDataDGGVToanTruong = res.data;
			if(layDataDGGVToanTruong == '') {
				$('#modalLoading').modal('hide');
				Swal.fire(
                  'Thông báo',
                  'Không có kết quả đánh giá giáo viên',
                  'info'
                );
                document.getElementById('cardXemExportKetQuaDanhGiaGv').style.display = "none";
				return false;
			}else{
				$('#tieuDeThoiGian').text("(Năm: "+valNamXemTr+")");

				$('#bodyXemExportKetQuaDanhGiaGv').empty();

				let noidungbang = '';

				for(let i=0;i<layDataDGGVToanTruong.length;i++){
					let noidungbangChild = '';
					let demDSGV = layDataDGGVToanTruong[i].dsgiaovien.length;
					for(let j=0;j<demDSGV;j++){
						let dataGV = layDataDGGVToanTruong[i].dsgiaovien[j];
						noidungbangChild += "<tr>"
						+"<td style='width: 100px;position: sticky;z-index: 5;left: 0px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ dataGV.stt + "</td>"
						+"<td style='width: 100px;position: sticky;z-index: 5;left: 100px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ dataGV.hovaten + "</td>"
						+"<td>"+ dataGV.tc1 + "</td>"
						+"<td>"+ dataGV.tc2 + "</td>"
						+"<td>"+ dataGV.tc3 + "</td>"
						+"<td>"+ dataGV.tc4 + "</td>"
						+"<td>"+ dataGV.tc5 + "</td>"
						+"<td>"+ dataGV.tc6 + "</td>"
						+"<td>"+ dataGV.tc7 + "</td>"
						+"<td>"+ dataGV.tc8 + "</td>"
						+"<td>"+ dataGV.tc9 + "</td>"
						+"<td>"+ dataGV.tc10 + "</td>"
						+"<td>"+ dataGV.tc11 + "</td>"
						+"<td>"+ dataGV.tc12 + "</td>"
						+"<td>"+ dataGV.tc13 + "</td>"
						+"<td>"+ dataGV.tc14 + "</td>"
						+"<td>"+ dataGV.tc15 + "</td>"
						+"<td>"+ dataGV.xeploai + "</td>"
	                    +"</tr>";
					}
					noidungbang += "<tr>"
                    +"<td colspan='2' style='position: sticky;z-index: 5;left: -2px;background-color: #FFFAFA;'><b>"+ layDataDGGVToanTruong[i].tentochuyenmon + "</b></td>"
                    +"<td colspan='16'></td>"
                    +noidungbangChild
                    +"</tr>";
				}

				$("tbody#bodyXemExportKetQuaDanhGiaGv").append(noidungbang);
				$('#modalLoading').modal('hide');
				document.getElementById("cardXemExportKetQuaDanhGiaGv").style.display = "block";
			}
		});

	});

	//xem xuất kết quả đánh giá giáo viên tổ chuyên môn
	$('#selectNamToChuyenMonExport').on('change',function(){
		$('#modalLoading').modal('show');
		let valTCMXuat = $('#selectToChuyenMonExport').val();
		let valNamXuat = $(this).val();
		axios.get(`getXemExportDGGVToChuyenMon/${valTCMXuat}/${valNamXuat}`).then(res => {
			let layDataDGGVTCM = res.data;
			if(layDataDGGVTCM == '') {
				$('#modalLoading').modal('hide');
				Swal.fire(
                  'Thông báo',
                  'Không có kết quả đánh giá giáo viên',
                  'info'
                );
                document.getElementById('cardXemExportKetQuaDanhGiaGv').style.display = "none";
				return false;
			}else{
				$('#tieuDeThoiGian').text("(Năm: "+valNamXuat+")");

				$('#bodyXemExportKetQuaDanhGiaGv').empty();

				let noidungbang = '';

				for(let i=0;i<layDataDGGVTCM.length;i++){
					let noidungbangChild = '';
					let demDSGV = layDataDGGVTCM[i].dsgiaovien.length;
					for(let j=0;j<demDSGV;j++){
						let dataGV = layDataDGGVTCM[i].dsgiaovien[j];
						noidungbangChild += "<tr>"
						+"<td style='width: 100px;position: sticky;z-index: 5;left: 0px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ dataGV.stt + "</td>"
						+"<td style='width: 100px;position: sticky;z-index: 5;left: 100px;background-color: #FAFAD2; min-width: 100px;max-width: 100px;'>"+ dataGV.hovaten + "</td>"
						+"<td>"+ dataGV.tc1 + "</td>"
						+"<td>"+ dataGV.tc2 + "</td>"
						+"<td>"+ dataGV.tc3 + "</td>"
						+"<td>"+ dataGV.tc4 + "</td>"
						+"<td>"+ dataGV.tc5 + "</td>"
						+"<td>"+ dataGV.tc6 + "</td>"
						+"<td>"+ dataGV.tc7 + "</td>"
						+"<td>"+ dataGV.tc8 + "</td>"
						+"<td>"+ dataGV.tc9 + "</td>"
						+"<td>"+ dataGV.tc10 + "</td>"
						+"<td>"+ dataGV.tc11 + "</td>"
						+"<td>"+ dataGV.tc12 + "</td>"
						+"<td>"+ dataGV.tc13 + "</td>"
						+"<td>"+ dataGV.tc14 + "</td>"
						+"<td>"+ dataGV.tc15 + "</td>"
						+"<td>"+ dataGV.xeploai + "</td>"
	                    +"</tr>";
					}
					noidungbang += "<tr>"
                    +"<td colspan='2' style='position: sticky;z-index: 5;left: -2px;background-color: #FFFAFA;'><b>"+ layDataDGGVTCM[i].tentochuyenmon + "</b></td>"
                    +"<td colspan='16'></td>"
                    +noidungbangChild
                    +"</tr>";
				}

				$("tbody#bodyXemExportKetQuaDanhGiaGv").append(noidungbang);
				$('#modalLoading').modal('hide');
				document.getElementById("cardXemExportKetQuaDanhGiaGv").style.display = "block";
			}
		});

	});

}

function hienThiSelectToChuyenMon () {
	$('#selectLoaiExport').select2({ width: '50%'});
	$('#selectLoaiImport').select2({ width: '50%'});
	$('#selectToChuyenMon').find('option').remove();
	$('#selectToChuyenMonXem').find('option').remove();
	$('#selectToChuyenMonExcel').find('option').remove();
	$('#selectToChuyenMonExport').find('option').remove();

	axios.get('getDsToChuyenMon').then(function(response) {
		let data = response.data;

		let selectToChuyenMon = document.getElementById('selectToChuyenMon');
		let selectToChuyenMonXem = document.getElementById('selectToChuyenMonXem');
		let selectToChuyenMonExcel = document.getElementById('selectToChuyenMonExcel');
		let selectToChuyenMonExport = document.getElementById('selectToChuyenMonExport');

		$('#selectToChuyenMon').append("<option value='' selected='' disabled=''></option>");
		$('#selectToChuyenMonXem').append("<option value='' selected='' disabled=''></option>");
		$('#selectToChuyenMonExcel').append("<option value='' selected='' disabled=''></option>");
		$('#selectToChuyenMonExport').append("<option value='' selected='' disabled=''></option>");

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

		for(let k= 0; k< data.length;k++){
			let option = document.createElement("option");
		    option.value = data[k].id;
		    option.text = data[k].tentocm;
		    selectToChuyenMonExcel.appendChild(option);
		}

		for(let m= 0; m< data.length;m++){
			let option = document.createElement("option");
		    option.value = data[m].id;
		    option.text = data[m].tentocm;
		    selectToChuyenMonExport.appendChild(option);
		}

	});
	
	$('#selectToChuyenMon').select2({ width: '50%'});
	$('#selectToChuyenMonXem').select2({ width: '50%'});
	$('#selectToChuyenMonExcel').select2({ width: '50%'});
	$('#selectToChuyenMonExport').select2({ width: '50%'});
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

    $('#selectNamToanTruongExport').datepicker({
        format: "yyyy",
        orientation: "bottom",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "vi",
    });

    $('#selectNamToChuyenMonExport').datepicker({
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
    let valSelectTCMVir = $('#toChuyenMonVirtual').val();
    let valSelectNamDGVir = $('#namDanhGiaVirtual').val();
    $('#selectToChuyenMon').val(valSelectTCMVir).trigger('change');
    $('#selectNam').val(valSelectNamDGVir).trigger('change');
}

jQuery(document).ready(function () {
	//modal đánh giá gv
    jQuery('#modalDanhGiaGv').on('hidden.bs.modal', function (e) {
        $('#inputMaGv').val('');
		$('#inputMaTruong').val('');
		$('#inputMaDGGV').val('');
		$('#chbxChuaDatAll').prop('checked',false);
		$('#chbxDatAll').prop('checked',false);
		$('#chbxKhaAll').prop('checked',false);
		$('#chbxTotAll').prop('checked',false);
		$('#tableDanhGiaGv>tbody').empty();
    });
    //modal xem đánh giá gv
    jQuery('#modalXemDanhGiaGv').on('hidden.bs.modal', function (e) {
		$('#tableDanhGiaGvXem>tbody').empty();
    });
    //modal check import 
    jQuery('#modalImportDGGVCheck').on('hidden.bs.modal', function (e) {
		$('.classChbxImportDGGVCheckAll').prop('checked',false);
		$('#tableImportDGGVCheck>tbody').empty();
		$('#btnCheckImportDGGV').attr("disabled", false);
		$('#btnLuuImportDGGV').attr("disabled", true);
    });
});

// function hoanThanhDanhGia () {
// 	let chbxSelect = document.querySelectorAll('.classChbxSelect');
// 	let arrChbx = [];
// 	chbxSelect.forEach(function(Item,key){
// 		if(chbxSelect[key].checked == true){
// 			let maTChuyenMon= chbxSelect[key].dataset.matochuyenmon;
//             let maGVien = chbxSelect[key].dataset.magiaovien;
//             let maTrg = chbxSelect[key].dataset.matruong;
//             let namDGia = chbxSelect[key].dataset.namdanhgia;
// 			arrChbx.push({matochuyenmon: maTChuyenMon, magiaovien: maGVien, matruong: maTrg, namdanhgia: namDGia});
// 		}
// 	});
// 	let demArrChbx = arrChbx.length;
// 	if(demArrChbx == 0){
// 		Swal.fire(
// 		  'Thông báo',
// 		  'Vui lòng chọn giáo viên đã đánh giá',
// 		  'info'
// 		);
// 		return false;
// 	}else{
// 		Swal.fire({
//             title: 'Cảnh báo?',
//             text: "Bạn có muốn hoàn thành đánh giá cho những giáo viên đã chọn",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'OK'
//         }).then((result) => {
//         	if (result.value) {
//         		$('#modalLoading').modal('show');
//         		axios.post('addKetQuaDanhGiaGv', {
// 		    		arrChbx: arrChbx
// 				}).then(function(response) {
// 					let data = response.data;
// 					if(data == 1){
// 						$('#modalLoading').modal('hide');
// 						Swal.fire({
// 							title: 'Hoàn thành đánh giá',
// 							text: 'Đã lưu thành công',
// 							icon: 'success',
// 							confirmButtonText: 'OK'
// 						});
// 						refresh(); 
// 					}
// 				});
//         	}
//         });
// 	}

// }

