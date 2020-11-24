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
		$data = [];
		$dataTieuChuan = array(
			array(
				"id" => 1,
				"tentieuchuan" => "I. Phẩm chất nhà giáo",
			),
			array(
				"id" => 2,
				"tentieuchuan" => "II. Phát triển chuyên môn, nghiệp vụ"
			),
			array(
				"id" => 3,
				"tentieuchuan" => "III. Xây dựng môi trường giáo dục"
			),
			array(
				"id" => 4,
				"tentieuchuan" => "IV. Phát triển mối quan hệ giữa nhà trường, gia đình và xã hội"
			),
			array(
				"id" => 5,
				"tentieuchuan" => "V. Sử dụng ngoại ngữ hoặc tiếng dân tộc, ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học và giáo dục"
			),
		);
		$dataTieuChi = array(
			array(
				"id" => 1,
				"tieuchuan_id" => 1,
				"tentieuchi" => "1. Đạo đức nhà giáo"
			),
			array(
				"id" => 2,
				"tieuchuan_id" => 1,
				"tentieuchi" => "2. Phong cách nhà giáo"
			),
			array(
				"id" => 3,
				"tieuchuan_id" => 2,
				"tentieuchi" => "3. Phát triển chuyên môn bản thân"
			),
			array(
				"id" => 4,
				"tieuchuan_id" => 2,
				"tentieuchi" => "4. Xây dựng kế hoạch dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh"
			),
			array(
				"id" => 5,
				"tieuchuan_id" => 2,
				"tentieuchi" => "5. Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực"
			),
			array(
				"id" => 6,
				"tieuchuan_id" => 2,
				"tentieuchi" => "6. Kiểm tra, đánh giá theo hướng phát triển phẩm chất, năng lực học sinh"
			),
			array(
				"id" => 7,
				"tieuchuan_id" => 2,
				"tentieuchi" => "7. Tư vấn và hỗ trợ học sinh"
			),
			array(
				"id" => 8,
				"tieuchuan_id" => 3,
				"tentieuchi" => "8. Xây dựng văn hoá nhà trường"
			),
			array(
				"id" => 9,
				"tieuchuan_id" => 3,
				"tentieuchi" => "9. Thực hiện quyền dân chủ trong nhà trường"
			),
			array(
				"id" => 10,
				"tieuchuan_id" => 3,
				"tentieuchi" => "10. Thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường"
			),
			array(
				"id" => 11,
				"tieuchuan_id" => 4,
				"tentieuchi" => "11. Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan"
			),
			array(
				"id" => 12,
				"tieuchuan_id" => 4,
				"tentieuchi" => "12. Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện hoạt động dạy học cho học sinh"
			),
			array(
				"id" => 13,
				"tieuchuan_id" => 4,
				"tentieuchi" => "13. Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện giáo dục đạo đức, lối sống cho học sinh"
			),
			array(
				"id" => 14,
				"tieuchuan_id" => 5,
				"tentieuchi" => "14. Sử dụng ngoại ngữ hoặc tiếng dân tộc"
			),
			array(
				"id" => 15,
				"tieuchuan_id" => 5,
				"tentieuchi" => "15. Ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học, giáo dục"
			)
		);
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
		$data = [];
		foreach($datagv as $d){
			foreach($datagvcm as $d1){
				if($d->id == $d1->magiaovien){
					array_push($data,array('id'=>$d->id,'matochuyenmon'=>$d1->matochuyenmon,'hovaten'=>$d->hovaten));
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

}
