@extends('master')
@section('title','Theo dõi báo cáo đơn vị')
@section('content')

<!-- danh sách báo cáo -->
<dir class="row" style="padding: 0;margin: 0" id="tabletruong">
	<dir class="col-md-12" style="margin: 0;padding: 2px">
		<div class="card">
			<div class="card-header" style="padding: 10px">
				<h4 class="card-title">Danh sách thông báo</h4>
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
							<div id="girddsthongbao"></div>   
						</div>
					</form>
				</div>
			</div>
		</div>
	</dir>

</dir>


<!-- modal thông tin chung thông báo -->
<div class="modal fade text-left" id="modalthongtinchung" tabindex="-1" role="dialog" aria-labelledby="myModalLabel16" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-success white">
                <h5 class="modal-title" style="color: white;">Thông tin chung</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="form form-horizontal form-bordered">
                    <div class="form-body">
                        <h4 class="form-section"><i class="fa fa-info-circle"></i> Chi tiết thông báo</h4>
                        <div class="form-group row">
                            <label class="col-md-3 label-control" for="projectinput1">Loại thông báo</label>
                            <div class="col-md-9">
                                <input type="text" id="idloaixem" class="form-control" name="fname" disabled="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 label-control" for="projectinput2">Số/ký hiệu</label>
                            <div class="col-md-9">
                                <input type="text"  id="idsohieuxem" class="form-control" name="lname" disabled="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 label-control" for="projectinput3">Tiêu đề</label>
                            <div class="col-md-9">
                                <input type="text" id="idtieudexem" class="form-control" name="email" disabled="">
                            </div>
                        </div>

                        <div class="form-group row" id="formngaygui" >
                            <label class="col-md-3 label-control" for="projectinput4">Ngày gửi</label>
                            <div class="col-md-9">
                                <input type="text" id="idngayguixem" class="form-control" name="phone" disabled="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 label-control">Tập tin đính kèm</label>
                            <div class="col-md-9">
                                <label id="projectinput8" class="file center-block">
                                    <!-- <input type="file" id="file"> -->
                                    <div id="filedinhkem"></div>
                                    <!-- <span class="file-custom"><a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">File1</a></span>
                                    <br>
                                    <span class="file-custom"><a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">File2</a></span> -->
                                </label>
                            </div>
                        </div>

                        <div class="form-group row last">
                            <label class="col-md-3 label-control" for="projectinput4">Nội dung</label>
                            <div class="col-md-9">
                                <textarea id="idnoidungxem" rows="5" class="form-control" name="comment" disabled=""></textarea>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="{{asset('js/thongbao/thongbao.js')}}"></script>


@endsection