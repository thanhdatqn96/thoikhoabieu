<?php

namespace App\Http\Controllers\tinhchinh;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\tochuyenmon;
use DB;
use Session; 
use stdClass;
use App\danhsachgv;
use App\monhoc;
use App\danhgiagv;
use App\giaovien_chuyenmon;

class tinhchinhController extends Controller
{
	public function index()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev'])->addStyles(['style-macdinh','style-dev'])->removeStyles(['style-datatable'])->removeScripts(['js-datatable']);
		return view('tinhchinh.index');
	}

	public function dataTieuChuanTieuChi () {

		$getFileDataTieuChuan = file_get_contents(public_path('js/dataTieuChuanTieuChi/dataTieuChuan.json'));
		$dataTieuChuan = json_decode($getFileDataTieuChuan, true);

		$getFileDataTieuChi = file_get_contents(public_path('js/dataTieuChuanTieuChi/dataTieuChi.json'));
		$dataTieuChi = json_decode($getFileDataTieuChi, true);

		$data = [];

		foreach($dataTieuChuan as $d){
			$mangTieuChi = [];
			foreach($dataTieuChi as $d1){			
				if($d['id'] == $d1['tieuchuan_id']){
					array_push($mangTieuChi,$d1);
				}
			}
			$dataTieuChuan = new stdClass();
			$dataTieuChuan->id = $d['id'];
            $dataTieuChuan->tentieuchuan = $d['tentieuchuan'];
            $dataTieuChuan->dataTieuChi = $mangTieuChi;
            array_push($data, $dataTieuChuan);
		}
		return json_encode($data, JSON_UNESCAPED_UNICODE);	
	}

	public function getDsToChuyenMon () {
		$matruong = Session::get('matruong');
		$data = tochuyenmon::where('matruong',$matruong)->where('trangthai',1)->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	public function getDsGiaoVien () {
		$matruong = Session::get('matruong');
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

	public function getDataDanhGiaGv () {
		$matruong = Session::get('matruong');
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

	public function statusDanhGiaGv () {
		$matruong = Session::get('matruong');
		$datadggv = danhgiagv::where('matruong',$matruong)->get();
		$groupedDGGV = [];
		foreach($datadggv as $d){
			$mGV = $d->magiaovien;
			$mTChi = $d->matieuchi;
			$groupedDGGV[$mGV][$mTChi][] = $d;
		}

		$findGroupMGVTC = [];
		foreach($groupedDGGV as $k=>$v){
			$maTCM;
			$namDG;
			$dataTieuChi = [];
			foreach($v as $k1=>$v1){
				$maTCM = $v1[0]->matochuyenmon;
				$namDG = $v1[0]->namdanhgia;
				array_push($dataTieuChi,array('matieuchi'=>$k1));
			}
			$demDataTieuChi = count($dataTieuChi);
			$findGroupMGVTC[] = array('magiaovien' => $k, 'matochuyenmon'=>$maTCM, 'namdanhgia'=>$namDG ,'demDataTieuChi'=> $demDataTieuChi);
		}
		return json_encode($findGroupMGVTC, JSON_UNESCAPED_UNICODE);

	}

	public function addDanhGiaGv (Request $rq) {
		$iddanhgiagv= json_decode($rq->iddanhgiagv);
		$dataChBxXepLoaiTrue= json_decode($rq->dataChBxXepLoaiTrue);
		if($iddanhgiagv != ''){
			foreach($iddanhgiagv as $i){
				danhgiagv::destroy($i->iddanhgiagv);
			}
		}
		if($dataChBxXepLoaiTrue != ''){
			foreach($dataChBxXepLoaiTrue as $d){
				$danhgiagv = new danhgiagv();
				$danhgiagv->matochuyenmon = $d->maToChuyenMon;
				$danhgiagv->magiaovien = $d->maGiaoVien;
				$danhgiagv->matieuchuan = $d->maTieuChuan;
				$danhgiagv->matieuchi = $d->maTieuChi;
				$danhgiagv->matruong = $d->maTruong;
				$danhgiagv->maxeploai = $d->maXepLoai;
				$danhgiagv->namdanhgia = $d->namDanhGia;
				$danhgiagv->save();
			}
			$success = 1;
		}
		return json_encode($success);
	}

}
