async function loadDataDsTruong() {
    let result = await axios.get("getdstruong").then(res => {
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
var layDataDsTruong,
    layDataDsGiaoVien,
    layDataTieuChuanTieuChi;

//

window.onload = function () {
    $('#idselecttruong').select2({ width: '50%'});
    $('#idselecttruongToanTruong').select2({ width: '50%'});
    $('#idselecttruongToChuyenMon').select2({ width: '50%'});
    $('#selectToChuyenMonXem').select2({ width: '50%'});
    $('#selectToChuyenMonExport').select2({ width: '50%'});
    initControl();
    initData();
    initEvent();
};

function initControl () {
    
}

async function initData () {
    layDataDsTruong = await loadDataDsTruong();
    // layDataDsGiaoVien = await loadDataDsGiaoVien();
    layDataTieuChuanTieuChi = await loadDataTieuChuanTieuChi();
    // layDataDanhGiaGv = await loadDataDanhGiaGv();
    hienThiSelectTruong();
    hienThiSelectNam();
}

function initEvent () {

    $('#idselecttruong').on('change',function(){
        $('#cardKetQuaDanhGiaGv').css('display','none');
        $('#selectNamXem').val('');
        let matruong = $(this).val();
        let tentruong = $(this).find('option:selected').text();
        $('#inputMatruong').val(matruong);
        $('#idtentruong').text(tentruong);
        $('#selectToChuyenMonXem').find('option').remove();
        axios.get(`getDsToChuyenMonTH/${matruong}`).then(res => {
            let dataToChuyenMon = res.data;
            let selectToChuyenMonXem = document.getElementById('selectToChuyenMonXem');
            $('#selectToChuyenMonXem').append("<option value='' selected='' disabled=''></option>");
            for(let j= 0; j< dataToChuyenMon.length;j++){
                let option = document.createElement("option");
                option.value = dataToChuyenMon[j].id;
                option.text = dataToChuyenMon[j].tentocm;
                selectToChuyenMonXem.appendChild(option);
            }
            $('#selectToChuyenMonXem').removeAttr('disabled');
        });
        axios.get(`getDsGiaoVienTH/${matruong}`).then(res => {
            layDataDsGiaoVien = res.data;
        });

    });

    $('#selectToChuyenMonXem').on('change',function(){
        $('#cardKetQuaDanhGiaGv').css('display','none');
        $('#selectNamXem').val('');
        $('#selectNamXem').removeAttr('disabled');
    });

    //xem đánh giá giáo viên
    $('#selectNamXem').on('change',function(){
        let valNam = $(this).val();
        let valTCM = $('#selectToChuyenMonXem').val();
        let maTruong = $('#inputMatruong').val();

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

        axios.get(`getKetQuaDanhGiaGvTH/${maTruong}`).then(res => {

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


                                    axios.get(`getDataDanhGiaGvTH/${maTruong}`).then(res => {
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

    //xuất đánh giá giáo viên

    $('#selectLoaiExport').on('change',function(){
        let valType = $(this).val();

        if(valType == 1){
            document.getElementById('divExportToanTruong').style.display = "block";
            document.getElementById('divExportToChuyenMon').style.display = "none";
        }else{
            document.getElementById('divExportToChuyenMon').style.display = "block";
            document.getElementById('divExportToanTruong').style.display = "none";
        }
    });

    $('#idselecttruongToChuyenMon').on('change',function(){
        let matruong = $(this).val();
        $('#selectNamToChuyenMonExport').val('');
        $('#selectToChuyenMonExport').find('option').remove();
        axios.get(`getDsToChuyenMonTH/${matruong}`).then(res => {
            let dataToChuyenMon = res.data;
            let selectToChuyenMonExport= document.getElementById('selectToChuyenMonExport');
            $('#selectToChuyenMonExport').append("<option value='' selected='' disabled=''></option>");
            for(let j= 0; j< dataToChuyenMon.length;j++){
                let option = document.createElement("option");
                option.value = dataToChuyenMon[j].id;
                option.text = dataToChuyenMon[j].tentocm;
                selectToChuyenMonExport.appendChild(option);
            }
            $('#selectToChuyenMonExport').removeAttr('disabled');
        });

    });

    $('#idselecttruongToanTruong').on('change',function(){
        $('#selectNamToanTruongExport').val('');
    });

    //xuất toàn trường
    $('#btnXuatToanTruong').on('click',function(){
        let valTruong = $('#idselecttruongToanTruong').val();
        let valNamTr = $('#selectNamToanTruongExport').val();
        if(valTruong == null){
            Swal.fire(
              'Thông báo',
              'Vui lòng chọn trường',
              'info'
            );
            return false;
        }
        if(valNamTr == ''){
            Swal.fire(
              'Thông báo',
              'Vui lòng chọn năm đánh giá',
              'info'
            );
            return false;
        }
        if(valTruong != '' && valNamTr != ''){
            $('#modalLoading').modal('show');
            axios.get(`getExportDGGVToanTruongTH/${valTruong}/${valNamTr}`).then(res => {
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
                //     $('#modalLoading').modal('hide');
                //     Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
                // }
            });
        }
        
    });

    //xuất tổ chuyên môn
    $('#btnXuatToChuyenMon').on('click',function(){
        let valtruong = $('#idselecttruongToChuyenMon').val();
        let valtcm = $('#selectToChuyenMonExport').val();
        let valnam = $('#selectNamToChuyenMonExport').val();

        if(valtruong == null){
            Swal.fire(
              'Thông báo',
              'Vui lòng chọn trường',
              'info'
            );
            return false;
        }

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

        if(valtruong != '' && valtcm != '' && valnam != ''){
            $('#modalLoading').modal('show');
            axios.get(`getExportDGGVToChuyenMonTH/${valtruong}/${valtcm}/${valnam}`).then(res => {
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
                //     $('#modalLoading').modal('hide');
                //     Swal.fire("Đã có lỗi xảy ra vui lòng thử lại sau", "Lỗi", "error");
                // }
            });
        }
    });
}

function hienThiSelectTruong() {
    $('#selectLoaiExport').select2({ width: '50%'});
    $('#idselecttruong').find('option').remove();
    $('#idselecttruongToanTruong').find('option').remove();
    $('#idselecttruongToChuyenMon').find('option').remove();

    let selectListTruong  = document.getElementById('idselecttruong');
    let selectListTruongToanTruong  = document.getElementById('idselecttruongToanTruong');
    let selectListTruongToChuyenMon  = document.getElementById('idselecttruongToChuyenMon');

    $('#idselecttruong').append("<option value='' selected='' disabled=''></option>");
    $('#idselecttruongToanTruong').append("<option value='' selected='' disabled=''></option>");
    $('#idselecttruongToChuyenMon').append("<option value='' selected='' disabled=''></option>");

    for(let i= 0; i< layDataDsTruong.length;i++){
        let option = document.createElement("option");
        option.value = layDataDsTruong[i].matruong;
        option.text = layDataDsTruong[i].tentruong;
        selectListTruong.appendChild(option);
    }

    for(let j= 0; j< layDataDsTruong.length;j++){
        let option = document.createElement("option");
        option.value = layDataDsTruong[j].matruong;
        option.text = layDataDsTruong[j].tentruong;
        selectListTruongToanTruong.appendChild(option);
    }

    for(let k= 0; k< layDataDsTruong.length;k++){
        let option = document.createElement("option");
        option.value = layDataDsTruong[k].matruong;
        option.text = layDataDsTruong[k].tentruong;
        selectListTruongToChuyenMon.appendChild(option);
    }

    $('#idselecttruong').removeAttr('disabled'); 
}

function hienThiSelectNam () {

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

jQuery(document).ready(function () {
    //modal xem đánh giá gv
    jQuery('#modalXemDanhGiaGv').on('hidden.bs.modal', function (e) {
        $('#tableDanhGiaGvXem>tbody').empty();
    });
});



