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
use App\ketquadanhgiagv;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpParser\Node\Expr\FuncCall;

class tinhchinhController extends Controller
{
	public function index()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev'])->addStyles(['style-macdinh','style-dev'])->removeStyles(['style-datatable'])->removeScripts(['js-datatable']);
		return view('tinhchinh.index');
	}

	public function dataTieuChuanTieuChi () {

		// $getFileDataTieuChuan = file_get_contents(public_path('js/dataTieuChuanTieuChi/dataTieuChuan.json'));
		// $dataTieuChuan = json_decode($getFileDataTieuChuan, true);
		// $getFileDataTieuChi = file_get_contents(public_path('js/dataTieuChuanTieuChi/dataTieuChi.json'));
		// $dataTieuChi = json_decode($getFileDataTieuChi, true);

		$dataTieuChuan = [
			[
		      	"id"=>1,
		      	"tentieuchuan"=>"I. Phẩm chất nhà giáo"
		   	],
		   	[
		      	"id"=>2,
		      	"tentieuchuan"=>"II. Phát triển chuyên môn, nghiệp vụ"
		   	],
		   	[
		      	"id"=>3,
		      	"tentieuchuan"=>"III. Xây dựng môi trường giáo dục"
		   	],
		   	[
		      	"id"=>4,
		      	"tentieuchuan"=>"IV. Phát triển mối quan hệ giữa nhà trường, gia đình và xã hội"
		   	],
		   	[
		      	"id"=>5,
		      	"tentieuchuan"=>"V. Sử dụng ngoại ngữ hoặc tiếng dân tộc, ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học và giáo dục"
		   	]
		];

		$dataTieuChi = [
			[
		      	"id"=>1,
		      	"tieuchuan_id"=>1,
		      	"tentieuchi"=>"1. Đạo đức nhà giáo"
		   	],
		   	[
		      	"id"=>2,
		      	"tieuchuan_id"=>1,
		      	"tentieuchi"=>"2. Phong cách nhà giáo"
		   	],
		   	[
		      	"id"=>3,
		      	"tieuchuan_id"=>2,
		      	"tentieuchi"=>"3. Phát triển chuyên môn bản thân"
		   	],
		   	[
		      	"id"=>4,
		      	"tieuchuan_id"=>2,
		      	"tentieuchi"=>"4. Xây dựng kế hoạch dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh"
		   	],
		   	[
		      	"id"=>5,
		      	"tieuchuan_id"=>2,
		      	"tentieuchi"=>"5. Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực"
		  	],
		   	[
		      	"id"=>6,
		      	"tieuchuan_id"=>2,
		      	"tentieuchi"=>"6. Kiểm tra, đánh giá theo hướng phát triển phẩm chất, năng lực học sinh"
		   	],
		   	[
		      	"id"=>7,
		      	"tieuchuan_id"=>2,
		      	"tentieuchi"=>"7. Tư vấn và hỗ trợ học sinh"
		   	],
		   	[
		      	"id"=>8,
		      	"tieuchuan_id"=>3,
		      	"tentieuchi"=>"8. Xây dựng văn hoá nhà trường"
		   	],
		   	[
		      	"id"=>9,
		      	"tieuchuan_id"=>3,
		      	"tentieuchi"=>"9. Thực hiện quyền dân chủ trong nhà trường"
		   	],
		   	[
		      	"id"=>10,
		      	"tieuchuan_id"=>3,
		      	"tentieuchi"=>"10. Thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường"
		   	],
		   	[
		      	"id"=>11,
		      	"tieuchuan_id"=>4,
		      	"tentieuchi"=>"11. Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan"
		   	],
		   	[
		      	"id"=>12,
		      	"tieuchuan_id"=>4,
		      	"tentieuchi"=>"12. Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện hoạt động dạy học cho học sinh"
		   	],
		   	[
		      	"id"=>13,
		      	"tieuchuan_id"=>4,
		      	"tentieuchi"=>"13. Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện giáo dục đạo đức, lối sống cho học sinh"
		   	],
		   	[
		      	"id"=>14,
		      	"tieuchuan_id"=>5,
		      	"tentieuchi"=>"14. Sử dụng ngoại ngữ hoặc tiếng dân tộc"
		   	],
		   	[
		      	"id"=>15,
		      	"tieuchuan_id"=>5,
		      	"tentieuchi"=>"15. Ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học, giáo dục"
		   	]
		];

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
						$matruong = $v3['matruong'];
						array_push($dataDanhGiaGv,array('iddanhgiagv'=>$id,'matochuyenmon'=>$matochuyenmon,'magiaovien'=>$magiaovien,'matieuchuan'=>$matieuchuan,'matieuchi'=>$matieuchi,'maxeploai'=>$maxeploai,'matruong'=>$matruong));
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
		$data = [];
		foreach($datadggv as $d){
			array_push($data,array('matochuyenmon'=>$d->matochuyenmon,'magiaovien'=>$d->magiaovien,'namdanhgia'=>$d->namdanhgia,'trangthai'=>$d->trangthai));
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

	public function addKetQuaDanhGiaGv (Request $rq) {
		$arrChbxDGGV = $rq->arrChbx;
		$matruong = Session::get('matruong');
		$dataDanhGiaGv = danhgiagv::where('matruong',$matruong)->get();
		$dataDGGVLoc = []; 
		foreach($dataDanhGiaGv as $d){
			foreach($arrChbxDGGV as $a){
				if($d->matochuyenmon == $a['matochuyenmon'] && $d->magiaovien == $a['magiaovien'] && $d->matruong == $a['matruong'] && $d->namdanhgia == $a['namdanhgia']){
					array_push($dataDGGVLoc, array('iddggv'=>$d->id,'matochuyenmon'=>$d->matochuyenmon,'magiaovien'=>$d->magiaovien,'matieuchuan'=>$d->matieuchuan,'matieuchi'=>$d->matieuchi,'matruong'=>$d->matruong,'maxeploai'=>$d->maxeploai,'namdanhgia'=>$d->namdanhgia,'trangthai'=>$d->trangthai));
				}
			}
		}
		$grouped = [];
		foreach($dataDGGVLoc as $d){
			$magiaovien = $d['magiaovien'];
			$matieuchi = $d['matieuchi'];
			$grouped[$magiaovien][$matieuchi][] = $d;
		}
		$arrLoc = [];
		foreach($grouped as $k=>$v){
			$data = [];
			$matochuyenmon;
			$matruong;
			$namdanhgia;
			foreach($v as $k1=>$v1){
				$maxeploai;
				foreach($v1 as $v2){
					$matochuyenmon = $v2['matochuyenmon'];
					$matruong = $v2['matruong'];
					$namdanhgia = $v2['namdanhgia'];
					$maxeploai = $v2['maxeploai'];
				}
				array_push($data,array('matieuchi' => $k1,'maxeploai'=>$maxeploai));
			}
			$arrLoc[] = array('magiaovien' => $k,'matochuyenmon'=>$matochuyenmon, 'matruong'=>$matruong, 'namdanhgia'=>$namdanhgia ,'data'=> $data);
		}
		$arrLast = [];
		foreach($arrLoc as $ar){
			$xeploai = 0;

			//tốt
			if($xeploai == 0) {
				if(	$ar['data'][0]['maxeploai'] >= 3 &&
					$ar['data'][1]['maxeploai'] >= 3 &&
					$ar['data'][2]['maxeploai'] == 4 &&
					$ar['data'][3]['maxeploai'] == 4 &&
					$ar['data'][4]['maxeploai'] == 4 &&
					$ar['data'][5]['maxeploai'] == 4 &&
					$ar['data'][6]['maxeploai'] == 4 &&
					$ar['data'][7]['maxeploai'] >= 3 &&
					$ar['data'][8]['maxeploai'] >= 3 &&
					$ar['data'][9]['maxeploai'] >= 3 &&
					$ar['data'][10]['maxeploai'] >= 3 &&
					$ar['data'][11]['maxeploai'] >= 3 &&
					$ar['data'][12]['maxeploai'] >= 3 &&
					$ar['data'][13]['maxeploai'] >= 3 &&
					$ar['data'][14]['maxeploai'] >= 3 
				){
					$xeploai = 4;
					array_push($arrLast,array('magiaovien'=>$ar['magiaovien'],'matochuyenmon'=>$ar['matochuyenmon'],'matruong'=>$ar['matruong'],'namdanhgia'=>$ar['namdanhgia'],'maxeploai'=>4));
				}
			}

			//khá
			if($xeploai == 0) {
				if(	$ar['data'][0]['maxeploai'] >= 2 &&
					$ar['data'][1]['maxeploai'] >= 2 &&
					$ar['data'][2]['maxeploai'] >= 3 &&
					$ar['data'][3]['maxeploai'] >= 3 &&
					$ar['data'][4]['maxeploai'] >= 3 &&
					$ar['data'][5]['maxeploai'] >= 3 &&
					$ar['data'][6]['maxeploai'] >= 3 &&
					$ar['data'][7]['maxeploai'] >= 2 &&
					$ar['data'][8]['maxeploai'] >= 2 &&
					$ar['data'][9]['maxeploai'] >= 2 &&
					$ar['data'][10]['maxeploai'] >= 2 &&
					$ar['data'][11]['maxeploai'] >= 2 &&
					$ar['data'][12]['maxeploai'] >= 2 &&
					$ar['data'][13]['maxeploai'] >= 2 &&
					$ar['data'][14]['maxeploai'] >= 2 
				){
					$xeploai = 3;
					array_push($arrLast,array('magiaovien'=>$ar['magiaovien'],'matochuyenmon'=>$ar['matochuyenmon'],'matruong'=>$ar['matruong'],'namdanhgia'=>$ar['namdanhgia'],'maxeploai'=>3));
				}
			}

			//đạt
			if($xeploai == 0) {
				if(	$ar['data'][0]['maxeploai'] >= 2 &&
					$ar['data'][1]['maxeploai'] >= 2 &&
					$ar['data'][2]['maxeploai'] >= 2 &&
					$ar['data'][3]['maxeploai'] >= 2 &&
					$ar['data'][4]['maxeploai'] >= 2 &&
					$ar['data'][5]['maxeploai'] >= 2 &&
					$ar['data'][6]['maxeploai'] >= 2 &&
					$ar['data'][7]['maxeploai'] >= 2 &&
					$ar['data'][8]['maxeploai'] >= 2 &&
					$ar['data'][9]['maxeploai'] >= 2 &&
					$ar['data'][10]['maxeploai'] >= 2 &&
					$ar['data'][11]['maxeploai'] >= 2 &&
					$ar['data'][12]['maxeploai'] >= 2 &&
					$ar['data'][13]['maxeploai'] >= 2 &&
					$ar['data'][14]['maxeploai'] >= 2 

				){
					$xeploai = 2;
					array_push($arrLast,array('magiaovien'=>$ar['magiaovien'],'matochuyenmon'=>$ar['matochuyenmon'],'matruong'=>$ar['matruong'],'namdanhgia'=>$ar['namdanhgia'],'maxeploai'=>2));
				}
			}
			
			//chưa đạt
			if($xeploai == 0) {
				if(	$ar['data'][0]['maxeploai'] == 1 ||
					$ar['data'][1]['maxeploai'] == 1 ||
					$ar['data'][2]['maxeploai'] == 1 ||
					$ar['data'][3]['maxeploai'] == 1 ||
					$ar['data'][4]['maxeploai'] == 1 ||
					$ar['data'][5]['maxeploai'] == 1 ||
					$ar['data'][6]['maxeploai'] == 1 ||
					$ar['data'][7]['maxeploai'] == 1 ||
					$ar['data'][8]['maxeploai'] == 1 ||
					$ar['data'][9]['maxeploai'] == 1 ||
					$ar['data'][10]['maxeploai'] == 1 ||
					$ar['data'][11]['maxeploai'] == 1 ||
					$ar['data'][12]['maxeploai'] == 1 ||
					$ar['data'][13]['maxeploai'] == 1 ||
					$ar['data'][14]['maxeploai'] == 1  

				){
					$xeploai = 1;
					array_push($arrLast,array('magiaovien'=>$ar['magiaovien'],'matochuyenmon'=>$ar['matochuyenmon'],'matruong'=>$ar['matruong'],'namdanhgia'=>$ar['namdanhgia'],'maxeploai'=>1));
				}
			}
		}
		if($arrLast != ''){
			$maDGGV = [];
			//add
			foreach($arrLast as $a){
				$ketquadanhgiagv = new ketquadanhgiagv();
				$ketquadanhgiagv->matochuyenmon = $a['matochuyenmon'];
				$ketquadanhgiagv->magiaovien = $a['magiaovien'];
				$ketquadanhgiagv->matruong = $a['matruong'];
				$ketquadanhgiagv->maxeploai = $a['maxeploai'];
				$ketquadanhgiagv->namdanhgia = $a['namdanhgia'];
				$ketquadanhgiagv->save();
			}
			//update trạng thái
			foreach($arrLast as $arl){
				foreach($dataDanhGiaGv as $d){
					if($arl['matochuyenmon'] == $d->matochuyenmon && $arl['magiaovien'] == $d->magiaovien && $arl['matruong'] == $d->matruong && $arl['namdanhgia'] == $d->namdanhgia){
						array_push($maDGGV,array('iddggv'=>$d->id));
					}
				}
			}
			if($maDGGV != ''){
				foreach($maDGGV as $m){
					$danhgiagv = danhgiagv::find($m['iddggv']);
					$danhgiagv->trangthai = 2;
					$danhgiagv->update();
				}
			}
		}

		$success = 1;
		return json_encode($success);

	}

	public function getKetQuaDanhGiaGv () {
		$matruong = Session::get('matruong');
		$data = ketquadanhgiagv::where('matruong',$matruong)->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}


	private function loadSheetExcel($excelFile)
    {
        if (!is_dir(public_path('excelfilemau'))) {
            mkdir(public_path('excelfilemau'));
        }
        $sheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(public_path('excelfilemau') . '/' . $excelFile);
        return $sheet;
    }

    private function autoSiezColumn($sheet)
    {
        // Auto-size columns for all worksheets
        foreach ($sheet->getWorksheetIterator() as $worksheet) {
            foreach ($worksheet->getColumnIterator() as $column) {
                $worksheet->getColumnDimension($column->getColumnIndex())->setAutoSize(true);
            }
        }
    }

    private function saveExcel($sheet, $fileName)
    {
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($sheet);
        if (!file_exists(public_path('export'))) {
            mkdir(public_path('export'));
        }
        $writer->save(public_path('export') . "/" . $fileName . ".xlsx");
    }

	public function getFileMauExcelDGGV ($matochuyenmon) {
		$matruong = Session::get('matruong');
		$datagv = danhsachgv::where('matruong',$matruong)->where('trangthai',1)->get();
		$datagvcm = DB::table('giaovien_chuyenmon')
		->join('tochuyenmon','tochuyenmon.id','=','giaovien_chuyenmon.matochuyenmon')
		->where('giaovien_chuyenmon.matruong',$matruong)
		->where('giaovien_chuyenmon.matochuyenmon',$matochuyenmon)
		->select('giaovien_chuyenmon.*','tochuyenmon.tentocm')
		->get();
		
		
		$currentYear = date("Y");
		$data = [];
		foreach($datagv as $d){
			foreach($datagvcm as $d1){
				if($d->id == $d1->magiaovien){
					array_push($data,array('magiaovien'=>$d->id,'matochuyenmon'=>$d1->matochuyenmon,'tentochuyenmon'=>$d1->tentocm,'hovaten'=>$d->hovaten,'namdanhgia'=>$currentYear));
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

		$sheet = $this->loadSheetExcel('danhgiagiaovien.xlsx');
		$sheet->setActiveSheetIndex(0);
        $sheetDGGV= $sheet->getActiveSheet();
        $this->exportMauDGGV($sheetDGGV, $sheet, $res);

	}

	private function exportMauDGGV($sheetDGGV, $sheet, $res){
		 $styleBorder = array(
            'borders' => array(
                'allborders' => array(
                    'style' => 'thin',
                ),
            ),
            'alignment' => array(
                'horizontal' => 'center',
                'vertical' => 'center',
            )
        );
        $styleCenter = array(
            'alignment' => array(
                'horizontal' => 'center',
                'vertical' => 'center',
            )
        );
        $styleLeft = array(
            'alignment' => array(
                'horizontal' => 'left',
                // 'vertical' => 'center',
            )
        );
        $styleFont = array(
            'font'  => array(
                'bold'  => true,
// 'color' => array('rgb' => 'FF0000'),
                'size'  => 15,
                'name'  => 'Wingdings'
            )
        );      
        $styleBold = array('font'=>array('bold'=>true));
        $stt=1;
        $i = 3;
        foreach($res as $r){
        	$sheetDGGV->setCellValue('A'.$i,$r['matochuyenmon']);
        	$sheetDGGV->getStyle("A".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->setCellValue('B'.$i,$r['magiaovien']);
        	$sheetDGGV->getStyle("B".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->setCellValue('C'.$i,$r['namdanhgia']);
        	$sheetDGGV->getStyle("C".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->setCellValue('D'.$i,$stt++);
        	$sheetDGGV->getStyle("D".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->setCellValue('E'.$i,$r['hovaten']);
        	$sheetDGGV->getStyle("E".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->setCellValue('F'.$i,$r['tentochuyenmon']);
        	$sheetDGGV->getStyle("F".$i)->applyFromArray($styleBorder);
        	$sheetDGGV->getStyle('A'.$i.':F'.$i)->getAlignment()->setWrapText(true);
            $sheetDGGV->getRowDimension($i)->setRowHeight(-1);
            $i++;
        }
        $this->autoSiezColumn($sheet);
        $this->saveExcel($sheet, 'danhgiagiaovien');
        $success = 1;
        return json_encode($success);
	}

}
