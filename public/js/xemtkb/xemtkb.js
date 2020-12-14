async function loadDataKhoiGvLop() {
    let result = await axios.get("getdskhoigvlop").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataPhong() {
    let result = await axios.get("getlistphong").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataLopTruong() {
    let result = await axios.get("getdslt").then(res => {
        return res.data;
    });
    return result;
}



//biến toàn cục
var	datakgl,
	datadsphong, 
	layDataLopTruong,
	databuoithu,
	databuoi,
	datatiet;

//

function initControl() {

}

async function initData() {
	//khối giáo viên lớp
	datakgl = await loadDataKhoiGvLop();
	//danh sách phòng
	datadsphong = await loadDataPhong();
	//lớp từ trường
	layDataLopTruong = await loadDataLopTruong();

	databuoithu = [
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

	databuoi = [
		{
			"mabuoi":0,
			"tenbuoi":"Sáng"
		},{
			"mabuoi":1,
			"tenbuoi":"Chiều"
		},
	];

	datatiet = [
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

	loadDatePicker();
	hienThiSelectGv();
	hienThiSelectKhoi();
	hienThiSelectPhong();
	loadbanggiaovien();
	hienThiDsThoiGianCoTkb();
}

function initEvent() {

	$('.httkbs').prop('disabled', true);
	$('.httkbc').prop('disabled', true);
	$('.httkbsc').prop('disabled', true);

	//khối change hiển thị lớp
	$('#idselectkhoi').on('change',function(){
		var selectListLop = document.getElementById('idselectlop');
		var datadslop = datakgl[0].danhsachlop;
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

	//thời khoá biểu trường
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

		axios.get(`gettkbtruong/${tuan}/${thang}/${nam}`).then(restkbtruong => {

			let layDataTkbTruong = restkbtruong.data;

	        //sáng
			layDataTkbTruong.forEach(function(iTem1){
				let dataNam = iTem1.dsnam;
				dataNam.forEach(function(iTem2){
					let dataThang = iTem2.dsthang;
					dataThang.forEach(function(iTem3){
						let dataTuan = iTem3.dstuan;
						dataTuan.forEach(function(iTem4){
							layDataLopTruong.forEach(function(iTemLopTruong){
								var datalop = iTemLopTruong.dslop;
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

								var dsbuoithu = iTem4.dsbuoithu;

						  		var noidungbang = "";

						  		
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

							});
						});
					});
				});
			});

			//chiều
			layDataTkbTruong.forEach(function(iTem1){
				let dataNam = iTem1.dsnam;
				dataNam.forEach(function(iTem2){
					let dataThang = iTem2.dsthang;
					dataThang.forEach(function(iTem3){
						let dataTuan = iTem3.dstuan;
						dataTuan.forEach(function(iTem4){
							layDataLopTruong.forEach(function(iTemLopTruong){
								var datalop = iTemLopTruong.dslop;
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

								var dsbuoithu = iTem4.dsbuoithu;

						  		var noidungbang = "";

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

							});
						});
					});
				});
			});

			//sáng, chiều
			layDataTkbTruong.forEach(function(iTem1){
				let dataNam = iTem1.dsnam;
				dataNam.forEach(function(iTem2){
					let dataThang = iTem2.dsthang;
					dataThang.forEach(function(iTem3){
						let dataTuan = iTem3.dstuan;
						dataTuan.forEach(function(iTem4){
							layDataLopTruong.forEach(function(iTemLopTruong){
								var datalop = iTemLopTruong.dslop;
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

								var dsbuoithu = iTem4.dsbuoithu;

						  		var noidungbang = "";

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

							});
						});
					});
				});
			});

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
	
	//thời khoá biểu giáo viên
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
	  
	    var idtruonggv = $('#idtruonggv').val();
	    var idgv = $('#idselectgv').val();
	    var text = $('#idselectgv option:selected').text();
	    $('#idtengv').text(text);

	    $('#phanthantablegiaovien').empty();

		axios.get(`gettkbgv/${tuan}/${thang}/${nam}/${idgv}`).then(restkbgv => {

			let layDataTkbGv = restkbgv.data;

		    layDataTkbGv.forEach(function(iTem1){
		        let dataGv = iTem1.dsgiaovien;
		        dataGv.forEach(function(iTem2){
		            let dataNam = iTem2.dsnam;
		           	dataNam.forEach(function(iTem3){
		                let dataThang = iTem3.dsthang;
		                dataThang.forEach(function(iTem4){
		                    let dataTuan = iTem4.dstuan;
		                    dataTuan.forEach(function(iTem5){

		                        var phanthantablegiaovien = document.getElementById("phanthantablegiaovien");

								var dsbuoi = iTem5.dsbuoi;

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

		                    });
		                });
		            });
		                 
		        });
		        
		    });

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

	//thời khoá biểu lớp
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

		axios.get(`gettkblop/${tuan}/${thang}/${nam}/${idlop}`).then(restkblop => {

			let layDataTkbLop = restkblop.data;

	  		layDataTkbLop.forEach(function(iTem1){
		        let dataLop = iTem1.dslop;
		        dataLop.forEach(function(iTem2){
		            let dataNam = iTem2.dsnam;
		           	dataNam.forEach(function(iTem3){
		                let dataThang = iTem3.dsthang;
		                dataThang.forEach(function(iTem4){
		                    let dataTuan = iTem4.dstuan;
		                    dataTuan.forEach(function(iTem5){
	                            var phanthantablelop = document.getElementById("phanthantablelop");

								var dsbuoi = iTem5.dsbuoi;

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

	                        });
	                    });
	                });
	                
	                
	            });
	            
	        });

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

	//thời khoá biểu phòng
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

		axios.get(`gettkbphong/${tuan}/${thang}/${nam}/${idphong}`).then(restkbphong => {

			let layDataTkbPhong = restkbphong.data;

	  		layDataTkbPhong.forEach(function(iTem1){
		        let dataPhong= iTem1.dsphong;
		        dataPhong.forEach(function(iTem2){
		            let dataNam = iTem2.dsnam;
		           	dataNam.forEach(function(iTem3){
		                let dataThang = iTem3.dsthang;
		                dataThang.forEach(function(iTem4){
		                    let dataTuan = iTem4.dstuan;
		                    dataTuan.forEach(function(iTem5){
	                            var phanthantablelop = document.getElementById("phanthantablephong");

								var dsbuoi = iTem5.dsbuoi;

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

	                        });
	                    });
	                });
	                                
	            });
	            
	        });

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
	
	//giáo viên nghỉ
	$('#selecttuangiaoviennghi').on('change',function(){

		let valdateThang = $('#datepickerthangtuangiaoviennghi').val();

        if(valdateThang == ''){
            alert('Vui lòng chọn tháng');
            $(this).val('none');
            return;
        }

        const thangnamtuan = $('#datepickerthangtuangiaoviennghi').val();
        const date = moment(thangnamtuan, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');

        let tuan = $(this).val();

        if (tuan != '' && thangnamtuan != '') {
            $('#idthangtuangiaoviennghi').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
        } else {
            $('#idthangtuangiaoviennghi').text('');
        }

		$('#phanthantablegiaoviennghi').empty();

		axios.get(`getgiaoviennghi/${tuan}/${thang}/${nam}`).then(resgvnghi => {

			let layDataGvNghi = resgvnghi.data;

	  		layDataGvNghi.forEach(function(iTem1){
	            let dataNam = iTem1.dsnam;
	            dataNam.forEach(function(iTem2){
	                let dataThang = iTem2.dsthang;
	               	dataThang.forEach(function(iTem3){
	                    let dataTuan = iTem3.dstuan;
	                    dataTuan.forEach(function(iTem4){
	                        var dsbuoi = iTem4.dsbuoi;

							var noidungbang = "";
					        for (let i = 0; i < databuoi.length; i++) {
					            var cotrong = '';
							  	var theadthu = document.querySelectorAll('#tablexemgiaoviennghi thead tr .classthugiaoviennghi');
		                    	for(var x=0;x<theadthu.length;x++){
		                    		var mathu = theadthu[x].id;
						            cotrong += "<td data-mabuoi= "+databuoi[i].mabuoi+" data-mathu="+mathu+" class='classoronggiaoviennghi'></td>";
							  	}
			                    	
			                    noidungbang += "<tr>"
			                    +"<td class='sticky-col first-col' style='color: red;position: sticky;background-color: #FAFAD2;z-index: 5;left: 0px;width: 100px;min-width: 100px;max-width: 100px;'>" + databuoi[i].tenbuoi + "</td>"
			                    +cotrong
			                    +"</tr>";				      
					        }

					        $("tbody#phanthantablegiaoviennghi").append(noidungbang);

					        var tbodycotrong = document.querySelectorAll('#tablexemgiaoviennghi tbody tr td.classoronggiaoviennghi');

					        for(let i=0;i<dsbuoi.length;i++){
					        	var demthu = dsbuoi[i].dsthu.length;
				        		for(let j=0;j<demthu;j++){
				        			var demgv = dsbuoi[i].dsthu[j].dsgiaovien.length;
				        			for(let k=0;k<tbodycotrong.length;k++){
				        				var mabuoi =tbodycotrong[k].dataset.mabuoi; 
				        				var mathu = tbodycotrong[k].dataset.mathu;
				        				if(dsbuoi[i].mabuoi == mabuoi && dsbuoi[i].dsthu[j].mathu == mathu){
				        					var dataBang = '';
				        					for(let m=0;m<demgv;m++){
				        						dataBang += "<span style='white-space: nowrap;' data-magiaovien = "+dsbuoi[i].dsthu[j].dsgiaovien[m].magiaovien+">"+dsbuoi[i].dsthu[j].dsgiaovien[m].hovaten+"</span><br/>";
				        					}
				        					tbodycotrong[k].innerHTML = dataBang;

				        				}
				        			}
				        		}
					        }
					        document.getElementById("cardxepgiaoviennghi").style.display = "block";

	                    });
	                });
	            });
	            
	        });

	        var tbodygvnghi = $("#tablexemgiaoviennghi tbody#phanthantablegiaoviennghi");
			if(tbodygvnghi.children().length == 0){
				Swal.fire(
				  'Thông báo',
				  'Không giáo viên nghỉ trong thời gian này',
				  'info'
				)
				document.getElementById("cardxepgiaoviennghi").style.display = "none";
			}

		});

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

    $('#datepickerthangtuangiaoviennghi').on('change',function(){
    	$('#selecttuangiaoviennghi').val('none');
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

	$("#xemgiaoviennghi").change(function () {
		$('#idselectgv').val('none').trigger('change.select2');
		$('#datepickerthangtuantruong').val('');
    	$('#selecttuantruong').val('none');
    	$('#datepickerthangtuangv').val('');
    	$('#selecttuangv').val('none');
    	$('#datepickerthangtuanlop').val('');
    	$('#selecttuanlop').val('none');
		$('#idselectphong').val('none').trigger('change.select2');
		$('#datepickerthangtuangiaoviennghi').val('');
		$('#selecttuangiaoviennghi').val('none');
		var tbodymaugv = $("#tablemaugiaovien tbody#banggiaovien");
		if(tbodymaugv.children().length == 0){
			document.getElementById("cardmaugiaovien").style.display = "none";
		}else{
			document.getElementById("cardmaugiaovien").style.display = "block";
		}
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

	$('#btnDSCoGvNghi').on('click',function(){
		let tableDsCoGvNghi = $('#tableDsCoGvNghi').dataTable();
        
        let dataDsCoGvNghi = tableDsCoGvNghi.fnGetData();

		if (dataDsCoGvNghi.length == 0) {
		    Swal.fire(
			  'Thông báo',
			  'Không có thời gian nào có giáo viên nghỉ',
			  'info'
			);
			return false;
		} else{
			$('#modalDsCoGvNghi').modal('show');
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

	//xử lý click thời gian có tkb phòng

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

	//xử lý click thời gian có giáo viên nghỉ

	$("#tableDsCoGvNghi tbody").on("click", ".classButtonGvNghi", function() {
	    let tuan = $(this).data('tuan');
	    let thang = $(this).data('thang');
	    let nam = $(this).data('nam');
	    let thangNam = thang+"/"+nam;
	    $('#datepickerthangtuangiaoviennghi').val(thangNam).trigger('change');
	    $('#selecttuangiaoviennghi').val(tuan).trigger('change');
	    $('#modalDsCoGvNghi').modal('hide');
	});

	//tìm kiếm giáo viên bí danh
	var timkiemBidanh = document.getElementById("timkiemBidanh");

	timkiemBidanh.oninput = function (e) {
        Search("tdBidanh", timkiemBidanh);
    };
	
}

function loadDatePicker() {

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

    $('#datepickerthangtuangiaoviennghi').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

}

function hienThiSelectGv() {
	var datadsgv = datakgl[0].danhsachgv;
	var selectListGv = document.getElementById('idselectgv');
	$('#idselectgv').append("<option value='none' selected='' disabled=''></option>");
	for(var i= 0; i< datadsgv.length;i++){
		var option = document.createElement("option");
	    option.value = datadsgv[i].id;
	    option.text = datadsgv[i].hovaten;
	    selectListGv.appendChild(option);
	}
	$('#idselectgv').select2({ width: '50%'});
}


function hienThiDsThoiGianCoTkb() {

	let tableDsCoTKBTruong = $('#tableDsCoTKBTruong').DataTable();
	let tableDsCoTKBGv = $('#tableDsCoTKBGv').DataTable();
	let tableDsCoTKBLop = $('#tableDsCoTKBLop').DataTable();
	let tableDsCoTKBPhong = $('#tableDsCoTKBPhong').DataTable();
	let tableDsCoGvNghi = $('#tableDsCoGvNghi').DataTable();

	tableDsCoTKBTruong.destroy();
	tableDsCoTKBGv.destroy();
	tableDsCoTKBLop.destroy();
	tableDsCoTKBPhong.destroy();
	tableDsCoGvNghi.destroy();

	$('#bodyDSCoTKBTruong').empty();
	$('#bodyDSCoTKBGv').empty();
	$('#bodyDSCoTKBLop').empty();
	$('#bodyDSCoTKBPhong').empty();
	$('#bodyDSCoGvNghi').empty();
	//
	let sttTruong = 0;
	let sttGv = 0;
	let sttLop = 0;
	let sttPhong = 0;
	let sttGvNghi = 0;

	//ds thời gian có tkb trường
	axios.get("getthoigiancotkb").then(res=> {

		let layData= res.data;

		layData.forEach(function(iTem1){
			let dataThang = iTem1.dsthang;
			dataThang.forEach(function(iTem2){
				let dataTuan = iTem2.dstuan;
				dataTuan.forEach(function(iTem3){

					let noidungbang = "";

					sttTruong++;

					noidungbang += "<tr>"
					+"<td>"+ sttTruong + "</td>"
					+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
					+"<td><button type='button' class='btn btn-primary btn-sm classButtonTruong' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam +"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
					+"</tr>";

					$("tbody#bodyDSCoTKBTruong").append(noidungbang);
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

		layData.forEach(function(iTem1){
			let dataThang = iTem1.dsthang;
			dataThang.forEach(function(iTem2){
				let dataTuan = iTem2.dstuan;
				dataTuan.forEach(function(iTem3){

					let noidungbang = "";

					sttGv++;

					noidungbang += "<tr>"
					+"<td>"+ sttGv + "</td>"
					+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
					+"<td><button type='button' class='btn btn-primary btn-sm classButtonGv' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam +"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
					+"</tr>";

					$("tbody#bodyDSCoTKBGv").append(noidungbang);
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

		layData.forEach(function(iTem1){
			let dataThang = iTem1.dsthang;
			dataThang.forEach(function(iTem2){
				let dataTuan = iTem2.dstuan;
				dataTuan.forEach(function(iTem3){
					
					let noidungbang = "";

					sttLop++;

					noidungbang += "<tr>"
					+"<td>"+ sttLop + "</td>"
					+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
					+"<td><button type='button' class='btn btn-primary btn-sm classButtonLop' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam +"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
					+"</tr>";

					$("tbody#bodyDSCoTKBLop").append(noidungbang);
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
		layData.forEach(function(iTem1){
			let dataThang = iTem1.dsthang;
			dataThang.forEach(function(iTem2){
				let dataTuan = iTem2.dstuan;
				dataTuan.forEach(function(iTem3){
					
					let noidungbang = "";

					sttPhong++;

					noidungbang += "<tr>"
					+"<td>"+ sttPhong + "</td>"
					+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
					+"<td><button type='button' class='btn btn-primary btn-sm classButtonPhong' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam +"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
					+"</tr>";

					$("tbody#bodyDSCoTKBPhong").append(noidungbang);
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

		//ds thời gian có giáo viên nghỉ
		layData.forEach(function(iTem1){
			let dataThang = iTem1.dsthang;
			dataThang.forEach(function(iTem2){
				let dataTuan = iTem2.dstuan;
				dataTuan.forEach(function(iTem3){
					
					let noidungbang = "";

					sttGvNghi++;

					noidungbang += "<tr>"
					+"<td>"+ sttGvNghi + "</td>"
					+"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
					+"<td><button type='button' class='btn btn-primary btn-sm classButtonGvNghi' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam +"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
					+"</tr>";

					$("tbody#bodyDSCoGvNghi").append(noidungbang);
				});
			});
		});

		$('#tableDsCoGvNghi').DataTable({
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

function hienThiSelectKhoi() {
	var datadskhoi = datakgl[0].danhsachkhoihoc;
	var selectListKhoi = document.getElementById('idselectkhoi');
	$('#idselectkhoi').append("<option value='none' selected='' disabled=''</option>");
	for(var i= 0; i< datadskhoi.length;i++){
		var option = document.createElement("option");
	    // option.value = datadskhoi[i].id;
	    option.value = datadskhoi[i].tenkhoi;
	    option.text = "Khối "+datadskhoi[i].tenkhoi;
	    selectListKhoi.appendChild(option);
	}
	$('#idselectkhoi').select2({ width: '50%'});
	$('#idselectlop').select2({ width: '50%'});
}

function hienThiSelectPhong() {
	var selectListPhong = document.getElementById('idselectphong');
	$('#idselectphong').append("<option value='none' selected='' disabled=''></option>");
	for(var i= 0; i< datadsphong.length;i++){
		var option = document.createElement("option");
	    option.value = datadsphong[i].id;
	    option.text = datadsphong[i].tenphong;
	    selectListPhong.appendChild(option);
	}
	$('#idselectphong').select2({ width: '50%'});
}

function loadbanggiaovien(){
	$('#banggiaovien').empty();
	// var idtruong = matruong;
	for(var i=0;i<datakgl.length;i++){
		// if(idtruong == data[i].matruong){
		var dsgv = datakgl[i].danhsachgv;
		var banggiaovien  = document.getElementById("banggiaovien");
		var demdsgv = dsgv.length;

        for (var j = 0; j < demdsgv; j++) {
            tr = document.createElement("tr");
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

		// }
	}

}

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

	//giáo viên nghỉ
	var tbodycotronggiaoviennghi = document.querySelectorAll('#tablexemgiaoviennghi tbody tr td.classoronggiaoviennghi span');
	var buttonmagiaovien = tbodybangmauchon[0].dataset.magiaovien;
	var laymau = tbodybangmauchon[0].style['background-color'];
	for(var k =0;k<tbodycotronggiaoviennghi.length;k++){
	var magiaovien =tbodycotronggiaoviennghi[k].dataset.magiaovien; 
		if(magiaovien == buttonmagiaovien){
			tbodycotronggiaoviennghi[k].style.backgroundColor = laymau;
			tbodycotronggiaoviennghi[k].style.color = "white";
		}else{
			tbodycotronggiaoviennghi[k].style.backgroundColor = '';
			tbodycotronggiaoviennghi[k].style.color = '';
		}
	}
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

	initControl();
	initEvent();
	initData();

    
}