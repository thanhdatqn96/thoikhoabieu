<?php

namespace App\Http\Controllers\taikhoantruong;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\tbl_admin;
use App\truong;
use App\huyen;
use App\tochuyenmon;
use App\khoihoc;
use App\giaovien_chuyenmon;
use App\phancongchuyenmon;
use App\sotiettrongbuoi;
use App\monhoc;
use App\xa;
use App\danhsachgv;
use App\danhsachlophoc;
use Hash;
use App\roles;
use stdClass;
use Session; 
use Auth;
class taiKhoantruongController extends Controller
{
	public function viewtaikhoantruong()
	{
		\Assets::addScripts(['js-macdinh','js-custom','js-dev'])->addStyles(['style-macdinh','style-dev'])->removeStyles(['style-datatable'])->removeScripts(['js-datatable']);
		return view('taikhoantruong.taikhoantruong');
	}

	public function getlisttaikhoantruong(){
		$matruong = Session::get('matruong');
		$data =  DB::table('tbl_admin')
		->where('matruong',$matruong)
		->where('id',Auth::user()->id)
		->get();
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	public function updatepasswordtruong(Request $rq){        
		$find = tbl_admin::find($rq->id);     
		$find->password = Hash::make($rq->password);
		$find->passwordshow = $rq->passwordshow;      
		$success = $find->update();        
	}

}
