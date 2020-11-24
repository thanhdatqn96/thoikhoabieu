@extends('master')
@section('title','Tinh chỉnh ')
@section('content')

<dir class="row" style="padding: 0;margin: 0">

	<dir class="col-md-12" style="margin: 0;padding: 2px">
		<div class="card">
			<div class="card-header" style="padding: 10px">
				<!-- <h4 class="card-title" style="padding-left: 10px"></h4>
				<a class="heading-elements-toggle" ><i class="fa fa-ellipsis-v font-medium-3"></i></a>
				<div class="heading-elements" style="top: 10px">
					<ul class="list-inline mb-0">
						<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
						<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
					</ul>
				</div> -->
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
	</dir>

	<dir class="col-md-12" style="margin: 0;padding: 2px">
		<div class="card">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title" style="padding-left: 10px">Đánh giá giáo viên</h4>
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
									<div id="girddanhgiagiaovien"></div>
								</div>						
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>
</dir>

<script type="text/javascript" src="js/tinhchinh/tinhchinh.js"></script>
@endsection