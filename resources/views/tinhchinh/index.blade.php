@extends('master')
@section('title','Tinh chỉnh ')
@section('content')

<dir class="row" style="padding: 0;margin: 0">
	<div class="col-md-12">
		<div class="row">
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
																<input type="radio" name="radio" value="" id="radioDanhGiaGv">
																Đánh giá giáo viên
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="radioKetQuaDanhGiaGv">
																Kết quả đánh giá giáo viên	
															</label>
														</fieldset>		
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

			<dir class="col-md-9">
				<!-- select tổ chuyên môn, năm -->
				<div class="card" id="cardSelectTCMNam" style="display: none;">
					<div class="card-header" style="padding: 10px">
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<div>
										<label>Chọn tổ chuyên môn:</label>
										<select id="selectToChuyenMon" data-live-search="true"></select>
									</div>
									<br>
							        <div>
										<div class="input-group date" style="width: 50%;">
								            <input id="selectNam" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá">
								            <div class="input-group-addon">
								                <i class="fa fa-calendar"></i>
								            </div>
								        </div>
							    	</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- Đánh giá giáo viên -->
				<div class="card" id="cardDanhGiaGv" style="display: none;">
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
									<div id="girdDsGv"></div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- Kết quả đánh giá giáo viên -->
				<div class="card" id="cardKetQuaDanhGiaGv" style="display: none;">
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
									<!-- <div id="girdDanhGiaGv"></div> -->
								</div>
							</form>
						</div>
					</div>
				</div>

			</dir>
		</div>
	</div>

</dir>

<!-- modal đánh giá gv -->
<div class="modal fade text-left" id="modalDanhGiaGv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Đánh giá giáo viên: <b><span id="spanTenGV" style="color: yellow;"></span></b></h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDanhGiaGv" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th rowspan="2" class='stickyThu' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Tiêu Chuẩn</th>
											<th rowspan="2" class='stickyTiet' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Tiêu Chí</th>
											<th colspan="4" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;" >Kết quả xếp loại</th>
										</tr>
										<tr>
											<th id="1" class="classXeploai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Chưa đạt</th>
											<th id="2" class="classXeploai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Đạt</th>
											<th id="3" class="classXeploai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Khá</th>
											<th id="4" class="classXeploai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Tốt</th>
										</tr>
									</thead>
									<tbody id="bodyDanhGiaGv">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal" id="btnHuy">Huỷ</button>
				<button type="button" class="btn btn-outline-danger" id="btnLuuDanhGiaGv">Lưu</button>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$("#radioDanhGiaGv").change(function () {
		$("#radioKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardDanhGiaGv").style.display = "block";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "block";
	});
	$("#radioKetQuaDanhGiaGv").change(function () {
		$("#radioKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardDanhGiaGv").style.display = "none";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "block";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "block";
	});
</script>

<script type="text/javascript" src="js/tinhchinh/tinhchinh.js"></script>
@endsection