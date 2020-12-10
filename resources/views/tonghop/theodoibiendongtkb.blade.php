@extends('master')
@section('title','Theo dõi biến động tkb')
@section('content')

<!-- chọn trường xem tkb -->

<dir class="row" style="padding: 0;margin: 0" id="tabletruong">
	<dir class="col-md-12" >
		<div class="card">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title">Thời khoá biểu các trường trực thuộc</h4>
				<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i id="hieuungcongtru"></i></a></li>
						<!-- <li><a data-action="expand"><i class="ft-maximize"></i></a></li> -->
					</ul>
				</div>
			</div>
			<div class="card-content collpase show" id="bangdstruong">
				<div class="card-body">
					<form class="form">
						<div class="form-body">
							<div id="girddstruong"></div>   
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>

</dir>


<!-- thời khoá biểu -->
<dir class="row" style="padding: 0;margin: 0;display: none;" id="formxemtkb">
	<div class="col-md-12">
		<div class="row">
			<dir class="col-md-3">
				<div class="card">
					<div class="card-header" style="padding: 10px">
						<h4 class="card-title">Theo dõi thời khóa biểu</h4>
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
														<!-- <fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkbtruong">
																TKB trường
															</label>
														</fieldset> -->
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkbgiaovien">														
																TKB giáo viên
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkblop">														
																TKB lớp
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

				<!-- select giáo viên của trường -->
				<div class="card" id="cardselectgv" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonggv" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idgv">
						<p id="iddatatungay" style="display: none;"></p>
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<section>
										<div class="container" style="overflow-y: auto; ">
											<div>
												<label>Chọn giáo viên:</label>
												<select id="idselectgv" data-live-search="true"></select>
											</div>
											<br>
											<div>
												<label>Kiểu thời gian:</label>
												<input type="radio" name="radio" value="" id="iddatetimetuan"style=" margin-left: 10px;"> Tuần</input>
												<input type="radio" name="radio" value="" id="iddatetimethang" style=" margin-left: 30px;"> Tháng</input>
												<input type="radio" name="radio" value="" id="iddatetimenam" style=" margin-left: 30px;"> Năm</input>
											</div>
											<br>
											<!-- tuần -->
											<div id="divtuan" style="display: none;">
												<div class="input-daterange input-group" style="width: 50%;">
													<span class="input-group-addon">Tháng</span>
													<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuan" placeholder="Chọn tháng">
													<span class="input-group-addon">Tuần</span>
													<select id="selecttuan" name="interested" class="form-control">
					                                    <option value="none" selected="" disabled="">--Chọn tuần--
					                                    </option><option value="1">Tuần 1
					                                    </option><option value="2">Tuần 2
					                                    </option><option value="3">Tuần 3
					                                    </option><option value="4">Tuần 4
					                                    </option>
					                            	</select>
												</div>
												<br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBGvTuan">DS thời gian có TKB</button>	
									    	</div>
									    	<!-- tháng -->
											<div id="divthang" style="display: none;">
												<div class="input-group date" data-provide="datepicker" id="datepickerthang" style="width: 50%;">
										            <input type="text" class="form-control-sm form-control" placeholder="Chọn tháng">
										            <div class="input-group-addon">
										                <i class="fa fa-calendar"></i>
										            </div>
										        </div>
										        <br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBGvThang">DS thời gian có TKB</button>
									    	</div>
									    	<!-- năm -->
									        <div id="divnam" style="display: none;">
												<div class="input-group date" data-provide="datepicker" id="datepickernam" style="width: 50%;">
										            <input type="text" class="form-control-sm form-control" placeholder="Chọn năm">
										            <div class="input-group-addon">
										                <i class="fa fa-calendar"></i>
										            </div>
										        </div>
										        <br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBGvNam">DS thời gian có TKB</button>
									    	</div>
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- select lớp của trường -->
				<div class="card" id="cardselectlop" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonglop" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idlop">
						<p id="iddatatungaylop" style="display: none;"></p>
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<section>
										<div class="container" style="overflow-y: auto; ">
											<div>
												<label>Chọn khối:</label>
												<select id="idselectkhoi" data-live-search="true"></select>
											</div>
											<br>
											<div>
												<label>Chọn lớp:</label>
												<select id="idselectlop" data-live-search="true"></select>
											</div>
											<br>
											<div>
												<label>Kiểu thời gian:</label>
												<input type="radio" name="radio" value="" id="iddatetimetuanlop"style=" margin-left: 10px;"> Tuần</input>
												<input type="radio" name="radio" value="" id="iddatetimethanglop" style=" margin-left: 30px;"> Tháng</input>
												<input type="radio" name="radio" value="" id="iddatetimenamlop" style=" margin-left: 30px;"> Năm</input>
											</div>
											<br>
											<!-- tuần -->
											<div id="divtuanlop" style="display: none;">
												<div class="input-daterange input-group" style="width: 50%;">
													<span class="input-group-addon">Tháng</span>
													<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuanlop" placeholder="Chọn tháng">
													<span class="input-group-addon">Tuần</span>
													<select id="selecttuanlop" name="interested" class="form-control">
					                                    <option value="none" selected="" disabled="">--Chọn tuần--
					                                    </option><option value="1">Tuần 1
					                                    </option><option value="2">Tuần 2
					                                    </option><option value="3">Tuần 3
					                                    </option><option value="4">Tuần 4
					                                    </option>
					                            	</select>
												</div>
												<br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBLopTuan">DS thời gian có TKB</button>
											</div>
											<!-- tháng -->
											<div id="divthanglop" style="display: none;">
												<div class="input-group date" data-provide="datepicker" id="datepickerthanglop" style="width: 50%;">
										            <input type="text" class="form-control-sm form-control" placeholder="Chọn tháng">
										            <div class="input-group-addon">
										                <i class="fa fa-calendar"></i>
										            </div>
										        </div>
										        <br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBLopThang">DS thời gian có TKB</button>
									    	</div>
									    	<!-- năm -->
									        <div id="divnamlop" style="display: none;">
												<div class="input-group date" data-provide="datepicker" id="datepickernamlop" style="width: 50%;">
										            <input type="text" class="form-control-sm form-control" placeholder="Chọn năm">
										            <div class="input-group-addon">
										                <i class="fa fa-calendar"></i>
										            </div>
										        </div>
										        <br>
												<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBLopNam">DS thời gian có TKB</button>
									    	</div>
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

			</dir>
		</div>
	</div>	
</dir>

<dir class="row" style="padding: 0;margin: 0;">
	<dir class="col-md-12">
		<!-- xem tkb giáo viên -->
		<div class="card" id="cardxeptkbgiaovien" style="display: none;">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title" id="titletkbgv" style="text-align: center;font-size: 20px;">Thời khóa biểu giáo viên: <b><span id="idtengv" style="color: green;"></span></b></h4>
				<br>
				<div id="nhantuan" style="display: none;">
					<!-- <h5 style="text-align: center;font-size: 15px;"><i><span id="idtungay"></span><span id="iddenngay"></span></i></h5> -->
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idthangtuan"></span></i></h5>
				</div>
				<div id="nhanthang" style="display: none;">
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idthang"></span></i></h5>			
				</div>
				<div id="nhannam" style="display: none;">
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idnam"></span></i></h5>	
				</div>
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
							<section>
								<div class="container-fluid">
									<div class="col-md-12">
										<div class="row" id="divResults">
										</div>
									</div>
								</div>
							</section>

						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- xem tkb lớp -->
		<div class="card" id="cardxeptkblop" style="display: none;">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title" id="titletkbgv" style="text-align: center;font-size: 20px;">Thời khóa biểu lớp: <b><span id="idtenlop" style="color: green;"></span></b></h4>
				<br>
				<div id="nhantuanlop" style="display: none;">
					<!-- <h5 style="text-align: center;font-size: 15px;"><i><span id="idtungaylop"></span><span id="iddenngaylop"></span></i></h5> -->
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idthangtuanlop"></span></i></h5>
				</div>
				<div id="nhanthanglop" style="display: none;">
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idthanglop"></span></i></h5>			
				</div>
				<div id="nhannamlop" style="display: none;">
					<h5 style="text-align: center;font-size: 15px;"><i><span id="idnamlop"></span></i></h5>	
				</div>
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
							<section>
								<div class="container-fluid">
									<div class="col-md-12">
										<div class="row" id="divResultsLop">
										</div>
									</div>
								</div>
							</section>
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>	
</dir>

<!-- modal danh sách thời gian có thời khoá biểu giáo viên theo tuần-->
<div class="modal fade text-left" id="modalDsCoTKBGvTuan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBGvTuan">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBGvTuan" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBGvTuan">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- modal danh sách thời gian có thời khoá biểu giáo viên theo tháng-->
<div class="modal fade text-left" id="modalDsCoTKBGvThang" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBGvThang">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBGvThang" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBGvThang">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- modal danh sách thời gian có thời khoá biểu giáo viên theo năm-->
<div class="modal fade text-left" id="modalDsCoTKBGvNam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBGvNam">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBGvNam" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBGvNam">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- modal danh sách thời gian có thời khoá biểu lớp theo tuần-->
<div class="modal fade text-left" id="modalDsCoTKBLopTuan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBLopTuan">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBLopTuan" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBLopTuan">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- modal danh sách thời gian có thời khoá biểu lớp theo tháng-->
<div class="modal fade text-left" id="modalDsCoTKBLopThang" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBLopThang">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBLopThang" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBLopThang">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- modal danh sách thời gian có thời khoá biểu lớp theo năm-->
<div class="modal fade text-left" id="modalDsCoTKBLopNam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBLopNam">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBLopNam" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBLopNam">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	setTimeout(function() {
		$('#changegv').trigger('click');
	},500);

	// $("#xemtkbtruong").change(function () {

	// 	$("#xemtkbgiaovien").prop("checked", false);
	// 	$("#xemtkblop").prop("checked", false);
	// 	document.getElementById("cardxeptkbtruong").style.display = "block";
	// 	document.getElementById("cardxeptkbgiaovien").style.display = "none";
	// 	document.getElementById("cardxeptkblop").style.display = "none";
	// 	document.getElementById("cardselectgv").style.display = "none";
	// 	document.getElementById("cardselectlop").style.display = "none";
	// });

	$("#xemtkbgiaovien").change(function () {

		// $("#xemtkbtruong").prop("checked", false);
		$("#xemtkblop").prop("checked", false);
		// document.getElementById("cardxeptkbtruong").style.display = "none";
		// document.getElementById("cardxeptkbgiaovien").style.display = "block";		
		document.getElementById("cardxeptkblop").style.display = "none";
		document.getElementById("cardselectgv").style.display = "block";
		document.getElementById("cardselectlop").style.display = "none";
	});

	$("#xemtkblop").change(function () {

		$("#xemtkbgiaovien").prop("checked", false);
		// $("#xemtkbtruong").prop("checked", false);
		// document.getElementById("cardxeptkbtruong").style.display = "none";
		document.getElementById("cardxeptkbgiaovien").style.display = "none";
		// document.getElementById("cardxeptkblop").style.display = "block";
		document.getElementById("cardselectgv").style.display = "none";
		document.getElementById("cardselectlop").style.display = "block";
	});

	//giáo viên
	$("#iddatetimetuan").change(function () {
		$("#iddatetimethang").prop("checked", false);
		$("#iddatetimenam").prop("checked", false);
		document.getElementById("divtuan").style.display = "block";
		document.getElementById("divthang").style.display = "none";
		document.getElementById("divnam").style.display = "none";
		document.getElementById("nhantuan").style.display = "block";
		document.getElementById("nhanthang").style.display = "none";
		document.getElementById("nhannam").style.display = "none";
	});

	$("#iddatetimethang").change(function () {
		$("#iddatetimetuan").prop("checked", false);
		$("#iddatetimenam").prop("checked", false);
		document.getElementById("divtuan").style.display = "none";
		document.getElementById("divthang").style.display = "block";
		document.getElementById("divnam").style.display = "none";
		document.getElementById("nhantuan").style.display = "none";
		document.getElementById("nhanthang").style.display = "block";
		document.getElementById("nhannam").style.display = "none";
	});

	$("#iddatetimenam").change(function () {
		$("#iddatetimetuan").prop("checked", false);
		$("#iddatetimethang").prop("checked", false);
		document.getElementById("divtuan").style.display = "none";
		document.getElementById("divthang").style.display = "none";
		document.getElementById("divnam").style.display = "block";
		document.getElementById("nhantuan").style.display = "none";
		document.getElementById("nhanthang").style.display = "none";
		document.getElementById("nhannam").style.display = "block";
	});

	//lớp
	$("#iddatetimetuanlop").change(function () {
		$("#iddatetimethanglop").prop("checked", false);
		$("#iddatetimenamlop").prop("checked", false);
		document.getElementById("divtuanlop").style.display = "block";
		document.getElementById("divthanglop").style.display = "none";
		document.getElementById("divnamlop").style.display = "none";
		document.getElementById("nhantuanlop").style.display = "block";
		document.getElementById("nhanthanglop").style.display = "none";
		document.getElementById("nhannamlop").style.display = "none";
	});

	$("#iddatetimethanglop").change(function () {
		$("#iddatetimetuanlop").prop("checked", false);
		$("#iddatetimenamlop").prop("checked", false);
		document.getElementById("divtuanlop").style.display = "none";
		document.getElementById("divthanglop").style.display = "block";
		document.getElementById("divnamlop").style.display = "none";
		document.getElementById("nhantuanlop").style.display = "none";
		document.getElementById("nhanthanglop").style.display = "block";
		document.getElementById("nhannamlop").style.display = "none";
	});

	$("#iddatetimenamlop").change(function () {
		$("#iddatetimetuanlop").prop("checked", false);
		$("#iddatetimethanglop").prop("checked", false);
		document.getElementById("divtuanlop").style.display = "none";
		document.getElementById("divthanglop").style.display = "none";
		document.getElementById("divnamlop").style.display = "block";
		document.getElementById("nhantuanlop").style.display = "none";
		document.getElementById("nhanthanglop").style.display = "none";
		document.getElementById("nhannamlop").style.display = "block";
	});

</script>

<style type="text/css">
	#tablexemtkbgiaovien tbody tr td.classoronggiaovien:hover {
	  background-color: yellow;
	}
	#tablexemtkblop tbody tr td.classoronglop:hover {
	  background-color: yellow;
	}
</style>

<link rel="stylesheet" href="{{asset('css/xemtkb/styleXemtkb.css')}}">
<script type="text/javascript" src="{{asset('js/tonghop/theodoibiendongtkb.js')}}"></script>

@endsection