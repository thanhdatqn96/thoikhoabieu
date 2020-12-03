<?php

namespace App\Http\Controllers\tonghop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\truong;
use App\danhsachlophoc;
use App\danhsachgv;
use App\khoihoc;
use App\phancongchuyenmon;
use App\monhoc;
use App\phonghoc;
use App\thongbao;
use App\User;
use App\thoikhoabieu;
use App\danhgiagv;
use App\tochuyenmon;
use App\giaovien_chuyenmon;
use App\ketquadanhgiagv;
use Auth;
use DB;
use stdClass;
use Carbon;
use App\baocao;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class tonghopController extends Controller
{
	
	//xem thời khoá biểu
	public function xemthoikhoabieu()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable'])->addStyles(['style-macdinh','style-dev','style-datatable']);
		return view('tonghop.xemthoikhoabieu');
	}

	//thống kê
	public function thongke()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable'])->addStyles(['style-macdinh','style-dev','style-datatable']);
		return view('tonghop.thongke');
	}

	//theo dõi biến động thời khoá biểu
	public function theodoibiendongtkb()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable','js-datepicker','js-moment'])->addStyles(['style-macdinh','style-dev','style-datatable','style-datepicker']);
		return view('tonghop.theodoibiendongtkb');
	}

	//theo dõi báo cáo đơn vị
	public function theodoibaocaodonvi()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable'])->addStyles(['style-macdinh','style-dev','style-datatable']);
		return view('tonghop.theodoibaocaodonvi');
	}

	//theo dõi đánh giá giáo viên
	public function theodoidanhgiagiaovien()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable'])->addStyles(['style-macdinh','style-dev','style-datatable']);
		return view('tonghop.theodoidanhgiagiaovien');
	}

	//thông báo
	public function thongbao()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable','js-datepicker','js-moment'])->addStyles(['style-macdinh','style-dev','style-datatable','style-datepicker']);
		return view('tonghop.thongbao');
	}


	//lấy danh sách trường
	public function getdstruong(){
		$mahuyen = Auth::user()->mahuyen;
		$data = [];
		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();
		foreach ($truong as $t) {
            $dstruong = new stdClass();
            $dstruong->matruong = $t->matruong;
            $dstruong->tentruong = $t->tentruong;
            $dstruong->mahuyen = $t->mahuyen;
            $dstruong->caphoc = $t->caphoc;
            $dstruong->loaitruong = $t->loaitruong;
            $lop = danhsachlophoc::where('matruong', '=',  $t->matruong)->select('id','tenlop','khoi')->orderBy('tenlop', 'ASC')->get();
            $gv = danhsachgv::where('matruong','=', $t->matruong)->select('id','hovaten','bidanh','dienthoai','email')->get();
            $khoi = khoihoc::where('matruong','=', $t->matruong)->select('id','tenkhoi')->orderBy('tenkhoi', 'ASC')->get();
            $phonghoc = phonghoc::where('matruong','=', $t->matruong)->select('id','tenphong')->orderBy('tenphong', 'ASC')->get();
            $demlop = count($lop);
            $demgv = count($gv);
            $dstruong->demdslop = $demlop;
            $dstruong->demdsgv = $demgv;
            $dstruong->danhsachlop = $lop;
            $dstruong->danhsachgv = $gv;
            $dstruong->danhsachkhoihoc = $khoi;
            $dstruong->danhsachphonghoc = $phonghoc;
            array_push($data, $dstruong);
        }
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	//lấy danh sách giáo viên phân công giảng dạy
	public function getdsgvpcgd(){
		$mahuyen = Auth::user()->mahuyen;
		$data = [];
		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();
		foreach($truong as $t){
			$dstruong = new stdClass();
            $dstruong->matruong = $t->matruong;
            $dstruong->tentruong = $t->tentruong;
            $dstruong->mahuyen = $t->mahuyen;
            $dstruong->caphoc = $t->caphoc;
            $dstruong->loaitruong = $t->loaitruong;

            $datapcgd =  danhsachgv::where('matruong', '=',  $t->matruong)->with(['monhoc'=>function($author){
				$author->select('monhoc.id','monhoc.tenmonhoc','phancongchuyenmon.malop','phancongchuyenmon.magiaovien','phancongchuyenmon.mamonhoc','phancongchuyenmon.sotiet');
				$author->with(['danhsachlophoc'=>function($to){
					$to->select('danhsachlophoc.id','danhsachlophoc.tenlop');
				}]);
			}])
			->select('id','hovaten','bidanh','matruong')
			->get();

			$dataphonghoc = phonghoc::where('matruong','=', $t->matruong)
			->select('id','tenphong','matruong')
			->get();

			$dstruong->danhsachgv = $datapcgd;
			$dstruong->phonghoc = $dataphonghoc;
			array_push($data, $dstruong);
		}
		
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	//lấy danh sách thông báo
	public function getdsthongbao(){
		$iduser = Auth::user()->id;
		$thongbao = DB::table('thongbao')
		->join('tbl_admin','tbl_admin.id','=','thongbao.tbl_admin_id')
		->select('thongbao.id','thongbao.truong_id','thongbao.tbl_admin_id','thongbao.sohieu','thongbao.tieude','thongbao.loai','thongbao.ngaytao','thongbao.ngaygui','thongbao.file','thongbao.noidung','thongbao.gui','thongbao.trangthai','tbl_admin.tentaikhoan')
		->where('thongbao.tbl_admin_id',$iduser)
		->get();

		$data = [];
		foreach($thongbao as $t){
			$dstb = new stdClass();
			$dstb->id = $t->id;
			$dstb->sohieu = $t->sohieu;
			$dstb->tieude = $t->tieude;
			$dstb->loai = $t->loai;
			$dstb->ngaytao = $t->ngaytao;
			$dstb->ngaygui = $t->ngaygui;
			$dstb->file = $t->file;
			$dstb->noidung = $t->noidung;
			$dstb->gui = $t->gui;
			$dstb->trangthai = $t->trangthai;
			$dstb->tentaikhoan = $t->tentaikhoan;
			$idtruong = json_decode($t->truong_id);
			$datatruong = explode(",", $idtruong);
			for($i=0;$i<count($datatruong);$i++){
				$truong = truong::where('matruong','=', $datatruong[$i])->select('matruong','tentruong')->get();
				$dstb->truong[] = $truong;
			}
			array_push($data, $dstb);
		}

		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	//thêm mới thông báo
	public function addthongbao(Request $rq){
		// $Str = addslashes($iddonvi);
		// $iddonvijson = json_encode($iddonvi);
		$ngaytaofirst = strtr( $rq->idngaytao, '/', '-');
		$ngaytaoformat = date('Y-m-d', strtotime($ngaytaofirst));
		$tenfile = [];
		if(isset($_FILES['file'])){
	        if($_FILES['file']['name'] !=''){
	            $date = getdate();
	            $name_array = $_FILES['file']['name'];
	            $tmp_name_array = $_FILES['file']['tmp_name'];
	            $type_array = $_FILES['file']['type'];
	            $size_array = $_FILES['file']['size'];
	            $error_array = $_FILES['file']['error'];
                $file_name=$date['mday'].'_'.$date['mon'].'_'.$date['year'].'_'.rand(10,1000).'_'.$name_array;
                array_push($tenfile, $file_name);
                move_uploaded_file($tmp_name_array, public_path('uploads/thongbao/').$file_name);
	        }         
	    }    
		if($rq->iddonvi !=''){
			// for($i=0;$i<count($iddonvi);$i++){
			$thongbao = new thongbao();
			$thongbao->truong_id = json_encode($rq->iddonvi);
			$thongbao->tbl_admin_id = Auth::user()->id;
			$thongbao->sohieu = $rq->idsohieu;
			$thongbao->tieude = $rq->idtieude;
			$thongbao->loai = $rq->idloai;
			$thongbao->ngaytao = $ngaytaoformat;
			$thongbao->ngaygui = null;
			if($tenfile != null){
				$thongbao->file = $tenfile[0];
			}else{
				$thongbao->file = '';
			} 
		    $thongbao->noidung = $rq->idnoidung;
		    $thongbao->gui = 0;
		    $thongbao->trangthai = 0;
		    $thongbao->save();    
			// }
		}else{
			$thongbao = new thongbao();
			$thongbao->truong_id = json_encode($rq->idcaphocall);
			$thongbao->tbl_admin_id = Auth::user()->id;
			$thongbao->sohieu = $rq->idsohieu;
			$thongbao->tieude = $rq->idtieude;
			$thongbao->loai = $rq->idloai;
			$thongbao->ngaytao = $ngaytaoformat;
			$thongbao->ngaygui = null;
			if($tenfile != null){
				$thongbao->file = $tenfile[0];
			}else{
				$thongbao->file = '';
			} 
		    $thongbao->noidung = $rq->idnoidung;
		    $thongbao->gui = 0;
		    $thongbao->trangthai = 0;
		    $thongbao->save(); 
		}
		$success = 1;
		return json_encode($success);
	}

	//sửa thông báo
	public function updatethongbao(Request $rq){
		// $Str = addslashes($iddonvi);
		// $iddonvijson = json_encode($iddonvi);
		$ngaytaofirst = strtr( $rq->idngaytao, '/', '-');
		$ngaytaoformat = date('Y-m-d', strtotime($ngaytaofirst));
		$tenfile = [];
		if(isset($_FILES['file'])){
	        if($_FILES['file']['name'] !=''){
	            $date = getdate();
	            $name_array = $_FILES['file']['name'];
	            $tmp_name_array = $_FILES['file']['tmp_name'];
	            $type_array = $_FILES['file']['type'];
	            $size_array = $_FILES['file']['size'];
	            $error_array = $_FILES['file']['error'];
                $file_name=$date['mday'].'_'.$date['mon'].'_'.$date['year'].'_'.rand(10,1000).'_'.$name_array;
                array_push($tenfile, $file_name);
                move_uploaded_file($tmp_name_array, public_path('uploads/thongbao/').$file_name);
	        }         
	    }    
		if($rq->iddonvi !=''){
			// for($i=0;$i<count($iddonvi);$i++){
			$thongbao = thongbao::find($rq->idthongbao);	
			$thongbao->truong_id = json_encode($rq->iddonvi);
			$thongbao->tbl_admin_id = Auth::user()->id;
			$thongbao->sohieu = $rq->idsohieu;
			$thongbao->tieude = $rq->idtieude;
			$thongbao->loai = $rq->idloai;
			$thongbao->ngaytao = $ngaytaoformat;
			if($tenfile != null){
				$thongbao->file = $tenfile[0];
			} 
		    $thongbao->noidung = $rq->idnoidung;
		    $thongbao->update();    
			// }
		}else{
			$thongbao = thongbao::find($rq->idthongbao);
			$thongbao->truong_id = json_encode($rq->idcaphocall);
			$thongbao->tbl_admin_id = Auth::user()->id;
			$thongbao->sohieu = $rq->idsohieu;
			$thongbao->tieude = $rq->idtieude;
			$thongbao->loai = $rq->idloai;
			$thongbao->ngaytao = $ngaytaoformat;
			$thongbao->ngaygui = null;
			if($tenfile != null){
				$thongbao->file = $tenfile[0];
			}
		    $thongbao->noidung = $rq->idnoidung;
		    $thongbao->update(); 
		}
		$success = 1;
		return json_encode($success);
	}

	//xoá thông báo 
	public function delthongbao(Request $rq)
	{	

		thongbao::destroy($rq->idthongbao);
		$success = 1;
		return json_encode($success);
	}

	//gửi thông báo 
	public function sendthongbao(Request $rq)
	{	
		$ngayhientai = date("Y-m-d");
		$thongbao = thongbao::find($rq->idthongbao);
		$thongbao->gui = 1;
		$thongbao->ngaygui = $ngayhientai;
		$thongbao->update();  
		$success = 1;
		return json_encode($success);
	}

	//thu hồi thông báo 
	public function thuhoithongbao(Request $rq)
	{	
		$thongbao = thongbao::find($rq->idthongbao);
		$thongbao->gui = 0;
		$thongbao->ngaygui = null;
		$thongbao->update();  
		$success = 1;
		return json_encode($success);
	}

	//get thời khoá biểu trường theo thời gian
	public function getthoikhoabieutruong($matruong){

		$mahuyen = Auth::user()->mahuyen;

		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();

	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.tuan','thoikhoabieu.created_at')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();
	 	// dd($thoikhoabieu);

	 	$dataLoc = [];

	 	foreach($truong as $t){
	 		foreach($thoikhoabieu as $tkb){
	 			if($t->matruong == $tkb->matruong){
	 				$tkbLoc = new stdClass();
	 				$tkbLoc->bidanh = $tkb->bidanh;
	 				$tkbLoc->tenlop = $tkb->tenlop;
	 				$tkbLoc->tenmonhoc = $tkb->tenmonhoc;
	 				$tkbLoc->magiaovien = $tkb->magiaovien;
	 				$tkbLoc->malop = $tkb->malop;
	 				$tkbLoc->mamonhoc = $tkb->mamonhoc;
	 				$tkbLoc->buoi = $tkb->buoi;
	 				$tkbLoc->thu = $tkb->thu;
	 				$tkbLoc->tiet = $tkb->tiet;
	 				$tkbLoc->maphong = $tkb->maphong;
	 				$tkbLoc->matruong = $tkb->matruong;
	 				$tkbLoc->tuan = $tkb->tuan;
	 				$tkbLoc->created_at = $tkb->created_at;
		 			array_push($dataLoc,$tkbLoc);
	 			}
	 			
	 		}
	 		
	 	}

	 	$buoithu = array(
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>2,
	 			"tenbuoithu"=>"Sáng thứ 2"
	 		),
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>3,
	 			"tenbuoithu"=>"Sáng thứ 3"
	 		),
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>4,
	 			"tenbuoithu"=>"Sáng thứ 4"
	 		),
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>5,
	 			"tenbuoithu"=>"Sáng thứ 5"
	 		),
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>6,
	 			"tenbuoithu"=>"Sáng thứ 6"
	 		),
	 		array(
	 			'idbuoi'=>0,
	 			'idthu'=>7,
	 			"tenbuoithu"=>"Sáng thứ 7"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>2,
	 			"tenbuoithu"=>"Chiều thứ 2"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>3,
	 			"tenbuoithu"=>"Chiều thứ 3"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>4,
	 			"tenbuoithu"=>"Chiều thứ 4"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>5,
	 			"tenbuoithu"=>"Chiều thứ 5"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>6,
	 			"tenbuoithu"=>"Chiều thứ 6"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			'idthu'=>7,
	 			"tenbuoithu"=>"Chiều thứ 7"
	 		)
	 	);

	 	$databt= array();
		foreach($dataLoc as $t){
			foreach($buoithu as $b){
				if($t->buoi == $b['idbuoi'] && $t->thu == $b['idthu']){
					$bt = $b['idbuoi'].','.$b['idthu'];
					$mabuoi = $b['idbuoi'];
					$datetime = date_parse_from_format('Y-m-d', $t->created_at);
					$thang = $datetime['month'];
					$nam = $datetime['year'];
					array_push($databt,array('matruong'=>$t->matruong,'magiaovien'=>$t->magiaovien,'malop'=>$t->malop,'mamonhoc'=>$t->mamonhoc,'maphong'=>$t->maphong,'mabuoithu'=>$bt,'mabuoi'=>$mabuoi,'bidanh'=>$t->bidanh,'tenlop'=>$t->tenlop,'tenmonhoc'=>$t->tenmonhoc,'tiet'=>$t->tiet,'tenbuoithu'=>$b['tenbuoithu'],'tuan'=>$t->tuan,'thang'=>$thang,'nam'=>$nam));
				}
			}
		}

		$grouped = [];
		foreach($databt as $d){
			$matruong = $d['matruong'];
			$nam = $d['nam'];
			$thang = $d['thang'];
			$tuan = $d['tuan'];
			$mabuoithu = $d['mabuoithu'];
			$tiet = $d['tiet'];
			$malop = $d['malop'];
			$mamonhoc = $d['mamonhoc'];
			$magiaovien = $d['magiaovien'];
			$grouped[$matruong][$nam][$thang][$tuan][$mabuoithu][$tiet][$malop][$mamonhoc][$magiaovien][] = $d;
		}

		$new_data_tkb = [];
		foreach($grouped as $k=>$v){
			$datanam = [];
			foreach ($v as $k1 => $v1) {
				$datathang = [];
				foreach ($v1 as $k2 => $v2) {
					$datatuan = [];
					foreach ($v2 as $k3 => $v3) {
						$databuoithu = [];		
						foreach($v3 as $k4=>$v4){
							$datatiet = [];
							$mabuoi;
							$tenbuoithu;
							foreach($v4 as $k5=>$v5){
								$datalop = [];
								foreach($v5 as $k6=>$v6){
									$datamh = [];
									$tenlop;
									foreach($v6 as $k7=>$v7){
										$datagv = [];
										$tenmonhoc;
										foreach($v7 as $k8=>$v8){
											$tenbuoithu = $v8[0]['tenbuoithu'];
											$mabuoi= $v8[0]['mabuoi'];
											$tenlop= $v8[0]['tenlop'];
											$bidanh= $v8[0]['bidanh'];
											$tenmonhoc= $v8[0]['tenmonhoc'];
											array_push($datagv,array('magiaovien' => $k8,'bidanh' => $bidanh));
										}
										array_push($datamh,array('mamonhoc' => $k7, 'tenmonhoc' => $tenmonhoc ,'dsgiaovien'=>$datagv));
									}
									array_push($datalop,array('malop' => $k6, 'tenlop' => $tenlop ,'dsmonhoc'=>$datamh));
								}
								array_push($datatiet,array('tiet' => $k5, 'dslop'=>$datalop));
							}
							array_push($databuoithu,array('mabuoithu' => $k4,'mabuoi' => $mabuoi,'tenbuoithu' => $tenbuoithu ,'dstiet'=>$datatiet));			
						}
						array_push($datatuan,array('tuan' => $k3,'dsbuoithu' => $databuoithu));	
					}
					array_push($datathang,array('thang' => $k2,'dstuan'=>$datatuan));
				}
				array_push($datanam,array('nam' => $k1,'dsthang'=>$datathang));
			}
			$new_data_tkb[] = array('matruong' => $k, 'dsnam'=> $datanam);
		}

		return json_encode($new_data_tkb, JSON_UNESCAPED_UNICODE);
	}

	//get danh sách lớp tkb trường theo thời gian
	public function getdsloptruong($matruong){

		$mahuyen = Auth::user()->mahuyen;

		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();

		$danhsachlophoc = danhsachlophoc::orderBy('tenlop', 'ASC')->where('matruong',$matruong)->get();

	 	$dataLoc = [];

	 	foreach($truong as $t){
	 		foreach($danhsachlophoc as $dslh){
	 			if($t->matruong == $dslh->matruong){
	 				$lopLoc = new stdClass();
	 				$lopLoc->id = $dslh->id;
	 				$lopLoc->tenlop = $dslh->tenlop;
	 				$lopLoc->khoi = $dslh->khoi;
	 				$lopLoc->thutuhienthi = $dslh->thutuhienthi;
	 				$lopLoc->matruong = $dslh->matruong;
		 			array_push($dataLoc,$lopLoc);
	 			}
	 			
	 		}
	 		
	 	}
		$datadslop = [];
		foreach($dataLoc as $d){
			array_push($datadslop,array('matruong'=>$d->matruong,'malop'=>$d->id,'tenlop'=>$d->tenlop));
		}
		foreach($datadslop as $d){
			$matruong = $d['matruong'];
			$groupedmatruong[$matruong][] = $d;
		}

	 	foreach($groupedmatruong as $k =>$g){
	 		$datamatenlop = [];
	 		foreach($g as $gv){
	 			array_push($datamatenlop,array('malop'=>$gv['malop'],'tenlop'=>$gv['tenlop']));
	 		}
	 		$new_datadslop[] = array('matruong'=>$k,'dslop'=>$datamatenlop);
	 	}
	 	return json_encode($new_datadslop, JSON_UNESCAPED_UNICODE);
	}

	//get thời khoá phòng học
	public function getthoikhoabieuphong($matruong){

		$mahuyen = Auth::user()->mahuyen;

		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();

	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('phonghoc','phonghoc.id','thoikhoabieu.maphong')
	 	->where('thoikhoabieu.maphong','!=',0)
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->select('danhsachgv.bidanh','monhoc.tenmonhoc','phonghoc.tenphong','thoikhoabieu.magiaovien','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan','thoikhoabieu.malop','danhsachlophoc.tenlop')
	 	->get();

	 	$dataLoc = [];

	 	foreach($truong as $t){
	 		foreach($thoikhoabieu as $tkb){
	 			if($t->matruong == $tkb->matruong){
	 				$tkbLoc = new stdClass();
	 				$tkbLoc->bidanh = $tkb->bidanh;
	 				$tkbLoc->tenmonhoc = $tkb->tenmonhoc;
	 				$tkbLoc->tenphong = $tkb->tenphong;
	 				$tkbLoc->magiaovien = $tkb->magiaovien;
	 				$tkbLoc->mamonhoc = $tkb->mamonhoc;
	 				$tkbLoc->buoi = $tkb->buoi;
	 				$tkbLoc->thu = $tkb->thu;
	 				$tkbLoc->tiet = $tkb->tiet;
	 				$tkbLoc->maphong = $tkb->maphong;
	 				$tkbLoc->matruong = $tkb->matruong;
	 				$tkbLoc->tuan = $tkb->tuan;
	 				$tkbLoc->created_at = $tkb->created_at;
	 				$tkbLoc->malop = $tkb->malop;
	 				$tkbLoc->tenlop = $tkb->tenlop;
		 			array_push($dataLoc,$tkbLoc);
	 			}
	 			
	 		}
	 		
	 	}

	 	$buoi = array(
	 		array(
	 			'idbuoi'=>0,
	 			"tenbuoi"=>"Sáng"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			"tenbuoi"=>"Chiều"
	 		)
	 	);

	 	$thu = array(
	 		array(
	 			'idthu'=>2,
	 			"tenthu"=>"Thứ 2"
	 		),
	 		array(
	 			'idthu'=>3,
	 			"tenthu"=>"Thứ 3"
	 		),
	 		array(
	 			'idthu'=>4,
	 			"tenthu"=>"Thứ 4"
	 		),
	 		array(
	 			'idthu'=>5,
	 			"tenthu"=>"Thứ 5"
	 		),
	 		array(
	 			'idthu'=>6,
	 			"tenthu"=>"Thứ 6"
	 		),
	 		array(
	 			'idthu'=>7,
	 			"tenthu"=>"Thứ 7"
	 		),
	 	);

	 	$databt= array();
		foreach($dataLoc as $t){
			foreach($buoi as $b){
				foreach($thu as $k){
					if($t->buoi == $b['idbuoi'] && $t->thu == $k['idthu']){
						$datetime = date_parse_from_format('Y-m-d', $t->created_at);
						$thang = $datetime['month'];
						$nam = $datetime['year'];
						array_push($databt,array('matruong'=>$t->matruong,'magiaovien'=>$t->magiaovien,'mamonhoc'=>$t->mamonhoc,'maphong'=>$t->maphong,'mabuoi'=>$b['idbuoi'],'mathu'=>$k['idthu'],'bidanh'=>$t->bidanh,'tenmonhoc'=>$t->tenmonhoc,'tenphong'=>$t->tenphong,'tiet'=>$t->tiet,'tenbuoi'=>$b['tenbuoi'],'tenthu'=>$k['tenthu'],'nam'=>$nam,'thang'=>$thang,'tuan'=>$t->tuan,'malop'=>$t->malop,'tenlop'=>$t->tenlop));
					}
				}
				
			}
		}

		$grouped = [];

		foreach($databt as $d){
			$matruong = $d['matruong'];
			$maphong = $d['maphong'];
			$nam = $d['nam'];
			$thang = $d['thang'];
			$tuan = $d['tuan'];
			$mabuoi = $d['mabuoi'];
			$tiet = $d['tiet'];
			$mathu = $d['mathu'];
			$mamonhoc = $d['mamonhoc'];
			$magiaovien = $d['magiaovien'];
			$malop = $d['malop'];
			$grouped[$matruong][$maphong][$nam][$thang][$tuan][$mabuoi][$tiet][$mathu][$magiaovien][$malop][] = $d;
		}

		$new_data_tkb_phong= [];

		foreach($grouped as $k=>$v){
			$dataphong = [];
			foreach($v as $k1=>$v1){
				$datanam = [];
				$tenphong;
				foreach ($v1 as $k2 => $v2) {
					$datathang = [];
					foreach ($v2 as $k3 => $v3) {
						$datatuan = [];
						foreach ($v3 as $k4 => $v4) {
							$databuoi = [];
							foreach($v4 as $k5=>$v5){
								$datatiet = [];
								$tenbuoi;
								foreach($v5 as $k6=>$v6){
									$datathu = [];
									foreach($v6 as $k7=>$v7){
										$datagv = [];
										$tenthu;
										foreach($v7 as $k8=>$v8){
											$datalop = [];
											$bidanh;
											foreach($v8 as $k9=>$v9){
												$bidanh = $v9[0]['bidanh'];
												$tenbuoi= $v9[0]['tenbuoi'];
												$tenthu= $v9[0]['tenthu'];
												$tenmonhoc= $v9[0]['tenmonhoc'];
												$tenphong= $v9[0]['tenphong'];
												$tenlop = $v9[0]['tenlop'];
												array_push($datalop,array('malop' => $k9,'tenlop' => $tenlop));
											}
											array_push($datagv,array('magiaovien' => $k8,'bidanh'=>$bidanh,'dslop'=>$datalop));
										}
										array_push($datathu,array('mathu' => $k7,'tenthu'=>$tenthu,'dsgiaovien'=>$datagv));
									}
									array_push($datatiet,array('tiet' => $k6,'dsthu'=>$datathu));
								}
								array_push($databuoi,array('mabuoi' => $k5,'tenbuoi' => $tenbuoi ,'dstiet'=>$datatiet));
							}
							array_push($datatuan,array('tuan' => $k4,'dsbuoi'=>$databuoi));
						}
						array_push($datathang,array('thang' => $k3, 'dstuan'=>$datatuan));
					}
					array_push($datanam,array('nam' => $k2, 'dsthang'=>$datathang));
				}
				array_push($dataphong,array('maphong' => $k1,'tenphong'=>$tenphong,'dsnam'=>$datanam));
			}
			$new_data_tkb_phong[] = array('matruong' => $k, 'dsphong'=> $dataphong);

		}

		return json_encode($new_data_tkb_phong, JSON_UNESCAPED_UNICODE);
	}

	//lấy thời khoá biểu giáo viên theo thời gian
	public function getthoikhoabieugvtime($matruong){

		$mahuyen = Auth::user()->mahuyen;

		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();

	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

	 	$dataLoc = [];

	 	foreach($truong as $t){
	 		foreach($thoikhoabieu as $tkb){
	 			if($t->matruong == $tkb->matruong){
	 				$tkbLoc = new stdClass();
	 				$tkbLoc->bidanh = $tkb->bidanh;
	 				$tkbLoc->tenlop = $tkb->tenlop;
	 				$tkbLoc->tenmonhoc = $tkb->tenmonhoc;
	 				$tkbLoc->magiaovien = $tkb->magiaovien;
	 				$tkbLoc->malop = $tkb->malop;
	 				$tkbLoc->mamonhoc = $tkb->mamonhoc;
	 				$tkbLoc->buoi = $tkb->buoi;
	 				$tkbLoc->thu = $tkb->thu;
	 				$tkbLoc->tiet = $tkb->tiet;
	 				$tkbLoc->maphong = $tkb->maphong;
	 				$tkbLoc->matruong = $tkb->matruong;
	 				$tkbLoc->tuan = $tkb->tuan;
	 				$tkbLoc->created_at = $tkb->created_at;
		 			array_push($dataLoc,$tkbLoc);
	 			}
	 			
	 		}
	 		
	 	}

	 	$buoi = array(
	 		array(
	 			'idbuoi'=>0,
	 			"tenbuoi"=>"Sáng"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			"tenbuoi"=>"Chiều"
	 		)
	 	);

	 	$thu = array(
	 		array(
	 			'idthu'=>2,
	 			"tenthu"=>"Thứ 2"
	 		),
	 		array(
	 			'idthu'=>3,
	 			"tenthu"=>"Thứ 3"
	 		),
	 		array(
	 			'idthu'=>4,
	 			"tenthu"=>"Thứ 4"
	 		),
	 		array(
	 			'idthu'=>5,
	 			"tenthu"=>"Thứ 5"
	 		),
	 		array(
	 			'idthu'=>6,
	 			"tenthu"=>"Thứ 6"
	 		),
	 		array(
	 			'idthu'=>7,
	 			"tenthu"=>"Thứ 7"
	 		),
	 	);

	 	$databt= array();
		foreach($dataLoc as $t){
			foreach($buoi as $b){
				foreach($thu as $k){
					if($t->buoi == $b['idbuoi'] && $t->thu == $k['idthu']){
						$datetime = date_parse_from_format('Y-m-d', $t->created_at);
						$thang = $datetime['month'];
						$nam = $datetime['year'];
						array_push($databt,array('matruong'=>$t->matruong,'magiaovien'=>$t->magiaovien,'malop'=>$t->malop,'mamonhoc'=>$t->mamonhoc,'maphong'=>$t->maphong,'mabuoi'=>$b['idbuoi'],'mathu'=>$k['idthu'],'bidanh'=>$t->bidanh,'tenlop'=>$t->tenlop,'tenmonhoc'=>$t->tenmonhoc,'tiet'=>$t->tiet,'tenbuoi'=>$b['tenbuoi'],'tenthu'=>$k['tenthu'],'thang'=>$thang,'nam'=>$nam,'tuan'=>$t->tuan));
					}
				}
				
			}
		}

		$grouped = [];

		foreach($databt as $d){
			$matruong = $d['matruong'];
			$magiaovien = $d['magiaovien'];
			$mabuoi = $d['mabuoi'];
			$tiet = $d['tiet'];
			$mathu = $d['mathu'];
			$mamonhoc = $d['mamonhoc'];
			$malop = $d['malop'];
			$nam = $d['nam'];
			$thang = $d['thang'];
			$tuan = $d['tuan'];
			$grouped[$matruong][$magiaovien][$nam][$thang][$tuan][$mabuoi][$tiet][$mathu][$mamonhoc][$malop][] = $d;
		}

		$new_data_tkb_gv_thoigian = [];

		foreach ($grouped as $k=>$v){
			$datagv = [];
			foreach ($v as $k1 => $v1) {
				$bidanh;
				$datanam = [];
				foreach ($v1 as $k2 => $v2) {
					$datathang = [];
					foreach ($v2 as $k3 => $v3) {
						$datatuan = [];
						foreach ($v3 as $k4 => $v4) {
							$databuoi = [];
							foreach ($v4 as $k5 => $v5) {
								$tenbuoi;
								$datatiet = [];
								foreach ($v5 as $k6 => $v6) {
									$datathu = [];
									foreach ($v6 as $k7 => $v7) {
										$tenthu;
										$datamh = [];
										foreach ($v7 as $k8 => $v8) {
											$tenmonhoc;
											$datalop = [];
											foreach ($v8 as $k9 => $v9) {
												$bidanh = $v9[0]['bidanh'];
												$tenbuoi = $v9[0]['tenbuoi'];
												$tenthu = $v9[0]['tenthu'];
												$tenmonhoc = $v9[0]['tenmonhoc'];
												$tenlop = $v9[0]['tenlop'];
												array_push($datalop,array('malop'=>$k9,'tenlop'=>$tenlop));
											}
											array_push($datamh,array('mamonhoc'=>$k8,'tenmonhoc'=>$tenmonhoc,'dslop'=>$datalop));
										}
										array_push($datathu,array('mathu'=>$k7,'tenthu'=>$tenthu,'dsmonhoc'=>$datamh));
									}
									array_push($datatiet,array('tiet'=>$k6,'dsthu'=>$datathu));
								}
								array_push($databuoi,array('mabuoi'=>$k5,'tenbuoi'=>$tenbuoi,'dstiet'=>$datatiet));
							}
							array_push($datatuan,array('tuan' => $k4,'dsbuoi'=>$databuoi));
						}
						array_push($datathang,array('thang' => $k3,'dstuan'=>$datatuan));
					}
					array_push($datanam,array('nam' => $k2,'dsthang'=>$datathang));
				}
				array_push($datagv,array('magiaovien' => $k1,'bidanh' => $bidanh ,'dsnam'=>$datanam));
			}
			$new_data_tkb_gv_thoigian[] = array('matruong' => $k, 'dsgiaovien'=> $datagv);
		}
		return json_encode($new_data_tkb_gv_thoigian, JSON_UNESCAPED_UNICODE);
	}

	//lấy thời khoá biểu lớp theo thời gian
	public function getthoikhoabieuloptime($matruong){

		$mahuyen = Auth::user()->mahuyen;

		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();

	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

	 	$dataLoc = [];

	 	foreach($truong as $t){
	 		foreach($thoikhoabieu as $tkb){
	 			if($t->matruong == $tkb->matruong){
	 				$tkbLoc = new stdClass();
	 				$tkbLoc->bidanh = $tkb->bidanh;
	 				$tkbLoc->tenlop = $tkb->tenlop;
	 				$tkbLoc->tenmonhoc = $tkb->tenmonhoc;
	 				$tkbLoc->magiaovien = $tkb->magiaovien;
	 				$tkbLoc->malop = $tkb->malop;
	 				$tkbLoc->mamonhoc = $tkb->mamonhoc;
	 				$tkbLoc->buoi = $tkb->buoi;
	 				$tkbLoc->thu = $tkb->thu;
	 				$tkbLoc->tiet = $tkb->tiet;
	 				$tkbLoc->maphong = $tkb->maphong;
	 				$tkbLoc->matruong = $tkb->matruong;
	 				$tkbLoc->tuan = $tkb->tuan;
	 				$tkbLoc->created_at = $tkb->created_at;
		 			array_push($dataLoc,$tkbLoc);
	 			}
	 			
	 		}
	 		
	 	}

	 	$buoi = array(
	 		array(
	 			'idbuoi'=>0,
	 			"tenbuoi"=>"Sáng"
	 		),
	 		array(
	 			'idbuoi'=>1,
	 			"tenbuoi"=>"Chiều"
	 		)
	 	);

	 	$thu = array(
	 		array(
	 			'idthu'=>2,
	 			"tenthu"=>"Thứ 2"
	 		),
	 		array(
	 			'idthu'=>3,
	 			"tenthu"=>"Thứ 3"
	 		),
	 		array(
	 			'idthu'=>4,
	 			"tenthu"=>"Thứ 4"
	 		),
	 		array(
	 			'idthu'=>5,
	 			"tenthu"=>"Thứ 5"
	 		),
	 		array(
	 			'idthu'=>6,
	 			"tenthu"=>"Thứ 6"
	 		),
	 		array(
	 			'idthu'=>7,
	 			"tenthu"=>"Thứ 7"
	 		),
	 	);

	 	$databt= array();
		foreach($dataLoc as $t){
			foreach($buoi as $b){
				foreach($thu as $k){
					if($t->buoi == $b['idbuoi'] && $t->thu == $k['idthu']){
						$datetime = date_parse_from_format('Y-m-d', $t->created_at);
						$thang = $datetime['month'];
						$nam = $datetime['year'];
						array_push($databt,array('matruong'=>$t->matruong,'magiaovien'=>$t->magiaovien,'malop'=>$t->malop,'mamonhoc'=>$t->mamonhoc,'maphong'=>$t->maphong,'mabuoi'=>$b['idbuoi'],'mathu'=>$k['idthu'],'bidanh'=>$t->bidanh,'tenlop'=>$t->tenlop,'tenmonhoc'=>$t->tenmonhoc,'tiet'=>$t->tiet,'tenbuoi'=>$b['tenbuoi'],'tenthu'=>$k['tenthu'],'thang'=>$thang,'nam'=>$nam,'tuan'=>$t->tuan));
					}
				}
				
			}
		}

		$grouped = [];

		foreach($databt as $d){
			$matruong = $d['matruong'];
			$malop = $d['malop'];
			$mabuoi = $d['mabuoi'];
			$tiet = $d['tiet'];
			$mathu = $d['mathu'];
			$mamonhoc = $d['mamonhoc'];
			$magiaovien = $d['magiaovien'];
			$nam = $d['nam'];
			$thang = $d['thang'];
			$tuan = $d['tuan'];
			$grouped[$matruong][$malop][$nam][$thang][$tuan][$mabuoi][$tiet][$mathu][$mamonhoc][$magiaovien][] = $d;
		}

		$new_data_tkb_lop_thoigian = [];

		foreach ($grouped as $k=>$v){
			$datalop = [];
			foreach ($v as $k1 => $v1) {
				$tenlop;
				$datanam = [];
				foreach ($v1 as $k2 => $v2) {
					$datathang = [];
					foreach ($v2 as $k3 => $v3) {
						$datatuan = [];
						foreach ($v3 as $k4 => $v4) {
							$databuoi = [];
							foreach ($v4 as $k5 => $v5) {
								$tenbuoi;
								$datatiet = [];
								foreach ($v5 as $k6 => $v6) {
									$datathu = [];
									foreach ($v6 as $k7 => $v7) {
										$tenthu;
										$datamh = [];
										foreach ($v7 as $k8 => $v8) {
											$tenmonhoc;
											$datagv = [];
											foreach ($v8 as $k9 => $v9) {
												$bidanh = $v9[0]['bidanh'];
												$tenbuoi = $v9[0]['tenbuoi'];
												$tenthu = $v9[0]['tenthu'];
												$tenmonhoc = $v9[0]['tenmonhoc'];
												$tenlop = $v9[0]['tenlop'];
												array_push($datagv,array('magiaovien'=>$k9,'bidanh'=>$bidanh));
											}
											array_push($datamh,array('mamonhoc'=>$k8,'tenmonhoc'=>$tenmonhoc,'dsgiaovien'=>$datagv));
										}
										array_push($datathu,array('mathu'=>$k7,'tenthu'=>$tenthu,'dsmonhoc'=>$datamh));
									}
									array_push($datatiet,array('tiet'=>$k6,'dsthu'=>$datathu));
								}
								array_push($databuoi,array('mabuoi'=>$k5,'tenbuoi'=>$tenbuoi,'dstiet'=>$datatiet));
							}
							array_push($datatuan,array('tuan' => $k4,'dsbuoi'=>$databuoi));
						}
						array_push($datathang,array('thang' => $k3,'dstuan'=>$datatuan));
					}
					array_push($datanam,array('nam' => $k2,'dsthang'=>$datathang));
				}
				array_push($datalop,array('malop' => $k1,'tenlop' => $tenlop ,'dsnam'=>$datanam));
			}
			$new_data_tkb_lop_thoigian[] = array('matruong' => $k, 'dslop'=> $datalop);
		}

		return json_encode($new_data_tkb_lop_thoigian, JSON_UNESCAPED_UNICODE);
	}

	//lấy danh sách báo cáo đơn vị
	public function getdsbaocaodonvi(){
		$mahuyen = Auth::user()->mahuyen;
		$data = [];
		$truong = DB::table('truong')
		->where('mahuyen',$mahuyen)
		->get();
		foreach($truong as $t){
			$dstruong = new stdClass();
			$dstruong->matruong = $t->matruong;
			$dstruong->tentruong = $t->tentruong;
			$baocao = DB::table('baocao')
			->join('tbl_admin','tbl_admin.id','=','baocao.tbl_admin_id')
			->select('baocao.id','baocao.truong_id','baocao.tbl_admin_id','baocao.sohieu','baocao.tieude','baocao.loai','baocao.ngaytao','baocao.ngaygui','baocao.file','baocao.noidung','baocao.gui','baocao.trangthai','tbl_admin.tentaikhoan')
			->where('baocao.gui',1)
			->where('baocao.truong_id',$t->matruong)
			->get();
			$dstruong->danhsachbaocao = $baocao;
			array_push($data,$dstruong);
		}
		
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	//cập nhật trạng thái xem báo cáo đơn vị
	public function updatetrangthaixembaocaodonvi(Request $rq){
		$baocao = baocao::find($rq->idbaocao);
		$baocao->trangthai = 1;
		$baocao->update();
		$success = 1;
		return json_encode($success);
	}

	//đánh giá giáo viên

	public function getDsToChuyenMonTH ($matruong) {
		$data = tochuyenmon::where('matruong',$matruong)->where('trangthai',1)->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	public function getDsGiaoVienTH ($matruong) {
		$datagv = danhsachgv::where('matruong',$matruong)->where('trangthai',1)->get();
		$datagvcm = giaovien_chuyenmon::where('matruong',$matruong)->get();
		//
		
		$data = [];
		foreach($datagv as $d){
			foreach($datagvcm as $d1){
				if($d->id == $d1->magiaovien){
					array_push($data,array('id'=>$d->id,'matochuyenmon'=>$d1->matochuyenmon,'matruong'=>$d->matruong,'hovaten'=>$d->hovaten));
				}
			}
		}

		$dict = array();
		foreach($data as $one_index){
		  $dict[join('',$one_index)]=$one_index;
		}

		$res=array();
		foreach($dict as $one_index){
		   $res[] = $one_index;
		}
		
		return json_encode($res, JSON_UNESCAPED_UNICODE);
	}

	public function getKetQuaDanhGiaGvTH ($matruong) {
		$data = ketquadanhgiagv::where('matruong',$matruong)->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	public function getDataDanhGiaGvTH ($matruong) {
		$danhgiagv = danhgiagv::where('matruong',$matruong)->get();

		$grouped = [];
		foreach($danhgiagv as $d){
			$maTCM = $d->matochuyenmon;
			$namDG = $d->namdanhgia;
			$maGV = $d->magiaovien;
			$grouped[$maTCM][$namDG][$maGV][] = $d;
		}
		$data = [];
		foreach($grouped as $k=>$v){
			$dataNam = [];
			foreach($v as $k1=>$v1){
				$dataGv = [];
				foreach($v1 as $k2=>$v2){
					$dataDanhGiaGv = [];
					foreach($v2 as $k3=>$v3){
						$id = $v3['id'];
						$matochuyenmon = $v3['matochuyenmon'];
						$magiaovien = $v3['magiaovien'];
						$matieuchuan = $v3['matieuchuan'];
						$matieuchi = $v3['matieuchi'];
						$maxeploai = $v3['maxeploai'];
						array_push($dataDanhGiaGv,array('iddanhgiagv'=>$id,'matochuyenmon'=>$matochuyenmon,'magiaovien'=>$magiaovien,'matieuchuan'=>$matieuchuan,'matieuchi'=>$matieuchi,'maxeploai'=>$maxeploai));
					}
					array_push($dataGv,array('magiaovien'=>$k2,'dsdanhgiagv'=>$dataDanhGiaGv));
				}
				array_push($dataNam,array('nam'=>$k1,'dsgv'=>$dataGv));
			}
			$data[] = array('matochuyenmon' => $k, 'dsnam'=> $dataNam);
		}
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	private function saveExcel($sheet, $fileName){
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($sheet);
        if (!file_exists(public_path('export'))) {
            mkdir(public_path('export'));
        }
        $writer->save(public_path('export') . "/" . $fileName . ".xlsx");
    }

	private function loadSheetExcelExport($excelFile)
    {
        if (!is_dir(storage_path('excel'))) {
            mkdir(storage_path('excel'));
        }
        $sheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(storage_path('app/excel') . '/' . $excelFile);
        return $sheet;
    }

    public function getExportDGGVToanTruongTH ($matruong,$namdanhgia) {
		$truong = truong::where('matruong',$matruong)->get();
		$datakqdggv = ketquadanhgiagv::where('matruong',$matruong)->where('namdanhgia',$namdanhgia)->get();
		$demSLGVDG = count($datakqdggv);
		$datadggv = DB::table('danhgiagv')
		->leftjoin('tochuyenmon','tochuyenmon.id','=','danhgiagv.matochuyenmon')
		->leftjoin('danhsachgv','danhsachgv.id','=','danhgiagv.magiaovien')
		->where('danhgiagv.matruong',$matruong)
		->where('danhgiagv.namdanhgia',$namdanhgia)
		->where('danhgiagv.trangthai',2)
		->select('danhsachgv.hovaten','tochuyenmon.tentocm','danhgiagv.*')
		->get();
		
		$fillData = [];
		foreach($datakqdggv as $d){
			foreach($datadggv as $d1){
				if($d->matochuyenmon == $d1->matochuyenmon && $d->magiaovien == $d1->magiaovien){
					array_push($fillData,array('matochuyenmon'=>$d1->matochuyenmon,'magiaovien'=>$d1->magiaovien,'matieuchuan'=>$d1->matieuchuan,'matieuchi'=>$d1->matieuchi,'xeploaidanhgia'=>$d1->maxeploai,'ketquaxeploai'=>$d->maxeploai,'tentochuyenmon'=>$d1->tentocm,'hovaten'=>$d1->hovaten));
				}
			}
		}

		$grouped = [];
		foreach($fillData as $f){
			$matochuyenmon = $f['matochuyenmon'];
			$magiaovien = $f['magiaovien'];
			$grouped[$matochuyenmon][$magiaovien][] = $f;
		}
		
		$data = [];
		$stt = 0;
		foreach($grouped as $k=>$v){
			$dataGV = [];
			$tentochuyenmon;
			foreach($v as $k1=>$v1){
				$stt++;
				$tentochuyenmon = $v1[0]['tentochuyenmon'];
				$hovaten = $v1[0]['hovaten'];
				//xếp loại
				if($v1[0]['ketquaxeploai'] == 1){
					$xeploai = 'CĐ';
				} elseif($v1[0]['ketquaxeploai'] == 2){
					$xeploai = 'Đ';
				} elseif ($v1[0]['ketquaxeploai'] == 3) {
					$xeploai = 'Kh';
				} else{
					$xeploai = 'T';
				}
				//tc1
				if($v1[0]['xeploaidanhgia'] == 1){
					$tc1 = 'CĐ';
				} elseif($v1[0]['xeploaidanhgia'] == 2){
					$tc1 = 'Đ';
				} elseif ($v1[0]['xeploaidanhgia'] == 3) {
					$tc1 = 'Kh';
				} else{
					$tc1 = 'T';
				}
				//tc2
				if($v1[1]['xeploaidanhgia'] == 1){
					$tc2 = 'CĐ';
				} elseif($v1[1]['xeploaidanhgia'] == 2){
					$tc2 = 'Đ';
				} elseif ($v1[1]['xeploaidanhgia'] == 3) {
					$tc2 = 'Kh';
				} else{
					$tc2 = 'T';
				}
				//tc3
				if($v1[2]['xeploaidanhgia'] == 1){
					$tc3 = 'CĐ';
				} elseif($v1[2]['xeploaidanhgia'] == 2){
					$tc3 = 'Đ';
				} elseif ($v1[2]['xeploaidanhgia'] == 3) {
					$tc3 = 'Kh';
				} else{
					$tc3 = 'T';
				}
				//tc4
				if($v1[3]['xeploaidanhgia'] == 1){
					$tc4 = 'CĐ';
				} elseif($v1[3]['xeploaidanhgia'] == 2){
					$tc4 = 'Đ';
				} elseif ($v1[3]['xeploaidanhgia'] == 3) {
					$tc4 = 'Kh';
				} else{
					$tc4 = 'T';
				}
				//tc5
				if($v1[4]['xeploaidanhgia'] == 1){
					$tc5 = 'CĐ';
				} elseif($v1[4]['xeploaidanhgia'] == 2){
					$tc5 = 'Đ';
				} elseif ($v1[4]['xeploaidanhgia'] == 3) {
					$tc5 = 'Kh';
				} else{
					$tc5 = 'T';
				}
				//tc6
				if($v1[5]['xeploaidanhgia'] == 1){
					$tc6 = 'CĐ';
				} elseif($v1[5]['xeploaidanhgia'] == 2){
					$tc6 = 'Đ';
				} elseif ($v1[5]['xeploaidanhgia'] == 3) {
					$tc6 = 'Kh';
				} else{
					$tc6 = 'T';
				}
				//tc7
				if($v1[6]['xeploaidanhgia'] == 1){
					$tc7 = 'CĐ';
				} elseif($v1[6]['xeploaidanhgia'] == 2){
					$tc7 = 'Đ';
				} elseif ($v1[6]['xeploaidanhgia'] == 3) {
					$tc7 = 'Kh';
				} else{
					$tc7 = 'T';
				}
				//tc8
				if($v1[7]['xeploaidanhgia'] == 1){
					$tc8 = 'CĐ';
				} elseif($v1[7]['xeploaidanhgia'] == 2){
					$tc8 = 'Đ';
				} elseif ($v1[7]['xeploaidanhgia'] == 3) {
					$tc8 = 'Kh';
				} else{
					$tc8 = 'T';
				}
				//tc9
				if($v1[8]['xeploaidanhgia'] == 1){
					$tc9 = 'CĐ';
				} elseif($v1[8]['xeploaidanhgia'] == 2){
					$tc9 = 'Đ';
				} elseif ($v1[8]['xeploaidanhgia'] == 3) {
					$tc9 = 'Kh';
				} else{
					$tc9 = 'T';
				}
				//tc10
				if($v1[9]['xeploaidanhgia'] == 1){
					$tc10 = 'CĐ';
				} elseif($v1[9]['xeploaidanhgia'] == 2){
					$tc10 = 'Đ';
				} elseif ($v1[9]['xeploaidanhgia'] == 3) {
					$tc10 = 'Kh';
				} else{
					$tc10 = 'T';
				}
				//tc11
				if($v1[10]['xeploaidanhgia'] == 1){
					$tc11 = 'CĐ';
				} elseif($v1[10]['xeploaidanhgia'] == 2){
					$tc11 = 'Đ';
				} elseif ($v1[10]['xeploaidanhgia'] == 3) {
					$tc11 = 'Kh';
				} else{
					$tc11 = 'T';
				}
				//tc12
				if($v1[11]['xeploaidanhgia'] == 1){
					$tc12 = 'CĐ';
				} elseif($v1[11]['xeploaidanhgia'] == 2){
					$tc12 = 'Đ';
				} elseif ($v1[11]['xeploaidanhgia'] == 3) {
					$tc12 = 'Kh';
				} else{
					$tc12 = 'T';
				}
				//tc13
				if($v1[12]['xeploaidanhgia'] == 1){
					$tc13 = 'CĐ';
				} elseif($v1[12]['xeploaidanhgia'] == 2){
					$tc13 = 'Đ';
				} elseif ($v1[12]['xeploaidanhgia'] == 3) {
					$tc13 = 'Kh';
				} else{
					$tc13 = 'T';
				}
				//tc14
				if($v1[13]['xeploaidanhgia'] == 1){
					$tc14 = 'CĐ';
				} elseif($v1[13]['xeploaidanhgia'] == 2){
					$tc14 = 'Đ';
				} elseif ($v1[13]['xeploaidanhgia'] == 3) {
					$tc14 = 'Kh';
				} else{
					$tc14 = 'T';
				}
				//tc15
				if($v1[14]['xeploaidanhgia'] == 1){
					$tc15 = 'CĐ';
				} elseif($v1[14]['xeploaidanhgia'] == 2){
					$tc15 = 'Đ';
				} elseif ($v1[14]['xeploaidanhgia'] == 3) {
					$tc15 = 'Kh';
				} else{
					$tc15 = 'T';
				}
				//
				
				array_push($dataGV,array('stt'=>$stt,'magiaovien'=>$k1,'hovaten'=>$hovaten,'tc1'=>$tc1,'tc2'=>$tc2,'tc3'=>$tc3,'tc4'=>$tc4,'tc5'=>$tc5,'tc6'=>$tc6,'tc7'=>$tc7,'tc8'=>$tc8,'tc9'=>$tc9,'tc10'=>$tc10,'tc11'=>$tc11,'tc12'=>$tc12,'tc13'=>$tc13,'tc14'=>$tc14,'tc15'=>$tc15,'xeploai'=>$xeploai));
			}
			$data[] = array('matochuyenmon' => $k, 'tentochuyenmon'=>$tentochuyenmon , 'dsgiaovien'=> $dataGV);
		}

		if($data == null) {
			return response()->json(['message' => 'No Data'], 204);
		}else{
			$sheet = $this->loadSheetExcelExport('ketquadanhgiagiaovien.xlsx');
			$sheet->setActiveSheetIndex(0);
	        $sheetKQDGGV= $sheet->getActiveSheet();
	        $this->exportKetQuaDGGVToanTruong($sheetKQDGGV, $sheet, $data,$namdanhgia,$demSLGVDG,$truong);
		}	

	}

	private function exportKetQuaDGGVToanTruong($sheetKQDGGV, $sheet, $data, $namdanhgia, $demSLGVDG, $truong){

		$styleBorderParent = array(
            'borders' => [
	            'outline' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'],
	                'borderSize' => 1,
	            ],
	            'inside' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'], 'borderSize' => 1,
	            ],
	        ],
	        'alignment' => [
		        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
		    ],
		    'font' => [
		        'bold' => true,
		    ],
        );

		$styleBorderChild = array(
            'borders' => [
	            'outline' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'],
	                'borderSize' => 1,
	            ],
	            'inside' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'], 'borderSize' => 1,
	            ],
	        ],
	        'alignment' => [
		        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
		    ],
        );
       
        $i = 3;
        $sheetKQDGGV->setCellValue('J'.$i,'(Năm: '. $namdanhgia. ')');
        $sheetKQDGGV->mergeCells("J".$i.':K'.$i);
        $sheetKQDGGV->getStyle("J".$i.':K'.$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $i = 5;
        $sheetKQDGGV->setCellValue('C'.$i,$truong[0]->tentruong);
        $sheetKQDGGV->mergeCells("C".$i.':F'.$i);
        $sheetKQDGGV->getStyle("C".$i.':F'.$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
        $i++;

        $sheetKQDGGV->setCellValue('E'.$i,$demSLGVDG);
        $sheetKQDGGV->getStyle("E".$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);

        $i=14;
        foreach($data as $d){
        	$sheetKQDGGV->setCellValue('A'.$i,$d['tentochuyenmon']);
	        $sheetKQDGGV->mergeCells("A".$i.':S'.$i);
	        $sheetKQDGGV->getStyle("A".$i.':S'.$i)->applyFromArray($styleBorderParent);
	        $i++;
        	foreach($d['dsgiaovien'] as $v){
        		$sheetKQDGGV->setCellValue('A'.$i,$v['stt']);
	        	$sheetKQDGGV->getStyle("A".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('B'.$i,$v['hovaten']);
	        	$sheetKQDGGV->mergeCells("B".$i.':C'.$i);
	        	$sheetKQDGGV->getStyle("B".$i.':C'.$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('D'.$i,$v['tc1']);
	        	$sheetKQDGGV->getStyle("D".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('E'.$i,$v['tc2']);
	        	$sheetKQDGGV->getStyle("E".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('F'.$i,$v['tc3']);
	        	$sheetKQDGGV->getStyle("F".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('G'.$i,$v['tc4']);
	        	$sheetKQDGGV->getStyle("G".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('H'.$i,$v['tc5']);
	        	$sheetKQDGGV->getStyle("H".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('I'.$i,$v['tc6']);
	        	$sheetKQDGGV->getStyle("I".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('J'.$i,$v['tc7']);
	        	$sheetKQDGGV->getStyle("J".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('K'.$i,$v['tc8']);
	        	$sheetKQDGGV->getStyle("K".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('L'.$i,$v['tc9']);
	        	$sheetKQDGGV->getStyle("L".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('M'.$i,$v['tc10']);
	        	$sheetKQDGGV->getStyle("M".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('N'.$i,$v['tc11']);
	        	$sheetKQDGGV->getStyle("N".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('O'.$i,$v['tc12']);
	        	$sheetKQDGGV->getStyle("O".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('P'.$i,$v['tc13']);
	        	$sheetKQDGGV->getStyle("P".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('Q'.$i,$v['tc14']);
	        	$sheetKQDGGV->getStyle("Q".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('R'.$i,$v['tc15']);
	        	$sheetKQDGGV->getStyle("R".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('S'.$i,$v['xeploai']);
	        	$sheetKQDGGV->getStyle("S".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->getStyle('A'.$i.':S'.$i)->getAlignment()->setWrapText(true);
	            $sheetKQDGGV->getRowDimension($i)->setRowHeight(-1);
	            $i++;
        	}
        }
        // $this->autoSiezColumn($sheet);
        $this->saveExcel($sheet, 'ketquadanhgiagiaovien');
        $success = 1;
        return json_encode($success);
	}

	public function getExportDGGVToChuyenMonTH ($matruong,$matochuyenmon,$namdanhgia) {
		$truong = truong::where('matruong',$matruong)->get();
		$datakqdggv = ketquadanhgiagv::where('matruong',$matruong)->where('matochuyenmon',$matochuyenmon)->where('namdanhgia',$namdanhgia)->get();
		$demSLGVDG = count($datakqdggv);
		$datadggv = DB::table('danhgiagv')
		->leftjoin('tochuyenmon','tochuyenmon.id','=','danhgiagv.matochuyenmon')
		->leftjoin('danhsachgv','danhsachgv.id','=','danhgiagv.magiaovien')
		->where('danhgiagv.matruong',$matruong)
		->where('danhgiagv.matochuyenmon',$matochuyenmon)
		->where('danhgiagv.namdanhgia',$namdanhgia)
		->where('danhgiagv.trangthai',2)
		->select('danhsachgv.hovaten','tochuyenmon.tentocm','danhgiagv.*')
		->get();
		
		$fillData = [];
		foreach($datakqdggv as $d){
			foreach($datadggv as $d1){
				if($d->matochuyenmon == $d1->matochuyenmon && $d->magiaovien == $d1->magiaovien){
					array_push($fillData,array('matochuyenmon'=>$d1->matochuyenmon,'magiaovien'=>$d1->magiaovien,'matieuchuan'=>$d1->matieuchuan,'matieuchi'=>$d1->matieuchi,'xeploaidanhgia'=>$d1->maxeploai,'ketquaxeploai'=>$d->maxeploai,'tentochuyenmon'=>$d1->tentocm,'hovaten'=>$d1->hovaten));
				}
			}
		}

		$grouped = [];
		foreach($fillData as $f){
			$matochuyenmon = $f['matochuyenmon'];
			$magiaovien = $f['magiaovien'];
			$grouped[$matochuyenmon][$magiaovien][] = $f;
		}
		
		$data = [];
		$stt = 0;
		foreach($grouped as $k=>$v){
			$dataGV = [];
			$tentochuyenmon;
			foreach($v as $k1=>$v1){
				$stt++;
				$tentochuyenmon = $v1[0]['tentochuyenmon'];
				$hovaten = $v1[0]['hovaten'];
				//xếp loại
				if($v1[0]['ketquaxeploai'] == 1){
					$xeploai = 'CĐ';
				} elseif($v1[0]['ketquaxeploai'] == 2){
					$xeploai = 'Đ';
				} elseif ($v1[0]['ketquaxeploai'] == 3) {
					$xeploai = 'Kh';
				} else{
					$xeploai = 'T';
				}
				//tc1
				if($v1[0]['xeploaidanhgia'] == 1){
					$tc1 = 'CĐ';
				} elseif($v1[0]['xeploaidanhgia'] == 2){
					$tc1 = 'Đ';
				} elseif ($v1[0]['xeploaidanhgia'] == 3) {
					$tc1 = 'Kh';
				} else{
					$tc1 = 'T';
				}
				//tc2
				if($v1[1]['xeploaidanhgia'] == 1){
					$tc2 = 'CĐ';
				} elseif($v1[1]['xeploaidanhgia'] == 2){
					$tc2 = 'Đ';
				} elseif ($v1[1]['xeploaidanhgia'] == 3) {
					$tc2 = 'Kh';
				} else{
					$tc2 = 'T';
				}
				//tc3
				if($v1[2]['xeploaidanhgia'] == 1){
					$tc3 = 'CĐ';
				} elseif($v1[2]['xeploaidanhgia'] == 2){
					$tc3 = 'Đ';
				} elseif ($v1[2]['xeploaidanhgia'] == 3) {
					$tc3 = 'Kh';
				} else{
					$tc3 = 'T';
				}
				//tc4
				if($v1[3]['xeploaidanhgia'] == 1){
					$tc4 = 'CĐ';
				} elseif($v1[3]['xeploaidanhgia'] == 2){
					$tc4 = 'Đ';
				} elseif ($v1[3]['xeploaidanhgia'] == 3) {
					$tc4 = 'Kh';
				} else{
					$tc4 = 'T';
				}
				//tc5
				if($v1[4]['xeploaidanhgia'] == 1){
					$tc5 = 'CĐ';
				} elseif($v1[4]['xeploaidanhgia'] == 2){
					$tc5 = 'Đ';
				} elseif ($v1[4]['xeploaidanhgia'] == 3) {
					$tc5 = 'Kh';
				} else{
					$tc5 = 'T';
				}
				//tc6
				if($v1[5]['xeploaidanhgia'] == 1){
					$tc6 = 'CĐ';
				} elseif($v1[5]['xeploaidanhgia'] == 2){
					$tc6 = 'Đ';
				} elseif ($v1[5]['xeploaidanhgia'] == 3) {
					$tc6 = 'Kh';
				} else{
					$tc6 = 'T';
				}
				//tc7
				if($v1[6]['xeploaidanhgia'] == 1){
					$tc7 = 'CĐ';
				} elseif($v1[6]['xeploaidanhgia'] == 2){
					$tc7 = 'Đ';
				} elseif ($v1[6]['xeploaidanhgia'] == 3) {
					$tc7 = 'Kh';
				} else{
					$tc7 = 'T';
				}
				//tc8
				if($v1[7]['xeploaidanhgia'] == 1){
					$tc8 = 'CĐ';
				} elseif($v1[7]['xeploaidanhgia'] == 2){
					$tc8 = 'Đ';
				} elseif ($v1[7]['xeploaidanhgia'] == 3) {
					$tc8 = 'Kh';
				} else{
					$tc8 = 'T';
				}
				//tc9
				if($v1[8]['xeploaidanhgia'] == 1){
					$tc9 = 'CĐ';
				} elseif($v1[8]['xeploaidanhgia'] == 2){
					$tc9 = 'Đ';
				} elseif ($v1[8]['xeploaidanhgia'] == 3) {
					$tc9 = 'Kh';
				} else{
					$tc9 = 'T';
				}
				//tc10
				if($v1[9]['xeploaidanhgia'] == 1){
					$tc10 = 'CĐ';
				} elseif($v1[9]['xeploaidanhgia'] == 2){
					$tc10 = 'Đ';
				} elseif ($v1[9]['xeploaidanhgia'] == 3) {
					$tc10 = 'Kh';
				} else{
					$tc10 = 'T';
				}
				//tc11
				if($v1[10]['xeploaidanhgia'] == 1){
					$tc11 = 'CĐ';
				} elseif($v1[10]['xeploaidanhgia'] == 2){
					$tc11 = 'Đ';
				} elseif ($v1[10]['xeploaidanhgia'] == 3) {
					$tc11 = 'Kh';
				} else{
					$tc11 = 'T';
				}
				//tc12
				if($v1[11]['xeploaidanhgia'] == 1){
					$tc12 = 'CĐ';
				} elseif($v1[11]['xeploaidanhgia'] == 2){
					$tc12 = 'Đ';
				} elseif ($v1[11]['xeploaidanhgia'] == 3) {
					$tc12 = 'Kh';
				} else{
					$tc12 = 'T';
				}
				//tc13
				if($v1[12]['xeploaidanhgia'] == 1){
					$tc13 = 'CĐ';
				} elseif($v1[12]['xeploaidanhgia'] == 2){
					$tc13 = 'Đ';
				} elseif ($v1[12]['xeploaidanhgia'] == 3) {
					$tc13 = 'Kh';
				} else{
					$tc13 = 'T';
				}
				//tc14
				if($v1[13]['xeploaidanhgia'] == 1){
					$tc14 = 'CĐ';
				} elseif($v1[13]['xeploaidanhgia'] == 2){
					$tc14 = 'Đ';
				} elseif ($v1[13]['xeploaidanhgia'] == 3) {
					$tc14 = 'Kh';
				} else{
					$tc14 = 'T';
				}
				//tc15
				if($v1[14]['xeploaidanhgia'] == 1){
					$tc15 = 'CĐ';
				} elseif($v1[14]['xeploaidanhgia'] == 2){
					$tc15 = 'Đ';
				} elseif ($v1[14]['xeploaidanhgia'] == 3) {
					$tc15 = 'Kh';
				} else{
					$tc15 = 'T';
				}
				//
				
				array_push($dataGV,array('stt'=>$stt,'magiaovien'=>$k1,'hovaten'=>$hovaten,'tc1'=>$tc1,'tc2'=>$tc2,'tc3'=>$tc3,'tc4'=>$tc4,'tc5'=>$tc5,'tc6'=>$tc6,'tc7'=>$tc7,'tc8'=>$tc8,'tc9'=>$tc9,'tc10'=>$tc10,'tc11'=>$tc11,'tc12'=>$tc12,'tc13'=>$tc13,'tc14'=>$tc14,'tc15'=>$tc15,'xeploai'=>$xeploai));
			}
			$data[] = array('matochuyenmon' => $k, 'tentochuyenmon'=>$tentochuyenmon , 'dsgiaovien'=> $dataGV);
		}
		
		if($data == null) {
			return response()->json(['message' => 'No Data'], 204);
		}else{
			$sheet = $this->loadSheetExcelExport('ketquadanhgiagiaovien.xlsx');
			$sheet->setActiveSheetIndex(0);
	        $sheetKQDGGV= $sheet->getActiveSheet();
	        $this->exportKetQuaDGGVToChuyenMon($sheetKQDGGV, $sheet, $data,$namdanhgia,$demSLGVDG,$truong);
		}
		
	}

	private function exportKetQuaDGGVToChuyenMon($sheetKQDGGV, $sheet, $data, $namdanhgia, $demSLGVDG, $truong){

		$styleBorderParent = array(
            'borders' => [
	            'outline' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'],
	                'borderSize' => 1,
	            ],
	            'inside' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'], 'borderSize' => 1,
	            ],
	        ],
	        'alignment' => [
		        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
		    ],
		    'font' => [
		        'bold' => true,
		    ],
        );

		$styleBorderChild = array(
            'borders' => [
	            'outline' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'],
	                'borderSize' => 1,
	            ],
	            'inside' => [
	                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
	                'color' => ['argb' => '000000'], 'borderSize' => 1,
	            ],
	        ],
	        'alignment' => [
		        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
		    ],
        );
       
        $i = 3;
        $sheetKQDGGV->setCellValue('J'.$i,'(Năm: '. $namdanhgia. ')');
        $sheetKQDGGV->mergeCells("J".$i.':K'.$i);
        $sheetKQDGGV->getStyle("J".$i.':K'.$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $i = 5;
        $sheetKQDGGV->setCellValue('C'.$i,$truong[0]->tentruong);
        $sheetKQDGGV->mergeCells("C".$i.':F'.$i);
        $sheetKQDGGV->getStyle("C".$i.':F'.$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
        $i++;

        $sheetKQDGGV->setCellValue('E'.$i,$demSLGVDG);
        $sheetKQDGGV->getStyle("E".$i)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);

        $i=14;
        foreach($data as $d){
        	$sheetKQDGGV->setCellValue('A'.$i,$d['tentochuyenmon']);
	        $sheetKQDGGV->mergeCells("A".$i.':S'.$i);
	        $sheetKQDGGV->getStyle("A".$i.':S'.$i)->applyFromArray($styleBorderParent);
	        $i++;
        	foreach($d['dsgiaovien'] as $v){
        		$sheetKQDGGV->setCellValue('A'.$i,$v['stt']);
	        	$sheetKQDGGV->getStyle("A".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('B'.$i,$v['hovaten']);
	        	$sheetKQDGGV->mergeCells("B".$i.':C'.$i);
	        	$sheetKQDGGV->getStyle("B".$i.':C'.$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('D'.$i,$v['tc1']);
	        	$sheetKQDGGV->getStyle("D".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('E'.$i,$v['tc2']);
	        	$sheetKQDGGV->getStyle("E".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('F'.$i,$v['tc3']);
	        	$sheetKQDGGV->getStyle("F".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('G'.$i,$v['tc4']);
	        	$sheetKQDGGV->getStyle("G".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('H'.$i,$v['tc5']);
	        	$sheetKQDGGV->getStyle("H".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('I'.$i,$v['tc6']);
	        	$sheetKQDGGV->getStyle("I".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('J'.$i,$v['tc7']);
	        	$sheetKQDGGV->getStyle("J".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('K'.$i,$v['tc8']);
	        	$sheetKQDGGV->getStyle("K".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('L'.$i,$v['tc9']);
	        	$sheetKQDGGV->getStyle("L".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('M'.$i,$v['tc10']);
	        	$sheetKQDGGV->getStyle("M".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('N'.$i,$v['tc11']);
	        	$sheetKQDGGV->getStyle("N".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('O'.$i,$v['tc12']);
	        	$sheetKQDGGV->getStyle("O".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('P'.$i,$v['tc13']);
	        	$sheetKQDGGV->getStyle("P".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('Q'.$i,$v['tc14']);
	        	$sheetKQDGGV->getStyle("Q".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('R'.$i,$v['tc15']);
	        	$sheetKQDGGV->getStyle("R".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->setCellValue('S'.$i,$v['xeploai']);
	        	$sheetKQDGGV->getStyle("S".$i)->applyFromArray($styleBorderChild);
	        	$sheetKQDGGV->getStyle('A'.$i.':S'.$i)->getAlignment()->setWrapText(true);
	            $sheetKQDGGV->getRowDimension($i)->setRowHeight(-1);
	            $i++;
        	}
        }
        // $this->autoSiezColumn($sheet);
        $this->saveExcel($sheet, 'ketquadanhgiagiaovien');
        $success = 1;
        return json_encode($success);
	}
}
