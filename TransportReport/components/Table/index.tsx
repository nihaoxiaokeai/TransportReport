import * as React from "react";
import * as styles from "./index.scss";
import ListModuleLeft from "./components/ListModuleLeft";
import ListModuleRight from "./components/ListModuleRight";
import * as statusData from "../../statusData";

interface IProps {
  data: any,
  index: any
}

const getContentList = (data, contentName) => {
  const contentList = data.map(item => {
    const totalIndex = item[contentName].findIndex(_item => {
      return _item.deptType === 'ALL'
    })
    if (totalIndex !== -1) {
      item[contentName].unshift(item[contentName][totalIndex])
    }
    const delIndex = item[contentName].findIndex((_item, _index) => {
      return _item.deptType === 'ALL' && _index !== 0
    })
    item[contentName].splice(delIndex, 1)

    // item[contentName].sort((a, b) => {
    //   return a.sort - b.sort
    // });
    return item
  })
  return contentList
}

const getData = (tabIndex, item) => {
    let contentName = null, totalName = null, dataTitles = null, tableName = null
    const { DSRTitle, NTWORTitle } = statusData
    if (tabIndex === 1) {
      contentName = NTWORTitle.contentName
      totalName = NTWORTitle.totalName
      dataTitles = NTWORTitle.dataTitles
      tableName = NTWORTitle.tableName
    } else {
      contentName = DSRTitle.contentName
      totalName = DSRTitle.totalName
      dataTitles = DSRTitle.dataTitles
      tableName = DSRTitle.tableName
    } 
    const dataTitlesLen = dataTitles.findIndex(item => {
      return item.key === 'deptType'
    })
    dataTitlesLen > -1 && (dataTitles.splice(dataTitlesLen, 1))
    item.fOutOrderStoreResDTO.key = 'deptType'
    dataTitles.unshift(item.fOutOrderStoreResDTO)
    const contentList = getContentList(item[tableName], contentName)
    const data = {
      contentList,
      contentName,
      appSelfhelpSaleSum: item[totalName],
      dataTitles
     }

    return data
}

export default React.memo((props: IProps) => {
  // 表格整体数据
  const { data, index } = props;
  const { contentList = [], appSelfhelpSaleSum, contentName = '', dataTitles = [] } = getData(index, data)
  return (
    <div className={styles.wrap}>
        <div className={styles.leftContent}>
          <ListModuleLeft
            titles={dataTitles}
            dataList={contentList}
            contentName={contentName}
            totalTitle={appSelfhelpSaleSum && [{...appSelfhelpSaleSum}]}
          />
        </div>
        <div className={styles.right}> 
          <div style={index === 1 ? { width: '700px' } : { width: '100%' }}>
            <ListModuleRight
              titles={dataTitles}
              contentName={contentName}
              dataList={contentList}
              totalTitle={appSelfhelpSaleSum && [{...appSelfhelpSaleSum}]}
            />
          </div>
        </div>
    </div>
  );
});
