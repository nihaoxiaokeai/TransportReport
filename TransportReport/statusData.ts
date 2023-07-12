// 门店要货满足率
const DSRTitle = {
  tableName: 'fOutOrderDtlResDTOS',
  totalName: 'totalFOutOrderMsg',
  contentName: 'fOutOrderMsgs',
  dataTitles: [{
    key: 'plantOrderQty',
    storeName: '门店要货量',
  }, {
    key: 'satisfyQty',
    storeName: '满足要货量',
  }, {
    key: 'rate',
    storeName: '数量满足率',
  }
  ]
} 

// 常温仓断货率
const NTWORTitle = {
  tableName: 'fOutStockDtlResDTOS',
  totalName: 'totalFOutStockSendMsg',
  contentName: 'fOutStockSendMsgs',
  dataTitles: [{
    key: 'skuQty',
    storeName: 'SKU数',
  }, {
      key: 'zeroSkuQty',
      storeName: '0库存SKU数',
  }, {
      key: 'skuRate',
      storeName: '断货率',
  }, {
      key: 'aZeroSkuQty',
      storeName: 'A类商品0库存SKU数',
  }, {
      key: 'aSkuRate',
      storeName: 'A类商品断货率',
  }, {
      key: 'aSkuQty',
      storeName: 'a类商品0库存SKU数',
  }, {
      key: 'aRate',
      storeName: 'a类商品断货率',
  }, {
      key: 'overSeven',
      storeName: '连续断货超7天单品数',
  }]
 }

export { DSRTitle, NTWORTitle };
