Ext.define('lims.controller.prcsorder.ProcessOrderController',{
		extend:'Ext.app.Controller',
		alias:'widget.processOrderControllerByGWJ',
		id:'processOrderControllerByGWJ',
		config:{swfupload:'',itemResult:'',itemResp:''},
		models:[],
		stores:['prcsorder.Processorder_Select_Store','prcsorder.Processorder_State_Store','prcsorder.Processorder_List_Store','prcsorder.Processorder_Element_List_Store','prcsorder.Processorder_Instrument_List_Store'],
		views:['prcsorder.PrcsoddialogView','prcsorder.ProcessOrderView'],
		refs:[
			{ref:'prcsodview',selector:'processOrderViewByGWJ'},
			{ref:'prcsoddialog',selector:'prcsoddialogViewByGWJ'},
			{ref:'prcsoddialogrid',selector:'prcsoddialogViewByGWJ>grid'},
			{ref:'prcsodSnField',selector:'processOrderViewByGWJ>toolbar>textfield[name=prcsodSn]'},
			{ref:'prcsodElCombo',selector:'processOrderViewByGWJ>toolbar>combobox[name=prcsodElComb]'},
			{ref:'prcsodElCombSn',selector:'processOrderViewByGWJ>toolbar>textfield[name=prcsodElCombSn]'},
			{ref:'prcsodStartDate',selector:'processOrderViewByGWJ>toolbar>datefield[name=prcsodStartDate]'},
			{ref:'prcsodEndDate',selector:'processOrderViewByGWJ>toolbar>datefield[name=prcsodEndDate]'},
			{ref:'prcsodialogCombo',selector:'processOrderViewByGWJ>toolbar>combobox[name=prcsodialogCombo]'},
			{ref:'selectFileBtn',selector:'prcsoddialogViewByGWJ>grid>toolbar>button[name=selectFileBtn]'},
			{ref:'uploadFileBtn',selector:'prcsoddialogViewByGWJ>grid>toolbar>button[name=uploadFileBtn]'},
			{ref:'removeFileBtn',selector:'prcsoddialogViewByGWJ>grid>toolbar>button[name=removeFileBtn]'},
			{ref:'cancelFileBtn',selector:'prcsoddialogViewByGWJ>grid>toolbar>button[name=cancelFileBtn]'}
		],
		init:function(){
			var me = this;
			me.control({
					'processOrderViewByGWJ':{render:me.prcsodRenderFun,edit:me.prcsodEditFun,celldblclick:me.prcsodcelldblclickFun},
					'processOrderViewByGWJ>toolbar>combobox[name=prcsodElComb]':{select:me.prcsodComboFun},
					'processOrderViewByGWJ>toolbar>button[name=prcsodQueryBtn]':{click:me.prcsodQueryBtnFun},
					'processOrderViewByGWJ>toolbar>button[name=prcsodCleanBtn]':{click:me.prcsodCleanBtnFun},
					'processOrderViewByGWJ>toolbar>button[name=prcsodUpLoadBtn]':{click:me.prcsodUpLoadBtnFun},
					'prcsoddialogViewByGWJ':{close:me.prcsDlogCloseFun},
					'prcsoddialogViewByGWJ>grid>toolbar>button[name=uploadFileBtn]':{click:me.PrcsDlogUpldFileBtnFun},
					'prcsoddialogViewByGWJ>grid>toolbar>button[name=removeFileBtn]':{click:me.PrcsDlogRemovFileBtnFun},
					'prcsoddialogViewByGWJ>grid>toolbar>button[name=cancelFileBtn]':{click:me.PrcsDlogCanclFileBtnFun},
					'prcsoddialogViewByGWJ>grid>toolbar>button[name=selectFileBtn]':{click:me.prcsDlogselFileBtnFun,afterrender:me.prcsDlogAfterRendBtnFun}
			});
		},
		prcsodComboFun:function(t,rec, eOpts){
			var me = this;
			var procsOdSelStore = Ext.data.StoreManager.lookup('processorder_Select_Store');
			var count = procsOdSelStore.find('elementId',rec[0].data.elementId);
			if(count<0){
				procsOdSelStore.insert(procsOdSelStore.getCount(),{elementId:rec[0].data.elementId,elementName:rec[0].data.elementName});
			}
			var prcsodElCombSn = me.getPrcsodElCombSn();
			prcsodElCombSn.setValue("");
			
			var arr= [];
			procsOdSelStore.each(function(item){
				var eleName	= item.data.elementName;
				var n = eleName.indexOf('(');
				if(n<0){
					arr.push(eleName);
				}else{
					arr.push(eleName.substring(0,n));
				}
			});
			prcsodElCombSn.setValue(arr.join('; '));
		},
		prcsDlogCloseFun:function(p,eOpts ){
				var me = this;
				var store = me.getPrcsoddialogrid().getStore();
				store.removeAll();
		},
		prcsodcelldblclickFun:function(t, td, cellIndex, record, tr, rowIndex, e, eOpts){
			var me = this;
			me.config.itemResult = record.data.itemResult;
			me.config.itemResp = record.data.itemResp;
		
			if(t.panel.columns[cellIndex-1].text=='状态(可编辑)'){
			
				me.openWinStrategyFun(record);	
			}	
		},
		openWinStrategyFun:function(rec){
				var win = Ext.create('Ext.window.Window', {
									    title: rec.data.orderSn+"---"+rec.data.itemName,
									    closable:false,
									    closeAction:'destroy',
									    modal :true,
									    resizable:false,
									    height: 160,
									    width: 350,
									    layout: 'fit',
									    items: {
									    	xtype:'panel',
									    	frame:true,
									    	layout: {
										        type: 'table',
										        columns: 4
										    },
									    	items:[
									    		{
									    			height:20,
									    			colspan: 4,
									    			frame:true,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			width:40,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			width:80,//100,
									    			html:'&nbsp;&nbsp;检测结果&nbsp;: &nbsp;',
									    			frame:true,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			//height:30,
									    			frame:true,
									    			html:rec.data.itemResult,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			width:66,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			height:5,
									    			colspan: 4,
									    			frame:true,
									    			baseCls:'x-plain'
									    		},
									    		
									    		{
									    			width:40,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			width:80,//100,
									    			html:'&nbsp;&nbsp;改变状态&nbsp;: &nbsp;',
									    			frame:true,
									    			baseCls:'x-plain'
									    		},
									    		{
									    			 xtype:'combo',
													 name:'prcsorderstateComb',
													 id:'prcsorderstateComb',
													 store:'prcsorder.Processorder_State_Store',
													 queryMode: 'local',
													 displayField: 'desc',
													 valueField: 'value'
									    		},
									    		{
									    			width:66,//46
									    			baseCls:'x-plain'
									    		},
									    		{
									    			height:30,
									    			colspan: 4,
									    			frame:true,
									    			baseCls:'x-plain'
									    		}
									    	]
									    },
									    buttons: [{name:'updateBtn',text:'更改',handler:function(btn){
									    											var btnWin = btn.up("window");   
									    											var btnCombo = btnWin.down("combo");
									    											var comboVal = btnCombo.getValue();
									    											if(comboVal!=null){
									    												Ext.Ajax.request({
																	                       url: projectGP('/pcessord/changePcessState'),
																	                       params: {
																	                       	   itemId:rec.data.orderSampleItemId,
																	                           sateValue:comboVal
																	                       },
																	                       success: function(response){
																	                          Ext.MessageBox.alert('提示', '已保存!');
																	                          var procsOdListStore = Ext.data.StoreManager.lookup('processorder_List_Store');
																	                       	  procsOdListStore.reload();
																	                       	  win.close();
																	                       
																	                       }
																	                   });
									    											}
									    											}},
									    			{name:'cancelBtn',text:'取消',handler:function(btn){win.close();}}]
									    
									});
									
			win.show();
		},
		prcsodEditFun:function(editor, e, eOpts){
			var me = this;
			if(e.colIdx!=13){
				var cellItem='';
				var cellValue='';
				var cellOrderId = e.record.data.orderSampleItemId;
				if (me.config.itemResult!=e.record.data.itemResult){
					cellItem = 'itemResult';
					cellValue = e.record.data.itemResult;
				}
				if (me.config.itemResp!=e.record.data.itemResp){
					cellItem = 'itemResp';
					cellValue = e.record.data.itemResp;
				}
				if(cellItem!='' && cellValue!='' && cellOrderId !=''){
				      Ext.Ajax.request({
	                       url: projectGP('/pcessord/changeValue'),
	                       params: {
	                       	   itemId:cellOrderId,
	                           itemName:cellItem,
	                           itemVlaue:cellValue
	                       },
	                       success: function(response){
	                          console.log(response);
	                          e.record.commit();
	                         var prcsodStore = me.getPrcsodview().getStore();
	                       }
	                   });
				}
			}else{
				var cellOrderId = e.record.data.orderSampleItemId;
				var sampleSate = e.record.data.sampleSate;
				var sateValue = 'AB';	
				if(sampleSate=="待收样"){
					sateValue = 'SC';
				}else if(sampleSate=="分析中"){
					sateValue = 'SA';
				}else if(sampleSate=="已分析"){
					sateValue = 'AB';
				}else if(sampleSate=="一审完成"){
					sateValue = 'OA';
				}else if(sampleSate=="二审完成"){
					sateValue = 'TA';
				}else if(sampleSate=="终止"){
					sateValue = 'TE';
				}
				Ext.Ajax.request({
                       url: projectGP('/pcessord/changePcessState'),
                       params: {
                       	   itemId:cellOrderId,
                           sateValue:sateValue
                       },
                       success: function(response){
                          e.record.commit();
                       }
                   });
			}
		},
		prcsodCleanBtnFun:function(t, eOpts){
			var procsOdSelStore = Ext.data.StoreManager.lookup('processorder_Select_Store');
			procsOdSelStore.removeAll();
			this.getPrcsodElCombSn().setValue('');
			this.getPrcsodSnField().setValue('');
			this.getPrcsodElCombo().setValue('');
			this.getPrcsodStartDate().setValue('');
			this.getPrcsodEndDate().setValue('');
		},
		prcsodQueryBtnFun:function(t, eOpts){
			var me = this;
			
			var procsOdSelStore = Ext.data.StoreManager.lookup('processorder_Select_Store');
			var arr = [];
			procsOdSelStore.each(function(item){
				arr.push(item.data.elementId);
			});
			var pvStore = me.getPrcsodview().getStore();	
			pvStore.on("beforeload",function(){
	            Ext.apply(pvStore.proxy.extraParams, {
	               	sampleSn:me.getPrcsodSnField().getValue(),
					//itemId:me.getPrcsodElCombo().getValue(),
					itemId:arr.join(';'),
					startDay:me.getPrcsodStartDate().getRawValue(),
					endDay:me.getPrcsodEndDate().getRawValue() 
	            });
	        });
	        me.getPrcsodview().getStore().loadPage(1);
	        me.getPrcsodview().getStore().load();
		},
		prcsodRenderFun:function(t, eOpts){
			var me = this;
			var procsOdSelStore = Ext.create('lims.store.prcsorder.Processorder_Select_Store');
			var pvStore = me.getPrcsodview().getStore();
			pvStore.on("beforeload",function(){
	            Ext.apply(pvStore.proxy.extraParams, {
	                sampleSn:me.getPrcsodSnField().getValue(),
					itemId:me.getPrcsodElCombo().getValue(),
					startDay:me.getPrcsodStartDate().getRawValue(),
					endDay:me.getPrcsodEndDate().getRawValue(), 
					currentPage: 1
	            });
	        });
		    me.getPrcsodview().getStore().loadPage(1);	
		},
		prcsodUpLoadBtnFun:function(t,e,eOpts){
			var me = this;
			var pdComboVal = me.getPrcsodialogCombo().getValue();
			var prcsodSelArr = me.getPrcsodview().getSelectionModel().getSelection();			
						
			if(prcsodSelArr.length==0){
				Ext.Msg.show({
					title : '提示',
					msg : '必须选择 要检测项目的记录!',
					width : 280,
					icon : Ext.Msg.WARNING,
					buttons :Ext.Msg.OK
				});
				return;
			}
			
			
			if(pdComboVal==null){
				Ext.Msg.show({
					title : '提示',
					msg : '必须选择 检测所对应的 检测仪器!',
					width : 280,
					icon : Ext.Msg.WARNING,
					buttons :Ext.Msg.OK
				});
				return;
			}

			var win = Ext.create('widget.prcsoddialogViewByGWJ',{title:'上传  数据',config:{category:'position'},icon:projectGP('/pic/upload.gif')});
		
			win.show();
		},
		prcsDlogAfterRendBtnFun:function(t,eOpts){
			var me = this;
			var config = this.getSWFConfig(t);		
			me.swfupload = new SWFUpload(config);
			Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
			});
		},
		///////////////////////////////////////////
		getSWFConfig : function(btn){
			var me = this;
			var placeHolderId = Ext.id();
			var em = btn.getEl().child('em');
			if(em==null){
				em = Ext.get(btn.getId()+'-btnWrap');
			}		
			em.setStyle({
				position : 'relative',
				display : 'block'
			});
			em.createChild({
				tag : 'div',
				id : placeHolderId
			});
		
			var pdcStore = me.getPrcsodialogCombo().getStore();
			
			var pdcRec = pdcStore.getAt(pdcStore.findBy(function(item){return item.data.instrumentId == me.getPrcsodialogCombo().getValue();}));
			console.log(pdcRec.data.instrumentSn);
			var prcsodSelArr = me.getPrcsodview().getSelectionModel().getSelection();			
				
			var recArr = [];
			
			for(var i=0; i<prcsodSelArr.length;i++){
				recArr.push(prcsodSelArr[i].data.orderSampleItemId+"|"+prcsodSelArr[i].data.orderSn+"|"+prcsodSelArr[i].data.itemName);
			}
			
			return {
				debug: false,
				flash_url :projectGP('/pic/swfupload.swf'),
				flash9_url : projectGP('/pic/swfupload_fp9.swf'),	
				upload_url: projectGP('/pcessord/uploadfile'),	
				post_params: {instrument:pdcRec.data.instrumentSn,recdata:recArr.join(',')}||{savePath:'upload\\'},
				file_size_limit : (me.file_size_limit*1024),
				file_types : '*.*',
				file_types_description : 'All Files',
				file_upload_limit : 50,
				file_queue_limit : 0,
				button_width: em.getWidth(),
				button_height: em.getHeight(),
				button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
				button_cursor: SWFUpload.CURSOR.HAND,
				button_placeholder_id: placeHolderId,
				custom_settings : {
					scope_handler : me
				},
				swfupload_preload_handler : me.swfupload_preload_handler,
				file_queue_error_handler : me.file_queue_error_handler,
				swfupload_load_failed_handler : me.swfupload_load_failed_handler,
				upload_start_handler : function(file){
												var me = this.settings.custom_settings.scope_handler;
												me.getCancelFileBtn().setDisabled(false);
												var store = me.getPrcsoddialogrid().getStore();
												var rec = store.getById(file.id);
												this.setFilePostName(encodeURIComponent(rec.get('fileName')));
											},
				/////////////////////////////////////
				upload_progress_handler :function(file, bytesLoaded, bytesTotal){
												var me = this.settings.custom_settings.scope_handler;		
												var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
												percent = percent == 100? 99 : percent;
										       	var store = me.getPrcsoddialogrid().getStore();
										       	var rec = store.getById(file.id);
										       	rec.set('percent', percent);
												rec.set('status', file.filestatus);
												rec.commit();
											}, 
				/////////////////////////////////////
				upload_error_handler :function(file, errorCode, message){
												var me = this.settings.custom_settings.scope_handler;		
												var store = me.getPrcsoddialogrid().getStore();
												var rec = store.getById(file.id);
										       	rec.set('percent', 0);
												rec.set('status', file.filestatus);
												rec.commit();
											},
				/////////////////////////////////////
				upload_success_handler : function(file, serverData, responseReceived){
												var me = this.settings.custom_settings.scope_handler;		
												var store = me.getPrcsoddialogrid().getStore();
												var rec = store.getById(file.id);
												if(Ext.JSON.decode(serverData).success){			
											       	rec.set('percent', 100);
													rec.set('status', file.filestatus);			
												}else{
													rec.set('percent', 0);
													rec.set('status', SWFUpload.FILE_STATUS.ERROR);
												}
												rec.commit();
												if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
													this.startUpload();
												}else{
													me.showBtn(me,true);
												}
											},
				/////////////////////////////////////
				upload_complete_handler : function(file){},
				////////////////////////////////////
				file_queued_handler :function(file){
										var me = this.settings.custom_settings.scope_handler;
										var store = me.getPrcsoddialogrid().getStore();
										store.add({
											id : file.id,
											name : file.name,
											fileName : file.name,
											size : file.size,
											type : file.type,
											status : file.filestatus,
											percent : 0
										});
									}
				////////////////////////////////////
	/*file_dialog_complete_handler : me.file_dialog_complete_handler*/
			};
		},
		swfupload_preload_handler : function(){
			if (!this.support.loading) {
				Ext.Msg.show({
					title : '提示',
					msg : '浏览器Flash Player版本太低,不能使用该上传功能！',
					width : 250,
					icon : Ext.Msg.ERROR,
					buttons :Ext.Msg.OK
				});
				return false;
			}
		},
		file_queue_error_handler : function(file, errorCode, message){
			switch(errorCode){
				case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED : msg('上传文件列表数量超限,不能选择！');
				break;
				case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT : msg('文件大小超过限制, 不能选择！');
				break;
				case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE : msg('该文件大小为0,不能选择！');
				break;
				case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE : msg('该文件类型不允许上传！');
				break;
			}
			function msg(info){
				Ext.Msg.show({
					title : '提示',
					msg : info,
					width : 250,
					icon : Ext.Msg.WARNING,
					buttons :Ext.Msg.OK
				});
			}
		},
		swfupload_load_failed_handler : function(){
			Ext.Msg.show({
				title : '提示',
				msg : 'SWFUpload加载失败！',
				width : 180,
				icon : Ext.Msg.ERROR,
				buttons :Ext.Msg.OK
			});
		},
		///////////////////////////////////////////
		prcsDlogselFileBtnFun:function(t,e,eOpts){
			var me = this;
			var store = me.getPrcsoddialogrid().getStore();
			if (this.swfupload&&store.getCount()>0) {
				if (this.swfupload.getStats().files_queued > 0) {
					this.showBtn(this,false);
					this.swfupload.uploadStopped = false;		
					this.swfupload.startUpload();
				}
			}
		},
		PrcsDlogUpldFileBtnFun:function(t,e,eOpts){
			var me = this;
			var store = me.getPrcsoddialogrid().getStore();
			if (this.swfupload&&store.getCount()>0) {
				if (this.swfupload.getStats().files_queued > 0) {
					me.showBtn(this,false);
					this.swfupload.uploadStopped = false;	
					
					this.swfupload.startUpload();
				}
			}
		},
		showBtn : function(me,bl){
			
			this.getSelectFileBtn().setDisabled(!bl);
			this.getUploadFileBtn().setDisabled(!bl);
			this.getRemoveFileBtn().setDisabled(!bl);
			this.getCancelFileBtn().setDisabled(bl);	
		},
		
		
		PrcsDlogRemovFileBtnFun:function(t,e,eOpts){
			var ds = this.getPrcsoddialogrid().getStore();
			for(var i=0;i<ds.getCount();i++){
				var record =ds.getAt(i);
				var file_id = record.get('id');
				this.swfupload.cancelUpload(file_id,false);			
			}
			ds.removeAll();
			this.swfupload.uploadStopped = false;
		},
		PrcsDlogCanclFileBtnFun:function(t,e,eOpts){
			if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
			this.showBtn(this,true);
		}
		}
	
});
