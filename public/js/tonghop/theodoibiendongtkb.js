var layDataDsTruong,
    databuoithu,
    databuoi,
    datatiet,
    thu;

async function loadDataDsTruong() {
    let result = await axios.get("getdstruong").then(res => {
        return res.data;
    });
    return result;
}

function initControl() {

}

function initEvent() {

    //thời khoá biểu gv theo tuần
    $('#selecttuan').on('change', function() {
        let valdateThang = $('#datepickerthangtuan').val();
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
        //đếm bảng tồn tại trong div
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }

        //xoá pagination gv
        let dem = $('body').find('#divResults ~ div').length;
        if(dem != 0){
            $('body').find('#divResults ~ div').remove();
        }

        const thangnamtuan = $('#datepickerthangtuan').val();
        const date = moment(thangnamtuan, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');

        let tuan = $(this).val();

        if (tuan != '' && thangnamtuan != '') {
            $('#idthangtuan').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
        } else {
            $('#idthangtuan').text('');
        }
      
        var idtruonggv = $('#idtruonggv').val();
        var idgv = $('#idgv').val();

        axios.get(`getthoikhoabieugv/${idtruonggv}/${tuan}/${thang}/${nam}/${idgv}`).then(restkbgv => {
            let layDataTkbGv = restkbgv.data;

            // $('#phanthantablegiaovien').empty();
            layDataTkbGv.forEach(function(iTem1){
                let dataGv = iTem1.dsgiaovien;
                dataGv.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-12");
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkbgiaovien"+key5+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);

                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablegiaovien"+key5+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taobang);

                                $('#divResults').append(taodiv);
                                

                                var dsbuoi = iTem5.dsbuoi;
                                
                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+key5+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkbgiaovien+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronggiaovien'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;'>"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablegiaovien'+key5).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+key5;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkbgiaovien'] tbody tr td.classoronggiaovien");

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
                    
            if($('#divResults').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkbgiaovien").style.display = "none";
            }

        });
        
    });
    
    // thời khoá biểu gv theo tháng
    $('#datepickerthang input').on('change', function() {
        let valSelectgv = $('#idselectgv').val();
        if(valSelectgv == null){
            alert('Vui lòng chọn giáo viên');
            $(this).val('');
            return;
        }
        //đếm bảng tồn tại trong div
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }

        //xoá pagination gv
        let dem = $('body').find('#divResults ~ div').length;
        if(dem != 0){
            $('body').find('#divResults ~ div').remove();
        }

        const thangnam = $(this).val();
        const date = moment(thangnam, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');
        
        var idtruonggv = $('#idtruonggv').val();
        var idgv = $('#idgv').val();

        // $('#phanthantablegiaovien').empty();
        axios.get(`getthoikhoabieugv/${idtruonggv}/${0}/${thang}/${nam}/${idgv}`).then(restkbgv => {
            let layDataTkbGv = restkbgv.data;

            // $('#phanthantablegiaovien').empty();
            layDataTkbGv.forEach(function(iTem1){
                let dataGv = iTem1.dsgiaovien;
                dataGv.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){

                                let tuan = iTem5.tuan;
                                // $('#idthangtuan').text("(Tháng: "+thangnamtuan+" - "+"Tuần: "+tuan+")");
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-6");
                                //tạo span                                   
                                let taospan = document.createElement("span");
                                taospan.setAttribute("style","color: #a12626; font-size: 15px;");
                                taospan.innerHTML = "Thời khoá biểu (Tháng: "+thangnam+" - "+"Tuần: "+tuan+")";
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkbgiaovien"+key5+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto; height: 90%;width: 100%;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);

                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablegiaovien"+key5+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);

                                // $('#divResults').append(taobang);
                                $('#divResults').append(taodiv);

                                var dsbuoi = iTem5.dsbuoi;

                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+key5+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkbgiaovien+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronggiaovien'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;' >"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablegiaovien'+key5).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+key5;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkbgiaovien'] tbody tr td.classoronggiaovien");

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
            
            if($('#divResults').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkbgiaovien").style.display = "none";
            }

            if (thang != '') {
                $('#idthang').text("(Tháng: " + thang+ "/"+nam+ ")");
            } else {
                $('#idthang').text('');
            }
        }); 
                
    });
    
    // thời khoá biểu gv theo năm
    $('#datepickernam input').on('change', function() {
        let valSelectgv = $('#idselectgv').val();
        if(valSelectgv == null){
            alert('Vui lòng chọn giáo viên');
            $(this).val('');
            return;
        }
        //đếm bảng tồn tại trong div
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        //xoá pagination gv
        let dem = $('body').find('#divResults ~ div').length;
        if(dem != 0){
            $('body').find('#divResults ~ div').remove();
        }
        // $('#paginationgv').children().remove();
        // $('#divResults').after('<div id="paginationgv"></div>').remove();

        const nam = $(this).val();
        
        var idtruonggv = $('#idtruonggv').val();
        var idgv = $('#idgv').val();

        // $('#phanthantablegiaovien').empty();
        axios.get(`getthoikhoabieugv/${idtruonggv}/${0}/${0}/${nam}/${idgv}`).then(restkbgv => {
            let layDataTkbGv = restkbgv.data;

            // $('#phanthantablegiaovien').empty();
            layDataTkbGv.forEach(function(iTem1){
                let dataGv = iTem1.dsgiaovien;
                dataGv.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){

                                let thangnam = iTem4.thang+"/"+iTem3.nam;
                                let tuan = iTem5.tuan;
                                let nam = iTem3.nam;
                                let thang = iTem4.thang;
                                let numbernamthangtuan = ""+nam+thang+tuan;
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-6");
                                taodiv.setAttribute("id","phantranggv");
                                //tạo span                                   
                                let taospan = document.createElement("span");
                                taospan.setAttribute("style","color: #a12626; font-size: 15px;");
                                taospan.innerHTML = "Thời khoá biểu (Tháng: "+thangnam+" - "+"Tuần: "+tuan+")";
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkbgiaovien"+numbernamthangtuan+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto; height: 90%;width: 100%;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);

                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablegiaovien"+numbernamthangtuan+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);

                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);
                            
                                $('#divResults').append(taodiv);
                                

                                var dsbuoi = iTem5.dsbuoi;

                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+numbernamthangtuan+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkbgiaovien+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronggiaovien'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;'>"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablegiaovien'+numbernamthangtuan).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+numbernamthangtuan;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkbgiaovien'] tbody tr td.classoronggiaovien");

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

            phantranggv();
                
            if($('#divResults').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkbgiaovien").style.display = "none";
            }

            if (nam != '') {
                $('#idnam').text("(Năm: " + nam + ")");
            } else {
                $('#idnam').text('');
            }
        }); 
        
    });
    
    // thời khoá biểu lớp theo tuần
    $('#selecttuanlop').on('change', function() {
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
        //đếm bảng tồn tại trong div
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }

        //xoá pagination lớp
        let dem = $('body').find('#divResultsLop ~ div').length;
        if(dem != 0){
            $('body').find('#divResultsLop ~ div').remove();
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

        var idtruonglop = $('#idtruonglop').val();
        var idlop = $('#idlop').val();

        axios.get(`getthoikhoabieulop/${idtruonglop}/${tuan}/${thang}/${nam}/${idlop}`).then(restkblop => {
            let layDataTkbLop = restkblop.data;

            // $('#phanthantablelop').empty();
            layDataTkbLop.forEach(function(iTem1){
                let dataLop = iTem1.dslop;
                dataLop.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-12");
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkblop"+key5+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);



                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablelop"+key5+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taobang);

                                $('#divResultsLop').append(taodiv);
                                

                                var dsbuoi = iTem5.dsbuoi;

                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkblop = 'tablexemtkblop'+key5+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkblop+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronglop'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;'>"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablelop'+key5).append(noidungbang);

                                var tablexemtkblop = 'tablexemtkblop'+key5;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkblop'] tbody tr td.classoronglop");

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

            if($('#divResultsLop').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkblop").style.display = "none";
            }
        });
            
    });
    
    // thời khoá biểu lớp theo tháng
    $('#datepickerthanglop input').on('change', function() {
        let valSelectkhoi = $('#idselectkhoi').val();
        let valSelectlop = $('#idselectlop').val();
        if(valSelectkhoi == null){
            alert('Vui lòng chọn khối');
            $(this).val('');
            return;
        }
        if(valSelectlop == ''){
            alert('Vui lòng chọn lớp');
            $(this).val('');
            return;
        }
        //đếm bảng tồn tại trong div
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        //xoá pagination lớp
        let dem = $('body').find('#divResultsLop ~ div').length;
        if(dem != 0){
            $('body').find('#divResultsLop ~ div').remove();
        }
        const thangnam = $(this).val();
        const date = moment(thangnam, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');
        
        var idtruonglop = $('#idtruonglop').val();
        var idlop = $('#idlop').val();

        axios.get(`getthoikhoabieulop/${idtruonglop}/${0}/${thang}/${nam}/${idlop}`).then(restkblop => {

            let layDataTkbLop = restkblop.data;

            // $('#phanthantablelop').empty();
            layDataTkbLop.forEach(function(iTem1){
                let dataLop = iTem1.dslop;
                dataLop.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){
                                let tuan = iTem5.tuan;
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-6");
                                //tạo span                                   
                                let taospan = document.createElement("span");
                                taospan.setAttribute("style","color: #a12626; font-size: 15px;");
                                taospan.innerHTML = "Thời khoá biểu (Tháng: "+thangnam+" - "+"Tuần: "+tuan+")";
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkblop"+key5+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto; height: 90%;width: 100%;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);

                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablelop"+key5+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);

                                $('#divResultsLop').append(taodiv);
                                

                                var dsbuoi = iTem5.dsbuoi;

                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkblop = 'tablexemtkblop'+key5+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkblop+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronglop'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;'>"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablelop'+key5).append(noidungbang);

                                var tablexemtkblop = 'tablexemtkblop'+key5;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkblop'] tbody tr td.classoronglop");

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
                    
            if($('#divResultsLop').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkblop").style.display = "none";
            }

            if (thang != '') {
                $('#idthanglop').text("(Tháng: " + thang +"/"+nam+ ")");
            } else {
                $('#idthanglop').text('');
            }

        });
        
    });
    
    // thời khoá biểu lớp theo năm
    $('#datepickernamlop input').on('change', function() {
        let valSelectkhoi = $('#idselectkhoi').val();
        let valSelectlop = $('#idselectlop').val();
        if(valSelectkhoi == null){
            alert('Vui lòng chọn khối');
            $(this).val('');
            return;
        }
        if(valSelectlop == ''){
            alert('Vui lòng chọn lớp');
            $(this).val('');
            return;
        }
        //đếm bảng tồn tại trong div
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        //xoá pagination lớp
        let dem = $('body').find('#divResultsLop ~ div').length;
        if(dem != 0){
            $('body').find('#divResultsLop ~ div').remove();
        }
        const nam = $(this).val();
        
        var idtruonglop = $('#idtruonglop').val();
        var idlop = $('#idlop').val();
        axios.get(`getthoikhoabieulop/${idtruonglop}/${0}/${0}/${nam}/${idlop}`).then(restkblop => {

            let layDataTkbLop = restkblop.data;

            // $('#phanthantablelop').empty();
            layDataTkbLop.forEach(function(iTem1){
                let dataLop = iTem1.dslop;
                dataLop.forEach(function(iTem2){
                    let dataNam = iTem2.dsnam;
                    dataNam.forEach(function(iTem3){
                        let dataThang = iTem3.dsthang;
                        dataThang.forEach(function(iTem4){
                            let dataTuan = iTem4.dstuan;
                            dataTuan.forEach(function(iTem5,key5){
                                let thangnam = iTem4.thang+"/"+iTem3.nam;
                                let tuan = iTem5.tuan;
                                let nam = iTem3.nam;
                                let thang = iTem4.thang;
                                let numbernamthangtuan = ""+nam+thang+tuan;
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-6");
                                taodiv.setAttribute("id","phantranglop");
                                //tạo span                                   
                                let taospan = document.createElement("span");
                                taospan.setAttribute("style","color: #a12626; font-size: 15px;");
                                taospan.innerHTML = "Thời khoá biểu (Tháng: "+thangnam+" - "+"Tuần: "+tuan+")";
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkblop"+numbernamthangtuan+"");
                                taobang.setAttribute("class","table table-striped table-bordered dataex-key-basic table-responsive display nowrap");
                                taobang.setAttribute("style","overflow-y: auto; height: 90%;width: 100%;border-collapse: separate;"); 
                                //tạo phần đầu
                                let taothead = document.createElement("thead");
                                taothead.setAttribute("style","background-color: #28386c;color: white;"); 

                                let taorow = document.createElement("tr");

                                let thbuoi = document.createElement("th");
                                thbuoi.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;");
                                thbuoi.appendChild(document.createTextNode('Buổi'));
                                taorow.appendChild(thbuoi);

                                let thtiet = document.createElement("th");
                                thtiet.setAttribute("style","position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100;min-width: 100;max-width: 100px;left: 100px;");
                                thtiet.appendChild(document.createTextNode('Tiết'));
                                taorow.appendChild(thtiet);

                                for(let z=0;z<thu.length;z++){
                                    let th = document.createElement("th");
                                    let tenthu = document.createTextNode(' ' + thu[z].tenthu);
                                    th.setAttribute("id",+thu[z].idthu);
                                    th.setAttribute("class","classthu")
                                    th.appendChild(tenthu);
                                    taorow.appendChild(th);
                                }

                                taothead.append(taorow);

                                //tạo phần thân
                                let taotbody = document.createElement("tbody");
                                taotbody.setAttribute("id","phanthantablelop"+numbernamthangtuan+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);

                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);
                            
                                $('#divResultsLop').append(taodiv);
                                

                                var dsbuoi = iTem5.dsbuoi;
                            
                                var noidungbang = "";
                                for (let i = 0; i < databuoi.length; i++) {
                                    var rowspan = 0;
                                    var demdatatiet = datatiet.length;
                                    rowspan += demdatatiet;
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkblop = 'tablexemtkblop'+numbernamthangtuan+'';
                                        var theadthu = document.querySelectorAll("table[id^="+tablexemtkblop+"] thead tr .classthu");
                                        for(var x=0;x<theadthu.length;x++){
                                            var mathu = theadthu[x].id;
                                            cotrong += "<td rowspan=" + 1 + " data-mabuoi= "+databuoi[i].mabuoi+" data-matiet="+datatiet[j].tiet+" data-mathu="+mathu+" class='classoronglop'></td>";
                                        }
                                            
                                        noidungbang += "<tr>"
                                        +"<td style='position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 100px;width: 100px;min-width: 100px;max-width: 100px;;left: 100px;'>"+ datatiet[j].tiet + "</td>"
                                        +cotrong
                                        +"</tr>";

                                    }
                                }

                                $('#phanthantablelop'+numbernamthangtuan).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkblop'+numbernamthangtuan;

                                var tbodycotrong = document.querySelectorAll("table[id^='tablexemtkblop'] tbody tr td.classoronglop");

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
            phantranglop(); 
                    
            if($('#divResultsLop').children('div').length == 0){
                Swal.fire(
                  'Thông báo',
                  'Không có thời khoá biểu nào phù hợp trong thời gian này',
                  'info'
                )
                document.getElementById("cardxeptkblop").style.display = "none";
            }
            if (nam != '') {
                $('#idnamlop').text("(Năm: " + nam + ")");
            } else {
                $('#idnamlop').text('');
            }

        });
        

    });

    $('#idselectgv').on('change',function(){
        var sel = document.getElementById("idselectgv");
        var text= sel.options[sel.selectedIndex].text;
        var idgv = sel.options[sel.selectedIndex].value;
        $('#idgv').val(idgv);
        // var idtruonggv = $('#idtruonggv').val();
        $('#idtengv').text(text);

        // đếm bảng tồn tại trong div
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        if($('#divResults').children('div').length == 0){
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }
        
        // tuần
        let timeGvThangNamTuan = $('#datepickerthangtuan').val();
        let timeGvTuan = $('#selecttuan').val();
        if(timeGvThangNamTuan != '' && timeGvTuan != null){
            $('#selecttuan').trigger('change');
        }
        //tháng
        let timeGvThangNamThang = $('#datepickerthang input').val();
        if(timeGvThangNamThang != ''){
            $('#datepickerthang input').trigger('change');
        }
        //năm
        let timeGvNam = $('#datepickernam input').val();
        if(timeGvNam != ''){
            $('#datepickernam input').trigger('change');
        }

        // $('#datepickerthangtuan').val('');
        // $('#selecttuan').val('none');
        // $('#datepickerthang input').val('');
        // $('#datepickernam input').val('');
        
    });

    $('#idselectlop').on('change',function(){

        var sel = document.getElementById("idselectlop");
        var text= sel.options[sel.selectedIndex].text;
        var idlop = sel.options[sel.selectedIndex].value;
        var idtruonglop = $('#idtruonglop').val();
        $('#idlop').val(idlop);
        $('#idtenlop').text(text);

        //đếm bảng tồn tại trong div
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        if($('#divResultsLop').children('div').length == 0){
            document.getElementById("cardxeptkblop").style.display = "none";
        }

        // tuần
        let timeLopThangNamTuan = $('#datepickerthangtuanlop').val();
        let timeLopTuan = $('#selecttuanlop').val();
        if(timeLopThangNamTuan != '' && timeLopTuan != null){
            $('#selecttuanlop').trigger('change');
        }
        //tháng
        let timeLopThangNamThang = $('#datepickerthanglop input').val();
        if(timeLopThangNamThang != ''){
            $('#datepickerthanglop input').trigger('change');
        }
        //năm
        let timeLopNam = $('#datepickernamlop input').val();
        if(timeLopNam != ''){
            $('#datepickernamlop input').trigger('change');
        }

        // $('#datepickerthanglop input').val('');
        // $('#datepickernamlop input').val('');
        // $('#datepickerthangtuanlop').val('');
        // $('#selecttuanlop').val('none');

    });

    $("#bangdstruong").on('show.bs.collapse', function() {
        document.getElementById("formxemtkb").style.display = "none";
        $('#idselectgv').find('option').remove();
        $('#idselectlop').find('option').remove();
        $('#idselectkhoi').find('option').remove();
        $('#xemtkbgiaovien').prop('checked', false);
        $('#xemtkblop').prop('checked', false);
        document.getElementById("cardselectgv").style.display = "none";
        document.getElementById("cardselectlop").style.display = "none";
        document.getElementById("cardxeptkbgiaovien").style.display = "none";
        document.getElementById("cardxeptkblop").style.display = "none";
        // $('#datepickertuantu').val('');
        // $('#datepickertuanden').val('');
        $('#datepickerthangtuan').val('');
        $('#datepickerthang input').val('');        
        $('#datepickernam input').val('');
        $('#datepickerthangtuanlop').val('');
        $('#datepickerthanglop input').val('');
        $('#datepickertuantulop').val('');
        $('#datepickertuandenlop').val('');
        $('#datepickernamlop input').val('');
        $('#iddatetimetuan').prop('checked', false);
        $('#iddatetimethang').prop('checked', false);
        $('#iddatetimenam').prop('checked', false);
        $('#iddatetimetuanlop').prop('checked', false);
        $('#iddatetimethanglop').prop('checked', false);
        $('#iddatetimenamlop').prop('checked', false);
        $('#selecttuan').val('none');
        $('#selecttuanlop').val('none');
        document.getElementById("divtuan").style.display = "none";
        document.getElementById("divthang").style.display = "none";
        document.getElementById("divnam").style.display = "none";
        document.getElementById("divtuanlop").style.display = "none";
        document.getElementById("divthanglop").style.display = "none";
        document.getElementById("divnamlop").style.display = "none";
        $('#idtruonggv').val('');
        $('#idtruonglop').val('');
        $('#idgv').val('');
        $('#idlop').val('');
        $('#idtengv').text('');
        $('#idtenlop').text('');
        //đếm bảng tồn tại trong div gv
        var dembangGV = $('#divResults').children('div').length;
        for(let m=0;m<dembangGV;m++){
            $('#divResults').children('div').remove();
        }

        //xoá pagination gv
        let demGV = $('body').find('#divResults ~ div').length;
        if(demGV != 0){
            $('body').find('#divResults ~ div').remove();
        }
        //đếm bảng tồn tại trong div
        var dembangLop = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembangLop;m++){
            $('#divResultsLop').children('div').remove();
        }

        //xoá pagination lớp
        let demLop = $('body').find('#divResultsLop ~ div').length;
        if(demLop != 0){
            $('body').find('#divResultsLop ~ div').remove();
        }

    });

    $("#xemtkblop").change(function () {

        $('#idselectgv').val('none').trigger('change.select2');
    });

    $("#xemtkbgiaovien").change(function () {

        $('#idselectkhoi').val('none').trigger('change.select2');
        $('#idselectlop').val('none').trigger('change.select2');
    });

    //giáo viên
    $('#datepickerthangtuan').on('change',function(){
        $('#selecttuan').val('none');
        // let valSelectgv = $('#idselectgv').val();
        // if(valSelectgv == null){
        //     alert('Vui lòng chọn giáo viên');
        //     $(this).val('');
        //     return;
        // }
    });

    //lớp
    $('#datepickerthangtuanlop').on('change',function(){
        $('#selecttuanlop').val('none');
        // let valSelectkhoi = $('#idselectkhoi').val();
        // let valSelectlop = $('#idselectlop').val();
        // if(valSelectkhoi == null){
        //     alert('Vui lòng chọn khối');
        //     $(this).val('');
        //     return;
        // }
        // if(valSelectlop == ''){
        //     alert('Vui lòng chọn lớp');
        //     $(this).val('');
        //     return;
        // }
    });

    // giáo viên
    $('#iddatetimetuan').on('change',function(){
        $('#datepickernam input').val('');
        $('#datepickerthang input').val('');
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        if($('#divResults').children('div').length == 0){
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }
    });

    $('#iddatetimethang').on('change',function(){
        $('#datepickernam input').val('');
        // $('#datepickertuantu').val('');
        // $('#datepickertuanden').val('');
        $('#datepickerthangtuan').val('');
        $('#selecttuan').val('none');
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        if($('#divResults').children('div').length == 0){
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }
    });

    $('#iddatetimenam').on('change',function(){
        $('#datepickerthang input').val('');
        // $('#datepickertuantu').val('');
        // $('#datepickertuanden').val('');
        $('#datepickerthangtuan').val('');
        $('#selecttuan').val('none');
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        if($('#divResults').children('div').length == 0){
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }
    });

    // lớp
    $('#iddatetimetuanlop').on('change',function(){
        $('#datepickernamlop input').val('');
        $('#datepickerthanglop input').val('');
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        if($('#divResultsLop').children('div').length == 0){
            document.getElementById("cardxeptkblop").style.display = "none";
        }
    });

    $('#iddatetimethanglop').on('change',function(){
        $('#datepickernamlop input').val('');
        // $('#datepickertuantulop').val('');
        // $('#datepickertuandenlop').val('');
        $('#datepickerthangtuanlop').val('');
        $('#selecttuanlop').val('none');
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        if($('#divResultsLop').children('div').length == 0){
            document.getElementById("cardxeptkblop").style.display = "none";
        }
    });

    $('#iddatetimenamlop').on('change',function(){
        $('#datepickerthanglop input').val('');
        // $('#datepickertuantulop').val('');
        // $('#datepickertuandenlop').val('');
        $('#datepickerthangtuanlop').val('');
        $('#selecttuanlop').val('none');
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        if($('#divResultsLop').children('div').length == 0){
            document.getElementById("cardxeptkblop").style.display = "none";
        }
    });

    $("#xemtkblop").change(function () {

        $('#idselectgv').val('none').trigger('change.select2');
        $('#datepickerthang input').val('');
        $('#datepickertuantu').val('');
        $('#datepickertuanden').val('');
        $('#datepickernam input').val('');
        $('#iddatetimetuan').prop('checked', false);
        $('#iddatetimethang').prop('checked', false);
        $('#iddatetimenam').prop('checked', false);
        document.getElementById("divtuan").style.display = "none";
        document.getElementById("divthang").style.display = "none";
        document.getElementById("divnam").style.display = "none";

    });

    $("#xemtkbgiaovien").change(function () {

        $('#idselectkhoi').val('none').trigger('change.select2');
        $('#idselectlop').val('none').trigger('change.select2');
        $('#datepickerthanglop input').val('');
        $('#datepickertuantulop').val('');
        $('#datepickertuandenlop').val('');
        $('#datepickernamlop input').val('');
        $('#iddatetimetuanlop').prop('checked', false);
        $('#iddatetimethanglop').prop('checked', false);
        $('#iddatetimenamlop').prop('checked', false);
        document.getElementById("divtuanlop").style.display = "none";
        document.getElementById("divthanglop").style.display = "none";
        document.getElementById("divnamlop").style.display = "none";
    });

    //button hiển thị ds có tkb

    //giáo viên

    $('#btnDSCoTKBGvTuan').on('click',function(){
        let tableDsCoTKBGvTuan = $('#tableDsCoTKBGvTuan').dataTable();
        
        let dataDsCoTKBGvTuan = tableDsCoTKBGvTuan.fnGetData();

        if (dataDsCoTKBGvTuan.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBGvTuan').modal('show');
        }
    });

    $('#btnDSCoTKBGvThang').on('click',function(){
        let tableDsCoTKBGvThang = $('#tableDsCoTKBGvThang').dataTable();
        
        let dataDsCoTKBGvThang = tableDsCoTKBGvThang.fnGetData();

        if (dataDsCoTKBGvThang.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBGvThang').modal('show');
        }
    });

    $('#btnDSCoTKBGvNam').on('click',function(){
        let tableDsCoTKBGvNam = $('#tableDsCoTKBGvNam').dataTable();
        
        let dataDsCoTKBGvNam = tableDsCoTKBGvNam.fnGetData();

        if (dataDsCoTKBGvNam.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBGvNam').modal('show');
        }
    });

    //lớp

    $('#btnDSCoTKBLopTuan').on('click',function(){
        let tableDsCoTKBLopTuan = $('#tableDsCoTKBLopTuan').dataTable();
        
        let dataDsCoTKBLopTuan = tableDsCoTKBLopTuan.fnGetData();

        if (dataDsCoTKBLopTuan.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBLopTuan').modal('show');
        }
    });

    $('#btnDSCoTKBLopThang').on('click',function(){
        let tableDsCoTKBLopThang = $('#tableDsCoTKBLopThang').dataTable();
        
        let dataDsCoTKBLopThang = tableDsCoTKBLopThang.fnGetData();

        if (dataDsCoTKBLopThang.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBLopThang').modal('show');
        }
    });

    $('#btnDSCoTKBLopNam').on('click',function(){
        let tableDsCoTKBLopNam = $('#tableDsCoTKBLopNam').dataTable();
        
        let dataDsCoTKBLopNam = tableDsCoTKBLopNam.fnGetData();

        if (dataDsCoTKBLopNam.length == 0) {
            Swal.fire(
              'Thông báo',
              'Không có thời gian nào có thời khoá biểu',
              'info'
            );
            return false;
        } else{
            $('#modalDsCoTKBLopNam').modal('show');
        }
    });

    //xử lý click thời gian có tkb gv theo tuần

    $("#tableDsCoTKBGvTuan tbody").on("click", ".classButtonGvTuan", function() {
        let tuan = $(this).data('tuan');
        let thang = $(this).data('thang');
        let nam = $(this).data('nam');
        let thangNam = thang+"/"+nam;
        let selectGv = $('#idselectgv').val();
        if(selectGv != null){
            $('#datepickerthangtuan').val(thangNam).trigger('change');
            $('#selecttuan').val(tuan).trigger('change');
        }else{
            $('#datepickerthangtuan').val(thangNam).trigger('change');
            $('#selecttuan').val(tuan);
        }
        
        $('#modalDsCoTKBGvTuan').modal('hide');
    });

    //xử lý click thời gian có tkb gv theo tháng

    $("#tableDsCoTKBGvThang tbody").on("click", ".classButtonGvThang", function() {
        let thang = $(this).data('thang');
        let nam = $(this).data('nam');
        let thangNam = thang+"/"+nam;
        let selectGv = $('#idselectgv').val();
        if(selectGv != null){
            $('#datepickerthang input').val(thangNam).trigger('change');
        }else{
            $('#datepickerthang input').val(thangNam);
        }
        
        $('#modalDsCoTKBGvThang').modal('hide');
    });

    //xử lý click thời gian có tkb gv theo năm

    $("#tableDsCoTKBGvNam tbody").on("click", ".classButtonGvNam", function() {
        let nam = $(this).data('nam');
        let selectGv = $('#idselectgv').val();
        if(selectGv != null){
            $('#datepickernam input').val(nam).trigger('change');
        }else{
            $('#datepickernam input').val(nam);
        }
        
        $('#modalDsCoTKBGvNam').modal('hide');
    });

    //xử lý click thời gian có tkb lớp theo tuần

    $("#tableDsCoTKBLopTuan tbody").on("click", ".classButtonLopTuan", function() {
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
        
        $('#modalDsCoTKBLopTuan').modal('hide');
    });

    //xử lý click thời gian có tkb lớp theo tháng

    $("#tableDsCoTKBLopThang tbody").on("click", ".classButtonLopThang", function() {
        let thang = $(this).data('thang');
        let nam = $(this).data('nam');
        let thangNam = thang+"/"+nam;
        let selectKhoi = $('#idselectkhoi').val();
        let selectLop = $('#idselectlop').val();
        if(selectKhoi != null && selectLop != null){
            $('#datepickerthanglop input').val(thangNam).trigger('change');
        }else{
            $('#datepickerthanglop input').val(thangNam);
        }
        
        $('#modalDsCoTKBLopThang').modal('hide');
    });

    //xử lý click thời gian có tkb lớp theo năm

    $("#tableDsCoTKBLopNam tbody").on("click", ".classButtonLopNam", function() {
        let nam = $(this).data('nam');
        let selectKhoi = $('#idselectkhoi').val();
        let selectLop = $('#idselectlop').val();
        if(selectKhoi != null && selectLop != null){
            $('#datepickernamlop input').val(nam).trigger('change');
        }else{
            $('#datepickernamlop input').val(nam);
        }
        
        $('#modalDsCoTKBLopNam').modal('hide');
    });
}

async function initData() {
    layDataDsTruong = await loadDataDsTruong();
    thu= [
        {
            'idthu':2,
            'tenthu':"Thứ 2"   
        },
        {
            'idthu':3,
            'tenthu':"Thứ 3"   
        },
        {
            'idthu':4,
            'tenthu':"Thứ 4"   
        },
        {
            'idthu':5,
            'tenthu':"Thứ 5"   
        },
        {
            'idthu':6,
            'tenthu':"Thứ 6"   
        },
        {
            'idthu':7,
            'tenthu':"Thứ 7"   
        },
    ];
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
    loaddanhsachtruong();
    loadDatePicker();
}

function loaddanhsachtruong() {

    var datas = layDataDsTruong.map(function(value, label) {
        let data = value;
        let stt = label + 1;
        var datas = Object.assign(data, {
            stt: stt.toString()
        });
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
        //  visible: true,
        //  applyFilter: "auto"
        // },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Tìm kiếm..."
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 30],
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
        }, {
            caption: "Cấp học",
            dataField: "caphoc",
            cellTemplate: function(element, info) {
                var dulieucap = info.value;
                var tencap;
                if (dulieucap == 1) {
                    tencap = "Tiểu học";
                } else if (dulieucap == 2) {
                    tencap = "Trung học cơ sở";
                } else if (dulieucap == 3) {
                    tencap = "Trung học phổ thông";
                }else if(dulieucap == 4){
                    tencap = "Tiểu học & Trung học cơ sở";
                }
                $("<div>")
                    .appendTo(element)
                    .text(tencap);
            }
        }, {
            caption: "Số lớp",
            dataField: "demdslop"
        }, {
            caption: "Số giáo viên",
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
                            $('#idtruonggv').val(options.data.matruong);
                            $('#idtruonglop').val(options.data.matruong);
                            var datadsgv = options.data.danhsachgv;
                            var datadslop = options.data.danhsachlop;
                            var datadskhoi = options.data.danhsachkhoihoc;
                            var matruong = options.data.matruong;
                            loaddanhsachgv(datadsgv);
                            loaddanhsachkhoilop(datadskhoi, datadslop);
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

function loadDatePicker() {
    //giáo viên
    $('#datepickerthangtuan').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $("#datepickerthang").datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $("#datepickernam").datepicker({
        format: "yyyy",
        orientation: "bottom",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "vi",
    });

    //lớp
    $('#datepickerthangtuanlop').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $("#datepickerthanglop").datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });
    
    $("#datepickernamlop").datepicker({
        format: "yyyy",
        orientation: "bottom",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "vi",
    });
}

function loaddanhsachgv(datadsgv) {
    var datadsgv = datadsgv;
    var selectListGv = document.getElementById('idselectgv');
    $('#idselectgv').append("<option value='none' selected='' disabled=''></option>");
    for (var i = 0; i < datadsgv.length; i++) {
        var option = document.createElement("option");
        option.value = datadsgv[i].id;
        option.text = datadsgv[i].hovaten;
        selectListGv.appendChild(option);
    }
    $('#idselectgv').select2({
        width: '50%'
    });

}

function loaddanhsachkhoilop(datadskhoi, datadslop) {
    var datadskhoi = datadskhoi;
    var datadslop = datadslop;
    var selectListKhoi = document.getElementById('idselectkhoi');
    var selectListLop = document.getElementById('idselectlop');
    $('#idselectkhoi').append("<option value='none' selected='' disabled=''</option>");
    for (var i = 0; i < datadskhoi.length; i++) {
        var option = document.createElement("option");
        // option.value = datadskhoi[i].id;
        option.value = datadskhoi[i].tenkhoi;
        let tenkhoi = "Khối "+datadskhoi[i].tenkhoi;
        option.text = tenkhoi;
        selectListKhoi.appendChild(option);
    }

    $('#idselectkhoi').on('change', function() {
        document.getElementById("cardxeptkblop").style.display = "none";
        $('#idselectlop').find('option').remove();
        // $('#datepickerthangtuanlop').val('');
        // $('#datepickerthanglop input').val('');
        // $('#datepickernamlop input').val('');
        // $('#selecttuanlop').val('none');
        $('#idselectlop').append("<option></option>");
        var datakhoi = $(this).val();
        for (var j = 0; j < datadslop.length; j++) {
            if (datadslop[j].khoi == datakhoi) {
                var optionLop = document.createElement("option");
                optionLop.value = datadslop[j].id;
                let tenlop = "Lớp "+datadslop[j].tenlop;
                optionLop.text = tenlop;
                selectListLop.appendChild(optionLop);
            }
        }
        // tuần
        let timeLopThangNamTuan = $('#datepickerthangtuanlop').val();
        let timeLopTuan = $('#selecttuanlop').val();
        if(timeLopThangNamTuan != '' && timeLopTuan != null){
            
        }else{
            $('#datepickerthangtuanlop').val('');
            $('#selecttuanlop').val('none');
        }
        //tháng
        let timeLopThangNamThang = $('#datepickerthanglop input').val();
        if(timeLopThangNamThang != ''){
            
        }else{
            $('#datepickerthanglop input').val('');
        }
        //năm
        let timeLopNam = $('#datepickernamlop input').val();
        if(timeLopNam != ''){
            
        }else{
            $('#datepickernamlop input').val('');
        }
    });
    $('#idselectkhoi').select2({
        width: '50%'
    });
    $('#idselectlop').select2({
        width: '50%'
    });

}

function phantranggv(){
    $('#divResults').after('<div id="paginationgv"></div>');
    var rowsShown = 4;
    var rowsTotal = $('#divResults').children('div').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#paginationgv').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#divResults div#phantranggv').hide();
    $('#divResults div#phantranggv').slice(0, rowsShown).show();
    $('#paginationgv a:first').addClass('active');
    $('#paginationgv a').bind('click', function(){

        $('#paginationgv a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#divResults div#phantranggv').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
}

function phantranglop(){
    $('#divResultsLop').after('<div id="paginationlop"></div>');
    var rowsShown = 4;
    var rowsTotal = $('#divResultsLop').children('div').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#paginationlop').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#divResultsLop div#phantranglop').hide();
    $('#divResultsLop div#phantranglop').slice(0, rowsShown).show();
    $('#paginationlop a:first').addClass('active');
    $('#paginationlop a').bind('click', function(){

        $('#paginationlop a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#divResultsLop div#phantranglop').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
}

// load danh sách có thời khoá biểu 

function loaddanhsachcothoikhoabieu(matruong) {
    // giáo viên
    let tableDsCoTKBGvTuan = $('#tableDsCoTKBGvTuan').DataTable();
    let tableDsCoTKBGvThang = $('#tableDsCoTKBGvThang').DataTable();
    let tableDsCoTKBGvNam = $('#tableDsCoTKBGvNam').DataTable();

    tableDsCoTKBGvTuan.destroy();
    tableDsCoTKBGvThang.destroy();
    tableDsCoTKBGvNam.destroy();

    $('#bodyDSCoTKBGvTuan').empty();
    $('#bodyDSCoTKBGvThang').empty();
    $('#bodyDSCoTKBGvNam').empty();

    // lớp
    let tableDsCoTKBLopTuan = $('#tableDsCoTKBLopTuan').DataTable();
    let tableDsCoTKBLopThang = $('#tableDsCoTKBLopThang').DataTable();
    let tableDsCoTKBLopNam = $('#tableDsCoTKBLopNam').DataTable();

    tableDsCoTKBLopTuan.destroy();
    tableDsCoTKBLopThang.destroy();
    tableDsCoTKBLopNam.destroy();

    $('#bodyDSCoTKBLopTuan').empty();
    $('#bodyDSCoTKBLopThang').empty();
    $('#bodyDSCoTKBLopNam').empty();

    //giáo viên
    let sttGvTuan = 0;
    let sttGvThang = 0;
    let sttGvNam = 0;

    //lớp
    let sttLopTuan = 0;
    let sttLopThang = 0;
    let sttLopNam = 0;

    axios.get(`getthoigiancotkbTH/${matruong}`).then(res=> {

        let layData= res.data;

        //ds thời gian có tkb giáo viên theo tuần
        layData.forEach(function(iTem1){
            let dataThang = iTem1.dsthang;
            dataThang.forEach(function(iTem2){
                let dataTuan = iTem2.dstuan;
                dataTuan.forEach(function(iTem3){

                    let noidungbang = "";

                    sttGvTuan++;

                    noidungbang += "<tr>"
                    +"<td>"+ sttGvTuan + "</td>"
                    +"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
                    +"<td><button type='button' class='btn btn-primary btn-sm classButtonGvTuan' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
                    +"</tr>";

                    $("tbody#bodyDSCoTKBGvTuan").append(noidungbang);
                });
            });
        });

        $('#tableDsCoTKBGvTuan').DataTable({
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

        //ds thời gian có tkb giáo viên theo tháng
        layData.forEach(function(iTem1){
            let dataThang = iTem1.dsthang;
            dataThang.forEach(function(iTem2){
                let noidungbang = "";

                sttGvThang++;

                noidungbang += "<tr>"
                +"<td>"+ sttGvThang + "</td>"
                +"<td>"+ "Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
                +"<td><button type='button' class='btn btn-primary btn-sm classButtonGvThang' data-thang= "+iTem2.thang+" data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
                +"</tr>";

                $("tbody#bodyDSCoTKBGvThang").append(noidungbang);
            });
        });

        $('#tableDsCoTKBGvThang').DataTable({
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

        //ds thời gian có tkb giáo viên theo năm
        layData.forEach(function(iTem1){
            let noidungbang = "";

            sttGvNam++;

            noidungbang += "<tr>"
            +"<td>"+ sttGvNam + "</td>"
            +"<td>"+ "Năm "+iTem1.nam + "</td>"
            +"<td><button type='button' class='btn btn-primary btn-sm classButtonGvNam' data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
            +"</tr>";

            $("tbody#bodyDSCoTKBGvNam").append(noidungbang);
        });

        $('#tableDsCoTKBGvNam').DataTable({
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

        //ds thời gian có tkb lớp theo tuần
        layData.forEach(function(iTem1){
            let dataThang = iTem1.dsthang;
            dataThang.forEach(function(iTem2){
                let dataTuan = iTem2.dstuan;
                dataTuan.forEach(function(iTem3){

                    let noidungbang = "";

                    sttLopTuan++;

                    noidungbang += "<tr>"
                    +"<td>"+ sttLopTuan + "</td>"
                    +"<td>"+ "Tuần "+iTem3.tuan+ "- Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
                    +"<td><button type='button' class='btn btn-primary btn-sm classButtonLopTuan' data-tuan= "+iTem3.tuan+" data-thang= "+iTem2.thang+" data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
                    +"</tr>";

                    $("tbody#bodyDSCoTKBLopTuan").append(noidungbang);
                });
            });
        });

        $('#tableDsCoTKBLopTuan').DataTable({
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

        //ds thời gian có tkb lớp theo tháng
        layData.forEach(function(iTem1){
            let dataThang = iTem1.dsthang;
            dataThang.forEach(function(iTem2){
                let noidungbang = "";

                sttLopThang++;

                noidungbang += "<tr>"
                +"<td>"+ sttLopThang + "</td>"
                +"<td>"+ "Tháng "+iTem2.thang+ "- Năm "+iTem1.nam + "</td>"
                +"<td><button type='button' class='btn btn-primary btn-sm classButtonLopThang' data-thang= "+iTem2.thang+" data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
                +"</tr>";

                $("tbody#bodyDSCoTKBLopThang").append(noidungbang);
            });
        });

        $('#tableDsCoTKBLopThang').DataTable({
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

        //ds thời gian có tkb lớp theo năm

        layData.forEach(function(iTem1){
            let noidungbang = "";

            sttLopNam++;

            noidungbang += "<tr>"
            +"<td>"+ sttLopNam + "</td>"
            +"<td>"+ "Năm "+iTem1.nam + "</td>"
            +"<td><button type='button' class='btn btn-primary btn-sm classButtonLopNam' data-nam="+iTem1.nam+"><i class='fa fa-check-circle-o' aria-hidden='true'></i></button></td>"
            +"</tr>";

            $("tbody#bodyDSCoTKBLopNam").append(noidungbang);
        });

        $('#tableDsCoTKBLopNam').DataTable({
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

window.onload = function() {
    initControl();
    initEvent();
    initData();
}