function danhsachgv(){
	var data = axios.get('getdanhsachgv').then(function (response) {
		var data1 = response.data;
		var datas = data1.map(function (value, label) {
			let data = value;
			let stt = label + 1;
			var datas = Object.assign(data, {stt: stt.toString()});
			return datas;
		});	
		$("#girddsgv").dxDataGrid({
			dataSource: datas,
			showBorders: true,
			scrolling: {
				mode: "virtual",
				rowRenderingMode: "virtual"
			},
			sorting: {
				mode: "multiple"
			},
			filterRow: {
				visible: true,
				applyFilter: "auto"
			},
			searchPanel: {
				visible: true,
				width: 240,
				placeholder: "Tìm kiếm..."
			},
			selection: {
				mode: "multiple",
				recursive: true
			},
			/* co dan cot */
			allowColumnResizing: true,
			columnResizingMode: "widget",
			columns: [{
				caption: "Tên",
				dataField: "hovaten",
			}],
			// select data row
			onSelectionChanged: function (selectedItems) {

			},
		});
	});
}



function danhsachlophoc(){
	var data = axios.get('getdanhsachlophoc').then(function (response) {
		var data1 = response.data;
		var datas = data1.map(function (value, label) {
			let data = value;
			let stt = label + 1;
			var datas = Object.assign(data, {stt: stt.toString()});
			return datas;
		});	
		$("#girddslophoc").dxDataGrid({
			dataSource: datas,
			showBorders: true,
			scrolling: {
				mode: "virtual",
				rowRenderingMode: "virtual"
			},
			sorting: {
				mode: "multiple"
			},
			/* loc du lieu */
			filterRow: {
				visible: true,
				applyFilter: "auto"
			},
			searchPanel: {
				visible: true,
				width: 240,
				placeholder: "Tìm kiếm..."
			},
			selection: {
				mode: "multiple",
				recursive: true
			},
			allowColumnResizing: true,
			columnResizingMode: "widget",
			columns: [{
				caption: "Tên lớp",
				dataField: "tenlop",
			}],
			onSelectionChanged: function (selectedItems) {

			},
		});
	});
}



function danhsachphonghoc(){
	var data = axios.get('getdanhsachphonghoc').then(function (response) {
		var data1 = response.data;
		var datas = data1.map(function (value, label) {
			let data = value;
			let stt = label + 1;
			var datas = Object.assign(data, {stt: stt.toString()});
			return datas;
		});	
		$("#girddsphonghoc").dxDataGrid({
			dataSource: datas,
			showBorders: true,
			scrolling: {
				mode: "virtual",
				rowRenderingMode: "virtual"
			},
			sorting: {
				mode: "multiple"
			},
			filterRow: {
				visible: true,
				applyFilter: "auto"
			},
			searchPanel: {
				visible: true,
				width: 240,
				placeholder: "Tìm kiếm..."
			},
			selection: {
				mode: "multiple",
				recursive: true
			},
			allowColumnResizing: true,
			columnResizingMode: "widget",
			columns: [{
				caption: "Tên phòng học",
				dataField: "tenphong",
			}],
			onSelectionChanged: function (selectedItems) {

			},
		});
	});
}