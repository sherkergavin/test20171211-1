Ext.define('lims.view.prcsorder.ProcessOrderView',{
		extend:'Ext.grid.Panel',
		alias:'widget.processOrderViewByGWJ',
		id:'processOrderViewByGWJ',
		title:'日常监测',
		initComponent:function(){
			var me = this;
			me.selType = 'cellmodel';
			me.plugins=[Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit:2})];
			me.selModel=Ext.create('Ext.selection.CheckboxModel'); 
			me.store=Ext.create('lims.store.prcsorder.Processorder_List_Store');
			me.columns=[
				{xtype: 'rownumberer',width:50,align:'center' },
				{text:'样品编号',align:'center',dataIndex:'orderSn'},
				{text:'项目名称',align:'center',dataIndex:'itemName'},
				{text:'监测方法',align:'center',dataIndex:'methName'},
				{text:'限值',align:'center',dataIndex:'limt'},
				{text:'数据单位',align:'center',dataIndex:'unitName'},
				{text:'有效数字',align:'center',dataIndex:'efficaci'},
				{text:'有效小数',align:'center',dataIndex:'deciml'},
				{text:'检出限',align:'center',dataIndex:'limt'},
				{text:'监测结果(可编辑)',align:'center',width:150,dataIndex:'itemResult',editor:'textfield'},
				{text:'响应值(可编辑)',align:'center',dataIndex:'itemResp',editor:'textfield'},
				{text:'样品类型',align:'center',dataIndex:'sampleType'},
				{text:'状态(可编辑)',align:'center',dataIndex:'sampleSate'},
//													,editor:{
//														 xtype:'combo',
//														 name:'prcsorderstateComb',
//														 id:'prcsorderstateComb',
//														 store:'prcsorder.Processorder_State_Store',
//														 queryMode: 'local',
//														 displayField: 'desc',
//														 valueField: 'desc'
//														 }},		 
				{text:'符号',width:50,align:'center',dataIndex:'symbol'},
				{text:'下样时间',align:'center',width:150,dataIndex:'createTime',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
				{text:'收样时间',align:'center',width:150,dataIndex:'receiveTime',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
			];
			me.dockedItems=[
				{
					xtype:'toolbar',
					dock:'top',
					items:[
							{
								xtype:'textfield',
								id:'prcsodSn',
								name:'prcsodSn',
								width:120,
								emptyText:'样品编号'
							},
							'-',
							{
								 xtype:'combobox',
								 emptyText:'监测项目',
								 name:'prcsodElComb',
								 id:'prcsodElComb',
								 width:180,
								 store:'prcsorder.Processorder_Element_List_Store',
								 queryMode: 'local',
								 displayField: 'elementName',
								 valueField: 'elementId'
							},
							{
								xtype:'textfield',
								name:'prcsodElCombSn',
								readOnly:true,
								width:500,
								emptyText:'项目列表'
							},
							'-',
							{
								xtype:'datefield',
								width:110,
								editable : false,
								format : 'Y-m-d',
								emptyText:'开始日期',
								name:'prcsodStartDate',
								id:'prcsodStartDate'
							},
							{
								xtype:'datefield',
								width:110,
								editable : false,
								format : 'Y-m-d',
								emptyText:'结束日期',
								name:'prcsodEndDate',
								id:'prcsodEndDate'
							},
							'-',
							{
								xtype:'button',
								name:'prcsodCleanBtn',
								width:100,
								icon : projectGP('/pic/clear.gif'),
								text:'清&nbsp;&nbsp;&nbsp;&nbsp;除'
							},
							'-',
							{
								xtype:'button',
								name:'prcsodQueryBtn',
								width:100,
								icon : projectGP('/pic/select.gif'),
								text:'查&nbsp;&nbsp;&nbsp;&nbsp;询'
							},
							'->',
							{
								 xtype:'combobox',
								 emptyText:'监测仪器',
								 name:'prcsodialogCombo',
								 width:250,
								 store:'prcsorder.Processorder_Instrument_List_Store',
								 queryMode: 'local',
								 displayField: 'instrumentName',
								 valueField: 'instrumentId'
							},
							'-',
							{
								xtype:'button',
								name:'prcsodUpLoadBtn',
								width:100,
								icon : projectGP('/pic/upload.gif'),
								text:'上传检测值'
							}
					]
				},
				{
					xtype: 'pagingtoolbar',
			        store: me.store,//'prcsorder.Processorder_List_Store',
			        dock: 'bottom',
			        displayInfo: true
				}
			];
		
			me.callParent(arguments);
		}
	
});
