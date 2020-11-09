<?php

namespace App\Http\Controllers\xemtkb;

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
use Auth;
use DB;
use stdClass;
use Carbon;
use Session; 

class xemtkbController extends Controller
{
	public function index()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev','js-datatable'])->addStyles(['style-macdinh','style-dev','style-datatable']);
		return view('xemtkb.index');
	}

	//lấy danh sách khối,gv,lớp
	public function getdskhoigvlop(){
		$matruong = Session::get('matruong');
		$data = [];
		$dstruong = new stdClass();
		$lop = danhsachlophoc::where('matruong', '=',  $matruong)->select('id','tenlop','khoi')->orderBy('tenlop','ASC')->get();
        $gv = danhsachgv::where('matruong','=', $matruong)->select('id','hovaten','bidanh','dienthoai','email')->get();
        $khoi = khoihoc::where('matruong','=', $matruong)->select('id','tenkhoi')->orderBy('tenkhoi','ASC')->get();
		$dstruong->danhsachlop = $lop;
		$dstruong->danhsachgv = $gv;
		$dstruong->danhsachkhoihoc = $khoi;
		array_push($data, $dstruong);
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	//get thời khoá biểu trường
	public function gettkbtruong(){
		$matruong = Session::get('matruong');
	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.tuan','thoikhoabieu.created_at')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

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
		foreach($thoikhoabieu as $t){
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

		// dd($grouped);
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

	//get danh sách lớp tkb trường
	public function getdslt(){
		$matruong = Session::get('matruong');
		$danhsachlophoc = danhsachlophoc::orderBy('tenlop', 'ASC')->where('matruong',$matruong)->get();
		$datadslop = [];
		foreach($danhsachlophoc as $d){
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

	//get thời khoá biểu giáo viên
	public function gettkbgv(){
		$matruong = Session::get('matruong');
	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

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
		foreach($thoikhoabieu as $t){
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

	//get thời khoá biểu lớp
	public function gettkblop(){
		$matruong = Session::get('matruong');
	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('danhsachlophoc','danhsachlophoc.id','thoikhoabieu.malop')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->select('danhsachgv.bidanh','danhsachlophoc.tenlop','monhoc.tenmonhoc','thoikhoabieu.magiaovien','thoikhoabieu.malop','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

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
		foreach($thoikhoabieu as $t){
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

	//get thời khoá phòng học
	public function gettkbphong(){
		$matruong = Session::get('matruong');
	 	$thoikhoabieu = DB::table('thoikhoabieu')
	 	->leftjoin('danhsachgv','danhsachgv.id','thoikhoabieu.magiaovien')
	 	->leftjoin('monhoc','monhoc.id','thoikhoabieu.mamonhoc')
	 	->leftjoin('phonghoc','phonghoc.id','thoikhoabieu.maphong')
	 	->where('thoikhoabieu.maphong','!=',0)
	 	->select('danhsachgv.bidanh','monhoc.tenmonhoc','phonghoc.tenphong','thoikhoabieu.magiaovien','thoikhoabieu.mamonhoc','thoikhoabieu.buoi','thoikhoabieu.thu','thoikhoabieu.tiet','thoikhoabieu.maphong','thoikhoabieu.matruong','thoikhoabieu.created_at','thoikhoabieu.tuan')
	 	->where('thoikhoabieu.matruong',$matruong)
	 	->get();

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
		foreach($thoikhoabieu as $t){
			foreach($buoi as $b){
				foreach($thu as $k){
					if($t->buoi == $b['idbuoi'] && $t->thu == $k['idthu']){
						$datetime = date_parse_from_format('Y-m-d', $t->created_at);
						$thang = $datetime['month'];
						$nam = $datetime['year'];
						array_push($databt,array('matruong'=>$t->matruong,'magiaovien'=>$t->magiaovien,'mamonhoc'=>$t->mamonhoc,'maphong'=>$t->maphong,'mabuoi'=>$b['idbuoi'],'mathu'=>$k['idthu'],'bidanh'=>$t->bidanh,'tenmonhoc'=>$t->tenmonhoc,'tenphong'=>$t->tenphong,'tiet'=>$t->tiet,'tenbuoi'=>$b['tenbuoi'],'tenthu'=>$k['tenthu'],'nam'=>$nam,'thang'=>$thang,'tuan'=>$t->tuan));
					}
				}
				
			}
		}

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
			$grouped[$matruong][$maphong][$nam][$thang][$tuan][$mabuoi][$tiet][$mathu][$mamonhoc][$magiaovien][] = $d;
		}
		
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
										$datamh = [];
										$tenthu;
										foreach($v7 as $k8=>$v8){
											$datagv = [];
											$tenmonhoc;
											foreach($v8 as $k9=>$v9){
												$bidanh = $v9[0]['bidanh'];
												$tenbuoi= $v9[0]['tenbuoi'];
												$tenthu= $v9[0]['tenthu'];
												$tenmonhoc= $v9[0]['tenmonhoc'];
												$tenphong= $v9[0]['tenphong'];
												array_push($datagv,array('magiaovien' => $k9,'bidanh' => $bidanh));
											}
											array_push($datamh,array('mamonhoc' => $k8,'tenmonhoc'=>$tenmonhoc,'dsgiaovien'=>$datagv));
										}
										array_push($datathu,array('mathu' => $k7,'tenthu'=>$tenthu,'dsmonhoc'=>$datamh));
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

	//get list phòng học
	public function getlistphong(){
		$matruong = Session::get('matruong');
		$data = DB::table('phonghoc')
		->where('phonghoc.matruong',$matruong)
		->select('*')
		->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

}
