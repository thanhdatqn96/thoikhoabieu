var layDataDsTruong,
    layDataTkbGv,
    layDataTkbLop;

async function loadDataDsTruong() {
    let result = await axios.get("getdstruong").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataTkbGv() {
    let result = await axios.get("getthoikhoabieugvtime").then(res => {
        return res.data;
    });
    return result;
}

async function loadDataTkbLop() {
    let result = await axios.get("getthoikhoabieuloptime").then(res => {
        return res.data;
    });
    return result;
}

async function loaddanhsachtruong() {

    layDataDsTruong = await loadDataDsTruong();
    layDataTkbGv = await loadDataTkbGv();
    layDataTkbLop = await loadDataTkbLop();

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
        // {
        //     caption: "Số học sinh",
        //     dataField: "demdsgv"
        // }, 
        {
            fixed: true,
            fixedPosition: "right",
            caption: "",
            cellTemplate: function(container, options) {
                container.addClass("center");
                $("<div>")
                    .dxButton({
                        template: function(e) {
                            return $('<i class="fa fa-eye"></i>');
                        },
                        onClick: function(e) {
                            $("#bangdstruong").collapse('toggle');
                            $("#hieuungcongtru").addClass("ft-plus").removeClass("ft-minus");;
                            $("#idtentruong").text(options.data.tentruong);
                            $("#idtentruonggv").text(options.data.tentruong);
                            $("#idtentruonglop").text(options.data.tentruong);
                            $('#idtruonggv').val(options.data.matruong);
                            $('#idtruonglop').val(options.data.matruong);
                            var datadsgv = options.data.danhsachgv;
                            var datadslop = options.data.danhsachlop;
                            var datadskhoi = options.data.danhsachkhoihoc;
                            loaddanhsachgv(datadsgv);
                            loaddanhsachkhoilop(datadskhoi, datadslop);
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

    $('#idselectgv').on('change',function(){
        //đếm bảng tồn tại trong div
        var dembang = $('#divResults').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResults').children('div').remove();
        }
        if($('#divResults').children('div').length == 0){
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }
        $('#datepickerthangtuan').val('');
        $('#selecttuan').val('none');
        $('#datepickerthang input').val('');
        $('#datepickernam input').val('');
        var sel = document.getElementById("idselectgv");
        var text= sel.options[sel.selectedIndex].text;
        var idgv = sel.options[sel.selectedIndex].value;
        $('#idgv').val(idgv);
        // var idtruonggv = $('#idtruonggv').val();
        $('#idtengv').text(text);
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
        $('#datepickerthangtuanlop').val('');
        $('#datepickerthanglop input').val('');
        $('#datepickernamlop input').val('');
        $('#selecttuanlop').val('none');
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
    });
    $('#idselectkhoi').select2({
        width: '50%'
    });
    $('#idselectlop').select2({
        width: '50%'
    });

    $('#idselectlop').on('change',function(){
        //đếm bảng tồn tại trong div
        var dembang = $('#divResultsLop').children('div').length;
        for(let m=0;m<dembang;m++){
            $('#divResultsLop').children('div').remove();
        }
        if($('#divResultsLop').children('div').length == 0){
            document.getElementById("cardxeptkblop").style.display = "none";
        }
        $('#datepickerthanglop input').val('');
        $('#datepickernamlop input').val('');
        $('#datepickerthangtuanlop').val('');
        $('#selecttuanlop').val('none');
        var sel = document.getElementById("idselectlop");
        var text= sel.options[sel.selectedIndex].text;
        var idlop = sel.options[sel.selectedIndex].value;
        var idtruonglop = $('#idtruonglop').val();
        $('#idlop').val(idlop);
        $('#idtenlop').text(text);

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

window.onload = function() {

    loaddanhsachtruong();
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
        document.getElementById("divtuan").style.display = "none";
        document.getElementById("divthang").style.display = "none";
        document.getElementById("divnam").style.display = "none";
        document.getElementById("divtuanlop").style.display = "none";
        document.getElementById("divthanglop").style.display = "none";
        document.getElementById("divnamlop").style.display = "none";
    });

    $("#xemtkblop").change(function () {

        $('#idselectgv').val('none').trigger('change.select2');
    });

    $("#xemtkbgiaovien").change(function () {

        $('#idselectkhoi').val('none').trigger('change.select2');
        $('#idselectlop').val('none').trigger('change.select2');
    });

    //giáo viên
    $('#datepickerthangtuan').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $('#datepickerthangtuan').on('change',function(){
        $('#selecttuan').val('none');
        let valSelectgv = $('#idselectgv').val();
        if(valSelectgv == null){
            alert('Vui lòng chọn giáo viên');
            $(this).val('');
            return;
        }
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

        // $('#phanthantablegiaovien').empty();
        for(let i =0;i<layDataTkbGv.length;i++){
            let demdsgv = layDataTkbGv[i].dsgiaovien.length;
            for(let j=0;j<demdsgv;j++){
                let demnam = layDataTkbGv[i].dsgiaovien[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbGv[i].matruong == idtruonggv && layDataTkbGv[i].dsgiaovien[j].magiaovien == idgv && layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam == nam && layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].thang == thang && layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan[n].tuan == tuan){
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-12");
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkbgiaovien"+n+"");
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

                                var thu= [
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
                                taotbody.setAttribute("id","phanthantablegiaovien"+n+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taobang);

                                $('#divResults').append(taodiv);
                                

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
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+n+'';
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

                                $('#phanthantablegiaovien'+n).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+n;

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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        }
                
        if($('#divResults').children('div').length == 0){
            Swal.fire(
              'Thông báo',
              'Không có thời khoá biểu nào phù hợp trong thời gian này',
              'info'
            )
            document.getElementById("cardxeptkbgiaovien").style.display = "none";
        }

    });

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
        const thangnam = $(this).val();
        const date = moment(thangnam, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');
        
        var idtruonggv = $('#idtruonggv').val();
        var idgv = $('#idgv').val();

        // $('#phanthantablegiaovien').empty();
        for(let i =0;i<layDataTkbGv.length;i++){
            let demdsgv = layDataTkbGv[i].dsgiaovien.length;
            for(let j=0;j<demdsgv;j++){
                let demnam = layDataTkbGv[i].dsgiaovien[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbGv[i].matruong == idtruonggv && layDataTkbGv[i].dsgiaovien[j].magiaovien == idgv && layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam == nam && layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].thang == thang){
                                let tuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan[n].tuan;
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
                                taobang.setAttribute("id","tablexemtkbgiaovien"+n+"");
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

                                var thu= [
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
                                taotbody.setAttribute("id","phanthantablegiaovien"+n+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);

                                // $('#divResults').append(taobang);
                                $('#divResults').append(taodiv);

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
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+n+'';
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

                                $('#phanthantablegiaovien'+n).append(noidungbang);

                                var tablexemtkbgiaovien = 'tablexemtkbgiaovien'+n;

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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        } 
                
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
        for(let i =0;i<layDataTkbGv.length;i++){
            let demdsgv = layDataTkbGv[i].dsgiaovien.length;
            for(let j=0;j<demdsgv;j++){
                let demnam = layDataTkbGv[i].dsgiaovien[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbGv[i].matruong == idtruonggv && layDataTkbGv[i].dsgiaovien[j].magiaovien == idgv && layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam == nam ){
                                
                                let thangnam = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].thang+"/"+layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam;
                                let tuan = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].dstuan[n].tuan;
                                let nam = layDataTkbGv[i].dsgiaovien[j].dsnam[k].nam;
                                let thang = layDataTkbGv[i].dsgiaovien[j].dsnam[k].dsthang[m].thang;
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

                                var thu= [
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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        }   
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

    //lớp
    $('#datepickerthangtuanlop').datepicker({
        format: "mm/yyyy",
        orientation: "bottom",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true,
        language: "vi",
    });

    $('#datepickerthangtuanlop').on('change',function(){
        $('#selecttuanlop').val('none');
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

        // $('#phanthantablelop').empty();
        for(let i =0;i<layDataTkbLop.length;i++){
            let demdslop = layDataTkbLop[i].dslop.length;
            for(let j=0;j<demdslop;j++){
                let demnam = layDataTkbLop[i].dslop[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbLop[i].dslop[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbLop[i].matruong == idtruonglop && layDataTkbLop[i].dslop[j].malop == idlop && layDataTkbLop[i].dslop[j].dsnam[k].nam == nam && layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].thang == thang && layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan[n].tuan == tuan){
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-12");
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkblop"+n+"");
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

                                var thu= [
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
                                taotbody.setAttribute("id","phanthantablelop"+n+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taobang);

                                $('#divResultsLop').append(taodiv);
                                

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
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkblop = 'tablexemtkblop'+n+'';
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

                                $('#phanthantablelop'+n).append(noidungbang);

                                var tablexemtkblop = 'tablexemtkblop'+n;

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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        } 
                
        if($('#divResultsLop').children('div').length == 0){
            Swal.fire(
              'Thông báo',
              'Không có thời khoá biểu nào phù hợp trong thời gian này',
              'info'
            )
            document.getElementById("cardxeptkblop").style.display = "none";
        }

    });

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
        const thangnam = $(this).val();
        const date = moment(thangnam, 'MM/YYYY');
        const thang = date.format('M');
        const nam = date.format('YYYY');
        
        var idtruonglop = $('#idtruonglop').val();
        var idlop = $('#idlop').val();

        // $('#phanthantablelop').empty();
        for(let i =0;i<layDataTkbLop.length;i++){
            let demdslop = layDataTkbLop[i].dslop.length;
            for(let j=0;j<demdslop;j++){
                let demnam = layDataTkbLop[i].dslop[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbLop[i].dslop[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbLop[i].matruong == idtruonglop && layDataTkbLop[i].dslop[j].malop == idlop && layDataTkbLop[i].dslop[j].dsnam[k].nam == nam && layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].thang == thang){
                                let tuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan[n].tuan;
                                //tạo div
                                let taodiv = document.createElement("div");
                                taodiv.setAttribute("class","col-md-6");
                                //tạo span                                   
                                let taospan = document.createElement("span");
                                taospan.setAttribute("style","color: #a12626; font-size: 15px;");
                                taospan.innerHTML = "Thời khoá biểu (Tháng: "+thangnam+" - "+"Tuần: "+tuan+")";
                                //tạo bảng
                                let taobang = document.createElement("table");
                                taobang.setAttribute("id","tablexemtkblop"+n+"");
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

                                var thu= [
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
                                taotbody.setAttribute("id","phanthantablelop"+n+"");

                                taobang.appendChild(taothead);
                                taobang.appendChild(taotbody);
                                
                                taodiv.appendChild(taospan);
                                taodiv.appendChild(taobang);

                                $('#divResultsLop').append(taodiv);
                                

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
                                    noidungbang += "<tr><td style='color: red;position: sticky;position: -webkit-sticky;background-color: #FAFAD2;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;' rowspan=" + parseInt(1 + rowspan) + ">" + databuoi[i].tenbuoi + "</td></tr>";
                                    for (let j = 0; j < demdatatiet; j++) {

                                        var cotrong = '';
                                        var tablexemtkblop = 'tablexemtkblop'+n+'';
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

                                $('#phanthantablelop'+n).append(noidungbang);

                                var tablexemtkblop = 'tablexemtkblop'+n;

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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        }
                
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

        // $('#phanthantablelop').empty();
        for(let i =0;i<layDataTkbLop.length;i++){
            let demdslop = layDataTkbLop[i].dslop.length;
            for(let j=0;j<demdslop;j++){
                let demnam = layDataTkbLop[i].dslop[j].dsnam.length;
                for(let k=0;k<demnam;k++){
                    let demthang = layDataTkbLop[i].dslop[j].dsnam[k].dsthang.length;
                    for(let m=0;m<demthang;m++){
                        let demtuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan.length;
                        for(let n=0;n<demtuan;n++){
                            if(layDataTkbLop[i].matruong == idtruonglop && layDataTkbLop[i].dslop[j].malop == idlop && layDataTkbLop[i].dslop[j].dsnam[k].nam == nam ){
                                
                                let thangnam = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].thang+"/"+layDataTkbLop[i].dslop[j].dsnam[k].nam;
                                let tuan = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].dstuan[n].tuan;
                                let nam = layDataTkbLop[i].dslop[j].dsnam[k].nam;
                                let thang = layDataTkbLop[i].dslop[j].dsnam[k].dsthang[m].thang;
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

                                var thu= [
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
                                      
                            }

                        }
                    }
                }
                
                
            }
            
        }
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

}