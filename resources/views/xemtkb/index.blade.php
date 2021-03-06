@extends('master')
@section('title','Xem thời khóa biểu')
@section('content')

<!-- thời khoá biểu -->
<dir class="row" style="padding: 0;margin: 0;" id="formxemtkb">
	<div class="col-md-12">
		<div class="row">

			<dir class="col-md-3">
				<div class="card">
					<div class="card-header" style="padding: 10px">
						<h4 class="card-title">Xem thời khóa biểu</h4>
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
																<input type="radio" name="radio" value="" id="xemtkbtruong">
																Xem TKB trường
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkbgiaovien">														
																Xem TKB giáo viên
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkblop">														
																Xem TKB lớp
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemtkbphong">														
																Xem TKB phòng học
															</label>
														</fieldset>			
														<fieldset class="radio">
															<label>
																<input type="radio" name="radio" value="" id="xemgiaoviennghi">														
																Xem giáo viên nghỉ
															</label>
														</fieldset>	
													</div>
												</div>							
											</div>

											<div class="card box-shadow-0 border-info bg-transparent" id="cardsangchieu" style="display: none;">
												<div class="card-header bg-transparent" style="padding: 10px">
													<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
													<div class="heading-elements">
														<ul class="list-inline mb-0">
															<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
														</ul>
													</div>
												</div>
												<div class="card-content collapse show" style="" >
													<div class="card-body">
														<fieldset class="radio">
															<label>
																<input type="checkbox" name="radio" value="" class="httkbs">													
																Hiển thị TKB buổi sáng
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="checkbox" name="radio" value="" class="httkbc">														
																Hiển thị TKB buổi chiều
															</label>
														</fieldset>
														<fieldset class="radio">
															<label>
																<input type="checkbox" name="radio" value="" class="httkbsc">												
																Hiển thị TKB cả sáng và chiều
															</label>
														</fieldset>		
													</div>
												</div>							
											</div>

											<div class="card box-shadow-0 border-info bg-transparent" id="cardmaugiaovien" style="display: none;">
												<div class="card-header bg-transparent" style="padding: 10px">
													<a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
													<div class="heading-elements">
														<ul class="list-inline mb-0">
															<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
														</ul>
													</div>
												</div>
												<div class="card-content collapse show" style="" >
													<div class="card-body">
														<table id="tablemaugiaovien" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 300px;width: 100%;">
															<thead class="thead-inverse">
																<tr>
																	<th rowspan="2">STT</th>
																	<th>Tên GV</th>
																	<th rowspan="2">Màu</th>
																</tr>
																<tr>
																	<th><input id="timkiemBidanh" class="input-sm form-control" type="text" /></th>
																</tr>
															</thead>
															<tbody id="banggiaovien"></tbody>	
														</table>
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

				<!-- select thời gian trường -->
				<div class="card" id="cardselectthoigiantruong" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<!-- <h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonggv" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idtruonggv"> -->
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<section>
										<div class="container">
											<label>Chọn thời gian:</label>
											<div class="input-daterange input-group" style="width: 50%;">
												<span class="input-group-addon">Tháng</span>
												<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuantruong" placeholder="Chọn tháng">
												<span class="input-group-addon">Tuần</span>
												<select id="selecttuantruong" name="interested" class="form-control">
					                                <option value="none" selected="" disabled="">--Chọn tuần--
					                                </option><option value="1">Tuần 1
					                                </option><option value="2">Tuần 2
					                                </option><option value="3">Tuần 3
					                                </option><option value="4">Tuần 4
					                                </option>
					                        	</select>
											</div>
											<br>
											<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBTruong">DS thời gian có TKB</button>	
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- xem tkb trường -->
				<div class="card" id="cardxeptkbtruong" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 style="text-align: center;font-size: 20px;" class="card-title" id="titletkbgv">Thời khóa biểu <b><span id="idtentruong" style="color: blue;"></span></b></h4>
						<br>
						<h5 style="text-align: center;font-size: 15px;color: red;"><i><span id="idthangtuantruong"></span></i></h5>
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
										<div class="container" id="view">
											<div id="bangsang">
												<table id="tablexemtkbtruongsang" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 600px;width: 100%;border-collapse: separate;">
													<thead class="thead-inverse" style="background-color: #28386c;color: white;">
														<tr id="phandautabletruongsang"></tr>
													</thead>
													<tbody id="phanthantabletruongsang"></tbody>
														
												</table>
											</div>
											<div id="bangchieu">
												<table id="tablexemtkbtruongchieu" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 600px;width: 100%;border-collapse: separate;">
													<thead class="thead-inverse" style="background-color: #28386c;color: white;">
														<tr id="phandautabletruongchieu"></tr>
													</thead>
													<tbody id="phanthantabletruongchieu"></tbody>
														
												</table>
											</div>
											<div id="bangsangchieu">
												<table id="tablexemtkbtruong" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 600px;width: 100%;border-collapse: separate;">
													<thead style="background-color: #28386c;color: white;"> 
														<tr id="phandautabletruong"></tr>
													</thead>
													<tbody id="phanthantabletruong"></tbody>
														
												</table>
											</div>
										</div>
									</section>
								</div>
							</form>
						</div>
					</div>
				</div>


				<!-- select giáo viên của trường -->
				<div class="card" id="cardselectgv" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<!-- <h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonggv" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idtruonggv"> -->
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
											<div class="input-daterange input-group" style="width: 50%;">
												<span class="input-group-addon">Tháng</span>
												<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuangv" placeholder="Chọn tháng">
												<span class="input-group-addon">Tuần</span>
												<select id="selecttuangv" name="interested" class="form-control">
				                                    <option value="none" selected="" disabled="">--Chọn tuần--
				                                    </option><option value="1">Tuần 1
				                                    </option><option value="2">Tuần 2
				                                    </option><option value="3">Tuần 3
				                                    </option><option value="4">Tuần 4
				                                    </option>
				                            	</select>
											</div>
											<br>
											<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBGv">DS thời gian có TKB</button>	
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- xem tkb giáo viên -->
				<div class="card" id="cardxeptkbgiaovien" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 style="text-align: center;font-size: 20px;" class="card-title" id="titletkbgv">Thời khóa biểu giáo viên: <b><span id="idtengv" style="color: green;"></span></b></h4>
						<br>
						<h5 style="text-align: center;font-size: 15px;"><i><span id="idthangtuangv"></span></i></h5>
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
										<div class="container">
											<table id="tablexemtkbgiaovien" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 100%;width: 100%;border-collapse: separate;">
												<thead class="thead-inverse" style="background-color: #28386c;color: white;">
													<tr id="phandautablegiaovien">
														<th class='stickyThu'>Buổi</th>
														<th class='stickyTiet'>Tiết</th>
														<th id="2" class="classthu">Thứ 2</th>
														<th id="3" class="classthu">Thứ 3</th>
														<th id="4" class="classthu">Thứ 4</th>
														<th id="5" class="classthu">Thứ 5</th>
														<th id="6" class="classthu">Thứ 6</th>
														<th id="7" class="classthu">Thứ 7</th>
													</tr>
												</thead>
												<tbody id="phanthantablegiaovien"></tbody>
											</table>
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
						<!-- <h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonglop" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idtruonglop"> -->
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
											<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBLop">DS thời gian có TKB</button>
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
						<h4 style="text-align: center;font-size: 20px;" class="card-title" id="titletkbgv">Thời khóa biểu lớp: <b><span id="idtenlop" style="color: green;"></span></b></h4>
						<br>
						<h5 style="text-align: center;font-size: 15px;"><i><span id="idthangtuanlop"></span></i></h5>
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
										<div class="container">
											<table id="tablexemtkblop" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 100%;width: 100%;border-collapse: separate;">
												<thead class="thead-inverse" style="background-color: #28386c;color: white;">
													<tr id="phandautablelop">
														<th class='stickyThu'>Buổi</th>
														<th class='stickyTiet'>Tiết</th>
														<th id="2" class="classthu">Thứ 2</th>
														<th id="3" class="classthu">Thứ 3</th>
														<th id="4" class="classthu">Thứ 4</th>
														<th id="5" class="classthu">Thứ 5</th>
														<th id="6" class="classthu">Thứ 6</th>
														<th id="7" class="classthu">Thứ 7</th>
													</tr>
												</thead>
												<tbody id="phanthantablelop"></tbody>
											</table>
										</div>
									</section>
								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- select phòng học của trường -->
				<div class="card" id="cardselectphong" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<!-- <h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruongphong" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idtruongphong"> -->
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<section>
										<div class="container" style="overflow-y: auto; ">
											<div>
												<label>Chọn phòng học:</label>
												<select id="idselectphong" data-live-search="true"></select>
											</div>
											<br>
											<div class="input-daterange input-group" style="width: 50%;">
												<span class="input-group-addon">Tháng</span>
												<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuanphong" placeholder="Chọn tháng">
												<span class="input-group-addon">Tuần</span>
												<select id="selecttuanphong" name="interested" class="form-control">
				                                    <option value="none" selected="" disabled="">--Chọn tuần--
				                                    </option><option value="1">Tuần 1
				                                    </option><option value="2">Tuần 2
				                                    </option><option value="3">Tuần 3
				                                    </option><option value="4">Tuần 4
				                                    </option>
				                            	</select>
											</div>
											<br>
											<button type="button" class="btn btn-success btn-sm" id="btnDSCoTKBPhong">DS thời gian có TKB</button>
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- xem tkb phòng học -->
				<div class="card" id="cardxeptkbphong" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<h4 style="text-align: center;font-size: 20px;" class="card-title" id="titletkbgv">Thời khóa biểu phòng: <b><span id="idtenphong" style="color: green;"></span></b></h4>
						<br>
						<h5 style="text-align: center;font-size: 15px;"><i><span id="idthangtuanphong"></span></i></h5>
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
										<div class="container">
											<table id="tablexemtkbphong" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 100%;width: 100%;border-collapse: separate;">
												<thead class="thead-inverse" style="background-color: #28386c;color: white;">
													<tr id="phandautablephong">
														<th class='stickyThu'>Buổi</th>
														<th class='stickyTiet'>Tiết</th>
														<th id="2" class="classthu">Thứ 2</th>
														<th id="3" class="classthu">Thứ 3</th>
														<th id="4" class="classthu">Thứ 4</th>
														<th id="5" class="classthu">Thứ 5</th>
														<th id="6" class="classthu">Thứ 6</th>
														<th id="7" class="classthu">Thứ 7</th>
													</tr>
												</thead>
												<tbody id="phanthantablephong"></tbody>
											</table>
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- select thời gian giáo viên nghỉ -->
				<div class="card" id="cardselectthoigiangiaoviennghi" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<!-- <h4 class="card-title" id="titletkbgv">Trường: <b><span id="idtentruonggv" style="color: blue;"></span></b></h4>
						<input type="hidden" id="idtruonggv"> -->
					</div>
					<div class="card-content collpase show">
						<div class="card-body">
							<form class="form">
								<div class="form-body">
									<section>
										<div class="container">
											<label>Chọn thời gian:</label>
											<div class="input-daterange input-group" style="width: 50%;">
												<span class="input-group-addon">Tháng</span>
												<input type="text" class="form-control-sm form-control" name="start" value="" id="datepickerthangtuangiaoviennghi" placeholder="Chọn tháng">
												<span class="input-group-addon">Tuần</span>
												<select id="selecttuangiaoviennghi" name="interested" class="form-control">
					                                <option value="none" selected="" disabled="">--Chọn tuần--
					                                </option><option value="1">Tuần 1
					                                </option><option value="2">Tuần 2
					                                </option><option value="3">Tuần 3
					                                </option><option value="4">Tuần 4
					                                </option>
					                        	</select>
											</div>
											<br>
											<button type="button" class="btn btn-success btn-sm" id="btnDSCoGvNghi">DS thời gian có giáo viên nghỉ</button>	
										</div>
									</section>

								</div>
							</form>
						</div>
					</div>
				</div>

				<!-- xem giáo viên nghỉ -->
				<div class="card" id="cardxepgiaoviennghi" style="display: none;">
					<div class="card-header" style="padding: 10px">
						<!-- <h4 style="text-align: center;font-size: 20px;" class="card-title" id="titletkbgv">Thời khóa biểu phòng: <b><span id="idtenphong" style="color: green;"></span></b></h4>
						<br> -->
						<h5 style="text-align: center;font-size: 15px;color: red;"><i><span id="idthangtuangiaoviennghi"></span></i></h5>
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
										<div class="container">
											<table id="tablexemgiaoviennghi" class="table table-striped table-bordered dataex-key-basic table-responsive display nowrap" style="overflow-y: auto; height: 100%;width: 100%;border-collapse: separate;">
												<thead class="thead-inverse" style="background-color: #28386c;color: white;">
													<tr id="phandautablegiaoviennghi">
														<th class='stickyThu' style="position: sticky;position: -webkit-sticky;background-color: #28386c;z-index: 10;width: 100px;min-width: 100px;max-width: 100px;left: 0px;">Buổi</th>
														<th id="2" class="classthugiaoviennghi">Thứ 2</th>
														<th id="3" class="classthugiaoviennghi">Thứ 3</th>
														<th id="4" class="classthugiaoviennghi">Thứ 4</th>
														<th id="5" class="classthugiaoviennghi">Thứ 5</th>
														<th id="6" class="classthugiaoviennghi">Thứ 6</th>
														<th id="7" class="classthugiaoviennghi">Thứ 7</th>
													</tr>
												</thead>
												<tbody id="phanthantablegiaoviennghi"></tbody>
											</table>
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

<!-- modal danh sách thời gian có thời khoá biểu trường -->
<div class="modal fade text-left" id="modalDsCoTKBTruong" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBTruong">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBTruong" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBTruong">
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

<!-- modal danh sách thời gian có thời khoá biểu giáo viên-->
<div class="modal fade text-left" id="modalDsCoTKBGv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBGv">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBGv" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBGv">
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

<!-- modal danh sách thời gian có thời khoá biểu lớp-->
<div class="modal fade text-left" id="modalDsCoTKBLop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBLop">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBLop" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBLop">
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

<!-- modal danh sách thời gian có thời khoá biểu phòng học-->
<div class="modal fade text-left" id="modalDsCoTKBPhong" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có thời khoá biểu</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoTKBPhong">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoTKBPhong" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoTKBPhong">
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

<!-- modal danh sách thời gian có giáo viên nghỉ-->
<div class="modal fade text-left" id="modalDsCoGvNghi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel15" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document" style="min-width: auto;max-width: fit-content;">
		<div class="modal-content">
			<div class="modal-header bg-success white">
				<h4 class="modal-title white" id="myModalLabel15">Thời gian có giáo viên nghỉ</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModalDSCoGvNghi">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12 col-lg-12" style="overflow: auto; height: 500px; width: 1000px;">
								<table id="tableDsCoGvNghi" class="table table-striped table-bordered" style="border-collapse: separate;">
									<thead>
										<tr>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">STT</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;">Thời gian</th>
											<th style="background-color: #4682B4;color: white;position: sticky;top: 0;z-index: 1;"></th>
										</tr>
									</thead>
									<tbody id="bodyDSCoGvNghi">
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
	// setTimeout(function() {
	// 	$('#changegv').trigger('click');
	// },500);

	$("#xemtkbtruong").change(function () {
		//radio chọn xem tkb
		$("#xemtkbgiaovien").prop("checked", false);
		$("#xemtkblop").prop("checked", false);
		$("#xemtkbphong").prop("checked", false);
		$("#xemgiaoviennghi").prop("checked", false);
		//thời khoá biểu
		document.getElementById("cardxeptkbtruong").style.display = "none";
		document.getElementById("cardxeptkbgiaovien").style.display = "none";
		document.getElementById("cardxeptkblop").style.display = "none";
		document.getElementById("cardxeptkbphong").style.display = "none";
		document.getElementById("cardxepgiaoviennghi").style.display = "none";
		//select
		document.getElementById("cardselectthoigiantruong").style.display = "block";
		document.getElementById("cardselectgv").style.display = "none";
		document.getElementById("cardselectlop").style.display = "none";
		document.getElementById("cardselectphong").style.display = "none";
		document.getElementById("cardselectthoigiangiaoviennghi").style.display = "none";
		//radio tkb trường sáng, chiều, cả buổi
		document.getElementById("cardsangchieu").style.display = "block";
	});

	$("#xemtkbgiaovien").change(function () {
		//radio chọn xem tkb
		$("#xemtkbtruong").prop("checked", false);
		$("#xemtkblop").prop("checked", false);
		$("#xemtkbphong").prop("checked", false);
		$("#xemgiaoviennghi").prop("checked", false);
		//thời khoá biểu
		document.getElementById("cardxeptkbtruong").style.display = "none";			
		document.getElementById("cardxeptkblop").style.display = "none";
		document.getElementById("cardxeptkbphong").style.display = "none";
		document.getElementById("cardxepgiaoviennghi").style.display = "none";
		//select
		document.getElementById("cardselectthoigiantruong").style.display = "none";
		document.getElementById("cardselectgv").style.display = "block";
		document.getElementById("cardselectlop").style.display = "none";
		document.getElementById("cardselectphong").style.display = "none";
		document.getElementById("cardselectthoigiangiaoviennghi").style.display = "none";
		//radio tkb trường sáng, chiều, cả buổi
		document.getElementById("cardsangchieu").style.display = "none";
		//table màu giáo viên tkb trường
		document.getElementById("cardmaugiaovien").style.display = "none";
	});

	$("#xemtkblop").change(function () {
		//radio chọn xem tkb
		$("#xemtkbgiaovien").prop("checked", false);
		$("#xemtkbtruong").prop("checked", false);
		$("#xemtkbphong").prop("checked", false);
		$("#xemgiaoviennghi").prop("checked", false);
		//thời khoá biểu
		document.getElementById("cardxeptkbtruong").style.display = "none";
		document.getElementById("cardxeptkbgiaovien").style.display = "none";
		document.getElementById("cardxeptkbphong").style.display = "none";
		document.getElementById("cardxepgiaoviennghi").style.display = "none";
		//select
		document.getElementById("cardselectthoigiantruong").style.display = "none";
		document.getElementById("cardselectgv").style.display = "none";
		document.getElementById("cardselectlop").style.display = "block";
		document.getElementById("cardselectphong").style.display = "none";
		document.getElementById("cardselectthoigiangiaoviennghi").style.display = "none";
		//radio tkb trường sáng, chiều, cả buổi
		document.getElementById("cardsangchieu").style.display = "none";
		//table màu giáo viên tkb trường
		document.getElementById("cardmaugiaovien").style.display = "none";
	});

	$("#xemtkbphong").change(function () {
		//radio chọn xem tkb
		$("#xemtkbtruong").prop("checked", false);
		$("#xemtkblop").prop("checked", false);
		$("#xemtkbgiaovien").prop("checked", false);
		$("#xemgiaoviennghi").prop("checked", false);
		//thời khoá biểu
		document.getElementById("cardxeptkbtruong").style.display = "none";		
		document.getElementById("cardxeptkblop").style.display = "none";
		document.getElementById("cardxeptkbgiaovien").style.display = "none";
		document.getElementById("cardxepgiaoviennghi").style.display = "none";
		//select
		document.getElementById("cardselectthoigiantruong").style.display = "none";
		document.getElementById("cardselectgv").style.display = "none";
		document.getElementById("cardselectphong").style.display = "block";
		document.getElementById("cardselectlop").style.display = "none";
		document.getElementById("cardselectthoigiangiaoviennghi").style.display = "none";
		//radio tkb trường sáng, chiều, cả buổi
		document.getElementById("cardsangchieu").style.display = "none";
		//table màu giáo viên tkb trường
		document.getElementById("cardmaugiaovien").style.display = "none";
	});

	$("#xemgiaoviennghi").change(function () {
		//radio chọn xem tkb
		$("#xemtkbtruong").prop("checked", false);
		$("#xemtkblop").prop("checked", false);
		$("#xemtkbgiaovien").prop("checked", false);
		$("#xemtkbphong").prop("checked", false);
		//thời khoá biểu
		document.getElementById("cardxeptkbtruong").style.display = "none";		
		document.getElementById("cardxeptkblop").style.display = "none";
		document.getElementById("cardxeptkbgiaovien").style.display = "none";
		document.getElementById("cardxeptkbphong").style.display = "none";
		//select
		document.getElementById("cardselectthoigiantruong").style.display = "none";
		document.getElementById("cardselectgv").style.display = "none";
		document.getElementById("cardselectphong").style.display = "none";
		document.getElementById("cardselectlop").style.display = "none";
		document.getElementById("cardselectthoigiangiaoviennghi").style.display = "block";
		//radio tkb trường sáng, chiều, cả buổi
		document.getElementById("cardsangchieu").style.display = "none";
		//table màu giáo viên tkb trường
		document.getElementById("cardmaugiaovien").style.display = "none";
	});


</script>

<link rel="stylesheet" href="{{asset('css/xemtkb/styleXemtkb.css')}}">
<script type="text/javascript" src="{{asset('js/xemtkb/xemtkb.js')}}"></script>
@endsection