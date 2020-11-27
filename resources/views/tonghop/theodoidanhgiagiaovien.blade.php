@extends('master')
@section('title','Đánh giá giáo viên ')
@section('content')

<dir class="row" style="padding: 0;margin: 0">

	<dir class="col-md-12" style="margin: 0;padding: 2px">
		<div class="card">
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
	</dir>

	<dir class="col-md-12" style="margin: 0;padding: 2px">
		<div class="card">
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
	</dir>
</dir>

<script type="text/javascript" src="{{asset('js/tonghop/theodoidanhgiagiaovien.js')}}"></script>
@endsection