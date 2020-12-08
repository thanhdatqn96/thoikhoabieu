@extends('master')
@section('title','Đánh giá giáo viên ')
@section('content')

<dir class="row" style="padding: 0;margin: 0">

	<dir class="col-md-3">
		<div class="card">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title">Đánh giá giáo viên</h4>
				<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
						<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="card-content collpase show">
				<div class="card-body">
					<form class="form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-12">
									<div class="card box-shadow-0 border-info bg-transparent" id="nhapdulieuhethong">
										<div class="card-header bg-transparent" style="padding: 10px">
											<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
											<div class="heading-elements">
												<ul class="list-inline mb-0">
													<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
												</ul>
											</div>
										</div>
										<div class="card-content collapse show" style="">
											<div class="card-body">
												<fieldset class="radio">
													<label>
														<input type="radio" name="radio" value="" id="radioXemKetQuaDanhGiaGv">
														Xem kết quả đánh giá giáo viên	
													</label>
												</fieldset>
												<fieldset class="radio">
													<label>
														<input type="radio" name="radio" value="" id="radioExportKetQuaDanhGiaGv">
														Xuất kết quả đánh giá giáo viên	
													</label>
												</fieldset>		
											</div>
										</div>							
									</div>
									<!-- //thông báo -->
									<div class="card box-shadow-0 border-info bg-transparent" id="nhapdulieuhethong">
										<div class="card">
										  <div class="card-body" style="font-size: 13px;">
										    <p style="color: red;"><b>Lưu ý:</b></p> <i>Đánh giá giáo viên thực hiện theo thông tư Số 20/2018/TT-BGDĐT ngày 22/8/2018 Ban hành quy định chuẩn nghề nghiệp giáo viên cơ sở giáo dục phổ thông</i>
										  </div>
										</div>							
									</div>
								</div>						
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>

	<dir class="col-md-9" style="margin: 0;padding: 2px">
		<!-- lựa chọn select đánh giá giáo viên -->
		<div class="card" id="cardSelectXemDanhGiaGv" style="display: none;">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title" style="padding-left: 10px"></h4>
				<a class="heading-elements-toggle" ><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
						<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="card-content collpase show">
				<div class="card-body">
					<form class="form">
						<div class="form-body">
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn trường xem đánh giá:</label></div>
									<div class="col-md-7"><select id="idselecttruong" data-live-search="true" disabled=""></select></div>
								</div>
							</div>
							<!-- <br> -->
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn tổ chuyên môn</label></div>
									<div class="col-md-7"><select id="selectToChuyenMonXem" data-live-search="true" disabled=""></select></div>
								</div>
							</div>
							<!-- <br> -->
					        <div class="col-md-10">
					        	<div class="row">
					        		<div class="col-md-3"><label style="padding-top: 10px;">Chọn năm đánh giá</label></div>
					        		<div class="col-md-7">
					        			<div class="input-group date" style="width: 50%;">
								            <input id="selectNamXem" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá" disabled="">
								            <div class="input-group-addon">
								                <i class="fa fa-calendar"></i>
								            </div>
								        </div>
					        		</div>
					        	</div>
								
					    	</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- xem kết quả đánh giá giáo viên -->
		<div class="card" id="cardKetQuaDanhGiaGv" style="display: none;">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title" style="padding-left: 10px">Đánh giá giáo viên trường: <b><span id="idtentruong" style="color: blue;"></span></b></h4>
				<input type="hidden" id="inputMatruong">
				<a class="heading-elements-toggle" ><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
						<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="card-content collpase show">
				<div class="card-body">
					<form class="form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-12">
									<div id="girdKetQuaDanhGiaGv"></div>
								</div>						
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Xuất kết quả đánh giá giáo viên -->
		<div class="card" id="cardExportKetQuaDanhGiaGv" style="display: none;">
			<div class="card-header" style="padding: 10px">
				<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
						<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
					</ul>
				</div>						
			</div>
			<div class="card-content collpase show">
				<div class="card-body">
					<form class="form">
						<div class="form-body">
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn loại xuất</label></div>
									<div class="col-md-7"><select id="selectLoaiExport" data-live-search="true"><option value="" selected='' disabled=''></option><option value="1">Toàn trường</option><option value="2">Tổ chuyên môn</option></select></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="form-body" id="divExportToanTruong" style="display: none;">
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn trường</label></div>
									<div class="col-md-7"><select id="idselecttruongToanTruong" data-live-search="true"></select></div>
								</div>
							</div>
							<br>
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn năm đánh giá</label></div>
									<div class="col-md-7">
										<div class="input-group date" style="width: 50%;">
											<input id="selectNamToanTruongExport" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							<br>
							<div class="col-md-3">
								<button type="button" class="btn btn-success btn-sm" id="btnXuatToanTruong"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Xuất</button>
							</div>
						</div>
						<div class="form-body" id="divExportToChuyenMon" style="display: none;">
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn trường</label></div>
									<div class="col-md-7"><select id="idselecttruongToChuyenMon" data-live-search="true"></select></div>
								</div>
							</div>
							<br>
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn tổ chuyên môn</label></div>
									<div class="col-md-7"><select id="selectToChuyenMonExport" data-live-search="true" disabled=''></select></div>
								</div>
							</div>
							<br>
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-3"><label style="padding-top: 10px;">Chọn năm đánh giá</label></div>
									<div class="col-md-7">
										<div class="input-group date" style="width: 50%;">
											<input id="selectNamToChuyenMonExport" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>
								</div>

							</div>
							<br>
							<div class="col-md-3">
								<button type="button" class="btn btn-success btn-sm" id="btnXuatToChuyenMon"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Xuất</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>

</dir>

<!-- modal xem kết quả đánh giá giáo viên -->
<div class="modal fade text-left" id="modalXemDanhGiaGv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Đánh giá giáo viên: <b><span id="spanTenGVXem" style="color: yellow;"></span></b></h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalXem">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form" id="formDanhGiaGvXem">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDanhGiaGvXem" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th rowspan="2" class='stickyThu' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Tiêu Chuẩn</th>
											<th rowspan="2" class='stickyTiet' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Tiêu Chí</th>
											<th colspan="4" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;" >Kết quả xếp loại</th>
										</tr>
										<tr>
											<th id="1" class="classXepLoaiXem" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Chưa đạt</th>
											<th id="2" class="classXepLoaiXem" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Đạt</th>
											<th id="3" class="classXepLoaiXem" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Khá</th>
											<th id="4" class="classXepLoaiXem" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Tốt</th>
										</tr>
									</thead>
									<tbody id="bodyDanhGiaGvXem">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
			<!-- <div class="modal-footer">
				<button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal" id="btnHuy">Huỷ</button>
				<button type="button" class="btn btn-outline-danger" id="btnLuuDanhGiaGv">Lưu</button>
			</div> -->
		</div>
	</div>
</div>

<!-- modal loading -->
<div class="modal fade text-left show" id="modalLoading" tabindex="-1" role="dialog" aria-labelledby="myModalLabel20" style="display: none;">
	<div class="modal-dialog modal-xs" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h4 class="card-title">Đang xử lý! Vui lòng đợi trong giây lát</h4>							
						</div>
						<div class="card-content">
							<div class="loader-wrapper">
								<div class="loader-container">
									<div class="ball-spin-fade-loader loader-blue">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$("#radioXemKetQuaDanhGiaGv").change(function () {
		$("#radioExportKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardSelectXemDanhGiaGv").style.display = "block";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "none";
		//select
		// document.getElementById("cardSelectTCMNam").style.display = "none";
		// document.getElementById("cardSelectTCMNamXem").style.display = "block";
		//clear
		$('#idselecttruong').val('').trigger('change.select2');
		$('#selectToChuyenMonXem').val('').trigger('change.select2');
		document.getElementById("selectNamXem").value = '';
	});
	$("#radioExportKetQuaDanhGiaGv").change(function () {
		$("#radioXemKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardSelectXemDanhGiaGv").style.display = "none";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "block";
		//select
		// document.getElementById("cardSelectTCMNam").style.display = "none";
		// document.getElementById("cardSelectTCMNamXem").style.display = "none";
		//clear
		$('#selectLoaiExport').val('').trigger('change.select2');
		document.getElementById('divExportToanTruong').style.display = "none";
		document.getElementById('divExportToChuyenMon').style.display = "none";
		// document.getElementById("selectNamXem").value = '';
	});
</script>

<link rel="stylesheet" type="text/css" href="theme/app-assets/css/plugins/loaders/loaders.min.css">
<script type="text/javascript" src="{{asset('js/tonghop/theodoidanhgiagiaovien.js')}}"></script>
<script type="text/javascript" src='dx/js/jszip/dist/xlsx.full.min.js'></script>
@endsection