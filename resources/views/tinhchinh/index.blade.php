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
															<fieldset class="checkbox">
																<label>
																	<input type="radio" id="radioImportExcel"> Nhập đánh giá giáo viên từ excel
																</label>
															</fieldset>
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

			<dir class="col-md-9">

				<!-- import dánh giá giáo viên excel-->
				<div class="card" id="cardImportExcel" style="display: none;">
					<div class="card-header">
						<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
						<div class="heading-elements">
							<ul class="list-inline mb-0">
								<!-- <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
								<li><a data-action="expand"><i class="ft-maximize"></i></a></li> -->
							</ul>
						</div>
					</div>

					<div class="card-content collapse show">
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
		                            <div class="form-group">
		                                <label for="projectinput5">Chọn loại import</label>
		                                <select id="selectLoaiImport" data-live-search="true"><option value="" selected='' disabled=''></option><option value="1">Toàn trường</option><option value="2">Tổ chuyên môn</option></select>	
		                            </div>
		                        </div>
		                        <div class="col-md-6">
		                            <div class="form-group">
		                                <!-- <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5> -->
										<button type="button" class="btn mr-1 mb-1 btn-info btn-sm" id="btnFileMauDGGVToanTruong" style="display: none;"><i class="fa fa-file-excel-o"></i> Tải file mẫu</button>
		                            </div>
		                        </div>
							</div>
							<div id="divImportToChuyenMon" style="display: none;">
								<hr>
								<div class = "row">
									<div class="col-md-6">
			                            <div class="form-group">
			                                <label for="projectinput5">Chọn tổ chuyên môn</label>
			                                <select id="selectToChuyenMonExcel" data-live-search="true"></select>	
			                            </div>
			                        </div>
			                        <div class="col-md-6">
			                            <div class="form-group">
			                                <!-- <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5> -->
											<button type="button" class="btn mr-1 mb-1 btn-info btn-sm" id="btnFileMauDGGV"><i class="fa fa-file-excel-o"></i> Tải file mẫu</button>
			                            </div>
			                        </div>
								</div>
							</div>
							<hr>
							<div class="row" id="formExcel" >
								<div class="col-md-6">
									<div class="form-group">
										<h5>Tải lên file excel đánh giá giáo viên</h5>
										<div class="controls">
											<input type="file" name="file[]" id="importFileDGGV" class="form-control input-sm" required="" style="padding: 0px;
											height: auto;">
										</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- select tổ chuyên môn-->
				<div class="card" id="cardSelectTCMNam" style="display: none;">
					<div class="card-header" style="padding: 10px">
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<div class="col-md-10">
										<div class="row">
											<div class="col-md-3"><label style="padding-top: 10px;">Chọn tổ chuyên môn</label></div>
											<div class="col-md-7"><select id="selectToChuyenMon" data-live-search="true"></select></div>
											<input type="hidden" id="toChuyenMonVirtual">
										</div>
									</div>
								</div>
								<br>
							        <div class="col-md-10">
							        	<div class="row">
							        		<div class="col-md-3"><label style="padding-top: 10px;">Chọn năm đánh giá</label></div>
							        		<div class="col-md-7">
							        			<div class="input-group date" style="width: 50%;">
										            <input id="selectNam" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá">
										            <div class="input-group-addon">
										                <i class="fa fa-calendar"></i>
										            </div>
										        </div>
							        		</div>
							        		<input type="hidden" id="namDanhGiaVirtual">
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
									<button type="button" id="btnHoanThanhDanhGia" class="btn btn-success btn-sm">Hoàn thành đánh giá</button>
									<div id="girdDsGv"></div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- select tổ chuyên môn, năm xem kết quả -->
				<div class="card" id="cardSelectTCMNamXem" style="display: none;">
					<div class="card-header" style="padding: 10px">
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<div class="col-md-10">
										<div class="row">
											<div class="col-md-3"><label style="padding-top: 10px;">Chọn tổ chuyên môn</label></div>
											<div class="col-md-7"><select id="selectToChuyenMonXem" data-live-search="true"></select></div>
										</div>
									</div>
									<br>
							        <div class="col-md-10">
							        	<div class="row">
							        		<div class="col-md-3"><label style="padding-top: 10px;">Chọn năm đánh giá</label></div>
							        		<div class="col-md-7">
							        			<div class="input-group date" style="width: 50%;">
										            <input id="selectNamXem" type="text" class="form-control-sm form-control" placeholder="Chọn năm đánh giá">
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
									<div id="girdKetQuaDanhGiaGv"></div>
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
								<!-- <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
								<li><a data-action="expand"><i class="ft-maximize"></i></a></li> -->
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
											<div class="col-md-3"><label style="padding-top: 10px;">Chọn tổ chuyên môn</label></div>
											<div class="col-md-7"><select id="selectToChuyenMonExport" data-live-search="true"></select></div>
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

				<!-- Xem xuất kết quả đánh giá giáo viên -->
				<div class="card" id="cardXemExportKetQuaDanhGiaGv" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 style="text-align: center;color: blue;" class="card-title"><b>BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ GIÁO VIÊN CỦA CƠ SỞ GIÁO DỤC</b></h4>
						<br>
						<h5 style="text-align: center;font-size: 15px;color: red;"><i><span id="tieuDeThoiGian"></span></i></h5>
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
										<div class="container">
											<table id="tableXemExportKetQuaDanhGiaGv" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="border-collapse: separate;overflow: auto; height: 500px; width: 100%;">
												<thead>
													<tr>
														<th rowspan="2" class='stickyThu' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;">STT</th>
														<th rowspan="2" class='stickyTiet' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 100px;">Họ và tên</th>
														<th colspan="15" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;" ><span>Kết quả đánh giá của tiêu chí</span><br><span>Chưa đạt (CĐ) ; Đạt (Đ) ; Khá (Kh) ; Tốt ( T)</span></th>
														<th rowspan="2" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;" >Xếp loại</th>
													</tr>
													<tr>
														<th id="1" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">1</th>
														<th id="2" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">2</th>
														<th id="3" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">3</th>
														<th id="4" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">4</th>
														<th id="5" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">5</th>
														<th id="6" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">6</th>
														<th id="7" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">7</th>
														<th id="8" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">8</th>
														<th id="9" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">9</th>
														<th id="10" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">10</th>
														<th id="11" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">11</th>
														<th id="12" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">12</th>
														<th id="13" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">13</th>
														<th id="14" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">14</th>
														<th id="15" class="classTieuChiXemExportKetQuaDanhGiaGv" style="background-color: #4682B4;color: white;position: sticky;top: 58px;z-index: 1;">15</th>
													</tr>
												</thead>
												<tbody id="bodyXemExportKetQuaDanhGiaGv">
												</tbody>
											</table>
										</div>
									</div>
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
				<div style="margin-top: 10px; margin-left:400px; margin-right:0;">
					<input type="checkbox" id="chbxChuaDatAll">Chưa đạt
					<input type="checkbox" id="chbxDatAll">Đạt
					<input type="checkbox" id="chbxKhaAll">Khá 
					<input type="checkbox" id="chbxTotAll">Tốt
				</div>
				<input type="hidden" id="inputMaGv">
				<input type="hidden" id="inputMaTruong">
				<input type="hidden" id="inputMaDGGV">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModal">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form" id="formDanhGiaGv">
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
											<th id="1" class="classXepLoai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Chưa đạt</th>
											<th id="2" class="classXepLoai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Đạt</th>
											<th id="3" class="classXepLoai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Khá</th>
											<th id="4" class="classXepLoai" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">Tốt</th>
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

<!-- modal xem đánh giá gv -->
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

<!-- modal import đánh giá kiểm tra -->
<div class="modal fade text-left" id="modalImportDGGVCheck" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Kiểm tra đánh giá giáo viên</h4>
				<input type="hidden" id="inputMaDGGVImport">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalImportDGGVCheck">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form" id="formImportDGGVCheck">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<table id="tableImportDGGVCheck" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="border-collapse: separate;overflow: auto; height: 500px; width: 1000px;">
									<thead>
										<tr>
											<th rowspan="2" style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;"><input type="checkbox" class="classChbxImportDGGVCheckAll"></th>
											<th rowspan="2" class='stickyThu' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 100px;">STT</th>
											<th rowspan="2" class='stickyTiet' style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 200px;">Họ và tên</th>
											<th rowspan="2" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 10;width: 100px;min-width: 100px;left: 300px;" >Tổ chuyên môn</th>
											<th colspan="15" style="text-align: center;background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;" >Kết quả xếp loại</th>
										</tr>
										<tr>
											<th id="1" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 1</th>
											<th id="2" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 2</th>
											<th id="3" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 3</th>
											<th id="4" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 4</th>
											<th id="5" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 5</th>
											<th id="6" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 6</th>
											<th id="7" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 7</th>
											<th id="8" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 8</th>
											<th id="9" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 9</th>
											<th id="10" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 10</th>
											<th id="11" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 11</th>
											<th id="12" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 12</th>
											<th id="13" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 13</th>
											<th id="14" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 14</th>
											<th id="15" class="classTieuChi" style="background-color: #4682B4;color: white;position: sticky;top: 42px;z-index: 1;">TC 15</th>
										</tr>
									</thead>
									<tbody id="bodyImportDGGVCheck">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-danger" id="btnCheckImportDGGV">Kiểm tra</button>
				<button type="button" class="btn btn-outline-success" id="btnLuuImportDGGV" disabled="">Lưu</button>
			</div>
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
	$("#radioImportExcel").change(function () {
		$("#radioDanhGiaGv").prop("checked", false);
		$("#radioKetQuaDanhGiaGv").prop("checked", false);
		$("#radioExportKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardImportExcel").style.display = "block";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardDanhGiaGv").style.display = "none";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardXemExportKetQuaDanhGiaGv").style.display = "none";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "none";
		document.getElementById("cardSelectTCMNamXem").style.display = "none";
		//clear
		$('#selectToChuyenMonExcel').val('').trigger('change.select2');
		$('#selectLoaiImport').val('').trigger('change.select2');
		document.getElementById("btnFileMauDGGVToanTruong").style.display = "none";
		document.getElementById('divImportToChuyenMon').style.display = "none";

	});
	$("#radioDanhGiaGv").change(function () {
		$("#radioImportExcel").prop("checked", false);
		$("#radioKetQuaDanhGiaGv").prop("checked", false);
		$("#radioExportKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardImportExcel").style.display = "none";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardXemExportKetQuaDanhGiaGv").style.display = "none";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "block";
		document.getElementById("cardSelectTCMNamXem").style.display = "none";
		//clear
		$('#selectToChuyenMon').val('').trigger('change.select2');
		document.getElementById("selectNam").value = '';

	});
	$("#radioKetQuaDanhGiaGv").change(function () {
		$("#radioImportExcel").prop("checked", false);
		$("#radioDanhGiaGv").prop("checked", false);
		$("#radioExportKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardImportExcel").style.display = "none";
		document.getElementById("cardDanhGiaGv").style.display = "none";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardXemExportKetQuaDanhGiaGv").style.display = "none";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "none";
		document.getElementById("cardSelectTCMNamXem").style.display = "block";
		//clear
		$('#selectToChuyenMonXem').val('').trigger('change.select2');
		document.getElementById("selectNamXem").value = '';
	});
	$("#radioExportKetQuaDanhGiaGv").change(function () {
		$("#radioImportExcel").prop("checked", false);
		$("#radioDanhGiaGv").prop("checked", false);
		$("#radioKetQuaDanhGiaGv").prop("checked", false);
		//
		document.getElementById("cardImportExcel").style.display = "none";
		document.getElementById("cardDanhGiaGv").style.display = "none";
		document.getElementById("cardKetQuaDanhGiaGv").style.display = "none";
		document.getElementById("cardExportKetQuaDanhGiaGv").style.display = "block";
		//select
		document.getElementById("cardSelectTCMNam").style.display = "none";
		document.getElementById("cardSelectTCMNamXem").style.display = "none";
		//clear
		$('#selectLoaiExport').val('').trigger('change.select2');
		document.getElementById('divExportToanTruong').style.display = "none";
		document.getElementById('divExportToChuyenMon').style.display = "none";
		// document.getElementById("selectNamXem").value = '';
	});
</script>

<link rel="stylesheet" type="text/css" href="theme/app-assets/css/plugins/loaders/loaders.min.css">
<script type="text/javascript" src="js/tinhchinh/tinhchinh.js"></script>
<script type="text/javascript" src='dx/js/jszip/dist/xlsx.full.min.js'></script>
@endsection