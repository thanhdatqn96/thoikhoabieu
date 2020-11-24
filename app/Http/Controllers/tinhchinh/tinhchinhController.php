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

	public function dataTieuChuan () {
		$data = array(
			array(
				"id" => 1,
				"tentieuchuan" => "Phẩm chất nhà giáo"
			),
			array(
				"id" => 2,
				"tentieuchuan" => "Phát triển chuyên môn, nghiệp vụ"
			),
			array(
				"id" => 3,
				"tentieuchuan" => "Xây dựng môi trường giáo dục"
			),
			array(
				"id" => 4,
				"tentieuchuan" => "Phát triển mối quan hệ giữa nhà trường, gia đình và xã hội"
			),
			array(
				"id" => 5,
				"tentieuchuan" => "Sử dụng ngoại ngữ hoặc tiếng dân tộc, ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học và giáo dục"
			),
		);
		return json_encode($data, JSON_UNESCAPED_UNICODE);	
	}

	public function dataTieuChi () {
		$data = array(
			array(
				"id" => 1,
				"tieuchuan_id" => 1,
				"tentieuchi" => "Đạo đức nhà giáo"
			),
			array(
				"id" => 2,
				"tieuchuan_id" => 1,
				"tentieuchi" => "Phong cách nhà giáo"
			),
			array(
				"id" => 3,
				"tieuchuan_id" => 2,
				"tentieuchi" => "Phát triển chuyên môn bản thân"
			),
			array(
				"id" => 4,
				"tieuchuan_id" => 2,
				"tentieuchi" => "Xây dựng kế hoạch dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh"
			),
			array(
				"id" => 5,
				"tieuchuan_id" => 2,
				"tentieuchi" => "Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực"
			),
			array(
				"id" => 6,
				"tieuchuan_id" => 2,
				"tentieuchi" => "Kiểm tra, đánh giá theo hướng phát triển phẩm chất, năng lực học sinh"
			),
			array(
				"id" => 7,
				"tieuchuan_id" => 2,
				"tentieuchi" => "Tư vấn và hỗ trợ học sinh"
			),
			array(
				"id" => 8,
				"tieuchuan_id" => 3,
				"tentieuchi" => "Xây dựng văn hoá nhà trường"
			),
			array(
				"id" => 9,
				"tieuchuan_id" => 3,
				"tentieuchi" => "Xây dựng văn hoá nhà trường"
			),
			array(
				"id" => 10,
				"tieuchuan_id" => 3,
				"tentieuchi" => "Thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường"
			),
			array(
				"id" => 11,
				"tieuchuan_id" => 4,
				"tentieuchi" => "Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan"
			),
			array(
				"id" => 12,
				"tieuchuan_id" => 4,
				"tentieuchi" => "Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện hoạt động dạy học cho học sinh"
			),
			array(
				"id" => 13,
				"tieuchuan_id" => 4,
				"tentieuchi" => "Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện giáo dục đạo đức, lối sống cho học sinh"
			),
			array(
				"id" => 14,
				"tieuchuan_id" => 5,
				"tentieuchi" => "Sử dụng ngoại ngữ hoặc tiếng dân tộc"
			),
			array(
				"id" => 15,
				"tieuchuan_id" => 5,
				"tentieuchi" => "Ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học, giáo dục"
			)
		);
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
		$data = [];
		foreach($datagv as $d){
			foreach($datagvcm as $d1){
				if($d->id == $d1->magiaovien){
					array_push($data,array('id'=>$d->id,'matochuyenmon'=>$d1->matochuyenmon,'hovaten'=>$d->hovaten));
				}
			}
		}
		$locData = array_unique($data, SORT_REGULAR);
		return json_encode($locData, JSON_UNESCAPED_UNICODE);
	}

}
